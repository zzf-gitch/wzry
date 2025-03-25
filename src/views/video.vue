<template>
    <div class="video">
        <div class="header">
            <div class="zi">{{zzf}},{{time}}</div>
            <div class="time">{{times}}</div>
        </div>
    </div>
    <div class="fullimg">
        <img class="imgfull" :src="setting" alt="">
    </div>
</template>

<script setup>
import {ref,reactive, onMounted,defineEmits, defineProps} from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import bj from '@/assets/default_bg.jpg'
const store = useStore();
const router = useRouter();
const route = useRoute();
const setting=ref('')
const routeinfo=ref('')
routeinfo.value=JSON.parse(route.params.list)
console.log(routeinfo.value);
setting.value=bj
const zzf=ref('')
zzf.value=JSON.parse(sessionStorage.getItem("user")).name
const time=ref('')
const gettime=()=>{
    let date=new Date()
    let hour=date.getHours()
    let text=""
    if(hour>=0 && hour<=7){
        text="早上好"
        time.value=text
    }else if(hour>7 && hour<=11){
        text="上午好"
        time.value=text
    }else if(hour>11 && hour<=14){
        text="中午好"
        time.value=text
    }else if(hour>14 && hour<=19){
        text="下午好"
        time.value=text
    }else if(hour>19 && hour<=24){
        text="晚上好"
        time.value=text
    }
}
const times=ref('')
const gettimes=()=>{
    let date=new Date()
    let data={
        year:date.getFullYear(),
        mouth:date.getMonth()+1,
        day:date.getDate(),
        hour:date.getHours(),
        moutine:date.getMinutes(),
        second:date.getSeconds()
    }
    let newyear=data.year
    let newmouth=data.mouth>=10 ? data.mouth : "0" + data.mouth
    let newday=data.day>=10 ? data.day : "0" + data.day
    let newhour=data.hour>=10 ? data.hour : "0" + data.hour
    let newmoutine=data.moutine>=10 ? data.moutine : "0" + data.moutine
    let newsecond=data.second>=10 ? data.second : "0" + data.second
    let timme=newyear + "-" + newmouth + "-" + newday + "-" + newhour + "-" + newmoutine + "-" + newsecond
    times.value=timme
    setTimeout(() => {
        gettimes()
    },1000)
}
onMounted(()=>{
    gettime()
    gettimes()
})
</script>

<style scoped>
    .video{
        width: 100%;
        height: 100%;
    }
    .fullimg{
        position: absolute;
        inset:0;
        width: 100vw;
        height: 100vh;
        z-index:-1;
    }
    .imgfull{
        width: 100%;
        height: 100%;
        object-fit:cover;
    }
    .header{
        width: 100%;
        height: 6%;
        display: flex;
        align-items:center;
        justify-content: center;
    }
    .zi{
        color:whitesmoke;
        font-size: 14px;
    }
    .time{
        color:whitesmoke;
        margin-left:20px;
        font-size: 14px;
    }
</style>