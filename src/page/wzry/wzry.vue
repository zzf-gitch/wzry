<template>
  <el-watermark :font="{ color: 'white' }" :gap="[300, 300]" :content="['王者荣耀后台管理系统', 'Github作者:zzf-gitch']" :zIndex="1000"
    family="Microsoft YaHei">
    <div class="common-layout" id="pdfDom">
      <el-container>
        <el-aside :width="isCollapse ? '58px' : '190px'">
          <wzry_menu></wzry_menu>
        </el-aside>
        <el-container>
          <el-header>
            <div style="width: 100%; height: 100%">
              <div style="width: 100%; height: 50%; display: flex">
                <div class="img">
                  <div class="cal" @click="toisCollopse" :title="isCollapse ? '展开菜单' : '收起菜单'" :class="isCollapse
                    ? 'iconfont icon-zhankaicaidan'
                    : 'iconfont icon-shouqicaidan'
                    "></div>
                  <Breadcrumb />
                </div>
                <div class="login">
                  <div class="img_zzf" :style="`background:url(${zzf}) center / cover`" @click="to"
                    @mouseenter="mouseenter"></div>
                  <span style="margin-left: 10px; font-size: 14px; font-weight: 900">{{ time }},&nbsp;&nbsp;{{
                    name
                  }}&nbsp;&nbsp;&nbsp;今日{{ weekText }}</span>
                </div>


                <div class="logininfoss" :class="{ lineactive: lineactive }" @mouseleave="mouseleave">
                  <div class="zfx"></div>
                  <div class="logininfo">
                    <el-button type="primary" class="word" @click="word">cardword</el-button>
                    <el-button type="primary" class="adaptiondemo" @click="adaptiondemo">vueself</el-button>
                    <el-button type="primary" class="adaptiondemo" @click="timer">timer</el-button>
                    <el-button type="primary" class="adaptiondemo" @click="fordemo">fordemo</el-button>
                  </div>
                </div>

                <div class="showTime">{{ t }}</div>
                <div v-if="isSupport" class="full-screen" :title="fullScreen ? '退出全屏' : '进入全屏'" @click="screen">
                  <i :class="fullScreen
                    ? 'iconfont icon-guanbiquanping'
                    : 'iconfont icon-fullscreen-line'
                    ">
                  </i>
                </div>
                <div style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 20px;">
                  <el-button type="success" @click="goQQ">登录QQ</el-button>
                  <el-button type="primary" @click="getPdf('#pdfDom')">导出为PDF</el-button>
                  <a href="./王者荣耀后台管理系统.docx" download id="download">下载使用手册</a>
                  <el-button type="danger" @click="qu">退出登录</el-button>
                </div>
              </div>
              <div style="width: 100%; height: 50%">
                <CommonTags />
              </div>
            </div>
          </el-header>
          <el-main>
            <!-- 动态组件动画效果 -->
            <router-view #default="{ Component }">
              <Transition :appear="true" enter-active-class="admin_fadeInRight" leave-active-class="admin_fadeOutLeft">
                <component :is="Component"></component>
              </Transition>
            </router-view>

          </el-main>
          <el-footer>
            <div class="start">
              <div class="window" @click="start"><i class="iconfont icon-windows"></i></div>
              <!-- <div class="input" :class="{ line: line }" @click="long"><input type="text" /></div> -->
            </div>
            <!-- 开始按钮盒子 -->
            <div class="bigbox" :class="{ bigboxline: bigboxline }">
              <div class="bigbox_left">
                <template v-for="(menu, index) in bigbox.data" :key="index">
                  <div class="big_top" @click="top">
                    <span class="menu_name">{{ menu.name }}</span>
                    <i class="iconfont i" :class="{ active_transform: active_transform }">{{ menu.icon }}</i>
                  </div>
                  <div class="menu_main" :class="{ mook: mook }">
                    <template v-for="(item, index) in menu.children" :key="index">

                      <template v-if="item.children">
                        <div class="box_mains">
                          <i class="iconfont">{{ item.icons }}</i>
                          <span @click="box_mains(index)">{{ item.title }}</span>
                          <i :class="index == currentindex ? 'iconfont iconactive' : 'iconfont icon'">{{ item.icon
                          }}</i>
                        </div>
                        <div :class="index == currentindex ? 'main_mainactive' : 'main_main'">
                          <template v-for="(therm, i) in item.children" :key="i">
                            <template v-if="therm.children">
                              <div class="therm_hero" @click="wz(i)">
                                <i class="iconfont thremic">{{ therm.icons }}</i>
                                <span class="thremcx">{{ therm.nametile }}</span>
                                <i :class="i == current ? 'iconfont thremixactive' : 'iconfont thremix'">{{
                                  therm.icon
                                }}</i>
                              </div>
                              <div :class="i == current ? 'threeboxactive' : 'threebox'">
                                <template v-for="(three, a) in therm.children" :key="a">
                                  <div class="threeicon" @click="threechange(a)">
                                    <span :class="a == currentIndex ? 'threeactive' : 'three'">{{ three.nname }}</span>
                                  </div>
                                </template>
                              </div>
                            </template>

                            <template v-else>
                              <div :class="i == current ? 'therm_mainactive' : 'therm_main'" @click="span(i)">
                                <span class="therm_main_span">{{ therm.nametile }}</span>
                              </div>
                            </template>
                          </template>
                        </div>
                      </template>

                      <template v-else>
                        <div class="box_main">
                          <i class="iconfont">{{ item.icon }}</i>
                          <span :class="index == currentindex ? 'box_mainactive' : 'span'" @click="box_main(index)">{{
                            item.title
                          }}</span>
                        </div>
                      </template>

                    </template>
                  </div>
                </template>
              </div>
              <div class="bigbox_right">
                <template v-for="(r, c) in BJimg" :key="c">
                  <div v-if="BJIMG" class="BJIMG" @click="wzryD(r, c)"
                    :style="`background:url(${r.img}) no-repeat;background-size:100% 100%`">
                    <span>{{ r.name }}</span>
                  </div>
                </template>
              </div>
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </div>
  </el-watermark>
