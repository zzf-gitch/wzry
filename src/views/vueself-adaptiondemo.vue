<template>
    <div class="vuexself">
        <div class="main">
            <!-- 拖拽排序 -->
            <Draggable v-model="tags" :list="state.slice((currentpage-1) * pagesize , currentpage * pagesize)"
                :animation="100" item-key="id" class="list-group" :forceFallback="true" ghost-class="ghost"
                @change="onMoveCallback" :move="getdata">
                <template #item="{ element }">
                    <div class="card">
                        <img class="img" :src="element.cover" alt="">
                        <div class="id">NO.{{ element.id }}</div>
                        <div class="bottom">
                            <span class="name">{{ element.name }}</span>
                            <span class="title">{{ element.title }}</span>
                        </div>
                        <div class="card_main">
                            <img :src="element.headimg" alt="">
                            <span class="span" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="go">查看详细</span>
                            <div class="line" :class="{ lineactive: active }"></div>
                        </div>
                    </div>
                </template>
            </Draggable>
        </div>
        <div class="right">
            <!-- vuex传参调用方法 -->
            <div class="box">
                <span>{{ number }}</span>
            </div>
            <el-button type="primary" @click="openchange">打开</el-button>
            <el-button type="primary" @click="add(num)">增加</el-button>
            <el-button type="primary" @click="reduction(num)">赋值</el-button>
        </div>
        <!-- 遮罩层 -->
        <div class="mask_layer" v-if="isshow"></div>
        <!-- 抽屉 -->
        <div class="drawer" :class="{ drawerline: drawerline }">
            <div class="drawer_header">
                <div class="wz">Preview word file!</div>
                <div class="buttons">
                    <el-button type="danger" @click="close">Close</el-button>
                </div>
            </div>
            <el-link :underline="false" type="primary" @click="fileuplong">点击上传</el-link>
            <input ref="files" id="file" v-show="form.active" type="file" @change="GetFile($event)" />
            <div class="list">
                <div class="file_li" v-for="(item, index) in form.fileList" :key="index">
                    <span>{{ item.name }}</span>
                    <img style="width:25px;height:25px;margin-left:50px;cursor: pointer;" src="@/assets/delete.png"
                        alt="" @click="del(item,index)">
                </div>
            </div>

            <el-upload ref="uploadRef" class="upload-demo" :http-request="handUpAnnex" :show-file-list="true"
                :on-remove="removeFiles" action="">
                <el-link :underline="false" type="primary">点击此处上传文件</el-link>
            </el-upload>
            <!-- 预览word文件 -->
            <div class="drawer_main">
                <div class="word" ref="word">
                    <input type="file" @change="priview" ref="file">
                </div>
            </div>
        </div>
        <!-- message消息盒子 -->
        <div class="message" :class="{ messageline: messageshow }">
            <div class="message_header">
                <span class="warncharacter">Warning</span>
                <i class="iconfont icon-close" @click="closemessage"></i>
            </div>
            <div class="message_main">
                <div class="warn"><span style="color:white;font-size:16px;font-weight:600">!</span></div>
                <div class="del">您确定要关闭吗?</div>
            </div>
            <div class="message_bottom">
                <el-button @click="cancel">取消</el-button>
                <el-button style="margin-right:20px" type="primary" @click="determine">确定</el-button>
            </div>
        </div>
        <!-- 背景视频 -->
        <div class="fullvideo">
            <video :src="MV" class="videofull" playsinline autoplay loop muted type="video/mp4"></video>
        </div>
    </div>

    <el-input v-model="input" :suffix-icon="Search" :placeholder="str" clearable class="input" />
    <el-button class="search" type="primary" @click="seachDate">搜索</el-button>
    <el-pagination small background layout="prev, pager, next" :total="state.length" class="mt-4"
        :current-page="currentpage" :page-size="pagesize" @current-change="currentchange" />
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
import Draggable from 'vuedraggable';
import { useRouter, useRoute } from "vue-router";
import MV from '@/assets/video/沐浴阳光.mp4'
import { getHeroInfocard } from "@/api/heromain/hero/transfer.js";
import { Search } from "@element-plus/icons";
import { infomessage, successmessage, errormessage } from "../api/message.js";
const router = useRouter();
const route = useRoute();
const store = useStore();
const currentpage = ref(1)
const pagesize = ref(8)
const str = ref('')
const form = reactive({
    active: false,
    fileList: []
})
const files = ref(null)
const del = (item,index) => {
    const i = form.fileList.indexOf(item)
    if(i > -1) {
        form.fileList.splice(index,1)
    }
}
const GetFile = (e) => {
    console.log(e);
    // const file = document.querySelector("input[type=file]").files[0];
    console.log(files.value);
    console.log(files.value.files);
    const file = files.value.files[0]
    console.log(file);
    form.fileList.push(file)
};
const fileuplong = () => {
    // let inp = document.getElementById("file");
    let inp = files.value
    inp.click();
};
const upLoadImgList = ref([])
const filesData = ref([])
const handUpAnnex = async (a) => { // 上传附件请求,覆盖原来的上传
    console.log(a);
    upLoadImgList.value.push(a.file)
    console.log(upLoadImgList.value);
    // await uploadImg(upLoadImgList).then(res => {
    //     if (res.message && res.message === 'success') {
    //         filesData.value = res.data; // data是上传完成后返回的信息
    //     }
    // }, err => {
    //     // console.log(err);
    // })
}

