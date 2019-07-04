/** 
 * 用户登陆的路由文件
*/
const express = require('express')
const router = express.Router()
const db = require('../../mysql/connection')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const passport = require('passport')

const utils = require('../../utils/dbUtils')

/**
 * 测试用 
 * */
router.get('/test', (req, res) => {
    res.json({ msg: 'test works' })
})

// $route POST /user/register
/**
 * 注册
 *  */
router.post('/register', (req, res) => {
    // 用手机号作为是否注册资源
    const telephone = req.body.telephone
    utils.hasExist({ telephone, isdelete: 0 }, 'users')
        .then(data => {
            if (data) {
                res.status(400).json({ msg: '该手机号已经被注册' })
            }
            else {
                // 加密密码
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) throw err
                    // hash为加密后的密码
                    req.body.password = hash
                    const insertSql = utils.insertObjToSql(req.body, 'users')
                    db.connect(insertSql)
                        .then(data => res.json({ msg: '注册成功', id: data.insertId }))
                        .catch(() => res.status(400).json({ msg: '注册失败' }))
                })

            }
        })
})
/**
 * 注销
 *  */
router.get('/unregister', passport.authenticate("jwt", { session: false }), (req, res) => {
    // query/type  0 假删除 1 真删除 不传值为0
    if (req.user && req.user.authority < 5) {
        return res.status(400).json({ msg: '您的权限不够' })
    }
    const { id, type = '0' } = req.query
    if (type === '1') {
        const sql = `delete from users where id = ${id}`
        db.connect(sql).then(() => res.json({ msg: '删除成功：彻底删除' })).catch(() => res.status(400).json({ msg: '删除失败' }))
    } else {
        const sql = `update users set isdelete = 1 where id = ${id}`
        db.connect(sql).then(() => res.json({ msg: '删除成功' })).catch(() => res.status(400).json({ msg: '删除失败' }))
    }
})

/**
 * 查找所有用户
 *  */
router.get('/query', (req, res) => {
    // query/type 0 正常搜索 1 全部搜索(包括被假删除用户)
    const { type = '0' } = req.query
    let sql = `select * from users `
    if (type !== '1') {
        // 过滤掉被假删除的
        sql += `where isdelete = 0`
    }
    db.connect(sql).then(data => res.json({ msg: '调用接口成功', data, length: data.length })).catch(() => res.status(400).json({ msg: '获取数据失败' }))
})

/**
 * 更新用户信息
 *  */
router.post('/update', (req, res) => {
    const id = req.query.id
    const telephone = req.body.telephone
    // 检测新的电话是否和其他人的电话重复
    const sql = `select * from users where id <> ${id} and telephone = ${telephone}`
    db.connect(sql).then(data => {
        if (data.length > 0) {
            res.status(400).json({ msg: '该手机号已经被注册' })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) throw err
                // hash为加密后的密码
                req.body.password = hash
                db.connect(utils.updateObjToSql(req.body, 'users', `id = ${id}`))
                    .then(() => res.json({ id: req.query.id, msg: '更新成功' })).catch(() => res.status(400).json({ msg: '更新失败' }))
            })
        }
    })

})

/**
 * 登陆
 *  */
router.post('/login', (req, res) => {
    const { telephone, password } = req.body
    // 查找是否有手机号注册的信息
    utils.hasExist({ telephone }, 'users')
        .then(result => {
            if (!result) {
                // 未找到手机号帐号信息
                res.status(400).json({ msg: '该手机号未注册', code: 'A0001' })
            } else {
                // 找到帐号信息后，验证密码是否正确
                bcrypt.compare(password, result[0].password, (err, compareRes) => {
                    if (err) throw err
                    // 密码错误
                    if (compareRes === false) {
                        res.status(400).json({ msg: "密码错误", code: 'A0002' })
                    } else {
                        // 密码正确 设置token
                        const rule = { id: result[0].id }
                        jwt.sign(rule, 'secret', { expiresIn: 604800 }, (err, token) => {
                            if (err) throw err
                            delete result[0].password
                            res.json({
                                msg: "登陆成功",
                                token: `Bearer ${token}`,
                                data: result[0]
                            })
                        })
                    }
                });
            }
        })
})

/**
 * 获取登陆信息 需要验证token
 *  */
router.get('/current', passport.authenticate("jwt", { session: false }), (req, res) => {
    // 验证后才会执行以下代码
    if (req.user) {
        res.json(req.user)
    } else {
        res.status(400).json({ msg: '无法获取用户信息' })
    }
})

module.exports = router

