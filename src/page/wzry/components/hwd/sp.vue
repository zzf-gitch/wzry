<template>
  <div class="sp">
    <div class="main_bottom_box">
      <img class="img" src="../../../../../public/hero/headLOLimg/黑夜使者.jpg" alt="">
      <div class="id">NO.88</div>
      <div class="bottom">
        <span class="name">亚索</span>
        <span class="title">黑夜使者</span>
      </div>
      <div class="main_hero">
        <img src="../../../../../public/hero/headLOLimg/亚索.jpg" alt="">
        <span class="span" :style="style" @mouseenter="mouseenter" @mouseleave="mouseleave">查看详细</span>
        <div class="line" :class="{lineactive:lineactive}"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
const lineactive=ref(false);
const style=ref('')
const mouseenter=()=>{
  lineactive.value=true;
  style.value='color: #294163'
}
const mouseleave=()=>{
  lineactive.value=false
  style.value='color: white'
}
</script>

<style scoped>
.sp {
  width: 100%;
  height: 100%;
}
.main_bottom_box{
  width: 200px;
  height: 320px;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
  cursor: pointer;
  box-shadow: 0px 5px 10px 5px black;
  transition: all 0.35s linear;
  box-sizing: border-box;
}
.main_bottom_box:hover{
  transform: translateY(-10px);
  background-color:black;
  box-shadow: 0px 5px 10px 10px black;
  transition: all 0.5s 0.25s;
}
.main_bottom_box:hover .id{
  animation: zzf 0.5s 0.2s;
}
.main_bottom_box:hover .bottom{
  animation: zzf 0.5s 0.2s;
}
.img{
  position: absolute;
  min-width: 100%;
  max-height: 100%;
  pointer-events: none;
}
.id{
  position: absolute;
  z-index: 1;
  color: white;
  margin: 15px;
  font-size: 16px;
  font-weight: 800;
}
.bottom{
  position: absolute;
  z-index: 1;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.name{
  color: white;
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 5px;
  line-height: 1.5;
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
.title{
  color: white;
  font-size: 16px;
  font-weight: 800;
}
.main_hero{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  backdrop-filter: blur(10px);
  opacity: 0;
  transition: all 0.5s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.main_hero img{
  border-radius: 50%;
  width: 100px;
  height: 100px;
}
.main_bottom_box:hover .main_hero{
  opacity: 1;
  transition: all 0.5s 0.5s;
}
.span{
  color: white;
  font-size: 25px;
  font-weight: 800;
  margin-top: 5px;
}
.line{
  width: 0px;
  height: 3px;
  transition: all 0.5s linear;
}
.lineactive{
  width: 150px !important;
  background-color:skyblue;
  transition: all 0.5s 0.25s;
}
</style>