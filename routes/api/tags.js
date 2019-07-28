/**
 * 专辑标签路由文件 
 * */
const express = require('express')
const router = express.Router()
const db = require('../../mysql/connection')

/**
 * 测试用 
 * */
router.get('/test', (req, res) => {
    res.json({ msg: 'Tags work!' })
})



module.exports = router