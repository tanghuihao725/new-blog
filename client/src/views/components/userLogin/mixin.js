import { mapActions, mapMutations } from 'vuex'
import constant from '../../../utils/constant'
import { Notification } from 'element-ui';


export default {
    methods: {
        ...mapActions("user/userManagement", ["login"]),
        ...mapMutations("user", ["setUserCurrent"]),
        mixinLogin(loginInfo = {}) {
            // 为获取七牛云的uploadToken所需要传的入参
            loginInfo.uploadConfig = constant.uploadConfig
            return this.login({ data: loginInfo })
                .then(res => {
                    const user = res.data.data; // 用户信息
                    localStorage.blogToken = res.data.token;  // 博客后台的token
                    localStorage.uploadToken = res.data.uploadToken; // 七牛云的上传token
                    this.setUserCurrent(user); // 设置当前用户信息
                    Notification.success({
                        title: "登陆成功",
                        message: `欢迎回来,${user.nickname || user.telephone}`
                    });
                })
                .catch(err =>
                    Notification.error({
                        title: "登录失败",
                        message: `原因:${err.response.data.msg}`
                    })
                )
        }
    }
}