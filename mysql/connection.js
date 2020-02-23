/**
 * npm install mysql
 * 数据库连接函数
 * 
 *  */ 
const mysql = require('mysql')

exports.connect = function(sql, param){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tangtang88',
        port: '3306',
        database: 'THHSBLOG',
        timezone: '08:00', 
    })
    connection.connect()
    return new Promise((resolve, reject) => {
        connection.query(sql,param,(err,result) => {
            connection.end()
            if(err) reject(err)
            resolve(result)
        })
    })

}