<template>
  <el-watermark :font="{ color: 'white' }" :content="['仅供学习', 'Github作者:zzf-gitch']" :zIndex="1000"
    family="Microsoft YaHei" style="width:100%;height:100%;" :gap="[300,300]" watermarkStyle="font-size: 20px; font-weight: 600; color: #fff; text-shadow: 0 0 10px #000;">
  <div class="home">
    <img class="imgss" src="../assets/logowzry.png" alt="">
    <div class="Login_box" v-if="Loginshow">
      <img style="width:100px;height:100px;margin: 0 auto" src="../assets/login_logo.png" alt="">
      <div class="Login_title">{{ $t('Login.name') }}</div>
      <div class="BUTTON-BOX">
        <div class="button_left">{{ $t('Login.register') }}</div>
        <div class="button_right" @click="Deng">{{ $t('Login.logon') }}</div>
      </div>
    </div>
    <div class="table" v-if="showTable">
      <div class="img">
        <img src="../assets/login_logo.png" />
        <p>{{ $t('home.wzry') }}</p>
      </div>
      <div class="GF" @click="Fan">
        <i class="iconfont icon-youjiantou LEFT"></i>
        <span>{{ $t('Login.ReSelect') }}</span>
      </div>
      <el-form label-position="left" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto"
        class="demo-ruleForm" :size="formSize">
        <el-form-item label="" prop="account">
          <el-input @keyup.enter="submitForm(ruleFormRef)" :placeholder="$t('home.account')"
            v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input @keyup.enter="submitForm(ruleFormRef)" :placeholder="$t('home.password')" show-password
            type="password" v-model="ruleForm.password" />
        </el-form-item>
      </el-form>
      <div class="el_button">
        <!-- <el-button type="primary" @click="click" id="btnmute">切换</el-button> -->
        <el-checkbox v-model="remember">{{ $t('home.remember') }}</el-checkbox>
      </div>
      <div v-if="!disasses" class="BtnLogin" type="button" @click="submitForm(ruleFormRef)">
        <span>{{ $t('home.game') }}</span>
        <span>START</span>
      </div>
      <div v-if="disasses" class="BtnLoginLOL" type="button" @click="submitForm(ruleFormRef)">
        <span>登录</span>
      </div>
    </div>
    <div class="ICP">
      <a href="" @click="tiao">晋ICP备2022012014号</a>
    </div>
  </div>

  <div class="bar">
    <div class="bar-Line">
      <div class="Line"></div>
      <div class="box">
        <div class="icon" :class="{ active: active }" @click="iconchange">
          <i class="iconfont icon-shengyin" v-if="!active"></i>
          <i class="iconfont icon-caozuo-jingyin" v-if="active"></i>
        </div>
      </div>
    </div>

    <div class="bar-Line">
      <div class="Line"></div>
      <div class="box">
        <div class="icon" :class="{ line: line }" @click="ICON('')">
          <i class="iconfont icon-gonggao"></i>
        </div>
      </div>
    </div>

    <div class="bar-Line">
      <div class="Line"></div>
      <div class="box">
        <div class="icon" :class="{ activeline: activeline }" @click="Countines">
          <i class="iconfont icon-send-line"></i>
        </div>
      </div>
    </div>

    <div class="bar-Line">
      <div class="Line"></div>
      <div class="box">
        <div class="icon" :class="{ Zline: Zline }" @click="ICON('Z')">
          <span>主页</span>
        </div>
      </div>
    </div>
  </div>

  <div class="F-dialog" :class="{ dialog: dialog }" @click="reload" :style="{ 'z-index': dialog ? '-1' : '100' }">
    <template v-if="GG">
      <div class="F-header">
        <p class="header">{{ $t('person.wzTZ') }}</p>
        <i class="iconfont icon-close" @click="close"></i>
      </div>
      <div class="F-main">
        <div class="main">
          <h1 class="kaifa">{{ $t('person.wzKF') }}：</h1>
          <p>{{ $t('person.QQ1') }}：<span>2452884452</span></p>
          <p>{{ $t('person.QQ2') }}：<span>2067765949</span></p>
          <p>{{ $t('person.mailbox') }}：<span>Z15903509849@163.com</span></p>
          <p>{{ $t('person.version') }}：<span>{{ version }}</span></p>
          <h1 class="kaifa">{{ $t('person.browser') }}：</h1>
          <p>{{ $t('person.RecommendedUse') }}<a @click="Google">Google Chrome</a>{{ $t('person.mailbox') }}</p>
          <h1 class="kaifa">{{ $t('person.mattersNeedingAttention') }}：</h1>
          <p>{{ $t('person.mattersNeedingAttention1') }}</p>
          <p>{{ $t('person.mattersNeedingAttention2') }}</p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="F-header">
        <p class="header">{{ $t('Login.ZY') }}</p>
        <i class="iconfont icon-close" @click="close"></i>
      </div>
      <div class="F-main">
        <div class="main">
          <div style="width:100%;height: 100%;display: flex;align-items: center;justify-content: center;"
            v-for="(m, x) in ZYimg" :key="x">
            <img class="F-IMG" :src="m.path" alt="" @click="FI(m)">
          </div>
        </div>
      </div>
    </template>
  </div>

  <div class="zhe" v-if="zhezhao" @click="reload"></div>

  <div class="Rimg" v-if="RgShow">
    <div class="r-img">
      <img :src="FIMG" alt="">
    </div>
    <i class="iconfont icon-close CLOSE" @click="release"></i>
  </div>

  <div v-if="disasses" class="videoContainer">
    <video class="fullscreenVideo" playsinline autoplay loop>
      <source :src="dw" type="video/mp4" />
    </video>
  </div>

  <Transition>
    <internationalization v-if="Gisshow" @close="closeG" @language="language" :Gid="Gid" />
  </Transition>

  <audio id="Audio" style="display:none" :src="music" playsinline autoplay controls loop type="audio/mp3"></audio>

  <!-- 不加muted的话需要修改谷歌浏览器打开谷歌浏览器的设置然后进入到安全和隐私设置点击更多权限点击声音添加允许播放声音的网址 比如(http://localhost:8081) ok-->
  <div v-if="!disasses" class="videoContainer">
    <video id="Video" class="fullscreenVideo" :src="versions" type="video/mp4" autoplay loop muted></video>
  </div>

  </el-watermark>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { FormInstance } from "element-plus";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { ElLoading } from "element-plus";
import { successmessage, warningmessage, errormessage } from '../api/message.js';
import zzf from '../assets/zzf.jpg';
import xhr from '../assets/xhr.jpg';
import wzry from '../assets/video/loginBg.mp4'
import sw from '../assets/video/神王.mp4'
import wzryMV from '../assets/video/王者荣耀MV.mp4'
import swMV from '../assets/video/诺手MV.mp4'
import versions from '../assets/video/NewBJ.mp4'
import dw from '../assets/video/典韦.mp4'
import internationalization from '../components/internationalization.vue'
import { useI18n } from 'vue-i18n'
import music from '../../public/hero/music/CR3_ - 多幸运 (0_8降速版).mp3'
const { locale } = useI18n()
const { $t } = getCurrentInstance().proxy
const Loginshow = ref(true)
const showTable = ref(false)
const fullscreenLoading = ref(false);
const store = useStore();
const router = useRouter();
const formSize = ref("default");
const GG = ref(true)
const ruleFormRef = ref("");
const Gisshow = ref(false)

// 项目版本号
const version = process.env.VERSION;
console.log('Version:', version); // 输出: 1.0.0

const ZYimg = reactive([
  {
    path: require('@/assets/主页1.jpg')
  },
  {
    path: require('@/assets/主页2.jpg')
  },
  {
    path: require('@/assets/主页3.jpg')
  },
  {
    path: require('@/assets/主页4.jpg')
  },
  {
    path: require('@/assets/主页5.jpg')
  }
])
//控制切换背景
const disasses = ref(false);
// 控制静音
const active = ref(false)
// 控制通知公告
const line = ref(false)
//控制主页
const Zline = ref(false)
// 控制遮罩层
const zhezhao = ref(true)
// 控制F-dialog
const dialog = ref(false)
// 静音函数
const iconchange = () => {
  active.value = !active.value
  let video = document.getElementById("Audio");
  video.muted = !video.muted
}
// 控制国际化
const activeline = ref(false)
// 国际化
const Gid = ref(null)
const language = (v) => {
  locale.value = v.language
  Gid.value = v.id
  console.log($t('home.wzry'));
}
const Countines = () => {
  Gisshow.value = true
  activeline.value = true
}
const closeG = (v) => {
  Gisshow.value = v
  activeline.value = false
}
const V = ref('')
// 打开通知公告
const ICON = (v) => {
  V.value = v
  if (v) {
    Zline.value = true
    zhezhao.value = true
    dialog.value = false
    GG.value = false
  } else {
    line.value = true
    zhezhao.value = true
    dialog.value = false
    GG.value = true
  }
}
// 关闭通知公告
const close = () => {
  if (V.value) {
    Zline.value = false
    zhezhao.value = false
    dialog.value = true
  } else {
    line.value = false
    zhezhao.value = false
    dialog.value = true
  }
}
const Deng = () => {
  Loginshow.value = false
  showTable.value = true
}
const Fan = () => {
  Loginshow.value = true
  showTable.value = false
}
const click = () => {
  disasses.value = !disasses.value
}
// 点击播放背景视频
const reload = () => {
  let video = document.getElementById("Video");
  video.play()
}
const FIMG = ref('')
const RgShow = ref(false)
const FI = (v) => {
  FIMG.value = v.path
  RgShow.value = true
}
const release = () => {
  RgShow.value = false
}
const remember = ref(true)
const ruleForm = reactive({
  account: "",
  password: "",
  name: "张卓飞",
  img: zzf,
});
const Form = reactive({
  account: "3116379060",
  password: "123456789ghs",
  name: "王宇康",
  img: xhr,
})
const checked1 = ref(false);
const disabled = ref(true);
const rules = reactive({
  account: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    { min: 1, max: 15, message: "长度只能在1到15位之间", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
});
const Google = () => {
  window.open("https://www.google.com.hk/")
}
const submitForm = () => {
  if (ruleForm.account == "" || ruleForm.password == "") {
    warningmessage("账号和密码不能为空")
  } else if (ruleForm.account !== '2452884452' || ruleForm.password !== '15903509849fx..') {
    if (ruleForm.account !== "3116379060" || ruleForm.password !== "123456789ghs") {
      errormessage("账号或密码错误")
    } else {
      if (remember.value) {
        sessionStorage.setItem("Loginuser", JSON.stringify(Form));
        successmessage("登录成功")
        localStorage.setItem('Account', ruleForm.account);
        localStorage.setItem('Password', ruleForm.password);
        router.push({ name: "wzry" });
      } else {
        sessionStorage.setItem("Loginuser", JSON.stringify(Form));
        localStorage.removeItem('Account')
        localStorage.removeItem('Password')
        successmessage("登录成功")
        router.push({ name: "wzry" });
      }
    }
  } else {
    if (remember.value) {
      sessionStorage.setItem("Loginuser", JSON.stringify(ruleForm));
      successmessage("登录成功")
      localStorage.setItem('Account', ruleForm.account);
      localStorage.setItem('Password', ruleForm.password);
      router.push({ name: "wzry" });
      window.Loginuser = ruleForm
    } else {
      sessionStorage.setItem("Loginuser", JSON.stringify(ruleForm));
      localStorage.removeItem('Account')
      localStorage.removeItem('Password')
      successmessage("登录成功")
      router.push({ name: "wzry" });
    }
  }
};
const tiao = () => {
  window.open('https://beian.miit.gov.cn/#/Integrated/index')
}
const print = () => {
  console.log(`%c${process.env.VUE_APP_BASE_URL}`, 'color:#376ca3;font-weight:700;font-size:40px;text-shadow: 0 0 35px #62ffff;')
  console.log('%c人生如果没有梦想，那和咸鱼有什么区别。--周星驰', 'color:#376ca3;font-weight:700;font-size:40px;text-shadow: 0 0 35px #62ffff;')
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
  print()
  if (remember.value) {
    let Account = localStorage.getItem('Account')
    let Password = localStorage.getItem('Password')
    ruleForm.account = Account
    ruleForm.password = Password
  } else {
    ruleForm.account = ''
    ruleForm.password = ''
  }
});
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fullscreenVideo {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  inset: 0;
  object-fit: cover;
}

/* .fullscreenVideo {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

:deep(.demo-ruleForm .el-input__wrapper) {
  opacity: 0.8;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

:deep(.demo-ruleForm .el-input__wrapper:hover) {
  box-shadow: 0 2px 12px rgba(255, 215, 0, 0.3);
}

:deep(.demo-ruleForm .el-input__wrapper.is-focus) {
  box-shadow: 0 2px 12px rgba(255, 215, 0, 0.5);
  border-color: rgba(255, 215, 0, 0.7);
}

:deep(.el-form-item .el-form-item__content) {
  margin-left: 0px;
}

:deep(.el-input .el-input__inner) {
  text-align: center;
  font-size: 18px;
  width: 100%;
  color: #333;
  font-weight: 500;
  letter-spacing: 1px;
}

:deep(.el-input .el-input__inner:focus) {
  color: #111;
}

:deep(.el-input .el-input__inner::placeholder) {
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  font-weight: 400;
}


.el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table {
  width: 500px;
  height: 400px;
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.8);
  padding: 2rem 3rem;
  border-radius: 10px;
  position: relative;
}

.el_button {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.img img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  animation: lineImg 4s infinite alternate;
}

@keyframes lineImg {
  0% {
    transform: translateY(5px);
  }

  50% {
    transform: translateY(10px);
    text-shadow: 0 10px 20px #e8b76b;
    filter: contrast(1.1) brightness(1.3);
  }

  100% {
    transform: translateY(0px);
    text-shadow: 0 10px 35px #e8b76b;
    filter: contrast(1.3) brightness(1.5);
  }
}

p {
  margin: 0;
  padding: 0;
}

.img p {
  font-size: 40px;
  font-weight: 700;
  line-height: 2.5;
  color: transparent;
  text-shadow: 0 0 35px #ffd363;
  background: -webkit-linear-gradient(295deg, #f6dda5 25%, #ffb700);
  background: linear-gradient(155deg, #f6dda5 25%, #ffb700);
  -webkit-background-clip: text;
  background-clip: text;
}

.el-form {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

:deep(.el-checkbox__label) {
  color: #be9b4d;
  font-weight: 600;
}

.el-form-item {
  width: 50%;
  padding: 15px;
}

.BtnLogin {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 35px;
  margin: 0 auto;
  /* margin-top: 20px; */
  background: url("./img/login.png") no-repeat center center;
  background-size: 100%;
  cursor: pointer;
}

