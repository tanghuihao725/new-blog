/**
 * 用于验证token
 *  */ 

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {} //这个验证所需要的参数
const db = require("../mysql/connection") // 数据库接口

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport =>{
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        // jwt_payload 为token中的保存信息
        // done为回调函数 (err,data=user,info)=>{}
        let sql = `select * from users where id = ${jwt_payload.id}`
        db.connect(sql).then(data=>{
            if(data.length>0){
                // 说明通过token中的id参数找到了该用户
                delete data[0].password
                return done(null,data[0]);
            }else{
                // 没找到该用户 user=false
                return done(null,false);
            }
        })
    }));
    
}