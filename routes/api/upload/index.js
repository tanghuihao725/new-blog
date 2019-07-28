const express = require('express');
const router = express.Router();
const uploadImg = require('./imageUploader');

/**
 * 测试用 
 * */
router.get('/test', (req, res) => {
  res.json({ msg: 'Upload work!' })
})

/* 上传图片 */
router.post('/img', (req, res) => {
  uploadImg(req, res);
});

module.exports = router;