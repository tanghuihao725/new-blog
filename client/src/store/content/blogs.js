import http from '@/utils/common/http'

export default {
    namespaced: true,
    state:{
        // 获取到到所有专辑内容
        stateBlogs: []
    },
    getters:{
        blogs: state => state.stateBlogs
    },
    mutations:{
        setBlogs: (state, data) => {
            state.stateBlogs = data.data
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