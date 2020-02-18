/**
 * 专辑标签路由文件 
 * */
const express = require('express')
const router = express.Router()
const db = require('../../mysql/connection')
const passport = require('passport')

const utils = require('../../utils/dbUtils')

const TABLENAME = "albums"
/**
 * 测试用 
 * */
router.get('/test', (req, res) => {
    res.json({ msg: 'albums work!' })
})

/**
 * 新增album
 */
router.post('/add', (req, res) => {
    const { albumName } = req.body
    utils.findAll({ albumName }, TABLENAME)
        .then(data => {
            if(data){
                res.status(400).json({ msg: '已有同名专辑' })
            } else {
                const insertSql = utils.insertObjToSql(req.body, TABLENAME)
                console.log(insertSql)
                db.connect(insertSql)
                .then(data => res.json({ msg: '增加成功', id: data.insertId }))
                .catch((err) => res.status(400).json({ msg: err }))
            }
        })
})

/**
 * 删除album 任何条件
 */
router.get('/delete', (req, res) => {
    utils.deleteObj(req.query, TABLENAME)
      .then(()=> res.json({ msg: '删除成功' }))
      .catch(err => res.status(400).json({msg: err.msg || err}))
})

/**
 * 条件获取album
 */
router.get('/query', (req, res) => {
    let sql = `select * from ${TABLENAME}` 
    if(req.query && req.query.albumsIds){
        const albumArr = req.query.albumsIds.split(',').map(albumsId => {
            return `id = ${albumsId}`
        })
        sql += ` where ${albumArr.join(' or ')}`
    }
    sql += ` order by updatedat desc`
    db.connect(sql)
      .then(data => res.json({
          msg: '调用接口成功',
          data,
          length: data.length
      }))
      .catch(err => res.status(400).json({msg: err.msg || err}))
})

/**
 * 更新album信息
 */
router.post('/update', (req, res) => {
    const { id, ...others } = req.body
    utils.updateObj(others, TABLENAME, ` id = ${id} `)
    .then(data => res.json({
        msg: '调用接口成功'
    }))
    .catch(err => res.status(400).json({msg: err.msg || err}))
})





module.exports = router