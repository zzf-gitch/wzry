<template>
    <div class="imgdemo">
        <div class="box">
            <div class="box_left">
                <div :class="currentIndex==index ? 'box_infe' : 'box_info'" v-for="(item,index) in state" :key="index" @mouseenter="mouseenter(item,index)" @mouseleave="mouseleave">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="box_right" :class="{lineactive:line}">
                <img class="img" :src="imgs" alt="">
                <span class="names">{{names}}</span>
            </div>
        </div>


        <div class="time">
            <div class="timeone">
                <el-button type="primary" @click="time">倒计数字</el-button>
                <span>:{{timem}}</span>
            </div>
            <div class="timetwo">
                <el-button type="primary" @click="times">倒计时</el-button>
                <span>:{{viewtext}}</span>
            </div>
        </div>

        <div class="fullvideo">
            <video class="videofull" :src="MV" playsinline autoplay loop muted type="video/mp4"></video>
        </div>
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
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import {warningmessage} from "@/api/message.js"
import MV from '@/assets/video/沐浴阳光.mp4'
import iphone from '@/assets/手机.png'
import watchs from '@/assets/手表.png'
import computer from '@/assets/电脑.png'
import dijia from '@/assets/迪迦.png'
const router = useRouter();
const route = useRoute();
const store = useStore();
const state=ref([
    {
        name:"手机",
        img:iphone
    },
    {
        name:"手表",
        img:watchs
    },
    {
        name:"电脑",
        img:computer
    },
    {
        name:"迪迦",
        img:dijia
    },
])
const currentIndex=ref(null)
const imgs=ref(null)
const names=ref(null)
const line=ref(false)
const mouseenter=(item,index)=>{
    currentIndex.value=index
    imgs.value=item.img
    names.value=item.name
    line.value=true
}
const mouseleave=()=>{
    currentIndex.value=null
    imgs.value=null
    names.value=null
    line.value=false
}
const timem=ref(20)
const time=()=>{
    const timer = setTimeout(()=>{
        if(timem.value > 0){
            timem.value--
            time()
        }else{
            clearTimeout(timer)
            warningmessage("倒计数字结束")
        }
    },1000)
}
// 视图层显示的倒计时
const viewtext=ref()
// 数据层操作的倒计时
const maxtime=ref(300)
const times=()=>{
    const timer = setTimeout(()=>{
        // 分
        let minutes = Math.floor(maxtime.value / 60) >= 10 ? Math.floor(maxtime.value / 60) : '0' + Math.floor(maxtime.value / 60)
        // 秒
        let seconds = Math.floor(maxtime.value % 60) >= 10 ? Math.floor(maxtime.value % 60) : '0' + Math.floor(maxtime.value % 60)
        // 分:秒
        let MS = minutes + ':' + seconds
        viewtext.value = MS
        if(maxtime.value > 0){
            maxtime.value--
            times()
        }else{
            clearTimeout(timer)
            warningmessage("倒计时结束")
        }
    },1000)
}
</script>

<style lang="scss" scoped>
.imgdemo {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .box{
        width: 500px;
        height: 200px;
        background-color: white;
        display: flex;
        .box_left{
            width: 150px;
            height: 100%;
            background-color: pink;
            .box_info{
                width: 100%;
                height: 25%;
                background-color:pink;
                transition: all 0.5s;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
            }
            .box_infe{
                width: 100%;
                height: 25%;
                background-color: #6e5369;
                transition: all 0.5s;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
            }
        }
        .box_right{
            width: 350px;
            height: 100%;
            background-color: skyblue;
            transition: all 0.5s;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            .img{
                position: absolute;
                min-width: 100%;
                max-height: 100%;
                pointer-events: none;
            }
            .names{
                position: absolute;
                z-index: 1;
                color: white;
                font-size: 50px;
                font-weight: 600;
            }
        }
        .lineactive{
            background-color: yellowgreen;
            transition: all 0.5s;
        }
    }
    .time{
        width: 300px;
        height: 100px;
        margin-top: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: white;
        .timetwo{
            margin: 20px;
        }
    }
    .fullvideo{
        position: absolute;
        inset: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        .videofull{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>