<template>
    <div class="cardbox">
        <div class="card">
            <img class="img" src="../../public/hero/wzry/阿备.jpg" alt="">
            <div class="id">NO.88</div>
            <div class="bottom">
                <span class="name">刘备</span>
                <span class="title">仁德义枪</span>
            </div>
            <div class="card_main">
                <img src="../../public/hero/headimg/51.png" alt="">
                <span class="span" :style="style" @mouseenter="mouseenter" @mouseleave="mouseleave">查看详细</span>
                <div class="line" :class="{lineactive:lineactive}"></div>
            </div>
        </div>
    </div>

    <div class="fullvideo">
        <video :src="MV" class="videofull" autoplay loop muted playsinline type="video/mp4">
        </video>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import MV from '../assets/video/沐浴阳光.mp4'
const lineactive=ref(false)
const style=ref('')
const mouseenter=()=>{
    lineactive.value=true
    style.value='color:#cce7f8'
}
const mouseleave=()=>{
    lineactive.value=false
    style.value='color:white'
}
</script>

<style scoped>
.cardbox{
    width: 100%;
    height: 100%;
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
.card{
    width: 200px;
    height: 320px;
    box-shadow: 0px 5px 10px 5px black;
    margin: 0 auto;
    margin-top: 30px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    transition: all 0.35s 0.1s;
}
.img{
    position: absolute;
    min-width: 100%;
    max-height: 100%;
    pointer-events: none;
}
.card:hover{
    transform: translateY(-10px);
    background-color: black;
    box-shadow: 0px 5px 10px 10px black;
    transition: all 0.5s 0.2s;
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
    bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    flex-direction: column;
}
.name{
    color: white;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 5px;
    line-height: 1.5;
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
.card:hover .id{
    animation: zzf 0.5s 0.35s;
}
.card:hover .bottom{
    animation: zzf 0.5s 0.35s;
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
    transition: all 0.5s linear;
}
.card_main img{
    border-radius: 50%;
}
.card:hover .card_main{
    opacity: 1;
    transition: all 0.5s 0.5s;
}
.span{
    color: white;
    font-size: 25px;
    font-weight: 800;
    margin-top: 10px;
}
.span:hover{
    animation: text 0.5s alternate infinite;
}
.line{
    width: 0px;
    height: 3px;
    transition: all 0.5s linear;
}
.lineactive{
    width: 120px !important;
    background-color: skyblue;
    transition: all 0.5s 0.35s;
    animation: box 0.5s alternate infinite;
}
@keyframes box{
    from{
        box-shadow: 0px 0px 10px lightblue,0px 0px 20px lightblue,0px 0px 30px lightblue,
        0px 0px 40px skyblue,0px 0px 50px skyblue,0px 0px 60px skyblue;
    }
    to{
         box-shadow: 0px 0px 5px lightblue,0px 0px 10px lightblue,0px 0px 15px lightblue,
        0px 0px 20px skyblue,0px 0px 25px skyblue,0px 0px 30px skyblue;
    }
}
@keyframes text{
    from{
        text-shadow: 0px 0px 10px lightblue,0px 0px 20px lightblue,0px 0px 30px lightblue,
        0px 0px 40px skyblue,0px 0px 50px skyblue,0px 0px 60px skyblue;
    }
    to{
         text-shadow: 0px 0px 5px lightblue,0px 0px 10px lightblue,0px 0px 15px lightblue,
        0px 0px 20px skyblue,0px 0px 25px skyblue,0px 0px 30px skyblue;
    }
}
</style>