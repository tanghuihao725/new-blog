import albums from './albums'
import tags from './tags'

export default {
    namespaced: true,
    modules:{
        albums, // 专辑管理
        tags // 标签管理
    }
}