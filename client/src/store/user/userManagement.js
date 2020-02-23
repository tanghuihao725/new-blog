import http from '../../utils/common/http'

export default {
    namespaced:true,
    state:{
        allUsers:{},
        editorUserInfo:{},
        // cloudConfig
        stateDetails:{}
    },
    getters:{
        getAllUsers: state=>state.allUsers,
        getDetails: state => state.stateDetails,
    },
    mutations:{
        setAllUsers:(state, res)=>{
            state.allUsers  = res
        },
        showEditDialog:(state, bool) => {
            state.editDialogVisible = bool
        },
        setDetails: (state, payload) => {
             state.stateDetails = payload 
        }
    },
    actions:{
        // 获取所有用户信息
        fetchAllUsers:({commit},payload={})=>{
            const { type = 0 } = payload
            return http.get('users/query', { params:{ type } })
            .then(res => commit('setAllUsers', res.data))
        },
        // 获取博主详细信息
        fetchManagerDetails:({commit})=>{
            return http.get('users/query', {params: { type: 2 }})
            .then(res => {
                commit('setDetails', JSON.parse(res.data.data[0].details))
                return res
            })
        },
        // 删除用户信息
        deleteUser:({commit}, payload={}) => {
            return http.get('/users/unregister',{params:payload})
        },
        // 更新用户信息
        updateUser:({commit}, payload={}) => {
            const { params={}, data={}} = payload
            return http.post('/users/update',{ params, data })
        },
        // Login
        login:({commit}, payload={}) => {
            return http.post('/users/login',{ data:payload.data })
        },
        // Register
        register:({commit}, payload={}) => {
            return http.post('/users/register',{data: payload.data})
        }
    }
}