<template>
    <div class="animation">
        <div class="top" @mouseenter="mouseenter" @mouseleave="mouseleave">
            <img :src="active ? zzf : dj" alt="" :class="{line:active}">
        </div>
        <el-button type="primary" @click="submit">点击</el-button>
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
import dj from '../assets/迪迦.png'
import zzf from '../assets/zzf.jpg'
const router = useRouter();
const route = useRoute();
const store = useStore();
const active = ref(false)
const mouseenter = () =>{
    active.value = true
}
const mouseleave = () =>{
    active.value = false
}
const submit = () =>{
    window.open("https://gitee.com")
}
onMounted(()=>{
    // throw new Error("I need you mother")
})
</script>

<style scoped>
.animation{
    width: 100%;
    height: 100%;
}
.top{
    width: 150px;
    height: 150px;
    transition: all 0.5s;
    cursor: pointer;
}
.top img{
    width: 100%;
    height: 100%;
    transition: all 0.5s;
}
/* .top:hover{
    transition: all 0.5s 0.35s;
    transform: rotateY(180deg);
} */
.line{
    transition: all 0.5s 0.35s;
    transform: rotateY(180deg);
}
</style>