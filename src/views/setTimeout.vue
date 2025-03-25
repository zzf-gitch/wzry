<template>
    <div class="setTimeout">
        <div class="box">
            <div class="box_left">
                <div :class="index==currentindex ? 'boxinfos' : 'boxinfo'" v-for="(item,index) in state.data" :key="index" @mouseenter="mouseenter(item,index)" @mouseleave="mouseleave">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="box_right" :class="{line:lineactive}">
                    <img class="img" :src="img" alt="">
                    <span class="text">{{names}}</span>
            </div>
        </div>

        <!-- 倒计时 -->
        <div class="countdown">
            <div class="timmer">
                <el-button type="primary" @click="timmer">倒计数字</el-button>
                <span style="margin-left: 10px">{{number}}</span>
            </div>
            <div class="timmers">
                <el-button type="primary" @click="timmers">倒计时</el-button>
                <span style="margin-left: 10px;">{{viewtime}}</span>
            </div>
        </div>

        <div class="fullvideo">
            <video class="videofull" :src="MV" playsinline autoplay loop muted type="video/mp4">

            </video>
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
const currentindex=ref(null)
const lineactive=ref(false)
const state=reactive({
    data:[
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
        }
    ]
})
const names=ref('')
const img=ref(null)
const mouseenter=(item,index)=>{
    names.value=item.name
    img.value=item.img
    currentindex.value=index
    lineactive.value=true
}
const mouseleave=()=>{
    currentindex.value=null
    lineactive.value=false
    names.value=''
    img.value=null
}
// 倒计数字
const number=ref(20)
// 控制倒计数字的函数
const timmer=()=>{
    const timer = setTimeout(()=>{
        if(number.value > 0){
            number.value--;
            timmer();
        }else{
            clearTimeout(timer);
            warningmessage("倒计数字结束")
        }
    },1000)
}
// 视图层的倒计时
const viewtime=ref()
// 数据蹭操作的倒计时
const maxtime=ref(300)
// 控制倒计时的函数
const timmers=()=>{
    const timer = setTimeout(()=>{
        // 小时
        // let hours = Math.floor(maxtime.value / 3600) >= 10 ? Math.floor(maxtime.value / 3600) : '0' + Math.floor(maxtime.value / 3600)
        // 分
        let moutine = Math.floor(maxtime.value / 60) >= 10 ? Math.floor(maxtime.value / 60) : '0' + Math.floor(maxtime.value / 60);
        // 秒
        let seconds = Math.floor(maxtime.value % 60) >= 10 ? Math.floor(maxtime.value % 60) : '0' + Math.floor(maxtime.value % 60);
        // 时:分:秒
        // let MS = hours + ':' + moutine + ':' + seconds
        // 分:秒
        let MS = moutine + ':' + seconds
        viewtime.value = MS
        if(maxtime.value > 0){
            maxtime.value--
            timmers()
        }else{
            clearTimeout(timer)
            warningmessage("倒计时结束")
        }
    },1000)
}
</script>

<style scoped lang="scss">
.setTimeout {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .countdown{
        width: auto;
        height: auto;
        .timmer{
            margin: 15px;
            color: white;
            font-size: 16px;
            font-weight: 600;
        }
        .timmers{
            margin: 15px;
            color: white;
            font-size: 16px;
            font-weight: 600;
        }
    }
    .box{
        width: 500px;
        height: 200px;
        background-color: black;
        display: flex;
        .box_left{
            width: 150px;
            height: 100%;
            .boxinfo{
                width: 100%;
                height: 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                background-color: pink;
            }
            .boxinfos{
                width: 100%;
                height: 25%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                cursor: pointer;
                background-color:#5b93b3;
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
            .text{
                color: white;
                position: absolute;
                z-index: 1;
                font-size: 50px;
                font-weight: 800;
            }
        }
        .line{
            transition: all 0.5s;
            background-color: yellowgreen;
        }
    }
    .fullvideo{
        position: absolute;
        inset: 0;
        z-index: -1;
        width: 100vw;
        height: 100vh;
        .videofull{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
</style>