<template>
  <div class="stxx">
    <div class="head">
      <div class="ipt">
        <el-input
          v-model="input"
          :suffix-icon="Search"
          :placeholder="str"
          clearable
          class="input"
        />
      </div>
      <el-button :icon="Search" circle @click="searchData" />
      <el-button class="add" type="primary" :icon="Edit" circle @click="add" />
    </div>
    <div class="stxx_main">
      <div class="stxx_hero" v-for="(item, index) in state.slice((currentpage-1)*pagesize,currentpage*pagesize)" :key="index">
        <div class="stxx_img">
           <el-button class="info" @click="pirew(item)" color="#e1e2e2" :icon="Message" circle />
          <img class="img" :src="item.poster" alt="" />
          <i class="iconfont icon-close" @click="del(item, index)"></i>
        </div>
        <div class="stxx_heroinfo">
          <div style="display: flex">
            <div class="wz">{{ item.name }}</div>
            <div class="wz">{{ item.title }}</div>
          </div>
          <div style="display:flex;align-items: center;justify-content: center;position: relative;">
            <div class="money">{{ item.money }}</div>
          <el-button class="button" type="success" :icon="Check" circle @click="Sticky(item,index)"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览英雄信息 -->
    <el-drawer
      v-model="visible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :direction="direction"
      :before-close="handleClose"
    >
      <template #title="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">Previewing hero Information!</h4>
        <el-button type="danger" @click="handleClose">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </template>
      <div class="drawer">
        <div class="drawer_left">
          <div class="warp">英雄名字：{{from.name}}</div>
          <div class="warp">英雄称号：{{from.title}}</div>
          <div class="warp">英雄价格：{{from.money}}</div>
          <div class="warp">英雄定位：{{from.Position}}</div>
          <div class="warp">英雄身高：{{from.stature}}</div>
          <div class="warp">英雄特长：{{from.Specialty}}</div>
          <div class="warp">英雄上架时间：{{from.time}}</div>
          <div class="warp">攻击伤害：{{from.Damage}}</div>
          <div class="warp">生存能力：{{from.viability}}</div>
          <div class="warp">技能效果：{{from.Skill}}</div>
          <div class="warp">上手难度：{{from.difficulty}}</div>
          <div class="warp">英雄背景故事：{{from.story}}</div>
          <div class="warp">英雄历史原型：{{from.history}}</div>
        </div>
        <div class="drawer_right">
          <img :src="from.img" alt="">
        </div>
      </div>
    </el-drawer>

    <!-- 新增英雄信息 -->
    <el-dialog
      v-model="dialog"
      :show-close="false"
      :before-close="handleClosedialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template #title="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">
            Added basic hero information!
          </h4>
          <el-button type="danger" @click="handleClosedialog">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-select
          @change="handcity"
          v-model="ruleForm.valueprovince"
          clearable
          placeholder="省"
          prop="province"
        >
          <el-option
            v-for="item in ruleForm.province"
            :key="item.zcode"
            :label="item.name"
            :value="item.zcode"
          />
        </el-select>
        <el-select
          @change="handcounty"
          v-model="ruleForm.valuecity"
          clearable
          placeholder="市"
          prop="city"
        >
          <el-option
            v-for="item in ruleForm.city"
            :key="item.zcode"
            :label="item.name"
            :value="item.zcode"
          />
        </el-select>
        <el-select v-model="ruleForm.valuecounty" clearable placeholder="县">
          <el-option
            v-for="item in ruleForm.county"
            :key="item.zcode"
            :label="item.name"
            :value="item.zcode"
            prop="county"
          />
        </el-select>
        <el-form-item label="英雄名字" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入英雄名字"/>
        </el-form-item>
        <el-form-item label="英雄定位" prop="Position">
          <el-input v-model="ruleForm.Position" placeholder="请输入英雄定位"/>
        </el-form-item>
        <el-form-item label="英雄身高" prop="stature">
          <el-input v-model="ruleForm.stature" placeholder="请输入英雄身高"/>
        </el-form-item>
        <el-form-item label="英雄特长" prop="Specialty">
          <el-input v-model="ruleForm.Specialty" placeholder="请输入英雄特长"/>
        </el-form-item>
        <el-form-item label="英雄称号" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入英雄称号"/>
        </el-form-item>
        <el-form-item label="英雄价格/兑换" prop="money">
          <el-input v-model="ruleForm.money" placeholder="请输入英雄价格"/>
        </el-form-item>
        <el-form-item label="英雄上架时间" prop="time">
          <el-input v-model="ruleForm.time" placeholder="请输入英雄上架时间"/>
        </el-form-item>
        <el-form-item label="攻击伤害" prop="Damage">
          <el-input v-model="ruleForm.Damage" placeholder="请输入攻击伤害"/>
        </el-form-item>
        <el-form-item label="生存能力" prop="viability">
          <el-input v-model="ruleForm.viability" placeholder="请输入生存能力"/>
        </el-form-item>
        <el-form-item label="技能效果" prop="Skill">
          <el-input v-model="ruleForm.Skill" placeholder="请输入技能效果"/>
        </el-form-item>
        <el-form-item label="上手难度" prop="difficulty">
          <el-input v-model="ruleForm.difficulty" placeholder="请输入上手难度"/>
        </el-form-item>
        <el-form-item label="英雄背景故事" prop="story">
          <el-input v-model="ruleForm.story" type="textarea" placeholder="请输入英雄背景故事"/>
        </el-form-item>
        <el-form-item label="英雄历史原型" prop="history">
          <el-input v-model="ruleForm.history" type="textarea" placeholder="请输入英雄历史原型"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="adddialoghero">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <!-- 分页 -->
  <el-pagination
    small
    background
    layout="prev, pager, next, total, jumper"
    :total="state.length"
    :current-page="currentpage"
    :page-size="pagesize"
    @current-change="handcurrentchange"
    class="mt-4"
  />
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
import { ElMessage, ElMessageBox } from "element-plus";
import { getHeroInfocard, getcityinfo } from "@/api/heromain/hero/transfer.js";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { Search, Check,CirclePlusFilled,Message, Edit,CircleCloseFilled } from "@element-plus/icons";
import {
  successmessage,
  infomessage,
  errormessage,
  warningmessage,
} from "@/api/message.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const currentpage=ref(1)
const pagesize=ref(8)
const handcurrentchange=(val)=>{
  console.log(val);
  currentpage.value=val
}
const state = ref([]);
const direction = ref("rtl");
const visible = ref(false);
const dialog = ref(false);
const ruleForm = reactive({
  //省的默认值
  valueprovince: "",
  //市的默认值
  valuecity: "",
  //县的默认值
  valuecounty: "",
  //存储省的数组
  province: [],
  //存储市的数组
  city: [],
  //存储县的数组
  county: [],
  //英雄名字
  name:'',
  //英雄定位
  Position:'',
  //英雄身高
  stature:'',
  //英雄特长
  Specialty:'',
  //英雄称号
  title:'',
  //英雄价格
  money:'',
  //英雄上架时间
  time:'',
  //攻击伤害
  Damage:'',
  //生存能力
  viability:'',
  //技能效果
  Skill:'',
  //上手难度
  difficulty:'',
  //英雄背景故事
  story:'',
  //英雄历史原型
  history:''
});

