<template>
    <div class="Contact">
        <div class="header">
      <div class="zzf">
        <img class="img" :src="zzf" />
      </div>
      <div class="name">
        <div class="xian">
          <div class="green"></div>
        </div>
      </div>

    <div class="lxr">
        <p>联系人</p>
    </div>

      <div class="right">
          <i class="iconfont icon-tianjiahaoyou"></i>
      </div>
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
import { useStore } from "vuex";
import { Search } from "@element-plus/icons";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const store = useStore();
const router = useRouter();
const route = useRoute();
const zzf = ref("");
zzf.value = JSON.parse(sessionStorage.getItem("Loginzzf")).img;
console.log(zzf.value);
</script>

<style scoped>
.Contact{
    width:100%;
    height:100%;
}
.header {
  width: 100%;
  height: 6%;
  background-image: linear-gradient(to right, #01d7fe, #01b3fe);
  position: fixed;
  display: flex;
}
.zzf {
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}
.img {
  width: 80%;
  height: 60%;
  border-radius: 50%;
}
.name {
  width: 3%;
  height: 100%;
  color: white;
}
.green {
  width: 10px;
  height: 10px;
  background-color: #20e488;
  border-radius: 50%;
  margin-top: 30px;
}
.lxr{
    width: 70%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    color: white;;
}
.right{
    width: 17%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
}
.icon-tianjiahaoyou{
    font-size: 20px;
    color: white;
}
</style>