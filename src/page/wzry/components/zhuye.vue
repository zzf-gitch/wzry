<template>
  <div class="body">
    <div class="head">
      <div class="ipt">
        <el-input v-model="input" :suffix-icon="Search" placeholder="快速搜索" clearable />
        <el-button class="search" :icon="Search" circle @click="searchData" />
      </div>
    </div>
    <div class="header">
      <p class="yx">英雄视频</p>
      <p class="jj">英雄简介</p>
    </div>
    <div class="main" v-for="(item, index) in state.slice(
      (currentPage - 1) * Pagesize,
      currentPage * Pagesize
    )" :key="index">
      <div class="left">
        <div class="left_main">
          <div class="video_main">
            <div class="video">
              <video autoplay loop class="fullvideo" controls :src="item.video" type="video/mp4">
              </video>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <p>英雄名字：{{ item.name }}</p>
        <p>英雄定位：{{ item.Position }}</p>
        <p>英雄特长：{{ item.Specialty }}</p>
        <p>英雄所属游戏：{{ item.game }}</p>
        <p>英雄编号：{{ item.id }}</p>
        <p>英雄价格：{{ item.money }}</p>
        <p>英雄上架时间：{{ item.time }}</p>
        <p>英雄称号：{{ item.title }}</p>
        <p>英雄身高：{{ item.stature }}</p>
        <p>英雄背景故事：{{ item.story }}</p>
      </div>
    </div>
  </div>

  <!-- 分页 -->
  <!-- @size-change="handleSizeChange" -->
  <el-pagination small background @current-change="handleCurrentChange" layout="prev, pager, next, total,jumper"
    :total="state.length" :current-page="currentPage" :page-size="Pagesize" class="mt-4" />
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
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { getHeroInfocard } from "../../../api/heromain/hero/transfer.js";
import { warningmessage, errormessage } from '@/api/message.js'
import { Search } from "@element-plus/icons";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = ref([]);
const input = ref('')
const getlist = async () => {
  await getHeroInfocard().then((res) => {
    console.log(res.data);
    state.value = res.data.herolist;
  });
};
const currentPage = ref(1);
const Pagesize = ref(1);
// const handleSizeChange = (valsize) => {
//   console.log(valsize);
//   Pagesize.value = valsize;
//   console.log(Pagesize.value);
// };
const handleCurrentChange = (valpage) => {
  console.log(valpage);
  currentPage.value = valpage;
  console.log(currentPage.value);
};
onMounted(() => {
  getlist();
  let str = "F5F6F7F8F9"
  let arr = str.split("")
  console.log(arr)
  for (let i = 0; i < arr.length / 2; i++) {
    arr[i] = arr[2 * i] += arr[2 * i + 1]
  }
  arr.length = arr.length / 2
  console.log(arr);
});
const list = async () => {
  await getlist();
  //前端过滤条件查询信息
  let list = state.value.filter(hero => hero.name.toLowerCase().includes(input.value.toLowerCase()));
  console.log(list);
  //二次赋值
  state.value = list;
  // list.filter((block,index) => index < currentPage.value * Pagesize.value && index >= Pagesize.value * (currentPage.value - 1));
  // state.value.length = list.length
  // console.log(state.value.length);
  if (state.value.length == false) {
    errormessage("英雄不存在")
  }
}
const searchData = () => {
  currentPage.value = 1
  list();
}
</script>

<style scoped="scoped">
.body {
  width: 100%;
  height: 100%;
}

.head {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0.625rem;
}

.el-input__inner {
  width: 180px;
}

.el-input {
  width: 180px;
  margin-right: 20px;
}

.search {
  margin-right: 20px;
}

.header {
  height: 2rem;
  margin-left: 20px;
  color: #2285e7;
  font-size: 20px;
  font-weight: bold;
  display: flex;
}

.yx {
  flex: 2.95;
}

.jj {
  flex: 1;
}

.main {
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
}

.left {
  width: 70%;
  height: 100%;
}

.left_main {
  width: 100%;
  height: 90%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}

.video_main {
  width: 98%;
  height: 95%;
}

.video {
  width: 100%;
  height: 100%;
}

.fullvideo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  width: 20%;
  height: 100%;
  margin-left: 5%;
  color: white;
  font-weight: 800;
}

.right p {
  padding-top: 10px;
}

.el-pagination {
  position: absolute;
  bottom: 60px;
  right: 60px;
}
</style>
