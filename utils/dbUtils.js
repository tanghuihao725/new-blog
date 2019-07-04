/**
 * 将对象传入插入数据库的sql语句
 * @obj 对象    
 * @tableName 表名
 * @method 多个条件的拼接方式 and ? or ?
 */ 

const db = require('../mysql/connection')
const dbUtils = {}

// 在sql语句中 字符串需要额外加引号
function toString(target){
    return typeof target === 'string' ? `'${target}'` : target
}

// 检查对象条件是否在表中出现
dbUtils.hasExist = function(obj, tableName, method='and'){
    const sqlArray = []
    Object.keys(obj).forEach(key => {
        if(obj[key]!=='' && obj[key]!==undefined && obj[key]!==null){
            sqlArray.push(`${key} = ${toString(obj[key])}`)
        }
    })
    const sql = `select * from ${tableName} where ${sqlArray.join(` ${method} `)}`
    return db.connect(sql).then(data => data.length>0 ? data : null)
}

// 对象插入数据库
dbUtils.insertObjToSql = function(obj,tableName){
    const keys = [], values = []
    Object.keys(obj).forEach(key => {
        if(obj[key]!=='' && obj[key]!==undefined){
            keys.push(key)
            values.push(toString(obj[key]))
        }
    })
    return `insert into ${tableName} (${keys.join(',')}) values (${values.join(',')})`
}

// 对象更新数据库 cases: 条件
dbUtils.updateObjToSql = (obj, tableName, cases)=>{
    const sqlArray = []
    Object.keys(obj).forEach(key => {
        if(obj[key]!=='' && obj[key]!==undefined){
            sqlArray.push(`${key} = ${toString(obj[key])}`)
        }
    })
    return `update ${tableName} set ${sqlArray.join(',')} where ${cases}`
}

module.exports = dbUtils