</template>
<script setup>
import wzry_menu from "../../components/wzry_menu.vue";
import Breadcrumb from '../../components/Breadcrumb.vue'
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
  onBeforeUnmount,
  inject
} from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import CommonTags from "../../page/Tag.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ElLoading } from "element-plus";
import { starts } from '@/api/heromain/hero/transfer.js'
import { successmessage, warningmessage } from '@/api/message.js'
const BJimg = ref([
  {
    name: "王者荣耀主页",
    img: require('../../../public/images/home-W-3.png')
  },
  {
    name: "王者荣耀好友",
    img: require('../../../public/images/home-W-4.png')

  },
  {
    name: "王者荣耀战绩",
    img: require('../../../public/images/home-W-5.png')
  },
  {
    name: "王者荣耀英雄",
    img: require('../../../public/images/home-W-2.png')
  },
  {
    name: "王者荣耀相册",
    img: require('../../../public/images/home-W-1.png')
  },
  {
    name: "王者荣耀信息",
    img: require('../../../public/images/home-W-6.png')
  }
])
const wzryD = (r, i) => {
  if (i === 0) {
    router.push({ path: "/zhuye" })
  } else if (i === 1) {
    router.push({ path: "/cj" })
  } else if (i === 2) {
    router.push({ path: "/zhanji" })
  } else if (i === 3) {
    router.push({ path: "/yx" })
  } else if (i === 4) {
    router.push({ path: "/grxc" })
  } else {
    router.push({ path: "/qmgx" })
  }
}
const BJIMG = ref(false)
const lineactive = ref(false)
const mouseenter = () => {
  lineactive.value = true
}
const mouseleave = () => {
  lineactive.value = false
}
const line = ref(false)
const long = () => {
  line.value = true
}
const bigboxline = ref(false)
const start = () => {
  bigboxline.value = !bigboxline.value
  line.value = !line.value
  BJIMG.value = !BJIMG.value
}
const name = ref("");
name.value = JSON.parse(sessionStorage.getItem("Loginuser")).name;
console.log(name.value);
const zzf = ref("");
zzf.value = JSON.parse(sessionStorage.getItem("Loginuser")).img;
console.log(zzf.value);
//控制开启全屏和关闭全屏
const fullScreen = ref(false);
//浏览器是否支持全屏模式
const isSupport = document.fullscreenEnabled;
const store = useStore();
const router = useRouter();
//控制左侧边栏menu菜单缩放
const isCollapse = computed(() => store.state.main.isCollapse);
const active_transform = ref(false)
const mook = ref(false);
const top = () => {
  mook.value = !mook.value
  active_transform.value = !active_transform.value
}
const currentindex = ref()
const box_main = (index) => {
  currentindex.value = index
}
const box_mains = (index) => {
  currentindex.value = index
}
const current = ref()
const span = (i) => {
  current.value = i
}
const wz = (i) => {
  current.value = i
}
const currentIndex = ref()
const threechange = (a) => {
  currentIndex.value = a
}
//start按钮的下拉菜单数组
const bigbox = reactive({
  data: []
})
const screen = () => {
  //浏览器是否支持全屏模式
  if (isSupport) {
    //Document.fullscreenElement只读属性返回Element当前在本文档中以全屏模式呈现的，或者 如果 null当前未使用全屏模式
    if (document.fullscreenElement) {
      //Document.exitFullscreen() 方法用于让当前文档退出全屏模式（原文表述不准确，详见备注）。调用这个方法会让文档回退到上一个调用Element.requestFullscreen()方法进入全屏模式之前的状态
      document.exitFullscreen();
      fullScreen.value = false;
      warningmessage('退出全屏')
    } else {
      // 这里选择将html元素全屏展示，也可以选择其它元素
      //Element.requestFullscreen() 方法用于发出异步请求使元素进入全屏模式
      //Document.documentElement返回 的 Element根元素document（例如，<html>HTML 文档的元素）
      document.documentElement.requestFullscreen();
      successmessage('进入全屏')
      fullScreen.value = true;
    }
  }
};
const word = () => {
  router.push({ name: "cardword" })
}
const adaptiondemo = () => {
  router.push({ name: 'vueself-adaptiondemo' })
}
const timer = () => {
  router.push({ name: "setTimeout" })
}
const fordemo = () => {
  router.push({ name: "fordemo" })
}
// 导出pdf
const getPdf = () => {
  window.print()
}
//根据不通时间段返回不同的问候语
const time = ref("");
const getTimeState = () => {
  // 获取当前时间
  let date = new Date();
  // 获取当前小时
  let hours = date.getHours();
  // 设置默认文字
  let text = ""
  // 判断当前时间段
  if (hours >= 0 && hours <= 7) {
    text = "早上好"
    time.value = text
  } else if (hours > 7 && hours <= 11) {
    text = "上午好"
    time.value = text
  } else if (hours > 11 && hours <= 14) {
    text = "中午好"
    time.value = text
  } else if (hours > 14 && hours <= 19) {
    text = "下午好"
    time.value = text
  } else if (hours > 19 && hours <= 24) {
    text = "晚上好"
    time.value = text
  }
};
const weekText = ref("")
const getWeek = () => {
  let week = new Date().getDay()
  switch (week) {
    case 0:
      weekText.value = "星期日"
      break;
    case 1:
      weekText.value = "星期一"
      break;
    case 2:
      weekText.value = "星期二"
      break;
    case 3:
      weekText.value = "星期三"
      break;
    case 4:
      weekText.value = "星期四"
      break;
    case 5:
      weekText.value = "星期五"
      break;
    case 6:
      weekText.value = "星期六"
  }
}
const t = ref('');
const times = () => {
  //获取当前时间
  let nowDate = new Date();
  //获取当前年月日时分秒
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    hh: nowDate.getHours(),
    mm: nowDate.getMinutes(),
    ss: nowDate.getSeconds(),
  };
  let year = nowDate.getFullYear();
  let newmonth = date.month >= 10 ? date.month : "0" + date.month;
  let day = date.date >= 10 ? date.date : "0" + date.date;
  let hh = date.hh >= 10 ? date.hh : "0" + date.hh;
  let mm = date.mm >= 10 ? date.mm : "0" + date.mm;
  let ss = date.ss >= 10 ? date.ss : "0" + date.ss;
  let timemm = year + "-" + newmonth + "-" + day + " " + hh + ":" + mm + ":" + ss;
  t.value = timemm;
  setTimeout(() => {
    times()
  }, 1000)
};
const toisCollopse = () => {
  store.commit("collapseMenu");
};
const goQQ = () => {
  router.push({ name: 'QQ' })
}
const qu = () => {
  sessionStorage.removeItem("Loginuser");
  window.location.reload();
  router.push('/');
};
const getlist = async () => {
  await starts().then(res => {
    console.log(res.data);
    bigbox.data = res.data.list
  })
}
const to = () => {
  router.push({ name: "fordemo" })
}
onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在加载中，请稍后.......",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 800);
  console.log(window.Loginuser);
  getTimeState();
  getWeek()
  times()
  getlist()
  // 如果上一级路由的path是/heroInfo 只刷新一次
  if (router.options.history.state.back === '/heroInfo') {
    if (window.location.href.indexOf("#reloaded") == -1) {
      window.location.href = window.location.href + "#reloaded"
      window.location.reload()
    }
  }
  console.log(router);
});
</script>

