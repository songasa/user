<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title" id="title">欢迎使用共享停车位</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="手机号" maxlength="11" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input 
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          minlength="6" 
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>

      <!-- 注册按钮 -->
      <el-button
      class="filter-item"
      style="margin-left: 30px;"
      type="primary"
      icon="el-icon-edit"
      @click="yz">注 册</el-button>


      <!-- 找回密码 -->
      <el-button
      class="filter-item"
      style="margin-left: 160px;"
      type="primary"
      icon="el-icon-edit"
      @click="yz1">找回密码</el-button>
      

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div> -->
    </el-form>

    <template>
      <!-- 点击注册按钮弹出人机验证 -->
      <el-dialog title="人机验证" :visible.sync="rjyz">
        <Verify
                ref="loginVerifyRef"
                :type="2"
                @error="error"
                :showButton="true"
                @success="success"
                :width="'20%'"
                :height="'40px'"
                :fontSize="'16px'"
              >
      </Verify>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rjyz = false">取消</el-button>
      </div>
      </el-dialog>

    <!-- 点击注册按钮弹出表单 -->
      <el-dialog title="注册信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input :type="text" v-model="user.name" placeholder="请输入您的姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="productNo" :label-width="formLabelWidth">
          <el-input :type="text" v-model="user.productNo" placeholder="请输入11位手机号" 
          oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"/>
          <span>
            <el-button :disabled="saveBtnDisabled" type="primary"
            @click="registerCode">点击获取验证码</el-button>
          </span>
        </el-form-item>
        <el-form-item label="设置密码" prop="pwd" :label-width="formLabelWidth">
          <el-input :type="pwdType" v-model="user.pwd" placeholder="请输入最少6位密码" minlength="6"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
        <!-- <el-button :disabled="saveBtnDisabled" type="primary"
        @click="registerCode">点击获取验证码</el-button> -->
        </el-form-item>
        <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
          <el-input :type="text" v-model="user.code" placeholder="请输入6位验证码" maxlength="6"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click=" createData() ">确定</el-button>
      </div>
      </el-dialog>

      <!-- 点击找回密码按钮弹出表单 -->
      <el-dialog title="找回密码" :visible.sync="dialogFormVisible1">
      <el-form
        :model="questionForm"
        ref="dataForm"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="手机号" prop="productNo" :label-width="formLabelWidth">
          <el-input :type="text" v-model="user.productNo" placeholder="请输入11位手机号" 
          oninput="value=value.replace(/[^\d]/g,'')" maxlength="11"/>
          <el-button :disabled="saveBtnDisabled1" type="primary"
          @click="registerCode1">点击获取验证码</el-button>
        </el-form-item>
        <el-form-item label="设置密码" prop="pwd" :label-width="formLabelWidth">
          <el-input :type="pwdType" v-model="user.pwd" placeholder="请输入最少6位密码" minlength="6"/>
          <span class="show-pwd" @click="showPwd">
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
        <!-- <el-button :disabled="saveBtnDisabled1" type="primary"
        @click="registerCode1">点击获取验证码</el-button> -->
        </el-form-item>
        <el-form-item label="验证码" prop="code" :label-width="formLabelWidth">
          <el-input :type="text" v-model="user.code" placeholder="请输入6位验证码" maxlength="6"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取消</el-button>
        <el-button type="primary" @click=" createData1() ">确定</el-button>
      </div>
      </el-dialog>

      </template>

  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
//引入调用register.js和login.js文件
import register from '@/api/register.js'
import { login, logout, getInfo ,getInfoByToken } from '@/api/login'
import cookie from 'js-cookie'
import re from '@/api/home/recommendation'
import request from '@/utils/request'
import Verify from "vue2-verify"; 

