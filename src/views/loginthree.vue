<template>
  <div class="loginthree">
    <div class="main">
      <div class="header">
        <img class="header_img" :src="ruleForm.zzf" alt="" />
        <p class="zi">王者荣耀后台管理系统</p>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
      <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm.account" placeholder="请输入账号" clearable />
      </el-form-item>
      <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password clearable />
      </el-form-item>
      </el-form>
      <div class="checkbox">
          <el-checkbox v-model="checked1" @change="change" label="已阅读并同意服务协议和王者荣耀隐私保护指引" size="large" />
      </div>
      <button class="button" :disabled="disabled" @click="submit">
          <span>{{disabled ? '点击勾选' : '开始游戏'}}</span>
          <span>START</span>
      </button>
    </div>
  </div>
  <div class="fullvideo">
        <video class="videofull" playsinline autoplay muted loop :src="daizong" type="video/mp4"></video>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { successmessage, warningmessage, errormessage } from "../api/message.js";
import { ElLoading } from "element-plus";
import dw from '@/assets/video/岱宗.mp4'
import zzf from "@/assets/zzf.jpg";
const store = useStore();
const router = useRouter();
const route = useRoute();
const daizong=ref('')
daizong.value=dw
const ruleForm = reactive({
  zzf: zzf,
  account:"",
  password:"",
  name:"张卓飞"
});
const disabled=ref(true)
const checked1=ref(false)
const change=(val)=>{
    if(val==true){
      disabled.value=false;
    }else if(val==false) {
      disabled.value=true
    }
}
const aaa=()=>{
}
const rules=reactive({
    account: [
        { required: true, message: "账号不能为空", trigger: "blur"}
    ],
    password: [
        { required: true, message: "密码不能为空",trigger: "blur"}
    ]
})
const submit=()=>{
  if(ruleForm.account=='' || ruleForm.password==''){
    warningmessage("账号密码不能为空")
  }else if(ruleForm.account !== '2452884452' || ruleForm.password !== '15903509849fx..'){
    if(ruleForm.account !== '2067765949' || ruleForm.password !== '123456789ghs'){
      errormessage("账号或密码错误")
    }
  }else{
    successmessage("登录成功")
  }
}
onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在加载中，请稍后.......",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 1000);
});
</script>

<style scoped>
.loginthree {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  width: 500px;
  height: 400px;
  opacity: 0.8;
}
.header {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.header_img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.zi {
  font-size: 30px;
  font-weight: 800;
  margin-left: 30px;
  color: white;
}
.el-form{
    width: 100%;
    height: 40%;
    opacity: 0.6;
}
.demo-ruleForm >>> input {
    outline: none;
    box-shadow: none;
    border-radius: 15px;
}
.el-form-item /deep/ .el-form-item__content{
    margin-left: 0px !important;
}
.el-input /deep/ .el-input__inner{
    text-align: center;
    font-size: 20px;
}
.el-input /deep/ .el-input__inner:focus{
    color: #2186e4;
}
.el-input /deep/ .el-input__inner{
    text-align: center;
    color: #ced1d8;
    font-size: 18px;
}
.el-form-item{
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
}
.fullvideo{
    position: absolute;
    inset:0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
.videofull{
    width:100%;
    height: 100%;
    object-fit: cover;
}
.button{
    background: url(./img/login.png) no-repeat;
    background-size:100% 100%;
    width: 180px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 10px;
    border: none;
}
.button:disabled{
    background: none;
    width: 150px;
    height: 40px;
    background-color: gray;
    border-radius:15px;
    border: none;
}
span:nth-child(1){
    letter-spacing: 3px;
    font-size: 16px;
    color: white;
    text-shadow: 0px 0px 25px #bf681d;
}
span:nth-child(2){
    letter-spacing:3px;
    color:#946c4c;
    line-height:14px;
    font-size: 18px;
    text-shadow: 0px 0px 25px #bf681d;
}
.checkbox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>