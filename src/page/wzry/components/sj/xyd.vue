<template>
  <div class="box">
    <div class="head">
        <el-input
          v-model="input"
          :suffix-icon="Search"
          :placeholder="strr"
          clearable
          class="input"
        />
      <el-button :icon="Search" circle @click="searchData" />
      <el-button class="add" type="primary" :icon="Edit" circle @click="add" />
    </div>
    <div class="box_main">
      <div class="box_hero" v-for="(item, index) in state.slice((currentPage - 1) * Pagesize, currentPage * Pagesize)" :key="index">
        <div style="display: flex; justify-content: center">
          <el-image
            class="image"
            :src="item.headimg"
            :preview-src-list="item.url"
            :initial-index="item.length"
            fit="cover"
          />
        </div>
        <i class="iconfont icon-close" @click="del(item, index)"></i>
        <div class="wz">
          <p>No.{{ item.id }}</p>
          <p>{{ item.name }}</p>
          <p>{{ item.title }}</p>
          <el-button
            style="margin-top: 5px"
            type="primary"
            @click="opendrawer(item)"
            >查看英雄</el-button
          >
          <el-button
            style="margin-top: 8px;margin-left: 0px !important;"
            color="#76cce8"
            @click="upddrawer(item,index)"
            >编辑英雄</el-button
          >
        </div>
      </div>
    </div>
    <!-- 预览英雄基本信息 -->
    <el-drawer
      v-model="visible"
      :show-close="false"
      :before-close="Close"
      :direction="direction"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template #title="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">Hero Basic Information</h4>
        <el-button type="danger" @click="Close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </template>
      <div class="main">
        <div class="main_left">
          <div class="warp">英雄名字：{{ form.name }}</div>
          <div class="warp">英雄定位：{{ form.Position }}</div>
          <div class="warp">英雄身高：{{ form.stature }}</div>
          <div class="warp">英雄特长：{{ form.Specialty }}</div>
          <div class="warp">英雄称号：{{ form.title }}</div>
          <div class="warp">英雄价格/兑换：{{ form.money }}</div>
          <div class="warp">英雄上架时间：{{ form.time }}</div>
          <div class="warp">攻击伤害：{{ form.Damage }}</div>
          <div class="warp">生存能力：{{ form.viability }}</div>
          <div class="warp">技能效果：{{ form.Skill }}</div>
          <div class="warp">上手难度：{{ form.difficulty }}</div>
          <div class="warp">英雄背景故事：{{ form.story }}</div>
          <div class="warp">英雄历史原型：{{ form.history }}</div>
        </div>
        <div class="main_right"><img :src="form.img" alt="" /></div>
      </div>
    </el-drawer>

    <!-- 添加英雄drawer -->
    <el-drawer
      v-model="Addvisible"
      :show-close="false"
      :before-close="addClose"
      :direction="directionadd"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <template #title="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass">Added basic hero information!</h4>
        <el-button type="danger" @click="addClose">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="英雄ID" prop="id">
          <el-input v-model="ruleForm.id" placeholder="请输入英雄ID" />
        </el-form-item>
        <el-form-item label="英雄名字" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入英雄名字" />
        </el-form-item>
        <el-form-item label="英雄定位" prop="Position">
          <el-input v-model="ruleForm.Position" placeholder="请输入英雄定位" />
        </el-form-item>
        <el-form-item label="英雄身高" prop="stature">
          <el-input v-model="ruleForm.stature" placeholder="请输入英雄身高" />
        </el-form-item>
        <el-form-item label="英雄特长" prop="Specialty">
          <el-input v-model="ruleForm.Specialty" placeholder="请输入英雄特长" />
        </el-form-item>
        <el-form-item label="英雄称号" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入英雄称号" />
        </el-form-item>
        <el-form-item label="英雄价格/兑换" prop="money">
          <el-input v-model="ruleForm.money" placeholder="请输入英雄价格" />
        </el-form-item>
        <el-form-item label="英雄上架时间" prop="time">
          <el-date-picker
            v-model="ruleForm.time"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请输入英雄上架时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="攻击伤害" prop="Damage">
          <el-input v-model="ruleForm.Damage" placeholder="请输入攻击伤害" />
        </el-form-item>
        <el-form-item label="生存能力" prop="viability">
          <el-input v-model="ruleForm.viability" placeholder="请输入生存能力" />
        </el-form-item>
        <el-form-item label="技能效果" prop="Skill">
          <el-input v-model="ruleForm.Skill" placeholder="请输入技能效果" />
        </el-form-item>
        <el-form-item label="上手难度" prop="difficulty">
          <el-input
            v-model="ruleForm.difficulty"
            placeholder="请输入上手难度"
          />
        </el-form-item>
        <el-form-item label="英雄背景故事" prop="story">
          <el-input v-model="ruleForm.story" type="textarea" />
        </el-form-item>
        <el-form-item label="英雄历史原型" prop="history">
          <el-input v-model="ruleForm.history" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button type="primary" @click="confirmClick">{{str.msg ? '添加英雄' : '修改英雄'}}</el-button>
        </div>
      </template>
    </el-drawer>
  </div>

  <!-- 分页 -->
  <!-- @size-change="handleSizeChange" -->
  <el-pagination
    small
    background
    @current-change="handleCurrentChange"
    layout="prev, pager, next, total,jumper"
    :total="state.length"
    :current-page="currentPage"
    :page-size="Pagesize"
    class="mt-4"
  />