const removeFiles = (file) => {
    console.log(file);
    const idx = upLoadImgList.value.findIndex(item => item.name === file.name)
    console.log(idx)
    // filesData.value.splice(idx, 1)
    upLoadImgList.value.splice(idx, 1)
}
const currentchange = (val) => {
    currentpage.value = val;
}
// 预览word文件
const docx = require('docx-preview');
window.JSZip = require('jszip')
const word = ref(null);
const file = ref(null);
const priview = () => {
    docx.renderAsync(file.value.files[0], word.value)
}
// const currentpage=ref(1)
// const pagesize=ref(8)
// 从vuex里面取数据(modules)
const number = computed(() => store.state.vueself.n)
const isshow = computed(() => store.state.vueself.show)
const drawerline = computed(() => store.state.vueself.show)
const messageshow = computed(() => store.state.vueself.messageshow)
const num = ref(999)
const tags = ref('')
// 拖拽数组 :list
const state = ref([])
// 引用拖拽插件 方法
const onMoveCallback = (val) => {
    console.log('拖动前的索引 :' + val.moved.newIndex);
    console.log('拖动后的索引 :' + val.moved.oldIndex);
};
// 拖拽方法
const getdata = (val) => {
    console.log(val.draggedContext.element.id);
};
const active = ref(false);
const mouseenter = () => {
    active.value = true
}
const mouseleave = () => {
    active.value = false
}
// 打开抽屉
const openchange = () => {
    store.commit('open')
}
// 打开消息盒子
const close = () => {
    store.commit('close')
}
// 增加
const add = (add) => {
    store.commit('add', add)
}
// 重新赋值
const reduction = (nu) => {
    store.commit('reduction', nu)
}
// 关闭消息盒子
const closemessage = () => {
    store.commit('closes')
    infomessage("取消关闭")
}
// 关闭消息盒子
const cancel = () => {
    store.commit('closes')
    infomessage("取消关闭")
}
// 关闭抽屉和遮罩层以及消息盒子
const determine = () => {
    store.commit('closeall')
    successmessage("关闭成功")
}
const getlist = async () => {
    await getHeroInfocard().then(res => {
        console.log(res.data);
        state.value = res.data.herolist
    })
}
const change = () => {
    let arr = ['典韦', '刘备', '孙尚香', '高渐离', '司马懿', '李信', '橘右京', '赵云']
    let index = Math.floor(Math.random() * arr.length)
    str.value = arr[index]
    const timer = setTimeout(() => {
        change()
    }, 1000)
}
const input = ref('')
const seachDate = () => {
    currentpage.value = 1
    searchlist()
}
const searchlist = async () => {
    await getlist()
    let list = state.value.filter(val => val.name.toLowerCase().includes(input.value.toLowerCase()) || val.id.toLowerCase().includes(input.value.toLowerCase()))
    state.value = list
    if (state.value.length == false) {
        errormessage('英雄不存在')
    }
}
onMounted(() => {
    getlist()
    change()
})
const go = () => {
    router.push({ name: "setTimeout" })
}
</script>

