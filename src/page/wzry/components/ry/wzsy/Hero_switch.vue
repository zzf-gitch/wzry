<template>
  <div class="Hero">
    <div class="el_select">
      <p>英雄联盟：</p>
      <el-select
        v-model="value"
        class="m-2"
        placeholder="请选择英雄"
        @change="btn"
      >
        <el-option
          v-for="item in state.data"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <p>王者荣耀：</p>
      <el-select
        v-model="value1"
        class="m-2"
        placeholder="请选择英雄"
        @change=""
      >
        <el-option
          v-for="item in states.datas"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <p>取色器：</p>
      <el-color-picker v-model="color1" />

      <p class="demonstration">创建日期：</p>
      <el-date-picker v-model="value2" type="date" placeholder="请选择日期" />

      <div class="ipt">
      <el-input  placeholder="快速搜索" />
    </div>

    </div>

    
    <div :hidden="isShowJS" class="imgContainer">
      <!-- <img class="fullscreenimg" :src="js" /> -->
      <video class="fullscreenimg" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source :src="js" type="video/mp4" />
      </video>
    </div>
    <div :hidden="isShowAKL" class="imgContainer">
      <!-- <img class="fullscreenimg" :src="akl" /> -->
      <video class="fullscreenimg" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source :src="akl" type="video/mp4" />
    </video>
    </div>
    <div :hidden="isShowLW" class="imgContainer">
      <!-- <img class="fullscreenimg" :src="lw" /> -->
      <video class="fullscreenimg" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source :src="lw" type="video/mp4" />
    </video>
    </div>
    <div :hidden="isShowNS" class="imgContainer">
      <!-- <img class="fullscreenimg" :src="ns" /> -->
      <video class="fullscreenimg" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source :src="ns" type="video/mp4" />
    </video>
    </div>
    <div :hidden="isShowYS" class="imgContainer">
      <!-- <img class="fullscreenimg" :src="ys" /> -->
      <video class="fullscreenimg" id="bgVid" playsinline="" autoplay="" muted="" loop="">
      <source :src="ys" type="video/mp4" />
    </video>
    </div>
  </div>
</template>

<script setup>
import { ElLoading } from "element-plus";
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
import { ElMessage, ElMessageBox } from "element-plus";
import { color } from "echarts";
import js from "../../../../../../public/hero/heromp4/剑圣.mp4";
import akl from "../../../../../../public/hero/heromp4/阿卡丽.mp4";
import lw from "../../../../../../public/hero/heromp4/龙王.mp4";
import ns from "../../../../../../public/hero/heromp4/诺手.mp4";
import ys from "../../../../../../public/hero/heromp4/亚索.mp4";
const store = useStore();
const router = useRouter();
const route = useRoute();
const value2 = ref("");
const isShowJS = ref(true);
const isShowAKL = ref(true);
const isShowLW = ref(true);
const isShowNS = ref(true);
const isShowYS = ref(false);
const color1 = ref("");
// const showJS=ref(false)
// const showAKL=ref(false)
// const showLW=ref(false)
// const showNS=ref(false)
// const showYS=ref(false)
const value = ref("亚索");
const state = reactive({
  data: [
    {
      value: "js",
      label: "剑圣",
    },
    {
      value: "akl",
      label: "阿卡丽",
    },
    {
      value: "lw",
      label: "龙王",
    },
    {
      value: "ns",
      label: "诺手",
    },
    {
      value: "ys",
      label: "亚索",
    },
  ],
});
const value1=ref('')
const states = reactive({
  datas: [
      {
          value:'dw',
          label:'典韦'
      },
      {
          value:'lb',
          label:'刘备'
      },
      {
          value:'ssx',
          label:'孙尚香'
      },
      {
          value:'gjl',
          label:'高渐离'
      },
      {
          value:'smy',
          label:'司马懿'
      },
      {
          value:'lx',
          label:'李信'
      },
      {
          value:'jyj',
          label:'橘右京'
      },
      {
          value:'zy',
          label:'赵云'
      },
      {
          value:'blxc',
          label:'百里玄策'
      },
      {
          value:'mc',
          label:'马超'
      },
      {
          value:'ln',
          label:'露娜'
      },
      {
          value:'wzj',
          label:'王昭君'
      },
      {
          value:'zgl',
          label:'诸葛亮'
      },
      {
          value:'j',
          label:'镜'
      },
      {
          value:'k',
          label:'铠'
      },
      {
          value:'dc',
          label:'貂蝉'
      },
      {
          value:'l',
          label:'澜'
      },
      {
          value:'bq',
          label:'白起'
      }
  ],
});
const btn = (val) => {
  console.log(val);
  if (val == "js") {
    isShowJS.value = false;
    isShowAKL.value = true;
    isShowLW.value = true;
    isShowNS.value = true;
    isShowYS.value = true;
    // showJS.value=!showJS.value
  } else if (val == "akl") {
    isShowJS.value = true;
    isShowAKL.value = false;
    isShowLW.value = true;
    isShowNS.value = true;
    isShowYS.value = true;
    // showAKL.value=!showAKL.value
  } else if (val == "lw") {
    isShowJS.value = true;
    isShowAKL.value = true;
    isShowLW.value = false;
    isShowNS.value = true;
    isShowYS.value = true;
    // showLW.value=!showLW.value
  } else if (val == "ns") {
    isShowJS.value = true;
    isShowAKL.value = true;
    isShowLW.value = true;
    isShowNS.value = false;
    isShowYS.value = true;
    // showNS.value=!showNS.value
  } else if (val == "ys") {
    isShowJS.value = true;
    isShowAKL.value = true;
    isShowLW.value = true;
    isShowNS.value = true;
    isShowYS.value = false;
    // showAYS.value=!showYS.value
  }
};
</script>

<style scoped lang="scss">
.Hero {
  width: 100%;
  height: 100%;
  .el_select {
    display: flex;
    width: 100%;
    height: 6% !important;
    position:fixed;
    height: 100%;
    z-index:1;
    align-items: center;
    p {
      color: white;
      padding-left: 100px;
      font-size: 16px;
      font-weight: 800;
    }
    .ipt {
    .el-input {
      width: 180px;
      padding-left:100px;
      .el-input__inner {
        width: 180px;
      }
    }
  }
}
  
  .imgContainer {
    // position: absolute;
    // inset: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;

    .fullscreenimg {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>