</template>

<script setup>
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { Search, CirclePlusFilled, Edit } from "@element-plus/icons";
import { getHeroInfocard } from "@/api/heromain/hero/transfer.js";
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
const direction = ref("rtl");
const directionadd = ref("ltr");
const visible = ref(false);
const Addvisible = ref(false);
const state = ref([]);
const input = ref("");
const currentPage=ref(1)
const Pagesize=ref(9)
const str = reactive({
  msg:''
})
const strr=ref('')
//添加英雄对象属性
const ruleForm = reactive({
  name: "",
  Position: "",
  stature: "",
  Specialty: "",
  title: "",
  money: "",
  time: "",
  Damage: "",
  viability: "",
  Skill: "",
  difficulty: "",
  story: "",
  history: "",
  id:''
});
//清空函数
const reset = () => {
  ruleForm.id=''
  ruleForm.name=''
  ruleForm.Position=''
  ruleForm.stature=''
  ruleForm.Specialty=''
  ruleForm.title=''
  ruleForm.money=''
  ruleForm.time=''
  ruleForm.Damage=''
  ruleForm.viability=''
  ruleForm.Skill=''
  ruleForm.difficulty=''
  ruleForm.story=''
  ruleForm.history=''
};
const rules = reactive({
  id: [{ required: true, message: " ", trigger: "blur" }],
  name: [{ required: true, message: " ", trigger: "blur" }],
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
const confirmClick = () => {
  if(str?.msg){
    if (ruleForm.id == "") {
    warningmessage("请输入英雄ID");
  } else if (ruleForm.name == "") {
    warningmessage("请输入英雄名字");
  } else if (ruleForm.Position == "") {
    warningmessage("请输入英雄定位");
  } else if (ruleForm.stature == "") {
    warningmessage("请输入英雄身高");
  } else if (ruleForm.Specialty == "") {
    warningmessage("请输入英雄特长");
  } else if (ruleForm.title == "") {
    warningmessage("请输入英雄称号");
  } else if (ruleForm.money == "") {
    warningmessage("请输入英雄价格");
  } else if (ruleForm.time == "") {
    warningmessage("请输入英雄上架时间");
  } else if (ruleForm.Damage == "") {
    warningmessage("请输入攻击伤害");
  } else if (ruleForm.viability == "") {
    warningmessage("请输入生存能力");
  } else if (ruleForm.Skill == "") {
    warningmessage("请输入技能效果");
  } else if (ruleForm.difficulty == "") {
    warningmessage("请输入上手难度");
  } else if (ruleForm.story == "") {
    warningmessage("请输入英雄背景故事");
  } else if(ruleForm.history == ""){
    warningmessage("请输入英雄历史原型");
  }else{
    let data = {
      id: ruleForm.id,
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
    };
    state.value.push(data);
    Addvisible.value = false;
    successmessage("添加成功");
  }
  }else{
    let data={
      id:ruleForm.id,
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
    state.value.splice(indexs.value,1,data)
    Addvisible.value = false
    successmessage("修改成功")
  }
};
const searchData = () => {
  currentPage.value=1
  list();
};
const list = async () => {
  await getlist();
  let list = state.value.filter((hero) =>hero.name.toLowerCase().includes(input.value.toLowerCase()) || hero.id.toLowerCase().includes(input.value.toLowerCase()));
  console.log(list);
  state.value = list;
  if (state.value.length==false) {
    errormessage("英雄不存在");
  }
};
const handleCurrentChange=(val)=>{
  currentPage.value =val
}
//预览英雄对象属性
const form = reactive({
  name: "",
  stature: "",
  img: "",
  Specialty: "",
  Position: "",
  title: "",
  time: "",
  Damage: "",
  money: "",
  Skill: "",
  viability: "",
  difficulty: "",
  story: "",
  history: "",
});
const getlist = async () => {
  await getHeroInfocard().then((res) => {
    console.log(res.data.herolist);
    state.value = res.data.herolist;
  });
};
//关闭预览英雄基本信息drawer
const Close = (done) => {
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
      infomessage("关闭失败");
    });
};
//关闭新增英雄基本信息drawer
const addClose = () => {
  ElMessageBox.confirm("你确定要关闭吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      successmessage("关闭成功");
      Addvisible.value = false;
    })
    .catch(() => {
      infomessage("关闭失败");
    });
};
//新增英雄基本信息
const add = () => {
  Addvisible.value = true;
  reset();
  str.msg="新建"
};
//编辑英雄基本信息
const indexs=ref()
const upddrawer=(item,index)=>{
  Addvisible.value = true
  str.msg=""
  ruleForm.id=item.id
  ruleForm.name=item.name
  ruleForm.Position=item.Position
  ruleForm.stature=item.stature
  ruleForm.Specialty=item.Specialty
  ruleForm.title=item.title
  ruleForm.money=item.money
  ruleForm.time=item.time
  ruleForm.Damage=item.Damage
  ruleForm.viability=item.viability
  ruleForm.Skill=item.Skill
  ruleForm.difficulty=item.difficulty
  ruleForm.story=item.story
  ruleForm.history=item.history
  console.log(index);
  indexs.value=index
}
//预览英雄基本信息
const opendrawer = (item) => {
  console.log(item);
  form.img = item.cover;
  form.name = item.name;
  form.Position = item.Position;
  form.stature = item.stature;
  form.Specialty = item.Specialty;
  form.title = item.title;
  form.time = item.time;
  form.Damage = item.Damage;
  form.money = item.money;
  form.viability = item.viability;
  form.Skill = item.Skill;
  form.difficulty = item.difficulty;
  form.story = item.story;
  form.history = item.history;
  visible.value = true;
};
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
const placehoader=()=>{
  let arr=['快速搜索','VUE3','VUE2','UNIAPP','WXAPP','KING','WATCH']
  let index=Math.floor(Math.random()*arr.length)
  strr.value=arr[index]
  setTimeout(() => {
    placehoader()
  },1000)
}
onMounted(() => {
  getlist();
  placehoader()
});
</script>