.BtnLogin:hover {
  text-shadow: 0 10px 20px #e8b76b;
  filter: contrast(1.2) brightness(1.5);
  transition: all 0.25s;
}

.BtnLoginLOL {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 35px;
  margin: 0 auto;
  margin-top: 20px;
  background: url("./img/LOL.jpg") no-repeat center center;
  background-size: 100%;
  cursor: pointer;
}

span:nth-child(1) {
  color: whitesmoke;
  text-shadow: 0px 0px 25px #bf681d;
  font-size: 16px;
  letter-spacing: 3px
}

span:nth-child(2) {
  color: #895c36;
  letter-spacing: 3px;
  line-height: 14px;
  text-shadow: 0px 0px 5px #8b5e37;
  font-size: 16px;
}

.ICP {
  margin: 0 auto;
  position: absolute;
  bottom: 60px;
}

a {
  color: white;
}

.imgss {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 300px;
  height: 85px;
  opacity: 0.5;
}

.bar {
  position: fixed;
  top: 0;
  right: 50px;
  width: 50px;
  height: 234px;
}

.bar-Line {
  width: 100%;
  height: 117px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Line {
  width: 2px;
  height: 50px;
  background-color: #457ec5;
}

.box {
  width: 50px;
  height: 50px;
  border: 2px solid #457ec5;
  transform: rotate(45deg) translate(5px) translateY(5px) !important;
}

.icon {
  width: 50px;
  height: 50px;
  background-color: #1d4068;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-5px) translateY(-5px) !important;
  transition: all 0.5s;
  cursor: pointer;
}

.icon-shengyin {
  transform: rotate(-45deg);
  font-size: 25px;
  color: #7b93bc;
  cursor: pointer;
}

.icon-gonggao {
  transform: rotate(-45deg);
  font-size: 25px;
  color: #7b93bc;
  cursor: pointer;
}

.icon-send-line {
  transform: rotate(-45deg);
  font-size: 25px;
  color: #7b93bc;
  cursor: pointer;
}

.icon-caozuo-jingyin {
  transform: rotate(-45deg);
  font-size: 25px;
  color: #7b93bc;
  cursor: pointer;
}

.active {
  transform: translate(0px) translateY(0px) !important;
  transition: all 0.5s;
}

.line {
  transform: translate(0px) translateY(0px) !important;
  transition: all 0.5s;
}


.activeline {
  transform: translate(0px) translateY(0px) !important;
  transition: all 0.5s;
}

.Zline {
  transform: translate(0px) translateY(0px) !important;
  transition: all 0.5s;
}

.zhe {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  top: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
}

.F-dialog {
  position: absolute;
  opacity: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* 50%为自身尺寸的一半 */
  width: 960px;
  height: 575px;
  background: url(../assets/dialog.png);
  transition: all 0.5s;
}

.GF {
  width: auto;
  height: auto;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.LEFT {
  font-size: 20px;
  color: whitesmoke;
}

.GF span {
  font-size: 14px;
  color: whitesmoke;
}

.GF:hover {
  opacity: 0.5;
}

.dialog {
  opacity: 0;
  transition: all 0.5s;
}

.F-header {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.F-main {
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  width: auto;
  /*position: absolute;*/
  /*top: 50px;*/
  /*left: 50%;*/
  /*transform: translate(-50%);*/
  padding-top: 25px;
  color: white;
  font-size: 30px;
}

.icon-close {
  position: absolute;
  top: 50px;
  right: 10px;
  transform: translate(-50%);
  color: white;
  font-size: 40px;
  font-weight: 600;
  cursor: pointer;
}

.main {
  width: 90%;
  height: 100%;
  margin-left: 50px;
  overflow: hidden;
  overflow: scroll;
}

.kaifa {
  text-shadow: 0 2px 3px #000;
  color: #7d97c1;
  margin-top: 10px;
}

.main p {
  text-shadow: 0 2px 3px #000;
  color: #7d97c1;
  padding-left: 20px;
  padding-top: 10px;
}

.main span {
  color: #3498db;
}

.main a {
  color: #fbc118;
  cursor: pointer;
}

.F-IMG {
  width: 90%;
  height: 80%;
  cursor: pointer;
}

.F-IMG:hover {
  border: 1px solid #fff;
}

.Rimg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.r-img {
  width: 80%;
  height: 70%;
}

.r-img img {
  width: 100%;
  height: 100%;
}

.CLOSE {
  position: absolute;
  right: 30px;
  top: 30px;
}

.Login_box {
  display: flex;
  justify-items: center;
  align-content: center;
  flex-direction: column;
  background-color: rgb(0, 0, 0, 0.5);
  box-shadow: 0 0 10px 0 rgb(0, 0, 0, 0.8);
  padding: 2rem 3rem;
  border-radius: 10px;
}

.Login_title {
  text-align: center;
  font-weight: 700;
  font-size: 40px;
  color: transparent;
  text-shadow: 0 0 35px #ffd363;
  background: -webkit-linear-gradient(295deg, #f6dda5 25%, #ffb700);
  background: linear-gradient(155deg, #f6dda5 25%, #ffb700);
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 2;
}

.BUTTON-BOX {
  width: 450px;
  height: 55px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.button_left {
  width: 47.5%;
  height: 100%;
  color: white;
  background: url(../assets/btn_info.png) no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
  text-shadow: 0 1px 2px #000;
  transition: all 0.25s;
  font-size: 20px;
}

.button_left:hover {
  box-shadow: 0 10px 15px #4b9be6;
  text-shadow: 0 10px 20px #4b9be6;
  filter: contrast(1.1) brightness(1.3);
  transition: all 0.25s;
}

.button_right {
  margin-left: 5%;
  width: 47.5%;
  height: 100%;
  color: white;
  background: url(../assets/btn_warning.png) no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .5);
  text-shadow: 0 1px 2px #000;
  transition: all 0.25s;
  font-size: 20px;
}

.button_right:hover {
  box-shadow: 0 10px 15px #e8b76b;
  text-shadow: 0 10px 20px #e8b76b;
  filter: contrast(1.1) brightness(1.3);
  transition: all 0.25s;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
