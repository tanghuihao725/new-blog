import albums from './albums'
import tags from './tags'
import blogs from './blogs'
import messages from './messages'

export default {
    namespaced: true,
    modules:{
        albums, // 专辑管理
        tags, // 标签管理
        blogs, // 博客管理
        messages // 消息管理
    }
}