<template>
    <div class="cardDrawer">
        <div class="card_top">
            <!-- 卡片特效 -->
            <div class="card">
                <img class="img" :src="cardimg" alt="">
                <div class="id">NO.88</div>
                <div class="bottom">
                    <span class="name">刘备</span>
                    <span class="title">仁德义枪</span>
                </div>
                <div class="card_main">
                    <img :src="LB" alt="">
                    <span class="span" :style="style" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="open">查看详细</span>
                    <div class="line" :class="{ lineactive: lineactive }"></div>
                </div>
            </div>
        </div>
        
        <!-- 遮罩层 -->
        <div class="mask_layer" v-if="Maskshow"></div>
        <!-- 抽屉 -->
        <div class="drawer" :class="{drawerline:drawerline}">
            <div class="drawer_header">
                <div class="wz">Added basic hero information!</div>
                <div class="button"><el-button type="danger" @click="close">Close</el-button></div>
            </div>
            <div class="drawer_main">
                
            </div>
        </div>

        <!-- 消息盒子 -->
        <div class="messagebox" :class="{messageboxline:messageboxline}">
            <div class="message_header">
                <span>Warning</span>
                <i class="iconfont icon-close" @click="closemessage"></i>
            </div>
            <div class="message_main">
                <div class="warn"><span style="color:white;font-size:16px;font-weight:600">!</span></div>
                <div class="del">您确定要删除吗?</div>
            </div>
            <div class="message_bottom">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="determine">确定</el-button>
            </div>
        </div>

        <!-- 背景视频 -->
        <div class="fullvideo">
            <video class="videofull" :src="MV" playsinline autoplay loop muted type="video/mp4"></video>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MV from '@/assets/video/沐浴阳光.mp4'
import cardimg from '../../public/hero/wzry/阿备.jpg'
import LB from '../../public/hero/headimg/51.png'
import { successmessage, warningmessage, errormessage ,infomessage } from '@/api/message.js'
//控制下划线显示和隐藏
const lineactive = ref(false)
//控制查看详细的文字颜色
const style = ref('')
//控制遮罩层的显示和隐藏
const Maskshow=ref(false)
//控制抽屉的显示和隐藏
const drawerline=ref(false)
//控制消息盒子的显示和隐藏
const messageboxline=ref(false)
//鼠标移入
const mouseenter = () => {
    lineactive.value = true
    style.value = 'color:#cce7f8'
}
//鼠标移出
const mouseleave = () => {
    lineactive.value = false
    style.value = 'color:white'
}
//打开抽屉并且显示遮罩层
const open=()=>{
    Maskshow.value=true
    drawerline.value=true
}
//打开消息盒子
const close=()=>{
    messageboxline.value=true
}
//关闭消息盒子
const closemessage=()=>{
    messageboxline.value=false
    infomessage("取消关闭")
}
//关闭消息盒子
const cancel=()=>{
    messageboxline.value=false
    infomessage("取消关闭")
}
//关闭消息盒子和抽屉以及遮罩层
const determine=()=>{
    messageboxline.value=false
    drawerline.value=false
    Maskshow.value=false
    successmessage("关闭成功")
}
</script>

<style scoped>
.cardDrawer {
    width: 100%;
    height: 100%;
}

.card_top {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    width: 200px;
    height: 320px;
    position: relative;
    box-shadow: 0px 5px 10px 5px black;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.25s 0.05s;
}

