import http from '@/utils/common/http'

export default {
    namespaced: true,
    state: {
        // 获取到到所有标签内容
        stateMessages: [],
        stateTotal: 0
    },
    getters: {
        messages: state => state.stateMessages,
        messagesTotal: state => state.stateTotal
    },
    mutations: {
        setMessages: (state, data) => {
            state.stateMessages = data.data
            state.stateTotal = data.total
        },
    },
    actions: {
        /**
         * 获取标签 参数样例 tagIds=1,2,3 无参默认全部传
         */
        fetchMessages: ({ commit }, payload = {}) => {
            return http.get('/messages/query', { params: payload })
                .then(res => {
                    console.log(res.data)
                    commit('setMessages', res.data)
                    return res.data
                })
        },
        /**
         * 删除标签
         */
        deleteMessage: (context, payload = {}) => {
            return http.get('/messages/delete', { params: payload })
        },
        /**
         * 新增标签
         */
        createMessage: (context, payload = {}) => {
            return http.post('messages/add', { data: payload })
        },
        /**
         * 更新标签
         */
        updateMessage: (context, payload = {}) => {
            return http.post('messages/update', { data: payload })
        }
    }
}