<style scoped>
.box {
  width: 100%;
  height: 100%;
}
.box_main {
  width: 100%;
  height: 35%;
  display: flex;
  flex-wrap: wrap;
}
.box_hero {
  width: 10%;
  height: 100%;
  background-color: #cce7f8;
  animation: line 0.5s alternate infinite;
  position: relative;
  margin-top: 1rem;
  margin-left: 15px;
}
@keyframes line {
  0% {
    box-shadow: 0 0 10px lightblue, 0 0 20px lightblue, 0 0 30px lightblue,
      0 0 40px skyblue, 0 0 50px skyblue, 0 0 60px skyblue;
  }

  100% {
    box-shadow: 0 0 5px lightblue, 0 0 10px lightblue, 0 0 15px lightblue,
      0 0 20px skyblue, 0 0 25px skyblue, 0 0 30px skyblue;
  }
}
.wz {
  text-align: center;
  font-size: 18px;
  font-weight: 800;
  color: white;
}
.el-image {
  width: 90px;
  height: 90px;
  margin-top: 20px;
  border-radius: 50%;
}
.icon-close {
  position: absolute;
  top: 10px;
  right: 10px;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
}
.main_left {
  width: 50%;
  height: 100%;
}
.main_right {
  width: 50%;
  height: 100%;
}
.main_right img {
  max-width: 100%;
  max-height: 100%;
}
.warp {
  padding-top: 15px;
  color: black;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.add {
  margin-right: 10px;
}
.el-input {
  width: 100%;
}
.el-pagination {
  position: absolute;
  bottom: 60px;
  right: 60px;
}
</style>