export default {
  name: 'Login',
  created(){
    {
        var cip = returnCitySN["cip"]
        this.ip = cip
        // console.log(this.ip);//ip就是本机ip地址
        re.IPToGPS(this.ip,this.addressQuery)
        .then(response => {
          // cookie.set('address',response.data.address,{domain: '101.37.12.216'})
          // cookie.set('adcode',response.data.adcode,{domain: '101.37.12.216'})
          // cookie.set('lng',response.data.longitude,{domain: '101.37.12.216'})
          // cookie.set('lat',response.data.latitude,{domain: '101.37.12.216'})
          // cookie.set('endlng',response.data.longitude,{domain: '101.37.12.216'})
          // cookie.set('endlat',response.data.latitude,{domain: '101.37.12.216'})
          cookie.set('address',response.data.address,{domain: 'localhost'})
          cookie.set('adcode',response.data.adcode,{domain: 'localhost'})
          cookie.set('lng',response.data.longitude,{domain: 'localhost'})
          cookie.set('lat',response.data.latitude,{domain: 'localhost'})
          cookie.set('endlng',response.data.longitude,{domain: 'localhost'})
          cookie.set('endlat',response.data.latitude,{domain: 'localhost'})
        })
      }
  },
   components: {
    Verify,
  },
  data() {
    //保证手机号位数为11
    const validateUsername = (rule, value, callback) => {
      if (value.length!=11) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    //保证密码位数大于等于6
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      addressQuery:{},
      ip:'',
      //登录界面的手机号和密码
      loginForm: {
        username: '',
        password: ''
      },
      //获取用户信息
      loginInfo:{},
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,

      //注册需要的属性
      user: {
        name: "",
        productNo: "",
        pwd: "",
        code: "",
      },
      //token
      token: {
        productNo:'',
        id:'',
      },
      //注册 找回密码 展开按钮
      dialogFormVisible: false,
      dialogFormVisible1: false,
      saveBtnDisabled:false, //按钮是否禁用
      saveBtnDisabled1:false, //按钮是否禁用
      formLabelWidth: '120px',
      rjyz:false,
      yzResult:false,
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    //人机验证
    yz(){
      if(!this.yzResult){
        this.rjyz = true
      }else{
        this.handleCreate()
      }
      
    },
    yz1(){
      if(!this.yzResult){
        this.rjyz = true
      }else{
        this.handleCreate1()
      }
    },
    error() {
      alert('答案错误!')
    },
    success() {
      this.rjyz = false
      this.yzResult = true
    },

    //显示或隐藏密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    //登录方法
    handleLogin() {
      if(!this.yzResult){
        this.rjyz = true
      }else{
      this.$refs.loginForm.validate(valid => {

        if (valid) {

          //模板默认的方法
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {

            //自定义的方法 存token值
            login(this.loginForm.username,this.loginForm.password)
            .then(response => {
              //获取token字符串  cookie名称，token值，作用范围
              // cookie.set('ZUT',response.data.token,{domain: '101.37.12.216'})
              cookie.set('ZUT',response.data.token,{domain: 'localhost'})

                //调用后台接口 
                getInfoByToken()
                .then(response1 => {
                  this.token.productNo = response1.data.user.productNo
                  this.token.id = response1.data.user.id
                })

            })

            

            this.loading = false
            // this.$router.push({ path: this.redirect || '/' })
            this.$router.push({ path: '/login' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      }
    },

    //注册的方法
    handleCreate() {
      this.questionForm = {
        name: "",
        productNo: "",
        pwd: "",
        code: "",
      };
      this.dialogFormVisible = true;
    },
    handleCreate1() {
      this.questionForm = {
        name: "",
        productNo: "",
        pwd: "",
        code: "",
      };
      this.dialogFormVisible1 = true;
    },
    //添加用户信息到数据库
    async createData() {
      this.saveBtnDisabled=false
      // console.log(this.user.productNo)
      // console.log(this.user.code)
      // console.log(this.user)
      register.register(this.user.name,this.user.productNo,this.user.pwd,this.user.code)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: '注册成功!'
                })
                this.dialogFormVisible = false;
              })
              .catch(error => {
                this.$message({
                  type: 'error',
                  message: '信息填写错误!'
                })
              })
      this.loginForm.username = this.user.productNo
      this.loginForm.password = this.user.pwd
      this.handleLogin
      // alert(JSON.stringify(params))
    },
    async createData1() {
      this.saveBtnDisabled1=false
      register.findPWD(this.user.productNo,this.user.pwd,this.user.code)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: '找回密码成功，欢迎登录!'
                })
                this.dialogFormVisible1 = false;
              })
              .catch(error => {
                this.$message({
                  type: 'error',
                  message: '信息填写错误!'
                })
              })
      this.loginForm.username = this.user.productNo
      this.loginForm.password = this.user.pwd
      this.handleLogin
      // alert(JSON.stringify(params))
    },

    //根据手机号获取验证码
        registerCode(){
            this.saveBtnDisabled=true
            // console.log(this.user.productNo)
            // console.log(this.user)
            register.registerCode(this.user.productNo)
            .then(response => {
                this.$message({
                  type: 'success',
                  message: '验证码已发送，5分钟内有效！'
                })
              })
        },
        registerCode1(){
            this.saveBtnDisabled1=true
            register.findPWDCode(this.user.productNo)
            .then(response => {
                this.$message({
                  type: 'success',
                  message: '验证码已发送，5分钟内有效！'
                })
              })
        },

  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#bbd8c6;
$dark_gray:#889aa4;
$light_gray:#eee;

  #title{
    color: #2d3a4b;
  }

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: black;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
