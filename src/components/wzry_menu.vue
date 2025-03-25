<template>
  <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse" active-text-color="#fff"
    background-color="#001529" text-color="#ffffffb3" :unique-opened="true" :collapse-transition="false"
    @open="handleOpen" @close="handleClose" router>
    <div class="el-logo">
      <img @click="goelement_plus" src="../assets/logowzry.png" alt="" />
    </div>

    <!-- 动态渲染el-menu -->
    <template v-for="(menu, index) in list.mist" :key="index">
      <!-- v-if="menu.children" 判断这一项数据是否有子项菜单 第一层 -->
      <el-sub-menu v-if="menu.children" :index="menu.index">
        <template #title>
          <i class="iconfont">{{ menu.icon }}</i>
          <span>{{ menu.name }}</span>
        </template>
        <template v-for="(item, index) in menu.children" :key="index">
          <!-- v-if="item.children" 判断这一项数据是否有子项菜单 第二层-->
          <el-sub-menu v-if="item.children" :index="item.index">
            <template #title>
              <i class="iconfont">{{ item.icon }}</i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="(date, index) in item.children" :key="index">
              <!-- 最后一层 不需要判断是否有子项菜单了 -->
              <el-menu-item :index="date.index">
                <i class="iconfont">{{ date.icon }}</i>
                <span>{{ date.positer }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
          <!-- 若不是多级菜单就会走这里生成一级菜单 -->
          <el-menu-item v-else :index="item.index">
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <!-- 若不是多级菜单就会走这里生成一级菜单 -->
      <el-menu-item v-else :index="menu.index">
        <el-tooltip class="box-item" effect="dark" :disabled="disabled" :content="menu.name" placement="right">
          <i class="iconfont" @mouseenter="mouseenter">{{ menu.icon }}</i>
        </el-tooltip>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
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
import zzf from '@/assets/zzf.jpg';
import { routerlist, routerHXR } from "@/api/heromain/hero/transfer.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const isCollapse = computed(() => store.state.main.isCollapse);
const disabled = ref(true);
const mouseenter = () => {
  if (isCollapse.value == false) {
    disabled.value = true
  } else if (isCollapse.value == true) {
    disabled.value = false
  }
}
const list = reactive({
  mist: [],
});
const handleOpen = () => {
  console.log(1);
};
const handleClose = () => {
  console.log(2);
};
const listDate = reactive({
  name: "张卓飞",
  img: zzf
});
const getlist = async () => {
  await routerlist().then(res => {
    console.log(res.data);
    list.mist = res.data.list
  })
}
const routerHXRList = async () => {
  await routerHXR().then(res => {
    console.log(res.data);
    list.mist = res.data.list
  })
}
const goelement_plus = () => {
  router.push({ name: "element_plus", });
  sessionStorage.setItem("administrator", JSON.stringify(listDate))
};
const account = ref('')
account.value = JSON.parse(sessionStorage.getItem('Loginuser')).account
onMounted(() => {
  if (account.value == '2452884452') {
    getlist()
  } else if (account.value == '3116379060') {
    routerHXRList()
  }
})
</script>

<style scoped>
.el-menu-item span {
  margin-left: 10px;
}

.el-sub-menu__title span {
  margin-left: 50px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  width: 100% !important;
  height: 90%;
  background: url(../assets/sidebar_bg.png) no-repeat;
  background-size: 100% 100%;
  border-right: none !important;
}

.el-logo {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 20px 4px 15px 6px;
}

.el-logo img {
  width: 180px;
  height: 50px;
}

.iconfont {
  margin-left: 5px;
}

.el-sub-menu__title .iconfont {
  margin-left: 20px;
}

.el-sub-menu /deep/ .el-sub-menu__title {
  padding: 0px !important;
}

.el-menu-item.is-active {
  color: skyblue;
  background-color: #223450;
}

.el-menu-item:hover {
  color: #bf681d;
}

.el-sub-menu.is-active {
  color: skyblue;
  background-color: #223450;
}

.el-sub-menu /deep/ .el-sub-menu__title:hover {
  color: #bf681d !important;
}

.el-sub-menu__title span {
  color: white !important;
}

.el-menu-item-group {
  background-color: #223450 !important;
}

.el-sub-menu /deep/ .el-sub-menu__title {
  background-color: #223450 !important;
}

.el-menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
}

.el-sub-menu__title /deep/ span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px !important;
}

.lineactive {
  background-color: #bf681d !important;
}
</style>