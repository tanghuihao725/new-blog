/** 
 * Authority => 权限[0:删除用户]
 * */ 
export function authorityName(auth){
    switch(auth){
        case 1: 
            return { name:'普通用户',color:'black',auth:[0],icon:'el-icon-user' }
        case 5:
            return { name:'管理员', color:'red',auth:[1],icon:'el-icon-trophy'}
        case 6:
            return { name:'超级管理员',color:'orange',auth:[1],icon:'el-icon-trophy' }
    }
}