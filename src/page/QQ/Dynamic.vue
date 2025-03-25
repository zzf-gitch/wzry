<template>
    <div class="Dynamic">
        <div class="header">
    <div class="lxr">
        <p>动态</p>
    </div>

      <div class="right">
          <i class="iconfont icon-bell"></i>
          <i class="iconfont icon-tx-liubianxing"></i>
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
</script>

<style scoped>
.Dynamic{
    width: 100%;
    height: 92%;
}
.header {
  width: 100%;
  height: 6%;
  background-image: linear-gradient(to right, #01d7fe, #01b3fe);
  position: fixed;
  display: flex;
}
.lxr{
    width: 92%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    color: white;;
}
.right{
    width: 8%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
}
.icon-bell{
    color: white;
    font-size: 20px;
}
.icon-tx-liubianxing{
    color: white;
    padding-right: 12px;
    font-size: 20px;
}
</style>