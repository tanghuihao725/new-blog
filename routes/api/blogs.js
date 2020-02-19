/**
 * 博文路由文件 
 * */
const express = require('express')
const router = express.Router()
const db = require('../../mysql/connection')

const utils = require('../../utils/dbUtils')

const TABLENAME = "blogs",
    TAG_TABLE = "tags",
    ALBUM_TABLE = "albums"


/**
 * 测试用 
 * */
router.get('/test', (req, res) => {
    res.json({ msg: 'blogs work!' })
})

/**
 * 新增blog
 */
router.post('/post', (req, res) => {
    utils.insertObj(req.body, TABLENAME)
        .then(data => res.json({ msg: '发布成功', id: data.insertId }))
        .catch(err => res.status(400).json({ err }))
})

/**
 * 更新blog
 */
router.post('/update', (req, res) => {
    const { id, ...others } = req.body
    utils.updateObj(others, TABLENAME, ` id = ${id}`)
        .then(data => res.json({
            msg: '调用接口成功'
        }))
        .catch(err => res.status(400).json({ msg: err.msg || err }))
})

/**
 * 删除博客
 */
router.get('/delete', (req, res) => {
    utils.deleteObj(req.query, TABLENAME)
        .then(() => res.json({ msg: '删除成功' }))
        .catch(err => res.status(400).json({ err }))
})

/**
 * 批量查询博客
 */

// 工具函数，根据 1,2,3 获取各个id值的tag详情
function findTagDetailsFromIds(ids) {
    let sql = `select * from ${TAG_TABLE}`
    const tagArr = ids.split(',').map(tagId => `id = ${tagId}`)
    sql += ` where ${tagArr.join(' or ')}`
    return db.connect(sql)
}

router.post('/query', (req, res) => {
    // type: 0公开，1所有, 2:分类公开 3:分类所有 
    const { pageNum = 1, pageSize = 10, type = 0 } = req.body
    // 先查询满足条件blog
    let sql = `select 
        ${ALBUM_TABLE}.*, 
        ${TABLENAME}.*,
        ${ALBUM_TABLE}.orderFactor as albumOrderFactor
        from ${TABLENAME} left join ${ALBUM_TABLE}
        on ${TABLENAME}.album = ${ALBUM_TABLE}.id
        `
    if (type == 2 || type == 0) {
        // 过滤hide === 1
        sql += ` where 
            ( ${ALBUM_TABLE}.hide <> 1 
            or ${ALBUM_TABLE}.hide is null )
            `
        // 过滤notPush === 1
        if (type == 0) {
            sql += `and ( ${ALBUM_TABLE}.notPush <> 1
                    or ${ALBUM_TABLE}.notPush is null )
                `
        }
    }
    // 排序 分页
    sql += `
        order by 
        ${TABLENAME}.orderFactor asc,
        ${TABLENAME}.updatedAt desc `

    let pageDivision = `
        limit ${pageSize} 
        offset ${(pageNum - 1) * pageSize}
    `
    db.connect(sql)
        .then(data => {
            const total = data.length
            data = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)
            const tags = [], repeatTest = {}
            // 1. 收集标签
            data.forEach(item => {
                if (item.tags) {
                    item.tags.split(',').forEach(tag => {
                        if (!repeatTest[tag]) {
                            repeatTest[tag] = true
                            tags.push(tag)
                        }
                    })
                }
            })
            // 2. 获取标签
            findTagDetailsFromIds(tags.join(','))
                .then(tagRes => {
                    // 数组转为对象储存
                    const tagMap = {}
                    tagRes.forEach(tagItem => {
                        tagMap[tagItem.id] = tagItem
                    })
                    data.forEach(item => {
                        if (item.tags) {
                            const tagDetails = []
                            item.tags.split(',').forEach(tag => {
                                if (tagMap[tag]) {
                                    tagDetails.push(tagMap[tag])
                                }
                            })
                            item.tagDetails = tagDetails
                        }
                    })
                    res.json({
                        msg: '调用接口成功',
                        data,
                        total
                    })
                })
        })
        .catch(err => res.status(400).json({ msg: err.msg || err }))
})



module.exports = router