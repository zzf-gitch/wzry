<template>
  <div class="jymp">
    <div class="header">
      <el-input v-model="input" :suffix-icon="Search" :placeholder="str" clearable class="input" />
      <el-button type="primary" @click="inquire">查询</el-button>
      <el-button type="warning" class="warning" @click="neww">新建</el-button>
    </div>
    <div class="main">
      <div class="main_hero" v-for="(item, index) in state.slice((currentpage - 1) * pagesize, currentpage * pagesize)"
        :key="index">
        <div style="display: flex;justify-content: center;">
          <el-image style="width: 100px; height: 100px" :src="item.headimg" :preview-src-list="item.url"
            :initial-index="item.length" fit="cover" />
        </div>
        <i class="iconfont icon-close" @click="del(item, index)"></i>
        <div class="characters">
          <p>NO.{{ item.id }}</p>
          <p>{{ item.name }}</p>
          <p>{{ item.title }}</p>
          <el-button style="margin-top:10px" type="primary" @click="privew(item, index)">查看英雄</el-button>
          <el-button style="margin-top:10px;margin-left:0px !important;" color="#adb3c2" @click="compile(item, index)">编辑英雄</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 预览英雄抽屉 -->
  <el-drawer v-model="visible" :show-close="false" :before-close="Close" :direction="direction"
    :close-on-click-modal="false" :close-on-press-escape="false">
    <template #title="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">Hero Basic Information</h4>
      <el-button type="danger" @click="Close">
        <el-icon class="el-icon--left">
          <CircleCloseFilled />
        </el-icon>
        Close
      </el-button>
    </template>
    <div class="Drawer">
      <div class="Drawer_left">
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.name" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄名字：{{ from.name }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.Position" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄定位：{{ from.Position }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.stature" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄身高：{{ from.stature }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.Specialty" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄特长：{{ from.Specialty }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.title" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄称号：{{ from.title }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.money" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄价格/兑换：{{ from.money }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.time" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄上架时间：{{ from.time }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.Damage" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">攻击伤害：{{ from.Damage }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.viability" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">生存能力：{{ from.viability }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.Skill" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">技能效果：{{ from.Skill }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.difficulty" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">上手难度：{{ from.difficulty }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.story" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄背景故事：{{ from.story }}</div></el-tooltip>
        <el-tooltip class="box-item" :disabled="disabled" effect="dark" :content="from.history" placement="top"><div class="hidden" @mouseenter="mouseenter($event)">英雄历史原型：{{ from.history }}</div></el-tooltip> 
      </div>
      <div class="Drawer_right"><img :src="from.img" alt=""></div>
    </div>
  </el-drawer>
  <!-- 分页 -->
  <el-pagination small background layout="prev, pager, next, total, jumper" :total="state.length"
    :current-page="currentpage" :page-size="pagesize" @current-change="handcurrentchange" class="mt-4" />

    <child v-if="isshow" @close="close" :state="state" :msg="msg" :obj="obj" :obi="obi"/>
</template>

<script setup>  
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { Search, CirclePlusFilled, Edit } from "@element-plus/icons";
import { getHeroInfocard } from "@/api/heromain/hero/transfer.js";
import child from '@/components/childcard.vue'
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
import {
  successmessage,
  infomessage,
  errormessage,
  warningmessage,
} from "@/api/message.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = ref([])
const currentpage = ref(1)
const pagesize = ref(9)
const visible = ref(false)
const direction = ref('ltr')
const disabled=ref(true)
const str = ref("快速搜索")
const isshow=ref(false)
const msg=ref('')
const changeplaceholder = () => {
  let arr = ['快速搜索', 'IPhone', '瑞士手表', 'JS', 'VUE3', 'VUE2', 'UNIAPP']
  let index = Math.floor(Math.random() * arr.length)
  str.value = arr[index]
  setTimeout(() => {
    changeplaceholder()
  }, 1000)
}
const close=(e)=>{
  isshow.value=e
}
const mouseenter=(event)=>{
  console.log(event);
  let e=event.target
  let e_weight=e.scrollWidth
  let e_content=e.clientWidth
  if(e_weight>e_content){
    disabled.value=false
  }else{
    disabled.value=true
  }
}
const neww=()=>{
  isshow.value=true
  msg.value="新建"
}
const obj=ref('')
const obi=ref()
const compile=(item,index)=>{
  isshow.value=true
  obj.value=item
  msg.value=""
  obi.value=index
}
const getlist = async () => {
  await getHeroInfocard().then(res => {
    console.log(res.data.herolist);
    state.value = res.data.herolist;
  })
}
//预览英雄抽屉
const privew = (item, index) => {
  visible.value = true
  from.img = item.cover;
  from.name = item.name;
  from.Position = item.Position;
  from.stature = item.stature;
  from.Specialty = item.Specialty;
  from.title = item.title;
  from.time = item.time;
  from.Damage = item.Damage;
  from.money = item.money;
  from.viability = item.viability;
  from.Skill = item.Skill;
  from.difficulty = item.difficulty;
  from.story = item.story;
  from.history = item.history;
}
//预览英雄
const from = reactive({
  name: '',
  img: '',
  Position: '',
  stature: '',
  Specialty: '',
  title: '',
  time: '',
  Damage: '',
  money: '',
  viability: '',
  Skill: '',
  difficulty: '',
  story: '',
  history: '',
})
const input = ref('')
// 关闭预览Drawer
const Close = () => {
  ElMessageBox.confirm("你确定要关闭吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      visible.value = false
      successmessage("关闭成功")
    })
    .catch(() => {
      infomessage("取消关闭")
    });
}
onMounted(() => {
  getlist()
  changeplaceholder()
})
const inquire=()=>{
  currentpage.value = 1
  inquirelist()
}
const inquirelist=async () => {
  await getlist()
  let list = state.value.filter(hero=>hero.name.toLowerCase().includes(input.value.toLowerCase()) || hero.id.toLowerCase().includes(input.value.toLowerCase()))
  state.value=list
  if(state.value.length==false){
    errormessage("英雄不存在")
  }
}
const handcurrentchange = (val) => {
  currentpage.value = val
}
const del = (item, index) => {
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const i = state.value.indexOf(item)
      if(i > -1){
        state.value.splice(index,1)
      }
      successmessage("删除成功")
    })
    .catch(() => {
      infomessage("取消删除")
    });
}
</script>

