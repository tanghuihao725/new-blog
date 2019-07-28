const express = require('express')
const path = require('path')
const app = express()
// 解析post请求中的body
const bodyParser = require('body-parser')
// passport
const passport = require('passport')

const users = require('./routes/api/user')
const tags = require('./routes/api/tags')
const upload = require('./routes/api/upload/index')

// 解析urlencoded和raw/json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 初始化passport
app.use(passport.initialize());

require('./utils/passport')(passport)

app.get('/',(req,res) => {
    res.send('Hello World!')
})

// 路由接口文件：端口之上使用routes 当访问users/*** 就能找到该路由文件

/**
 * 用户接口：包含 登陆 注册 更新 获取当前用户 等
 */
app.use('/users',users)

/**
 * 标签专辑接口 
 */
app.use('/tags',tags)

/**
 * 图片上传接口
 */
app.use('/upload',upload);
app.use('/serverImage', express.static(path.join(__dirname, 'serverImage')));


const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
    console.log(path.join(__dirname, '../serverImage'))
})