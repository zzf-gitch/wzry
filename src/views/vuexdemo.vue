<template>
    <div class="vuexdemo">
        <div class="menu" :class="{menuline:show}">

        </div>
        <el-button type="primary" @click="changeopen">{{show ? '关闭' : '打开'}}</el-button>
        <el-button type="primary" @click="add(figure)">增加</el-button>
        <el-button type="primary" @click="valuation(figure)">赋值</el-button>
        <span>{{time}}</span>
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
const router = useRouter();
const route = useRoute();
const store = useStore();
const figure=ref(20)
// 取vuex里面的数据
const show=computed(()=> store.state.vuexdemo.isshow)
const time=computed(()=> store.state.vuexdemo.number)
// 调用vuex里面的方法
const changeopen=()=>{
    store.commit('MenuOpenClose');
}
// vuex里面的commit payload传参
const add=(add)=>{
    console.log(add);
    store.commit('addchange',add)
}
// vuex里面的commit payload传参
const valuation=(num)=>{
    store.commit('valuationchange',num)
} 
</script>

<style scoped>
@media screen and (min-width:600px){
    .vuexdemo{
        width: 100%;
        height: 100%;
        background-color:white;
        display: flex;
    }
    .menu{
        width: 0px;
        height: 100%;
        background-color:#263b5a;
        transition: all 0.5s;
    }
    .menuline{
        width: 200px;
        transition: all 0.5s;
    }
}
@media screen and (min-width:1000px){
    .vuexdemo{
        width: 100%;
        height: 100%;
        background-color:#cce7f8;
        display: flex;
    }
    .menu{
        width: 0px;
        height: 100%;
        background-color:#263b5a;
        transition: all 0.5s;
    }
    .menuline{
        width: 200px;
        transition: all 0.5s;
    }
}
@media screen and (min-width:1400px){
    .vuexdemo{
        width: 100%;
        height: 100%;
        background-color:whitesmoke;
        display: flex;
    }
    .menu{
        width: 0px;
        height: 100%;
        background-color:#263b5a;
        transition: all 0.5s;
    }
    .menuline{
        width: 200px;
        transition: all 0.5s;
    }
}
</style>