<style scoped>
.vuexself {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
}

.main {
    width: 100%;
    height: 30%;
}

.list-group {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 200px;
    height: 320px;
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    box-shadow: 0px 5px 10px 5px black;
    margin: 15px;
    transition: all 0.5s 0.05s;
}

.img {
    position: absolute;
    width: 100%;
    height: 100%;
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
    background-color: black;
    box-shadow: 0px 5px 10px 10px black;
    transition: all 0.5s 0.2s;
}

.card:hover .id {
    animation: zzf 0.5s 0.35s;
}

.card:hover .bottom {
    animation: zzf 0.5s 0.35s;
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

.card_main {
    position: absolute;
    z-index: 2;
    inset: 0;
    width: 100%;
    height: 100%;
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
    color: white;
    font-size: 25px;
    font-weight: 800;
    margin-top: 8px;
}

.span:hover {
    color: #cce7f8;
    animation: txt 0.5s alternate infinite;
}

.line {
    width: 0px;
    height: 3px;
    transition: all 0.5s linear;
}

.lineactive {
    width: 130px;
    background-color: #cce7f8;
    animation: box 0.5s alternate infinite;
    transition: all 0.5s 0.35s;
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

@keyframes txt {
    0% {
        text-shadow: 0px 0px 10px lightblue, 0px 0px 20px lightblue, 0px 0px 30px lightblue,
            0px 0px 40px skyblue, 0px 0px 50px skyblue, 0px 0px 60px skyblue;
    }

    100% {
        text-shadow: 0px 0px 5px lightblue, 0px 0px 10px lightblue, 0px 0px 15px lightblue,
            0px 0px 20px skyblue, 0px 0px 25px skyblue, 0px 0px 30px skyblue;
    }
}

.right {
    position: absolute;
    display: flex;
    right: 30px;
    bottom: 30px;
}

.box {
    width: 60px;
    height: 32px;
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    border-radius: 5px;
}

.box span {
    color: white;
    font-size: 16px;
    font-weight: 600;
}

.mask_layer {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 5000;
    background-color: black;
    opacity: 0.5;
}

.drawer {
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: white;
    left: -1000px;
    width: 800px;
    height: 100%;
    transition: all 0.5s;
}

.drawerline {
    left: 0;
    transition: all 0.5s;
}

.drawer_header {
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
}

.wz {
    flex: 1;
    font-size: 16px;
    font-weight: 800;
    margin: 15px;
}

.buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin: 15px;
}

.drawer_main {
    width: 100%;
    height: 90%;
    overflow: hidden;
    overflow-y: scroll;
}

.word {
    width: 100%;
    height: calc(100% - 47px);
    display: flex;
    justify-content: center;
}

.fullvideo {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
}

.videofull {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.message {
    width: 420px;
    height: 160px;
    background-color: white;
    z-index: 9999;
    position: fixed;
    left: 50%;
    top: 40%;
    border-radius: 8px;
    transition: all 0.5s;
    opacity: 0;
    animation: bottom 0.5s;
}

.messageline {
    opacity: 1;
    transition: all 0.5s;
    animation: top 0.5s;
}

@keyframes top {
    0% {
        transform: translateY(30px)
    }

    100% {
        transform: translateY(0px)
    }
}

@keyframes bottom {
    0% {
        transform: translateY(0px)
    }

    100% {
        transform: translateY(30px)
    }
}

.message_header {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}

.warncharacter {
    flex: 1;
    margin: 15px;
    font-size: 16px;
    font-weight: 600;
}

.icon-close {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin: 15px;
    cursor: pointer;
}

.message_main {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}

.message_bottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
}

.warn {
    width: 20px;
    height: 20px;
    background-color: #e6a23c;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
}

.el-pagination {
    position: absolute;
    bottom: 30px;
    right: 320px;
}

.el-input {
    position: absolute;
    width: 180px;
    bottom: 30px;
    right: 570px;
}

.search {
    position: absolute;
    bottom: 30px;
    right: 500px;
}
.list{
  width:100%;
  height:auto;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.file_li{
  width:100%;
  margin-top:20px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>