/**
 * 专辑标签路由文件 
 * */
const express = require('express')
const router = express.Router()
const db = require('../../mysql/connection')
const passport = require('passport')

const utils = require('../../utils/dbUtils')
/**
 * 测试用 
 * */
router.get('/test', (req, res) => {
    res.json({ msg: 'Tags work!' })
})

/**
 * 新增tag
 */
router.post('/add', (req, res) => {
    const { tagName } = req.body
    utils.findAll({ tagName }, 'tags')
        .then(data => {
            if(data){
                res.status(400).json({ msg: '已有同名标签' })
            } else {
                const insertSql = utils.insertObjToSql(req.body, 'tags')
                db.connect(insertSql)
                .then(data => res.json({ msg: '增加标签成功', id: data.insertId }))
                .catch(() => res.status(400).json({ msg: '增加失败' }))
            }
        })
})

/**
 * 删除tag
 */
router.get('/delete', (req, res) => {
    utils.deleteObj(req.query, 'tags')
      .then(()=> res.json({ msg: '删除成功' }))
      .catch(err => res.status(400).json({msg: err.msg || err}))
})

/**
 * 条件获取tags
 */
router.get('/query', (req, res) => {
    let sql = 'select * from tags'
    if(req.query && req.query.tagIds){
        const tagArr = req.query.tagIds.split(',').map(tagId => {
            return `id = ${tagId}`
        })
        sql += ` where ${tagArr.join(' or ')}`
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
 * 更新tag信息
 */
router.post('/update', (req, res) => {
    const { id, ...others } = req.body
    utils.updateObj(others, 'tags', ` id = ${id} `)
    .then(data => res.json({
        msg: '调用接口成功'
    }))
    .catch(err => res.status(400).json({msg: err.msg || err}))
})


module.exports = router