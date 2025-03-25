<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '58px' : '190px'">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu />
            </el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon>
              <document />
            </el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-button type="success" @click="open">{{
              name ? "关闭" : "打开"
          }}</el-button>
        </el-header>
        <el-main>
          <el-cascader v-model="value" :options="options" @change="handleChange" clearable />

          <div>
            <el-select v-model="value1" @change="handcity" clearable placeholder="省">
              <el-option v-for="item in province" :key="item.zcode" :label="item.name" :value="item.zcode" />
            </el-select>
            <el-select v-model="value2" @change="handcounty" clearable placeholder="市">
              <el-option v-for="item in city" :key="item.zcode" :label="item.name" :value="item.zcode" />
            </el-select>
            <el-select v-model="value3" clearable placeholder="县">
              <el-option v-for="item in county" :key="item.zcode" :label="item.name" :value="item.zcode" />
            </el-select>
          </div>
          <div class="box">
            <img class="img" src="../../public/hero/wzry/阿备.jpg" alt="">
            <div class="id">
              <span>NO.88</span>
            </div>
            <div class="main">
              <img src="../../public/hero/headimg/23.png" alt="">
              <span @mouseenter="mouseenter" @mouseleave="mouseleave" :style="style">查看详细</span>
              <div class="line" :class="{ lineactive: lineactive }"></div>
            </div>
            <div class="bottom">
              <span>刘备</span>
              <span>仁德义枪</span>
            </div>
          </div>

        </el-main>
        <el-footer> </el-footer>
      </el-container>
    </el-container>
  </div>
</template> 
<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { getcityinfo } from "@/api/heromain/hero/transfer.js";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
const value = ref('');
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const style = ref('');
const lineactive = ref(false);
const mouseenter = () => {
  style.value = "color:cornflowerblue";
  lineactive.value = true;
}
const mouseleave = () => {
  style.value = "color:white";
  lineactive.value = false;
}
const options = ref([]);
//省
const province = ref([])
//市
const city = ref([])
//县
const county = ref([])
options.value = regionData;
const handleChange = (val) => {
  console.log(val);
  console.log(CodeToText[val[0]], CodeToText[val[1]], CodeToText[val[2]]);
};
//获取省信息
const getlist = async () => {
  await getcityinfo().then(res => {
    console.log(res.data);
    province.value = res.data
  })
}
//获取市信息
const handcity = (val) => {
  console.log(val);
  province.value.forEach(item => {
    console.log(item.zcode);
    let id = item.zcode
    if (id == val) {
      let state = item.subList
      city.value = state
    }
  })
}
//获取县信息
const handcounty = (val) => {
  console.log(val);
  city.value.forEach(item => {
    console.log(item.zcode);
    let id = item.zcode
    if (id == val) {
      let state = item.subList
      county.value = state
    }
  })
}
onMounted(() => {
  getlist()
})
const isCollapse = ref(true);
const open = () => {
  isCollapse.value = !isCollapse.value;
  name.value = !name.value;
};
const name = ref(false);
const visible = ref(false);
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  transition: width 0.5s;
  background: url(../assets/sidebar_bg.png) no-repeat;
  background-size: 100% 100%;
}

.el-menu {
  width: 100% !important;
  height: 100%;
  background: url(../assets/sidebar_bg.png) no-repeat;
  background-size: 100% 100%;
}

.el-header {
  width: 100%;
  height: 11%;
  padding: 0px !important;
}

.el-main {
  width: 100%;
  height: 50rem !important;
  padding: 0px !important;
}

.el-footer {
  width: 100%;
  height: 5%;
}

.box {
  width: 200px;
  height: 350px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.35s 0.2s;
}

.box:hover {
  background-color: rgba(0, 0, 0, 0.25);
  transition: all 0.35s 0.2s;
  box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.75);
  transform: translateY(-10px)
}

.box:hover .id {
  animation: line 0.5s 0.2s;
}

.box:hover .bottom {
  animation: line 0.5s 0.2s;
}

.img {
  position: absolute;
  min-width: 100%;
  max-height: 100%;
  pointer-events: none;
}

.id {
  position: absolute;
  z-index: 1;
  color: white;
  margin: 15px;
  font-size: 16px;
  font-weight: 800;
}

.bottom {
  position: absolute;
  z-index: 1;
  bottom: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  left: 35%;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
}

@keyframes line {
  33% {
    transform: translateY(-10px);
  }

  75% {
    transform: translateY(5px)
  }

  100% {
    transform: translateY(0px);
  }
}

.main {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  backdrop-filter: blur(10px);
  opacity: 0;
  display: flex;
  transition: all 0.5s 0.5s;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.box:hover .main {
  opacity: 1;
  transition: all 0.5s 0.5s;
}

.main img {
  border-radius: 50%;
}

.main span {
  color: white;
  font-size: 25px;
  font-weight: 800;
}

.line {
  width: 0px;
  height: 3px;
  transition: all 0.5s linear;
}

.lineactive {
  width: 150px !important;
  transition: all 0.5s 0.2s;
  background-color: skyblue;
}
</style>