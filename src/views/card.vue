<template>
    <div class="card">
       <div class="card_top">
            <div class="card_box">
                <img class="img" :src="cardimg" alt="">
                <div class="id">NO.88</div>
                <div class="bottom">
                    <span class="name">典韦</span>
                    <span class="title">狂战士</span>
                </div>
                <div class="card_main">
                    <img :src="DW" alt="">
                    <span class="span" :style="style" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="open">查看详细</span>
                    <div class="line" :class="{lineactive:lineactive}"></div>
                </div>
            </div>
       </div>

        <div class="cover" v-if="show"></div>
        <div class="messagebox" :class="{message:message}">
            <div class="header">
                <span>Warning</span>
                <i class="iconfont icon-close" @click="closemessage"></i>
            </div>
            <div class="main">
                <div class="warn"><span style="color:white;font-size: 18px;font-weight: 600;">!</span></div>
                <div class="del">您确定要删除吗?</div>
            </div>
            <div class="following">
                <el-button @click="no">取消</el-button>
                <el-button type="primary" @click="yes">确定</el-button>
            </div>
        </div>
        <div class="drawer" :class="{draweractive:draweractive}">
            <div class="cover_header">
                <div class="hero">Added basic hero information!</div>
                <div class="button"><el-button type="danger" @click="close">Close</el-button></div>
            </div>
            <div class="cover_main">

            </div>
        </div>
       <div class="fullvideo">
            <video class="videofull" :src="MV" playsinline autoplay loop muted type="video/mp4"></video>
       </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import MV from '@/assets/video/沐浴阳光.mp4'
import cardimg from '../../public/hero/wzry/阿韦.jpg'
import DW from '../../public/hero/headimg/23.png'
import {successmessage, warningmessage, errormessage,infomessage} from "@/api/message.js"
import { ElMessageBox } from "element-plus";
//控制下划线显示和隐藏
const lineactive=ref(false)
//控制查看详细的文字颜色
const style=ref('')
//控制遮罩层的显示和隐藏
const show=ref(false)
//控制抽屉的显示和隐藏
const draweractive=ref(false)
//控制消息盒子的显示和隐藏
const message=ref(false)
//鼠标移入
const mouseenter=()=>{
    lineactive.value=true
    style.value="color:#cce7f8"
}
//鼠标移出
const mouseleave=()=>{
    lineactive.value=false
    style.value="color:white"
}
//打开抽屉并且遮罩层显示
const open=()=>{
    draweractive.value=true
    show.value=true
}
//打开消息盒子
const close=()=>{
    message.value=true
}
//关闭消息盒子
const closemessage=()=>{
    message.value=false
    infomessage("取消关闭")
}
//关闭消息盒子和抽屉以及遮罩层
const yes=()=>{
    message.value=false
    draweractive.value=false
    show.value=false
    successmessage("关闭成功")
}
//关闭消息盒子 
const no=()=>{
    message.value=false
    infomessage("取消关闭")
}
</script>

<style scoped>
.card{
    width: 100%;
    height: 100%;
}
.card_top{
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.card_box{
    width: 200px;
    height: 320px;
    position: relative;
    cursor: pointer;
    box-shadow: 0px 5px 10px 5px black;
    box-sizing: border-box;
    transition: all 0.5s 0.05s;
}
.card_box:hover{
    transform: translateY(-10px);
    box-shadow: 0px 5px 10px 10px black;
    background-color:black;
    transition: all 0.5s 0.25s
}
.img{
    position: absolute;
    min-width: 100%;
    max-height: 100%;
    pointer-events: none;
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
.id{
    position: absolute;
    z-index: 1;
    color: white;
    font-size: 16px;
    font-weight: 800;
    margin: 15px;
}
.bottom{
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    bottom: 5px;
}
.name{
    color: white;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 5px;
    line-height: 1;
}
.title{
    color: white;
    font-size: 16px;
    font-weight: 800;
}
@keyframes zzf{
    33%{
        transform: translateY(-10px);
    }
    75%{
        transform: translateY(5px);
    }
    100%{
        transform: translateY(0px);
    }
}
.card_box:hover .id{
    animation: zzf 0.5s 0.25s
}
.card_box:hover .bottom{
    animation: zzf 0.5s 0.25s;
}
.card_main{
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
    transition: all 0.25s;
}
.card_main img{
    border-radius: 50%;
}
.card_box:hover .card_main{
    opacity: 1;
    transition: all 0.5s 0.5s
}
.span{
    color: white;
    font-size: 25px;
    font-weight: 800;
    margin-top: 8px;
}
.span:hover{
    animation: text 0.5s alternate infinite
}
.line{
    width: 0px;
    height: 3px;
    transition: all 0.5s linear;
}
.lineactive{
    width: 130px !important;
    background-color: #cce7f8;
    transition: all 0.5s 0.25s;
    animation: box 0.5s alternate infinite;
}
@keyframes box{
    0%{
        box-shadow: 0px 0px 10px lightblue,0px 0px 20px lightblue,0px 0px 30px lightblue,
        0px 0px 40px skyblue,0px 0px 50px skyblue,0px 0px 60px skyblue;
    }
    100%{
        box-shadow: 0px 0px 5px lightblue,0px 0px 10px lightblue,0px 0px 15px lightblue,
        0px 0px 20px skyblue,0px 0px 25px skyblue,0px 0px 30px skyblue;
    }
}
@keyframes text{
    0%{
        text-shadow: 0px 0px 10px lightblue,0px 0px 20px lightblue,0px 0px 30px lightblue,
        0px 0px 40px skyblue,0px 0px 50px skyblue,0px 0px 60px skyblue;
    }
    100%{
        text-shadow: 0px 0px 5px lightblue,0px 0px 10px lightblue,0px 0px 15px lightblue,
        0px 0px 20px skyblue,0px 0px 25px skyblue,0px 0px 30px skyblue;
    }
}
.cover{
    position:fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 5555;
    background-color:black;
    opacity: 0.5;
}
.drawer{
    width: 570px;
    background-color: white;
    height: 100%;
    z-index: 999999;
    top: 0;
    right: -600px;
    position: fixed;
    transition: all 0.5s;
}
.draweractive{
    right: 0;
    transition: all 0.5s;
}
.el-button{
    margin: 15px 15px 0px 0px;
}
.cover_header{
    width: 100%;
    height: 47px;
    display: flex;
    justify-content: flex-end;
}
.cover_main{
    width: 100%;
    height: calc(100% - 47px);
}
.hero{
    flex:1;
    display: flex;
    align-items: center;
    margin-left: 15px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 5px;
}
.button{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.messagebox{
    width: 420px;
    height: 160px;
    background-color:white;
    z-index: 999999;
    position:fixed;
    bottom:45%;
    right: 50%;
    border-radius: 5px;
    opacity: 0;
    transition: all 0.5s;
}
.message{
    opacity: 1;
    transition: all 0.5s;
}
.header{
    width:100%;
    height: 50px;
    display: flex;
    align-items: center;
}
.header span{
    font-size: 20px;
    font-weight: 800;
    margin: 15px;
    flex: 9;
}
.icon-close{
    cursor: pointer;
    flex: 1;
}
.main{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
}
.warn{
    width: 20px;
    height: 20px;
    background-color: #e6a23c;
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
    padding: 3px;
}
.del{
    font-size: 16px;
    font-weight: 600;
}
.following{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: start;
    justify-content: flex-end;
}
</style>