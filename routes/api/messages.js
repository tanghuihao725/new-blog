/**
 * 留言功能路由文件
 */
const express = require('express')
const router = express.Router()
const db = require('../../mysql/connection')

const utils = require('../../utils/dbUtils')

const TABLENAME = "messages"

/**
 * 测试用
 */
router.get('/test', (req, res) => {
    res.json({ msg: 'messages work!' })
})

/**
 * 新增message
 */
router.post('/add', (req, res) => {
    utils.insertObj(req.body, TABLENAME)
        .then(data => res.json({ msg: '增加成功', id: data.insertId }))
        .catch((err) => res.status(400).json({ err }))
})

/**
 * 删除album 任何条件
 */
router.get('/delete', (req, res) => {
    utils.deleteObj(req.query, TABLENAME)
        .then(() => res.json({ msg: '删除成功' }))
        .catch(err => res.status(400).json({ err }))
})

/**
 * 条件获取 type:0  留言管理,
 *         type:1 最新 
 *         type:2 精选 
 */
router.get('/query', (req, res) => {
    const { type = '1', blogId, fromType } = req.query
    let sql = `SELECT * FROM ${TABLENAME} `
    // 添加条件 from
    if (fromType) {
        sql += ` where fromType=${fromType} `
        sql = blogId ? sql + ` and blogId=${blogId} ` : sql
    } else {
        sql += ` where (fromType=0 or fromType=1)`
    }
    if (type != '0') {
        sql += ` and hide=0 `
    }
    if (type == '2') {
        sql += ` and picked=1 `
    }
    if (type == '0' || type == '2') {
        sql += ` order by orderFactor asc, updatedat desc `
    } else {
        sql += `order by updatedat desc`
    }
    db.connect(`select count(id) as total from ${TABLENAME}`)
        .then(totalData => {
            console.log(totalData)
            db.connect(sql)
                .then(data => res.json({
                    msg: "调用接口成功",
                    data,
                    length: data.length,
                    total: totalData[0].total
                }))
        })
})



/**
 * 更新messages信息
 */
router.post('/update', (req, res) => {
    const { id, ...others } = req.body
    utils.updateObj(others, TABLENAME, ` id = ${id} `)
        .then(data => res.json({
            msg: '调用接口成功'
        }))
        .catch(err => res.status(400).json({ msg: err.msg || err }))
})


module.exports = router