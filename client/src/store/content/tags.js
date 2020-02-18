import http from '@/utils/common/http'

export default {
    namespaced: true,
    state: {
        // 获取到到所有标签内容
        stateTags: []
    },
    getters: {
        tags: state => state.stateTags
    },
    mutations: {
        setTags: (state, data) => {
            state.stateTags = data.data
        }

    },
    actions: {
        /**
         * 获取标签 参数样例 tagIds=1,2,3 无参默认全部传
         */
        fetchTags: ({ commit }, payload = {}) => {
            return http.get('/tags/query', { params: payload })
                .then(res => commit('setTags', res.data))
        },
        /**
         * 获取标签 但是不更新标签列表
         */
        conditionTags: ({ commit }, payload = {}) => {
            return http.get('/tags/query', { params: payload })
        },
        /**
         * 删除标签
         */
        deleteTag: (context, payload = {}) => {
            return http.get('/tags/delete', { params: payload })
        },
        /**
         * 新增标签
         */
        createTag: (context, payload = {}) => {
            return http.post('tags/add', { data: payload })
        },
        /**
         * 更新标签
         */
        updateTag: (context, payload = {}) => {
            return http.post('tags/update', { data: payload })
        }
    }
}