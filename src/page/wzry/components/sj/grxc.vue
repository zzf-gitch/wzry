<template>
  <div class="xc">
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="item in state.data" :key="item">
        <img :src="item.poster" />
      </el-carousel-item>
    </el-carousel>
    <div class="name">
      <p>王者荣耀个人相册</p>
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
} from "vue";
import {
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { Search } from "@element-plus/icons";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { getHeroInfocard } from "../../../../api/heromain/hero/transfer.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = reactive({
  data: [],
});
const getlist = async () => {
  await getHeroInfocard().then((res) => {
    console.log(res.data);
    state.data = res.data.herolist;
  });
};
onMounted(() => {
  getlist();
});
</script>

<style scoped>
.xc {
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel {
  width: 100%;
  height: 80%;
  margin-top: 50px;
}
.el-carousel /deep/ .el-carousel__container {
  width: 100% !important;
  height: 60% !important;
}
.el-carousel__item {
  width: 50%;
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.name {
  width: 100%;
  height: 20%;
  color: white;
  display: flex;
  justify-content: center;
}
.name p {
  color: #cce7f8;
  font-size: 2.5rem;
  animation: personalalbum 0.5s alternate infinite;
}
@keyframes personalalbum {
  from {
    text-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue,
      0 0 40px skyblue, 0 0 50px skyblue, 0 0 60px skyblue;
  }

  to {
    text-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue,
      0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
  }
}
</style>