<style scoped>
.common-layout {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.login {
  width: 35%;
  height: 90%;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.login span {
  color: white;
}

.el-container {
  width: 100%;
  height: 100%;
}

.full-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
}

.icon-shouqicaidan {
  color: white;
  width: 100% !important;
  margin-right: 20px;
}

.icon-zhankaicaidan {
  color: white;
  width: 100% !important;
  margin-right: 20px;
}

.icon-guanbiquanping {
  color: white;
}

.icon-fullscreen-line {
  color: white;
}

.el-container /deep/ .el-aside {
  overflow: none !important;
}

.el-aside {
  background: url(../../assets/sidebar_bg.png) no-repeat;
  background-size: 100% 100%;
  transition: all 0.5s;
  height: 100%;
  position: relative;
}

.showTime {
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  width: 450px;
}

.el-header {
  width: 100%;
  height: 11%;
  padding: 0px !important;
  background: url(../../assets/nav_bg.png) no-repeat;
  background-size: 100% 100%;
}

.el-main {
  width: 100%;
  height: 50rem !important;
  background: url(../../assets/default_bg.jpg) no-repeat;
  background-size: 100% 100%;
  padding: 0px !important;
}

.el-footer {
  width: 100%;
  height: 5%;
  background: url(../../assets/footbar_bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 0px !important;
  position: relative;
}

.img {
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  margin-left: 5px;
  cursor: pointer;
}

.cal {
  width: 0px !important;
  height: 20px;
}

.img_zzf {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
}

.img_zzf::before,
.img_zzf::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
}

.img_zzf::before {
  background: rgba(0, 0, 0, 0.6);
}

.img_zzf::after {
  background: inherit;
  clip-path: circle(0% at 50% 50%);
  transition: all 0.5s;
}

.img_zzf:hover::after {
  background: inherit;
  clip-path: circle(50% at 50% 50%);
  transition: all 0.5s;
}

.logininfoss {
  position: absolute;
  width: 120px;
  height: auto;
  top: 40px;
  right: 685px;
  z-index: 10;
  opacity: 0;
  animation: unfoucs 0.5s;
  transition: all 0.5s;
}

.lineactive {
  opacity: 1;
  animation: line 0.5s;
  transition: all 0.5s;
}

.zfx {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: white;
  z-index: 10;
  right: 27px;
  transform: rotate(45deg)
}

.logininfo {
  position: absolute;
  width: 120px;
  height: 170px;
  top: 5px;
  border-radius: 10px;
  background-color: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
}

.word {
  width: 80px !important;
}

.adaptiondemo {
  margin-top: 10px;
  margin-left: 0px !important;
  width: 80px !important;
}

@keyframes line {
  0% {
    transform: translateY(20px)
  }

  100% {
    transform: translateY(0px)
  }
}

@keyframes unfoucs {
  0% {
    transform: translateY(0px)
  }

  100% {
    transform: translateY(20px)
  }
}

.start {
  position: absolute;
  height: 100%;
  display: flex;
  z-index: 60;
}

.window {
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 60;
  cursor: pointer;
}

.input {
  width: 200px;
  z-index: 60;
  transition: all 0.25s;
}

.input input {
  width: 100%;
  height: 100%;
  outline: none;
  box-shadow: none;
  background-color: skyblue;
  padding: 0px !important;
  margin: 0px !important;
  border: none;
}

.line {
  width: 604px !important;
}

.bigbox {
  position: absolute;
  width: 0px;
  height: 0px;
  background-color: rgb(0, 0, 0, 0.5);
  bottom: 48px;
  left: 0;
  transition: all 0.25s;
  z-index: 60;
  display: flex;
  border-radius: 0px 10px 0px 0px;
  color: white;
}

.bigboxline {
  width: 652px !important;
  height: 500px !important;
}

.bigbox_left {
  width: 220px;
  height: 100%;
  border-right: 1px solid whitesmoke;
  overflow: hidden;
  overflow-y: scroll;
}

.bigbox_right {
  width: 432px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.big_top {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.25s;
}

.active_transform {
  transform: rotate(180deg) !important;
}

.menu_name {
  font-size: 16px;
  font-weight: 800;
  flex: 4;
}

.i {
  font-weight: 800;
  display: flex;
  flex: 1;
  justify-content: center;
  transition: all 0.25s;
  transform: rotate(0deg);
}

.box_mains {
  display: flex;
  width: 100%;
  height: 40px;
}

.box_mains span {
  flex: 3;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 10px;
}

.box_mains i:nth-child(1) {
  flex: 1.3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.icon {
  flex: 1;
  display: flex;
  align-items: center;
  transform: rotate(0deg);
  justify-content: center;
  transition: all 0.25s
}

.iconactive {
  flex: 1;
  display: flex;
  align-items: center;
  transform: rotate(180deg);
  justify-content: center;
  transition: all 0.25s
}

.menu_main {
  width: 100%;
  height: 0px;
  display: none;
  transition: all 0.25s;
  cursor: pointer;
}

.mook {
  height: auto !important;
  transition: all 0.25s;
  display: inline-block;
}

.box_main {
  display: flex;
  width: 100%;
  height: 40px;
}

.span {
  flex: 3;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 5px 0px 0px 5px;
  padding-left: 10px;
}

.box_mainactive {
  flex: 3;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  justify-content: start;
  align-items: center;
  border-radius: 5px 0px 0px 5px;
  background-color: #ebf5fd;
  color: #1e80e2;
  padding-left: 10px;
}

.box_main i {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.main_main {
  width: 100%;
  height: 0px;
  transition: all 0.25s;
  display: none;
}

.main_mainactive {
  width: 100%;
  height: auto;
  display: inline-block;
  transition: all 0.25s;
}

.therm_main {
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
}

.therm_mainactive {
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: #ebf5fd;
  color: #1e80e2;
}

.admin_fadeInRight {
  animation-duration: 0.5s;
  animation-name: fadeInRight;
}

.admin_fadeOutLeft {
  animation-duration: 0.3s;
  animation-name: fadeOutLeft;
}

.therm_main_span {
  font-size: 16px;
  font-weight: 800;
}

.therm_hero {
  display: flex;
  width: 100%;
  height: 40px;
}

.thremic {
  flex: 1.3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.thremcx {
  flex: 3;
  display: flex;
  justify-content: start;
  font-size: 16px;
  font-weight: 800;
  padding-left: 10px;
  align-items: center;
}

.thremix {
  flex: 1;
  display: flex;
  align-items: center;
  transform: rotate(0deg);
  justify-content: center;
  transition: all 0.25s
}

.thremixactive {
  flex: 1;
  display: flex;
  align-items: center;
  transform: rotate(180deg);
  justify-content: center;
  transition: all 0.25s
}

.threebox {
  width: 100%;
  height: 0px;
  display: none;
  transition: all 0.25s;
}

.threeboxactive {
  width: 100%;
  height: auto;
  display: inline-block;
  transition: all 0.25s;
}

.threeicon {
  display: flex;
  width: 100%;
  height: 40px;
}

.three {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
}

.threeactive {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  background-color: #ebf5fd;
  color: #1e80e2;
}

#download {
  display: inline-block;
  width: 108px;
  height: 32px;
  background-color: #409eff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-left: 12px;
  margin-right: 12px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
}

.BJIMG {
  width: 124px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  cursor: pointer;
}
</style>
