<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="ruleForm.remember" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;"
                 @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapState } from 'vuex'
  import { requestLogin } from '../api';
  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
          account: '',
          checkPass: '',
          remember: true
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },

      };
    },
    created:function(){
      sessionStorage.removeItem('user');
    },
    methods: {
      handleSubmit(ev) {
        let _this = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.ruleForm.account, password: this.ruleForm.checkPass , remember: this.ruleForm.remember};
            requestLogin(loginParams).then(response => {
              let data = response.data;
              if(data.code==1){
                let user=data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/user' });
              }else{
                this.$message.error(data.message);
              }
            }).catch(error => {
               this.$message.error('网络错误',error);
               this.logining = false;
               console.info(error);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    computed:{
      ...mapState(['isLogin'])
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
