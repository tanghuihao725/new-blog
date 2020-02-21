import http from '@/utils/common/http'

export default {
    namespaced: true,
    state:{
        // 获取到到所有专辑内容
        stateBlogs: [],
        stateTotal: 0
    },
    getters:{
        blogs: state => state.stateBlogs,
        total: state => state.stateTotal
    },
    mutations:{
        setBlogs: (state, data) => {
            state.stateBlogs = data.data
            state.stateTotal = data.total
        }

    },
    actions:{
        /**
         * 获取博客
         */
        fetchBlogs:({commit}, payload)=>{
            return http.post('/blogs/query', { data: payload })
                .then(res => commit('setBlogs', res.data))
        },
        /**
         * 获取一个博客
         */
        getSingleBlog:(content, payload) => {
            const { type = 4, id = 1 } = payload
            return http.post('/blogs/query', { data : { type, id } })
        },
        /**
         * 删除专辑
         */
        deleteBlog:(context, payload={}) => {
            return http.get('/blogs/delete', { params: payload })
        },
        /**
         * 新增专辑
         */
        createBlog:(context, payload={}) => {
            return http.post('blogs/post', { data: payload })
        },
        /**
         * 更新专辑
         */
        updateBlog:(context, payload={}) => {
            return http.post('blogs/update', { data: payload })
        }
    }
}