//获取所有数据
const getlist = async () => {
  await getHeroInfocard().then((res) => {
    console.log(res.data.herolist);
    state.value = res.data.herolist;
  });
};
//获取省的数据
const getcity = async () => {
  await getcityinfo().then((res) => {
    console.log(res.data);
    ruleForm.province = res.data;
  });
};
//根据省的value值获取市的数据
const handcity = (val) => {
  // for (let i = 0; i < ruleForm.province.length; i++) {
  //   let id = ruleForm.province[i].zcode;
  //   console.log(id);
  //   if (id == val) {
  //     let state = ruleForm.province[i].subList;
  //     ruleForm.city = state;
  //   }
  // }
  for(let item of ruleForm.province){
    if(val == item.zcode){
      ruleForm.city = item.subList
    }
  }
};
//根据市的value值获取县的数据
const handcounty = (val) => {
  // for (let i = 0; i < ruleForm.city.length; i++) {
  //   let id = ruleForm.city[i].zcode;
  //   if (id == val) {
  //     let state = ruleForm.city[i].subList;
  //     ruleForm.county = state;
  //   }
  // }
  for(let item of ruleForm.city){
    if(val == item.zcode){
      ruleForm.county = item.subList
    }
  }
};
const str = ref("")
const changestr = () =>{
  let arr = ['快速搜索','VUE3','VUE2','UNIAPP','WXAPP','KING','WATCH']
  let index = Math.floor(Math.random() * arr.length)
  str.value = arr[index];
  const timer = setTimeout(()=>{
    changestr()
  },1000)
}
//规则
const rules = reactive({
  province: [{ required: true, message: " ", trigger: "blur" }],
  city: [{ required: true, message: " ", trigger: "blur" }],
  county: [{ required: true, message: " ", trigger: "blur" }],
  name:[{ required: true, message: " ", trigger: "blur"}],
  Position: [{ required: true, message: " ", trigger: "blur" }],
  stature: [{ required: true, message: " ", trigger: "blur" }],
  Specialty: [{ required: true, message: " ", trigger: "blur" }],
  title: [{ required: true, message: " ", trigger: "blur" }],
  money: [{ required: true, message: " ", trigger: "blur" }],
  time: [{ required: true, message: " ", trigger: "blur" }],
  Damage: [{ required: true, message: " ", trigger: "blur" }],
  viability: [{ required: true, message: " ", trigger: "blur" }],
  Skill: [{ required: true, message: " ", trigger: "blur" }],
  difficulty: [{ required: true, message: " ", trigger: "blur" }],
  story: [{ required: true, message: " ", trigger: "blur" }],
  history: [{ required: true, message: " ", trigger: "blur" }],
});
//删除英雄基本信息
const del = (item, index) => {
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      successmessage("删除成功");
      const i = state.value.indexOf(item)
      if(i > -1){
        state.value.splice(index,1)
      }
    })
    .catch(() => {
      infomessage("删除取消");
    });
};
// 关闭预览英雄基本信息Drawer
const handleClose = () => {
  ElMessageBox.confirm("你确定要关闭吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      successmessage("关闭成功");
      visible.value = false;
    })
    .catch(() => {
      infomessage("关闭取消");
    });
};
//关闭新增英雄基本信息dialog
const handleClosedialog = () => {
  ElMessageBox.confirm("你确定要关闭吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      successmessage("关闭成功");
      dialog.value = false;
    })
    .catch(() => {
      infomessage("关闭取消");
    });
};
//清空函数
const reset = () => {
  ruleForm.valueprovince = "";
  ruleForm.valuecity = "";
  ruleForm.valuecounty = "";
  ruleForm.name="";
  ruleForm.Position=""
  ruleForm.stature=""
  ruleForm.Specialty=""
  ruleForm.title=""
  ruleForm.money=""
  ruleForm.time=""
  ruleForm.Damage=""
  ruleForm.viability=""
  ruleForm.Skill=""
  ruleForm.difficulty=""
  ruleForm.story=""
  ruleForm.history=""
};
//打开新增英雄基本信息dialog
const add = () => {
  dialog.value = true;
  reset();
};
//预览英雄信息的对象
const from=reactive({
  img:'',
  name:'',
  title:'',
  money:'',
  Position:'',
  stature:'',
  Specialty:'',
  time:'',
  Damage:'',
  viability:'',
  Skill:'',
  difficulty:'',
  story:'',
  history:''
})
//打开预览英雄基本信息Drawer
const pirew = (item) => {
  visible.value = true;
  console.log(item)
  from.img=item.cover
  from.name=item.name
  from.title=item.title
  from.money=item.money
  from.Position=item.Position
  from.stature=item.stature
  from.Specialty=item.Specialty
  from.time=item.time
  from.Damage=item.Damage
  from.viability=item.viability
  from.Skill=item.Skill
  from.difficulty=item.difficulty
  from.story=item.story
  from.history=item.history
};
const obj=ref({})
//置顶
const Sticky=(item,index)=>{
  for(let i=0;i<state.value.length;i++){
    let name=state.value[i].name
    if(name==item.name){
      obj.value=item
      const i = state.value.indexOf(item)
      if(i > -1){
        state.value.splice(index,1)
      }
    }
  }
  state.value.unshift(obj.value)
}
//新增英雄基本信息dialog
const adddialoghero = () => {
  if (ruleForm.valueprovince == "") {
    warningmessage("请选择省");
  } else if (ruleForm.valuecity == "") {
    warningmessage("请选择市");
  } else if (ruleForm.valuecounty == "") {
    warningmessage("请选择县");
  }else if(ruleForm.name==''){
    warningmessage("英雄名字不能为空")
  }else if(ruleForm.Position==''){
    warningmessage("英雄定位不能为空")
  }else if(ruleForm.stature==''){
    warningmessage("英雄身高不能为空")
  }else if(ruleForm.Specialty==''){
    warningmessage("英雄特长不能为空")
  }else if(ruleForm.title==''){
    warningmessage("英雄称号不能为空")
  }else if(ruleForm.money==''){
    warningmessage("英雄价格不能为空")
  }else if(ruleForm.time==''){
    warningmessage("英雄上架时间不能为空")
  }else if(ruleForm.Damage==''){
    warningmessage("攻击伤害不能为空")
  }else if(ruleForm.viability==''){
    warningmessage("生存能力不能为空")
  }else if(ruleForm.Skill==''){
    warningmessage("技能效果不能为空")
  }else if(ruleForm.difficulty==''){
    warningmessage("上手难度不能为空")
  }else if(ruleForm.story==''){
    warningmessage("英雄背景故事不能为空")
  }else if(ruleForm.history==''){
    warningmessage("英雄历史原型不能为空")
  }else{
    let add={
      valueprovince: ruleForm.valueprovince,
      valuecity:ruleForm.valuecity,
      valuecounty: ruleForm.valuecounty,
      name: ruleForm.name,
      Position: ruleForm.Position,
      stature: ruleForm.stature,
      Specialty: ruleForm.Specialty,
      title: ruleForm.title,
      money: ruleForm.money,
      time: ruleForm.time,
      Damage: ruleForm.Damage,
      viability: ruleForm.viability,
      Skill: ruleForm.Skill,
      difficulty: ruleForm.difficulty,
      story: ruleForm.story,
      history: ruleForm.history,
    }
    state.value.push(add);
    dialog.value=false
    successmessage("添加成功")
  }
};
const input = ref("");
// 搜索功能
const list = async () => {
  await getlist()
  let list = state.value.filter(hero=>hero.name.toLowerCase().includes(input.value.toLocaleLowerCase()) || hero.id.toLowerCase().includes(input.value.toLowerCase()))
  console.log(list);
  state.value=list
  if(state.value.length==false){
    errormessage("英雄不存在")
  }  
};
const searchData = () => {
  list();
};
onMounted(() => {
  getlist();
  getcity();
  changestr()
});
</script>

