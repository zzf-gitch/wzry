<template>
  <div class="homepage">
    <div class="header">
      <div class="zzf">
        <img class="img" :src="zzf" />
      </div>
      <div class="name">
        <p class="p">{{ name }}</p>
        <div class="xian">
          <div class="green"></div>
          <p>{{ Wifi }}<i class="iconfont icon-youjiantou"></i></p>
        </div>
      </div>

      <div class="right">
        <i class="iconfont icon-renxiang"></i>
        <el-dropdown trigger="click">
          <i class="iconfont icon-jiahao"></i>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="iconfont icon-jiahao-"
                >创建群聊</el-dropdown-item
              >
              <el-dropdown-item class="iconfont icon-tianjiahaoyou">
                加好友/群
              </el-dropdown-item>
              <el-dropdown-item class="iconfont icon-saoyisao"
                >扫一扫</el-dropdown-item
              >
              <el-dropdown-item class="iconfont icon-send-line"
                >面对面快传</el-dropdown-item
              >
              <el-dropdown-item class="iconfont icon-shoufukuan-1"
                >收付款</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="main">
      <!-- 下拉刷新 -->
      <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <!--上拉加载 -->
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 内容区  -->
          <div class="search">
            <el-input
              type="text"
              clearable
              v-model="search"
              :suffix-icon="Search"
              placeholder="搜索"
            />
          </div>

          <div
            class="messagebox"
            v-for="(item, index) in state.data"
            :key="index"
          >
            <div class="message">
              <div class="name_img"><img :src="item.img" /></div>
              <div class="messsage_name">
                <p class="names">{{ item.name }}</p>
                <p class="description">{{ item.description }}</p>
              </div>
              <div class="message_time">
                <p class="item_time">{{ item.time }}</p>
                <div class="radius">
                  <p class="item_message">{{ item.message }}</p>
                </div>
              </div>
            </div>
            <div class="zhiding" @click="top(item, index)">
              <p>置顶</p>
            </div>
            <div class="del" @click="delet(item, index)">
              <p>删除</p>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
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
import { getQQInfo } from "../../api/heromain/hero/transfer.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const name = ref("");
name.value = JSON.parse(sessionStorage.getItem("Loginzzf")).name;
console.log(name.value);
const zzf = ref("");
zzf.value = JSON.parse(sessionStorage.getItem("Loginzzf")).img;
console.log(zzf.value);
const Wifi = ref("");
Wifi.value = JSON.parse(sessionStorage.getItem("Loginzzf")).WIFI;
const search = ref("");
const state = reactive({
  data: [],
});
const isLoading = ref(false);
const loading = ref(false);
const finished = ref(false);
const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
const onLoad = async () => {
  await getQQInfo().then((res) => {
    console.log(res.data);
    console.log(res.data.QQ.length);
    setTimeout(() => {
      if (isLoading.value) {
        state.data = [];
        isLoading.value = false;
      }
      state.data = res.data.QQ;
      loading.value = false;
      if (state.data.length >= res.data.QQ.length) {
        finished.value = true;
      }
    }, 3000);
  });
};
const delet = (item, index) => {
  state.data.splice(index, 1);
};
const ceshi = ref({});
const top = (item, index) => {
  for (let i = 0; i < state.data.length; i++) {
    let name = state.data[i].name;
    if (name == item.name) {
      ceshi.value = item;
      state.data.splice(index, 1);
    }
  }
  state.data.unshift(ceshi.value);
};
onMounted(() => {
  onLoad();
});
</script>

<style scoped>
.homepage {
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
  width: 40%;
  height: 100%;
  color: white;
  padding-left: 8px;
}
.p {
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
}
.xian {
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  margin-top: -5px;
}
.green {
  width: 10px;
  height: 10px;
  background-color: #20e488;
  border-radius: 50%;
}
.xian p {
  font-size: 12px;
  margin-left: 5px;
}
.right {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-jiahao {
  margin-right: 10px;
  font-size: 22px;
  color: white;
}
.icon-renxiang {
  flex: 1;
  text-align: right;
  margin-right: 10px;
  font-size: 22px;
}
.el-dropdown-menu /deep/ .icon-jiahao-::before {
  margin-right: 5px !important;
  color: #979fb4;
  font-size: 20px;
}
.el-dropdown-menu /deep/ .icon-tianjiahaoyou::before {
  margin-right: 5px !important;
  color: #979fb4;
  font-size: 20px;
}
.el-dropdown-menu /deep/ .icon-saoyisao::before {
  margin-right: 5px !important;
  color: #979fb4;
  font-size: 20px;
}
.el-dropdown-menu /deep/ .icon-send-line::before {
  margin-right: 5px !important;
  color: #979fb4;
  font-size: 20px;
}
.el-dropdown-menu /deep/ .icon-shoufukuan-1::before {
  margin-right: 5px !important;
  color: #979fb4;
  font-size: 20px;
}
.search {
  width: 100%;
  height: 7%;
  background-color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-input /deep/ .el-input__inner::placeholder {
  text-align: center !important;
  color: #ced1d8 !important;
}
.search >>> input {
  outline: none;
  box-shadow: none;
}
.el-input {
  width: 90% !important;
  /* margin-top: 10px; */
}
.search >>> input {
  border-radius: 30px !important;
  background-color: white;
}
.el-input /deep/ .el-input__inner {
  text-align: center !important;
}
.main {
  width: 100%;
  height: 86%;
  position: fixed;
  top: 6%;
}
.messagebox {
  width: 390px;
  height: 65px;
  background-color: white;
  display: grid;
  grid-template-columns: 5fr 5fr 5fr;
  overflow: hidden;
  overflow-x: scroll;
}
.message {
  width: 390px;
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
}
.zhiding {
  width: 60px;
  height: 100%;
  background-color: #4d94fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.del {
  width: 60px;
  height: 100%;
  background-color: #ff596a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.name_img {
  width: 12%;
  height: 80%;
  padding: 3px;
  padding-left: 10px;
}
.name_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.messsage_name {
  width: 78%;
  height: 100%;
  margin-left: 5px;
}
.names {
  font-size: 15px;
  font-weight: bold;
  margin-top: 13px;
}
.description {
  font-size: 12px;
  color: #bfc2ca;
}
.message_time {
  width: 10%;
  height: 100%;
}
.item_time {
  font-size: 12px;
  color: #c6cad1;
  margin-top: 20px;
}
.item_message {
  font-size: 2px;
  color: white;
}
.radius {
  width: 17px;
  height: 17px;
  background-color: #cccccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  margin-left: 10px;
}
.van-pull-refresh {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.van-list {
  width: 100%;
  height: 100%;
}
</style>