<style scoped="scoped">
.jymp {
  width: 100%;
  height: 100%;
}

.header {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.input {
  width: 180px;
  margin-right: 10px;
}

.warning {
  margin-right: 20px;
}

.main {
  width: 100%;
  height: 40%;
  display: flex;
  flex-wrap: wrap;
}

.main_hero {
  width: 10%;
  height: 100%;
  background-color: #cce7f8;
  animation: line 0.5s alternate infinite;
  position: relative;
  margin-top: 1rem;
  margin-left: 15px;
}

@keyframes line {
  from {
    box-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue,
      0 0 40px skyblue, 0 0 50px skyblue, 0 0 60px skyblue;
  }

  to {
    box-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue,
      0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
  }
}

.el-pagination {
  position: absolute;
  right: 60px;
  bottom: 60px;
}

.el-image {
  width: 90px;
  height: 90px;
  padding-top: 20px;
}

.el-image /deep/ .el-image__inner {
  border-radius: 50%;
}

.icon-close {
  position: absolute;
  right: 15px;
  top: 15px;
}

.characters {
  text-align: center;
  margin-top: 5px;
  color: white;
  font-size: 18px;
  font-weight: 800;
}

.Drawer {
  width: 100%;
  height: 100%;
  display: flex;
}

.Drawer_left {
  width: 50%;
  height: 100%;
}

.Drawer_right {
  width: 50%;
  height: 100%;
}

.Drawer_right img {
  max-width: 100%;
  max-height: 100%;
}

.hidden {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: black;
  font-weight: 800;
  padding-top: 15px;
}
</style>