<style scoped>
.stxx {
  width: 100%;
  height: 100%;
}

.stxx_main {
  width: 100%;
  height: 30%;
  display: flex;
  flex-wrap: wrap;
}

.stxx_hero {
  width: 20%;
  height: 100%;
  margin-top: 20px;
  margin-left: 70px;
  animation: line 0.5s alternate infinite linear;
  border-radius: 15px;
}

.stxx_img {
  width: 100%;
  height: 70%;
  border-radius: 15px 15px 0px 0px;
  position: relative;
}

.img {
  width: 100%;
  height: 100%;
  border-radius: 15px 15px 0px 0px;
}

.stxx_heroinfo {
  width: 100%;
  height: 30%;
  background-color: whitesmoke;
  border-radius: 0px 0px 15px 15px;
}

@keyframes line {
  0% {
    box-shadow: 0 0 10px #60a6ae, 0 0 20px #60a6ae, 0 0 30px #60a6ae,
      0 0 40px #60a6ae, 0 0 50px #60a6ae, 0 0 60px #60a6ae;
  }

  100% {
    box-shadow: 0 0 5px skyblue, 0 0 10px skyblue, 0 0 15px skyblue,
      0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
  }
}

.wz {
  text-align: center;
  font-size: 16px;
  margin: 0 auto;
  color: whitesmoke;
  margin-top: 10px;
  animation: zzf 0.5s alternate infinite;
  font-family: Neon80sRegular, Arial Narrow, sans-serif;
  letter-spacing: 0.2rem;
}
.money {
  margin-top: 10px;
  color: whitesmoke;
  animation: zzf 0.5s infinite;
  font-family: Neon80sRegular, Arial Narrow, sans-serif;
  letter-spacing: 0.3rem;
}

@keyframes zzf {
  from {
    text-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue,
      0 0 40px lightblue, 0 0 50px lightblue, 0 0 60px lightblue;
  }

  to {
    text-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue,
      0 0 20px lightblue, 0 0 25px lightblue, 0 0 30px lightblue;
  }
}
.icon-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  border-radius: 50%;
}
.head {
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 0.625rem;
}
.el-input__inner {
  width: 180px;
}
.input {
  width: 180px !important;
  margin-right: 20px;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-select {
  margin-left: 20px;
}
.el-form-item{
  margin-top: 15px;
}
.el-form-item /deep/ .el-form-item__label{
  width: 120px !important;
}
.el-input{
  width: 95%;
}
.button{
  position:absolute;
  right: 10px;
}
.info{
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.7;
}
.drawer{
  width: 100%;
  height: 100%;
  display:flex;
}
.drawer_left{
  width: 50%;
  height: 100%;
}
.drawer_right{
  width: 50%;
  height: 100%;
}
.drawer_right img{
  max-width: 100%;
  max-height: 100%;
}
.warp{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 15px;
  font-weight: 800;
  color: black;
}
.el-pagination{
  position: absolute;
  right: 60px;
  bottom: 60px;
}
</style>