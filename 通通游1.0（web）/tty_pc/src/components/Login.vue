<template>
  <section class="loginContainer">
    <div class="logoContainer">
      <img class="logo" :src="logo">
      <p class="name">通通游</p>
    </div>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">通通游分销商运营系统</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="请输入用户名">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </section>
</template>

<script type="text/ecmascript-6">
  import qs from 'qs';
  import { requestLogin } from 'api';

  export default {
    data() {
      return {
        logo: require('../assets/images/logo.png'),
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    created() {
      sessionStorage.removeItem('__menus__');
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;

            let params = qs.stringify({
              flag: 2,
              userName: this.ruleForm2.account,
              password: this.ruleForm2.checkPass
            });

            requestLogin(params).then((res) => {
              this.logining = false;
              let { state, info } = res;
              if (state == 1) {
                let user = {
                  tel: info.tel,
                  roleName: info.roleName,
                  name: info.name,
                  userName: info.userName,
                  platId: info.platId
                }
                this.$router.push('/homePage');
                sessionStorage.setItem('__user__', JSON.stringify(user));
              } else {
                this.$notify.error({
                  title: '提示',
                  message: '请联系管理员'
                })
              }
            })
            .catch(() => {
              this.$notify.error({
                title: '提示',
                message: '登录失败，请联系管理员。'
              })
            })
          } else {
            console.log('error submit!!')
          }
        });
      }
    }
  }

</script>

<style>
  .loginContainer .logoContainer{
    text-align: center;
    margin: 76px 0;
  }
  .loginContainer .logo{
    display: inline-block;
    height: 60px;
  }
  .loginContainer .name{
    display: inline-block;
    line-height: 60px;
    height: 60px;
    font-size: 20px;
    color: #333;
    margin-left: 20px;
    vertical-align: top;
  }
  .loginContainer .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 380px;
    padding: 35px 45px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
  }
  .loginContainer .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #333;
    font-weight: normal;
    font-size: 18px;
  }
  .loginContainer .remember {
    margin: 0px 0px 35px 0px;
  }

  .loginContainer .el-input-group__prepend,
  .loginContainer .el-input-group__append{
    width: 82px;
    text-align: center;
    padding: 0;
    background: #fff;
    border: 1px solid #008EE5;
    border-right: 0;
  }
  .loginContainer .el-form-item.is-success .el-input__inner{
    border-left: 0;
    border-color: #008EE5;
  }
  .loginContainer .el-form-item.is-error .el-input__inner{
    border-left: 0;
  }
  .loginContainer .el-input-group--prepend .el-input__inner{
    border-left: 0;
  }
  .loginContainer .el-form-item.is-error .el-input-group__prepend,
  .loginContainer .el-form-item.is-error .el-input-group__append{
    border-color: #fa5555;
  }
  .loginContainer .el-form-item.is-success .el-input__inner:focus ,
  .loginContainer .el-input__inner:focus,
  .loginContainer .el-input__inner:hover{
    border-color: #008EE5;
  }
  .loginContainer .el-form-item__content{
    font-size: 16px;
  }
  .loginContainer .el-input__inner{
    border-color: #008EE5;
  }
  .loginContainer .el-button--primary{
    background-color: #008EE5;
    border-color: #008EE5;
    font-weight: normal;
    font-size: 16px;
  }
</style>