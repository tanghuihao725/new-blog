<template>
<el-dialog 
title="编辑用户" 
:visible.sync="$store.state.user.userManagement.editDialogVisible"
@open='handleOpen'
>
<div class="form-container">
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    label-position="left"
  >
    <el-form-item label="手机号" prop="name">
      <el-input v-model="ruleForm.telephone" disabled></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" placeholder="不输入则为不修改"></el-input>
    </el-form-item>

    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="ruleForm.nickname" placeholder="昵称"></el-input>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
    </el-form-item>

    <el-form-item label="权限操作" prop="auth" v-if="from==='manage'">
      <el-select v-model="ruleForm.authority">
        <el-option label="超级管理员" :value="6"></el-option>
        <el-option label="普通管理员" :value="5"></el-option>
        <el-option label="普通老百姓" :value="1"></el-option>
      </el-select>
    </el-form-item>
   
    <el-form-item>
      <el-button type="success" @click="submitForm()">修改</el-button>
    </el-form-item>
  </el-form>
  </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      ruleForm: {
        telephone: "",
        password: "",
        email: "",
        nickname: "",
        authority: 1,
        avator: ""
      },
      rules:{
          email:[]
      }
    }
  },
  props:{
      from:{
          // manage || selfEditor  
          type: String,
          default: 'selfEditor'
      },
      date:{
          type:Object,
          default:()=>{}
      }
  },
  computed:{
      ...mapGetters("user/userManagement", ["getEditorUserInfo"]),
  },
  methods:{
      ...mapMutations("user/userManagement",["showEditDialog"]),
      ...mapActions('user/userManagement',['updateUser']),
      submitForm(){
          this.updateUser({params:{id:this.getEditorUserInfo.id},
          data:this.ruleForm})
          .then(()=>{
              this.$message.success({message:"更新成功"})
              this.showEditDialog(false)
              this.$emit('update')
          })
          .catch(err=>this.$message.error({message:err.msg||err}))
      },
      handleOpen(){
        const {createdAt,updatedAt,password,...others} = this.getEditorUserInfo
        this.ruleForm = others
      }
  }
};
</script>

<style lang="less" scoped>
.form-container{
  padding: 0 50px;
}
</style>

