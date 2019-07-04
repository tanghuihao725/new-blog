const express = require('express')
const app = express()
// 解析post请求中的body
const bodyParser = require('body-parser')
// passport
const passport = require('passport')

const users = require('./routes/api/user')

// 解析urlencoded和raw/json
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// 初始化passport
app.use(passport.initialize());

require('./utils/passport')(passport)

app.get('/',(req,res) => {
    res.send('Hello World!')
})
// 端口之上使用routes 当访问users/*** 就能找到该路由文件
app.use('/users',users)
const port = process.env.PORT || 5000


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})