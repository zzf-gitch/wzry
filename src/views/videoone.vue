<template>
    <div class="videoone">
        <div class="header">
            <img class="img" :src="zzf.img" alt="">
            <div>{{name}}</div>
            <div>{{time}}</div>
            <div>{{times}}</div>
        </div>
    </div>
    <div class="fullvideo">
        <img class="videofull" :src="setting" alt="">
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
setting.value=bj
const name=ref('')
name.value=JSON.parse(sessionStorage.getItem("user")).name
const zzf=ref('')
// zzf.value=JSON.parse(route.params.list)
zzf.value=JSON.parse(sessionStorage.getItem("user"))
const time=ref('')
const gettime=()=>{
    let date=new Date()
    let hours=date.getHours()
    let text=""
    if(hours>=0 && hours<=7){
        text="早上好"
        time.value=text
    }else if(hours>7 && hours<=11){
        text="上午好"
        time.value=text
    }else if(hours>11 && hours<=14){
        text="中午好"
        time.value=text
    }else if(hours>14 && hours<=19){
        text="下午好"
        time.value=text
    }else if(hours>19 && hours<=24){
        text="晚上好"
        time.value=text
    }
}
const times=ref('')
const gettimes=()=>{
    let date=new Date()
    let data={
        year:date.getFullYear(),
        mouth:date.getMonth() + 1,
        day:date.getDate(),
        hours:date.getHours(),
        minute:date.getMinutes(),
        second:date.getSeconds()
    }
    let newyear=data.year
    let newmouth=data.month>=10 ? data.mouth : '0' + data.mouth
    let newday=data.day>=10 ? data.day : "0" + data.day
    let newhours=data.hours>10 ? data.hours : "0" + data.hours
    let newminute=data.minute>10 ? data.minute : "0" + data.minute
    let newsecond=data.second>10 ? data.second : "0" + data.second
    let timme=newyear +"-" + newmouth +"-" + newday + '-' + newhours + ":" + newminute + ':' + newsecond
    times.value=timme
    setTimeout(() => {
        gettimes()
    },1000)
}
onMounted(() => {
    gettime()
    gettimes()
})
</script>

<style scoped>
.videoone{
    width:100%;
    height:100%;
}
.fullvideo{
    position:absolute;
    inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
.videofull{
    width:100%;
    height: 100%;
    object-fit: cover;
}
.header{
    width: 100%;
    height: 6%;
    border: 1px solid red;
    display:flex;
    align-items: center;
    justify-content: center;
    color: white;
}
.img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
</style>