.img {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.card:hover {
    transform: translateY(-10px);
    transition: all 0.5s 0.2s;
    box-shadow: 0px 5px 10px 10px black;
    background-color: black;
}

.id {
    position: absolute;
    z-index: 1;
    color: white;
    font-size: 16px;
    font-weight: 800;
    margin: 15px;
}

.bottom {
    position: absolute;
    z-index: 1;
    bottom: 5px;
    width: 100%;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.name {
    color: white;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 5px;
    line-height: 1.5;
}

.title {
    color: white;
    font-size: 16px;
    font-weight: 800;
}

@keyframes zzf {
    33% {
        transform: translateY(-10px);
    }

    75% {
        transform: translateY(5px);
    }

    100% {
        transform: translateY(0px);
    }
}

.card:hover .id {
    animation: zzf 0.5s 0.35s;
}

.card:hover .bottom {
    animation: zzf 0.5s 0.35s;
}

.card_main {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    flex-direction: column;
    backdrop-filter: blur(10px);
    transition: all 0.5s;
}

.card:hover .card_main {
    opacity: 1;
    transition: all 0.5s 0.5s;
}

.card_main img {
    border-radius: 50%;
}

.span {
    color: white;
    font-size: 25px;
    font-weight: 800;
    margin-top: 8px;
}
.span:hover{
    animation: text 0.5s alternate infinite;
}

.line {
    width: 0px;
    height: 3px;
    transition: all 0.5s linear;
}

.lineactive {
    width: 130px;
    background-color: #cce7f8;
    transition: all 0.5s 0.35s;
    animation: box 0.5s alternate infinite;
}

@keyframes box {
    0% {
        box-shadow: 0px 0px 10px lightblue, 0px 0px 20px lightblue, 0px 0px 30px lightblue,
            0px 0px 40px skyblue, 0px 0px 50px skyblue, 0px 0px 60px skyblue;
    }

    100% {
        box-shadow: 0px 0px 5px lightblue, 0px 0px 10px lightblue, 0px 0px 15px lightblue,
            0px 0px 20px skyblue, 0px 0px 25px skyblue, 0px 0px 30px skyblue;
    }
}

@keyframes text {
    0% {
        text-shadow: 0px 0px 10px lightblue, 0px 0px 20px lightblue, 0px 0px 30px lightblue,
            0px 0px 40px skyblue, 0px 0px 50px skyblue, 0px 0px 60px skyblue;
    }

    100% {
        text-shadow: 0px 0px 5px lightblue, 0px 0px 10px lightblue, 0px 0px 15px lightblue,
            0px 0px 20px skyblue, 0px 0px 25px skyblue, 0px 0px 30px skyblue;
    }
}
.fullvideo{
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
.videofull{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.mask_layer{
    position:fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color:black;
    opacity: 0.5;
    z-index: 5000;
}
.drawer{
    position:fixed;
    top: 0;
    right: -600px;
    width: 570px;
    height: 100%;
    z-index: 9999;
    background-color:white;
    transition: all 0.5s;
}
.drawerline{
    right: 0;
    transition: all 0.5s;
}
.drawer_header{
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
}
.wz{
    flex: 1;
    margin: 15px;
    font-size: 16px;
    font-weight: 800;
}
.button{
    flex: 1;
    display: flex;
    justify-content:flex-end;
}
.el-button{
    margin: 0px 15px 0px 0px;
}
.drawer_main{
    width: 100%;
    height: calc(100% - 47px);
}
.messagebox{
    position:fixed;
    width: 420px;
    height: 160px;
    background-color:white;
    right: 50%;
    top: 40%;
    border-radius:5px;
    z-index: 9999;
    opacity: 0;
    transition: all 0.5s;
    animation: messagedisappear 0.5s;
}
.message_header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}
.message_header span{
    font-size:18px;
    font-weight: 600;
    flex: 1;
    margin-left: 15px;
}
.icon-close{
    flex: 1;
    display:flex;
    justify-content:flex-end;
    margin-right: 15px;
    cursor: pointer;
}
.messageboxline{
    opacity: 1;
    transition: all 0.5s;
    animation: message 0.5s;
}
@keyframes message{
    0%{
        transform:translateY(30px)
    }
    100%{
        transform:translateY(0px);
    }
}
@keyframes messagedisappear{
    0%{
        transform:translateY(0px);
    }
    100%{
        transform: translateY(30px);
    }
}
.message_main{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}
.warn{
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color:#e6a23c;
    border-radius: 50%;
    margin: 15px;
}
.del{
    font-size: 18px;
    font-weight: 600;
}
.message_bottom{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>