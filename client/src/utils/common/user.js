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

export function avatarDefault(sex){
    if(sex>1 || sex<0) return require('../../assets/img/avatar/avatar_pig_bow_small.jpg')
    return sex === 0 ? require('../../assets/img/avatar/avatar_female_small.jpg') : require('../../assets/img/avatar/avatar_male_small.jpg')
}