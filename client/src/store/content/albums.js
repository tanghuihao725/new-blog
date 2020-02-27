import http from '@/utils/common/http'

export default {
    namespaced: true,
    state:{
        // 获取到到所有专辑内容
        stateAlbums: []
    },
    getters:{
        albums: state => state.stateAlbums
    },
    mutations:{
        setAlbums: (state, data) => {
            state.stateAlbums = data.data
        }

    },
    actions:{
        /**
         * 获取专辑 参数样例 albumId=1,2,3 无参默认全部传
         */
        fetchAlbums:({commit}, payload={})=>{
            return http.get('/albums/query', { params: payload })
                .then(res => {
                    commit('setAlbums', res.data)
                    return res
                })
        },
        /**
         * 删除专辑
         */
        deleteAlbum:(context, payload={}) => {
            return http.get('/albums/delete', { params: payload })
        },
        /**
         * 新增专辑
         */
        createAlbum:(context, payload={}) => {
            return http.post('albums/add', { data: payload })
        },
        /**
         * 更新专辑
         */
        updateAlbum:(context, payload={}) => {
            return http.post('albums/update', { data: payload })
        }
    }
}