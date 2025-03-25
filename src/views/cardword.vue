<template>
    <div class="cardword">
        <div class="curlist">
            <!-- 卡片特效 -->
            <div class="card">
                <img class="img" :src="cardimg" alt="">
                <div class="id">NO.99</div>
                <div class="bottom">
                    <div class="name">马超</div>
                    <div class="title">冷晖之枪</div>
                </div>
                <div class="card_main">
                    <img :src="MC" alt="" @click="govuexdemo">
                    <span class="span" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="open">查看详细</span>
                    <div class="line" :class="{ lineactive: lineactive }"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- 遮罩层 -->
    <div class="mask_layer" v-if="MaskLayer"></div>
    <!-- 抽屉 -->
    <div class="drawer" :class="{drawerlinear:drawerlinear}">
        <div class="drawer_header">
            <div class="wz">Preview word file!</div>
            <div class="button">
                <el-button type="danger" @click="close">Close</el-button>
            </div>
        </div>
        <!-- 预览word文件 -->
        <div class="drawer_main">
            <div class="words" ref="word">
                <input type="file" @change="priview" ref="file">
            </div>
        </div>
    </div>
    <!-- 消息盒子 -->
    <div class="messagebox" :class="{messageboxline:messageboxline}">
        <div class="message_header">
            <span class="warncharacter">Warning</span>
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
        <video :src="MV" class="videofull" autoplay playsinline muted loop type="video/mp4"></video>
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
    watchEffect
} from "vue";
import MV from '@/assets/video/沐浴阳光.mp4'
import cardimg from '../../public/hero/wzry/阿马.png'
import MC from '../../public/hero/headimg/95.png'
import { successmessage, warningmessage, errormessage, infomessage } from '@/api/message.js'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
//控制下划线的显示和隐藏
const lineactive = ref(false)
//控制文字的颜色
const style = ref('')
//鼠标移入
const mouseenter = () => {
    lineactive.value = true
}
//鼠标移出
const mouseleave = () => {
    lineactive.value = false
}
//控制遮罩层的显示和隐藏
const MaskLayer=ref(false)
//控制抽屉的显示和隐藏
const drawerlinear=ref(false)
//预览word文件
const docx=require('docx-preview')
window.JSZip=require('jszip')
const word=ref(null);
const file=ref(null);
const priview=()=>{
    docx.renderAsync(file.value.files[0],word.value)
}
//控制打开遮罩层和抽屉
const open=()=>{
    MaskLayer.value=true
    drawerlinear.value=true
}
// 控制消息盒子的显示和隐藏
const messageboxline=ref(false)
// 打开消息盒子
const close=()=>{
    messageboxline.value=true
}
// 关闭消息盒子
const closemessage=()=>{
    messageboxline.value=false
    infomessage("取消关闭")
}
// 关闭消息盒子
const cancel=()=>{
    messageboxline.value=false
    infomessage("取消关闭")
}
// 关闭消息盒子和抽屉以及遮罩层
const determine=()=>{
    MaskLayer.value=false
    drawerlinear.value=false
    messageboxline.value=false
    successmessage("关闭成功")
}
// 去vuexdemo页面
const govuexdemo=()=>{
    router.push({name:'vuexdemo'})
}
</script>

<style scoped>
.cardword {
    width: 100%;
    height: 100%;
}

.curlist {
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
    cursor: pointer;
    box-sizing: border-box;
    box-shadow: 0px 5px 10px 5px black;
    transition: all 0.5s 0.05s;
}

.img {
    position: absolute;
    min-width: 100%;
    max-height: 100%;
    pointer-events: none;
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
    width: 100%;
    bottom: 5px;
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

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0px 5px 10px 10px black;
    background-color: black;
    transition: all 0.5s 0.2s;
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
    flex-direction: column;
    backdrop-filter: blur(10px);
    opacity: 0;
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
    margin-top: 15px;
    color: white;
    font-size: 25px;
    font-weight: 800;
}

.line {
    width: 0px;
    height: 3px;
    transition: all 0.5s linear;
}

.lineactive {
    width: 130px !important;
    background-color: #cce7f8;
    animation: box 0.5s alternate infinite;
    transition: all 0.5s 0.35s;
}

@keyframes zzf {
    33% {
        transform: translateY(-10px);
    }

    75% {
        transform: translateY(5px);
    }

    100% {
        transform: translateY(0px)
    }
}

.card:hover .id {
    animation: zzf 0.5s 0.35s;
}

.card:hover .bottom {
    animation: zzf 0.5s 0.35s;
}

.span:hover {
    color: #cce7f8;
    animation: text 0.5s alternate infinite;
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

.fullvideo {
    width: 100vw;
    height: 100vh;
    position: absolute;
    inset: 0;
    z-index: -1;
}

.videofull {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.mask_layer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 5000;
    opacity: 0.5;
}

.drawer {
    width: 800px;
    height: 100%;
    position: fixed;
    top: 0;
    right: -1000px;
    background-color: white;
    z-index: 9999;
    transition: all 0.5s;
}
.drawerlinear{
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
    font-weight: 600;
}
.button{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin: 15px;
}
.drawer_main{
    width: 100%;
    height: calc(100% - 47px);
    overflow: hidden;
    overflow-y: scroll;
}
.words{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
.messagebox{
    width: 420px;
    height: 160px;
    background-color:white;
    z-index: 9999;
    position: fixed;
    top: 40%;
    right: 50%;
    border-radius: 6px;
    opacity: 0;
    animation: unactive 0.5s;
    transition: all 0.5s;
}
.messageboxline{
    opacity: 1;
    transition: all 0.5s;
    animation: active 0.5s;
}
.message_header{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}
.warncharacter{
    flex: 1;
    margin: 20px;
    font-size: 18px;
    font-weight: 800;
}
.icon-close{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin: 20px;
    cursor: pointer;
}
.message_main{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}
.warn{
    width: 20px;
    height: 20px;
    background-color:#e6a23c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
}
.del{
    font-size: 16px;
    font-weight: 800;
}
.message_bottom{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 10px;
}
@keyframes active{
    0%{
        transform: translateY(30px)
    }
    100%{
        transform: translateY(0px)
    }
}
@keyframes unactive{
    0%{
        transform: translateY(0px);
    }
    100%{
        transform: translateY(30px)
    }
}
</style>