<template>
  <div class="loginone">
    <div class="main">
        <div class="img_img">
            <img :src="ruleForm.img" alt="">
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
      <el-input v-model="ruleForm.account" placeholder="请输入账号" type="input" clearable/>
    </el-form-item>
    <el-form-item prop="account">
      <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password type="password" clearable/>
    </el-form-item>
  </el-form>
    <div class="bottom" @click="submit">
        <span>开始游戏</span>
        <span>START</span>
    </div>
    </div>
  </div>
  <div class="fullvideo">
      <video class="videofull" playsinline autoplay muted loop :src="videonew" type="video/mp4"></video>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { successmessage,warningmessage,errormessage } from "../api/message";
import { ElLoading } from "element-plus";
import zzf from '@/assets/zzf.jpg'
import video from '@/assets/video/new.mp4'
const store = useStore();
const router = useRouter();
const route = useRoute();
const videonew=ref('')
videonew.value=video
const ruleForm=reactive({
    img:zzf,
    account:'',
    password:'',
    name:'张卓飞'
})
const rules=reactive({
    account:[
        { required: true, message: "账号不能为空", trigger: "blur"}
    ],
    password:[
        { required: true, message: "密码不能为空", trigger: "blur"}
    ]
})
const submit=()=>{
    if(ruleForm.account=='' || ruleForm.password==''){
        warningmessage("账号密码不能为空")
    }else if(ruleForm.account!=='2452884452' || ruleForm.password!== '15903509849fx..'){
        errormessage("账号或密码输入错误")
    }else{
        router.push({name:"video",params:{list:JSON.stringify(ruleForm)}})
        sessionStorage.setItem("user",JSON.stringify(ruleForm))
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
    .loginone{
        width: 100%;
        height: 100%;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .main{
        width: 500px;
        height: 400px;
        opacity: 0.9;
    }
    .img_img{
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .img_img img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .zi{
        font-size: 30px;
        font-weight: 800;
        margin-left: 30px;
        color: white;
    }
    .el-form{
        width: 100%;
        height: 40%;
        opacity: 0.5;
    }
    .el-form-item /deep/ .el-form-item__content{
        margin-left: 0px !important;
    }
    .el-input /deep/ .el-input__inner{
        text-align:center;
        font-size: 20px;
    }
    .el-input /deep/ .el-input__inner:focus{
        color: #2186e4;
    }
    .el-input /deep/ .el-input__inner::placeholder{
        text-align: center;
        font-size: 16px;
        color: #ced1d8;
    }
    .el-form-item{
        width: 80%;
        margin: 0 auto;
        padding-top: 50px;
    }
    .demo-ruleForm >>> input{
        outline: none;
        box-shadow: none;
        border-radius: 15px;
    }
    .fullvideo{
        width: 100vw;
        height: 100vh;
        position: absolute;
        inset:0;
        z-index: -1;
    }
    .videofull{
        width:100%;
        height: 100%;
        object-fit: cover;
    }
    .bottom{
        position: relative;
        width: 180px;
        height: 35px;
        background: url("./img/login.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-top: 50px;
        display:flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    span:nth-child(1){
        color: whitesmoke;
        font-size: 16px;
        letter-spacing:3px;
        text-shadow: 0px 0px 25px #bf681d;
    }
    span:nth-child(2){
        font-size: 16px;
        color:#946c4c;
        text-shadow: 0px 0px 25px #bf681d;
        line-height: 14px;
        letter-spacing:3px
    }
</style>