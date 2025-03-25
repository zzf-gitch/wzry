<template>
        <div  style="height:100%"><el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          active-text-color="#fff"
          background-color="#001529"
          text-color="#ffffffb3"
          :unique-opened="true"
          :collapse-transition="false"
          router
        >
          <div class="el-logo">
            <img  src="../assets/logo.png" alt="" srcset="" />
            <span class="title" @click="gowzry">地图系统</span>
          </div>

          <template v-for="(item,index) in listData" :key="index">
              <el-sub-menu v-if="item.children" :index="item.index">
                <template #title>
                  <i class="iconfont">{{item.icon}}</i>
                  <span>{{item.name}}</span>
                </template>
                  <template v-for="(list,i) in item.children" :key="i">
                    <el-sub-menu v-if="list.children" :index="list.path">
                      <template #title>
                        <i class="iconfont">{{list.icon}}</i>
                        <span>{{list.names}}</span>
                      </template>
                    </el-sub-menu>

                    <el-menu-item v-else :index="list.path">
                      <i class="iconfont">{{list.icon}}</i>
                      <span>{{list.names}}</span>
                    </el-menu-item>
                  </template>
              </el-sub-menu>

              <el-menu-item v-else :index="item.index">
                  <i class="iconfont">{{item.icon}}</i>
                  <span>{{item.name}}</span>
              </el-menu-item>
          </template>

          </el-menu>
        </div>
</template>

<script setup>
import { mapState,mapMutations,useStore } from 'vuex'
import { useRouter, useRoute } from "vue-router";
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ElLoading } from 'element-plus'
const store = useStore();
const router = useRouter();
const route = useRoute();
const isCollapse = computed(() => {return store.state.main.isCollapse})
const listData = ref([
  {
    index:"/country",
    name:"国家地图",
    icon:"\ue609",
    children:[
      {
        path:"/china",
        names:"中国地图"
      },
      {
        path:"/world",
        names:"世界地图"
      },
      {
        path:"/guojia",
        names:"国家信息"
      }
    ]
  },
  {
    index:"/region",
    name:"地区地图",
    icon:"\ue62a",
    children:[
      {
        path:"/shanxi",
        names:"山西地图"
      },
      {
        path:"/jiangsu",
        names:"江苏地图"
      }
    ]
  },
  {
    index:"/Water",
    name:"水波纹",
    icon:"\ue67f",
    children:[
      {
        path:"/shuibowen",
        names:"水波纹"
      }
    ]
  }
])
</script>

<style scoped>
    .el-logo {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 10px 4px 10px 16px;
}
.el-logo img {
  width: 32px;
  height: 32px;
}
.iconfont{
  margin-left: 5px;
}
.el-sub-menu__title span {
  margin-left: 10px;
}
.el-menu-item span {
  margin-left: 10px;
}
.el-logo .title {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-left: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-sub-menu.is-active{
  border-left: 2px solid #0960bd !important;
}
.el-sub-menu.is-active.is-opened {
  border-left: none !important;
}
.el-menu {
  width: 100% !important;
  height: 100%;
  background-color: #001529;
  border-right: none !important;
}
.el-aside {
  background-color: #001529;
}
.el-menu-item.is-active {
  color: #fff;
  background-color: #0960bd;
}
.el-menu-demo{
  width: 100%;
  height: 5%;
  background-color: whitesmoke;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-sub-menu__title span {
  color: white !important;
}
.el-submenu.is-active > .el-submenu__title {
  color: blue !important;
}
.el-main {
  width: 100%;
  height: 80%;
}
</style>