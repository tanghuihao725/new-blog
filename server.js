const express = require('express')
const path = require('path')
const app = express()
// 解析post请求中的body
const bodyParser = require('body-parser')
// passport
const passport = require('passport')

// 接口文件
const users = require('./routes/api/user')
const tags = require('./routes/api/tags')
const albums = require('./routes/api/albums')
const blogs = require('./routes/api/blogs')
const messages = require('./routes/api/messages')
const upload = require('./routes/api/upload/index')


// 解析urlencoded和raw/json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 初始化passport
app.use(passport.initialize());
require('./utils/passport')(passport)

// 路由接口文件：端口之上使用routes 当访问users/*** 就能找到该路由文件

/**
 * 用户接口：包含 登陆 注册 更新 获取当前用户 等
 */
app.use('/users', users)

/**
 * 标签专辑接口 
 */
app.use('/tags', tags)
app.use('/albums', albums)
app.use('/blogs', blogs)
app.use('/messages', messages)

/**
 * 图片上传接口
 */
app.use('/upload',upload);
app.use('/serverImage', express.static(path.join(__dirname, 'serverImage')));

/**
 * 主页 
 */
app.use(express.static('client/dist'))
app.use('/',express.static(path.join(__dirname,'client/dist/index.html')))


/**
 * 老博客地址
 */
app.use(express.static('oldBlog/dist'))
app.use('/old',express.static(path.join(__dirname,'oldBlog/dist/index.html')))

const port = process.env.PORT || '5000'

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
    console.log(__dirname+'/client/dist/index.html')
})