<template>
    <div class="layout">
        <div class="main">
            <div class="header">
                <img class="img" :src="zzf" alt="">
                <p class="wzry">王者荣耀后台管理系统</p>
            </div>
            <form class="form">
                <div class="form_input">
                    <input v-model="form.account" placeholder="请输入账号" class="input" type="text">
                </div>
                <div class="form_input">
                    <input v-model="form.password" placeholder="请输入密码" class="input" type="password">
                </div>
            </form>
            <div style="width:100%;display: flex;align-items: center;justify-content: center;">
                <label><input type="checkbox" @change="go($event)"/>已阅读并同意服务协议和王者荣耀隐私保护指引</label>
            </div>
            <button type="button" :disabled="disabled" class="button" @click="login">
                <span>{{disabled ? '勾选' : '开始游戏'}}</span>
                <span>START</span>
            </button>
        </div>
    </div>

    <div class="fullvideo">
        <video class="videofull" :src="layout" playsinline autoplay muted loop></video>
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
import {successmessage, warningmessage, errormessage} from "../api/message.js";
import background from '@/assets/video/超兽武装.mp4'
import img from '@/assets/zzf.jpg'
const layout=ref('')
layout.value=background
const zzf=ref('')
zzf.value=img
const store = useStore();
const router = useRouter();
const disabled=ref(true)
const form=reactive({
    account:'',
    password:''
})
const go=(event)=>{
    console.log(event);
    if(event.target.checked==true){
        disabled.value=false
    }else if(event.target.checked==false){
        disabled.value=true
    }
}
const login=()=>{
    if(form.account=="" || form.password==""){
        warningmessage("账号密码不能为空")
    }else if(form.account!=="2452884452" || form.password!=="123456789"){
        errormessage("账号或密码错误")
    }else{
        successmessage("登录成功")
    }
}
onMounted(()=>{

})
</script>

<style scoped>
.layout{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.main{
    width: 500px;
    height: 400px;
}
.header{
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
}
.wzry{
    font-size: 35px;
    font-weight: 800;
    margin-left: 30px;
    letter-spacing: 3px;
    color: white;
}
.form{
    width: 100%;
    height: 40%;
    margin: 0 auto;
}
.form_input{
    width: 80%;
    margin: 0 auto;
    margin-top: 30px;
}
.input{
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    outline: none;
    text-align: center;
    font-size: 20px;
}
.input:focus{
    color: aqua;
}
.input::placeholder{
    color: gray;
    opacity: 0.6;
}
.fullvideo{
    width: 100vw;
    height: 100vh;
    position: absolute;
    inset: 0;
    z-index: -1;
}
.videofull{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.button{
    width: 180px;
    height: 40px;
    background:url("./img/login.png") no-repeat;
    background-size: 100% 100%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 30px;
}
span:nth-child(1){
    font-size: 16px;
    color: white;
    letter-spacing: 3px;
    text-shadow: 0px 0px 25px #bf681d;
}
span:nth-child(2){
    font-size: 18px;
    letter-spacing: 3px;
    line-height: 14px;
    color: #946c4c;
    text-shadow: 0px 0px 25px #bf681d;
}
.button:disabled{
    background-image: none;
    background-color: gray;
    width: 170px;
    height: 40px;
    border-radius: 25px;
}
</style>