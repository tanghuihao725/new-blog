import albums from './albums'
import tags from './tags'
import blogs from './blogs'

export default {
    namespaced: true,
    modules:{
        albums, // 专辑管理
        tags, // 标签管理
        blogs // 博客管理
    }
}