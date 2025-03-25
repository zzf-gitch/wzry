<template>
  <div class="box">
    <div class="header">
      <el-input v-model="input" :suffix-icon="Search" :placeholder="str" clearable class="input" />
      <el-button type="primary" @click="inquire">查询</el-button>
      <el-button type="warning" class="warning" @click="neww">新建</el-button>
    </div>
    <div class="main">
      <div class="box_main" v-for="(item, index) in state"
        :key="index">
        <img class="img" :src="item.cover" alt="">
        <div class="id"><span>NO.{{ item.id }}</span></div>
        <div class="bottom"><span>{{ item.name }}</span><span>{{ item.title }}</span></div>
        <div class="main_img">
          <img :src="item.headimg" alt="">
          <span class="span" @mouseenter="mouseenter" @mouseleave="mouseleave" :style="style"
            @click="upd(item, index)">编辑英雄</span>
          <div class="line" :class="{ lineactive: lineactive }"></div>
          <el-button type="danger" @click="del(item, index)">删除英雄</el-button>
        </div>
      </div>
    </div>
  </div>
  <child v-if="isshow" @close="close" :obj="obj" :obi="obi" :state="state" :msg="msg" />
</template>

<script setup>
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Search, CirclePlusFilled, Edit } from "@element-plus/icons";
import { ElInput } from 'element-plus'
import { getHeroInfocard } from "@/api/heromain/hero/transfer.js";
import child from '@/components/childcard.vue'
import { ElMessage, ElMessageBox } from "element-plus";
import {
  successmessage,
  infomessage,
  errormessage,
  warningmessage,
} from "@/api/message.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const str = ref('')
const inquire = () => {
  getchange()
}
const getchange = async () => {
  await getlist()
  let list = state.value.filter(hero => hero.name.toLowerCase().includes(input.value.toLowerCase()) || hero.id.toLowerCase().includes(input.value.toLowerCase()))
  state.value = list
  if (state.value.length == false) {
    errormessage("英雄不存在")
  }
}
// 打开新建
const neww = () => {
  isshow.value = true
  msg.value = "新建"
}
// 关闭子组件
const close = (e) => {
  isshow.value = e
}
// 打开修改
const upd = (item, index) => {
  console.log(item);
  msg.value = ''
  isshow.value = true
  obi.value = index
  obj.value = item
}
// 删除英雄
const del = (item, index) => {
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const i = state.value.indexOf(item)
      if (i > -1) {
        state.value.splice(index, 1)
      }
      successmessage("删除成功")
    })
    .catch(() => {
      infomessage("取消删除")
    });
}
const obj = ref({})
const obi = ref()
const msg = ref('')
const isshow = ref(false)
const state = ref([])
const input = ref('')
const chengestr = () => {
  let arr = ['VUE2', 'VUE3', 'UNIAPP', 'WATCH', 'IPHONE', '快速搜索', '英雄']
  let index = Math.floor(Math.random() * arr.length)
  str.value = arr[index]
  setTimeout(() => {
    chengestr()
  }, 1000)
}
const getlist = async () => {
  await getHeroInfocard().then(res => {
    console.log(res);
    state.value = res.data.herolist;
  })
}
const lineactive = ref(false)
const style = ref('')
const mouseenter = () => {
  lineactive.value = true
  style.value = 'color:#000a48'
}
const mouseleave = () => {
  lineactive.value = false
  style.value = 'color:white'
}
onMounted(() => {
  chengestr()
  getlist()
})
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-input {
  width: 180px !important;
  margin-right: 15px;
}

.warning {
  margin-right: 15px;
}

.main {
  width: 100%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
}

.box_main {
  width: 10%;
  height: 100%;
  margin-top: 1rem;
  margin-left: 15px;
  position: relative;
  word-break: break-all;
  word-wrap: break-word;
  box-shadow: 0px 5px 10px 5px black;
  cursor: pointer;
  transition: all 0.2s 0.2s;
}

.box_main:hover {
  transition: all 0.35s;
  box-shadow: 0 10px 30px 5px black;
  transform: translateY(-10px);
  background-color: black;
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
  margin: 15px;
  font-size: 16px;
  font-weight: 800;
}

.bottom {
  position: absolute;
  z-index: 1;
  color: white;
  bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  pointer-events: none;
  box-sizing: border-box;
}

@keyframes line {
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

.box_main:hover .id {
  animation: line 0.5s 0.2s;
}

.box_main:hover .bottom {
  animation: line 0.5s 0.2s;
}

.main_img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0;
  backdrop-filter: blur(10px);
  transition: all 0.5s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.main_img img {
  border-radius: 50%;
}

.box_main:hover .main_img {
  opacity: 1;
  transition: all 0.5s 0.25s
}

.span {
  color: white;
  font-size: 25px;
  font-weight: 800;
}

.line {
  width: 0px;
  height: 3px;
  transition: all 0.5s linear;
}

.lineactive {
  width: 150px !important;
  background-color: skyblue;
  transition: all 0.5s 0.35s;
}

.el-button {
  margin-top: 10px;
}
</style>