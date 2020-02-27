import http from '@/utils/common/http'

export default {
    namespaced: true,
    state:{
        // 获取到到所有专辑内容
        stateBlogs: [],
        stateTotal: 0,
        stateBlogsByAlbum: {},
    },
    getters:{
        blogs: state => state.stateBlogs,
        total: state => state.stateTotal,
        blogsByAlbum: state => state.stateBlogsByAlbum

    },
    mutations:{
        setBlogs: (state, data) => {
            state.stateBlogs = data.data
            state.stateTotal = data.total
        },
        setBlogsByAlbum: (state, data) =>{
            state.stateBlogsByAlbum = data.data
        }

    },
    actions:{
        /**
         * 获取博客, 并自动获取全局blogsByAlbums列表
         */
        fetchBlogs:({commit, dispatch}, payload)=>{
            return http.post('/blogs/query', { data: payload })
                .then(res =>{
                    commit('setBlogs', res.data)
                    dispatch('fetchBlogsByAlbum')
                    return res
                })
        },
        /**
         * 获取一个博客
         */
        getSingleBlog:(content, payload) => {
            const { type = 4, id = 1 } = payload
            return http.post('/blogs/query', { data : { type, id } })
        },
        /**
         * 根据albumId获取博客列表，如果不传albumId返回所有标签对应的博客列表
         */
        fetchBlogsByAlbum:({commit}, payload={}) => {
            return http.get('/blogs/blogsByAlbum', { params:payload })
                .then(res => {
                    commit('setBlogsByAlbum', res.data)
                    return res.data
                })
        },
        /**
         * 删除博客
         */
        deleteBlog:(context, payload={}) => {
            return http.get('/blogs/delete', { params: payload })
        },
        /**
         * 创建博客
         */
        createBlog:(context, payload={}) => {
            return http.post('blogs/post', { data: payload })
        },
        /**
         * 更新博客
         */
        updateBlog:(context, payload={}) => {
            return http.post('blogs/update', { data: payload })
        }
    }
}