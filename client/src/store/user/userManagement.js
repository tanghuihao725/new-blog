import http from '../../utils/common/http'

export default {
    namespaced:true,
    state:{
        allUsers:{},
        editorUserInfo:{},
        editDialogVisible:false,
    },
    getters:{
        getAllUsers: state=>state.allUsers,
        getEditorUserInfo: state=>state.editorUserInfo,
    },
    mutations:{
        setAllUsers:(state, res)=>{
            state.allUsers  = res
        },
        setEditorUserInfo:(state, payload)=>{
            state.editorUserInfo = payload
        },
        showEditDialog:(state, bool) => {
            state.editDialogVisible = bool
        }
    },
    actions:{
        // 获取所有用户信息
        fetchAllUsers:({commit},payload={})=>{
            const { type = 0 } = payload
            return http.get('users/query', { params:{ type } })
            .then(res => commit('setAllUsers', res.data))
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
            const {data={}} = payload
            console.log(data)
            return http.post('/users/login',{ data })
        }
    }
}