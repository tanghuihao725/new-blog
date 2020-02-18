import userManagement from './userManagement'
import http from '@/utils/common/http'

export default {
    namespaced: true,
    state: {
        // 用户登陆框dialog是否显示
        showUserDialog: false,
        // 当前用户信息
        stateUserCurrent:{},
    },
    getters:{
        getUserDialogStatu: state => state.showUserDialog,
        userCurrent: state=>state.stateUserCurrent,
        isLogin: state => state.stateUserCurrent.id && localStorage.blogToken
    },
    mutations:{
        setUserDialog: (state,statu)=>{state.showUserDialog = statu},
        setUserCurrent: (state, payload) => {state.stateUserCurrent = payload},
    },
    actions:{
        initCurrent: ({commit})=>{
            if(localStorage&&localStorage.blogToken){
                http.get('/users/current').then(res => {
                    commit('setUserCurrent', res.data)
                })
            }
        }
    },
    modules:{
        // 用户管理
        userManagement,
    }
}