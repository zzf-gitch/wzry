<template>
  <div class="loginfour">
    <div class="content">
      <div class="header">
        <img class="img" :src="ruleForm.img" alt="" />
        <p class="wz">王者荣耀后台管理系统</p>
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
          <el-input
            type="text"
            v-model="ruleForm.account"
            placeholder="请输入账号"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入账号"
            clearable
            show-password
          />
        </el-form-item>
      </el-form>
      <div class="checked">
      <el-checkbox v-model="checked" @change="checkebox" label="已阅读并同意服务协议和王者荣耀隐私保护指引" size="large" />
      </div>
      <button class="ButtonL" :disabled="disabled" @click="login">
        <span>{{disabled ? '勾选' : '开始游戏'}}</span>
        <span>START</span>
      </button>
    </div>
  </div>

  <div class="videofull">
    <video class="fullvideo" playsinline autoplay muted loop :src="DaiZong" type="video/mp4"></video>
  </div>
</template>

<script setup>
import {
  ref,
  defineEmits,
  defineProps,
  nextTick,
  reactive,
  onMounted,
  watch,
  computed,
  onUnmounted,
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import zzf from "../assets/zzf.jpg";
import dw from '../assets/video/岱宗.mp4'
import {successmessage,warningmessage, errormessage } from "../api/message.js";
const DaiZong=ref('')
DaiZong.value=dw
const store = useStore();
const router = useRouter();
const route = useRoute();
const checked=ref(false);
const disabled=ref(true);
const ruleForm = reactive({
  img: zzf,
  account: "",
  password: "",
  name: "张卓飞",
});
const checkebox=(val)=>{
    if(val==false){
        disabled.value = true
    }else if(val==true){
        disabled.value = false
    }
}
const login=()=>{
    if(ruleForm.account=='' || ruleForm.password==''){
        warningmessage("账号密码不能为空")
    }else if(ruleForm.account!=='2452884452' || ruleForm.password!=='123456789..'){
        if(ruleForm.account!=='2067765949' || ruleForm.password!=='123456789ghs'){
            errormessage("账号或密码错误")
        }else{
            successmessage("登录成功")
            sessionStorage.setItem("user",JSON.stringify(ruleForm))
            router.push({name:"videoone",params:{list:JSON.stringify(ruleForm)}})
        }
    }else{
        successmessage("登录成功")
        sessionStorage.setItem("user",JSON.stringify(ruleForm))
        router.push({name:"videoone",params:{list:JSON.stringify(ruleForm)}})
    }
}
const rules=reactive({
    account:[
        { required: true, message: "账号不能为空", trigger: "blur"}
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur'}
    ]
})
onMounted(() => {

})
</script>

<style scoped>
.loginfour {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
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
.img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.wz {
  margin-left: 30px;
  font-size: 30px;
  font-weight: 800;
  color: white;
}
.el-form{
    width: 100%;
    height: 40%;
    opacity: 0.6;
}
.demo-ruleForm >>> input{
    outline:none;
    box-shadow: none;
    border-radius: 15px;
}
.el-input /deep/ .el-input__inner{
    text-align: center;
    font-size: 20px;
}
.el-form-item /deep/ .el-form-item__content{
    margin-left: 0px !important;
}
.el-input /deep/ .el-input__inner:focus{
    color: #2186e4;
}
.el-input /deep/ .el-input__inner::placeholder {
    text-align: center;
    color: #ced1d8;
    font-size: 18px;
}
.el-form-item {
    width: 80%;
    margin: 0 auto;
    margin-top: 50px;
}
.videofull{
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index:-1;
}
.fullvideo{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.checked{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:20px;
}
.ButtonL{
    background: url("./img/login.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    width: 180px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    flex-direction: column;
    margin-top: 20px;
    cursor: pointer;
}
span:nth-child(1){
    font-size: 16px;
    letter-spacing:3px;
    color: white;
    text-shadow: 0px 0px 25px #bf681d;
}
span:nth-child(2){
    font-size: 18px;
    letter-spacing:3px;
    color:#946c4c;
    line-height: 14px;
    text-shadow: 0px 0px 25px #bf681d;
}
.ButtonL:disabled{
    width: 170px;
    height: 40px;
    background-color:gray;
    border-radius: 25px;
    background-image:none;
    cursor: not-allowed;
}
</style>