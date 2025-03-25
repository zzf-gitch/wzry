<template>
  <div class="head">
    <div class="ipt">
      <el-input size="small" placeholder="快速搜索" />
    </div>
    <div class="ipt_icon">
      <el-tooltip
        class="item"
        effect="dark"
        content="新建"
        placement="top-start"
      >
        <span
          class="iconfont icon-xinjian"
          @click="isShow"
        ></span>
      </el-tooltip>
    </div>
  </div>
  <div class="box" v-for="(item, index) in state.data" :key="index">
    <div class="box_1">
      <div class="box_2">
        <div class="img">
          <img class="img_yx" :src="item.headimg" />
        </div>
        <div class="jineng" >
            <div class="jineng_hero" v-for="(info,i) in item.skills" :key="i">
            <img style="width:70px;height:70px" :src="info.img">
            <div class="jineng_box">
            <div class="jn">技能名字：{{info.name}}</div>
            <div class="jn">技能CD：{{info.cd}}</div>
            <div class="jn">技能冷却：{{info.consume}}</div>
            <div class="jn">技能描述：{{info.desc}}</div>
            </div>
            </div>
        </div>
      </div>
      <div class="form">
              <div style="display:flex">
                  <h1 style="color:#5c86e4;font-size:24px;font-weight:800;">英雄基本信息</h1>
                  <el-button style="margin-left:30px" type="primary" round @click="onSubmit(item)">点击查看英雄基本信息</el-button>
              </div>
          <div class="hero_info">
              <div class="warp"><el-tooltip class="box-item"  :disabled="isShowtooltip" effect="dark" :content="item.name" placement="top"><div @mouseenter="event($event)">英雄名字：{{item.name}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.Position" placement="top"><div @mouseenter="event($event)">英雄定位：{{item.Position}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.stature" placement="top"><div @mouseenter="event($event)">英雄身高：{{item.stature}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.Specialty" placement="top"><div @mouseenter="event($event)">英雄特长：{{item.Specialty}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.title" placement="top"><div @mouseenter="event($event)">英雄称号：{{item.title}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.money" placement="top"><div @mouseenter="event($event)">英雄价格/兑换：{{item.money}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.time" placement="top"><div @mouseenter="event($event)">英雄上架时间：{{item.time}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.Damage" placement="top"><div @mouseenter="event($event)">攻击伤害：{{item.Damage}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.viability" placement="top"><div @mouseenter="event($event)">生存能力：{{item.viability}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.Skill" placement="top" ><div @mouseenter="event($event)">技能效果：{{item.Skill}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.difficulty" placement="top" ><div @mouseenter="event($event)">上手难度：{{item.difficulty}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.story" placement="top" ><div @mouseenter="event($event)">英雄背景故事：{{item.story}}</div></el-tooltip></div>
              <div class="warp"><el-tooltip class="box-item" :disabled="isShowtooltip" effect="dark" :content="item.history" placement="top" ><div @mouseenter="event($event)">英雄历史原型：{{item.history}}</div></el-tooltip></div>
          </div>
      </div>
    </div>
  </div>

  <newFromVue v-if="Show" @goBack="goBack" :getlist="getlist" :oneData="oneDate" :msg="msg"></newFromVue>
</template>

<script setup>
import { getHeroInfo } from "../../../../api/heromain/hero/transfer";
import newFromVue from '../../../../components/newForm.vue';
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
const router = useRouter();
const route = useRoute();
const store = useStore();
const state = reactive({
  data: [],
});
const isShowtooltip=ref(true);
const Show = ref(false)//表单状态
const oneDate = ref('')
const msg = ref('')
const isShow=()=>{
  msg.value='新建'
  Show.value = true;
}
const goBack = (e) => {
  Show.value = e
}
//判断如果溢出就显示文字提示不溢出就不显示文字提示
const event=(event)=>{
  console.log(event);
  const e=event.target
  console.log(e);
  //文本的实际宽度 scrollWidth：对象的实际内容的宽度，不包边线宽度，会随对象中内容超过可视区后而变大
  const e_weight=e.scrollWidth
  console.log(e_weight);
  //文本的可视宽度 clientWidth：对象内容的可视区的宽度，不包滚动条等边线，会随对象显示大小的变化而改变
  const content_weight=e.clientWidth
  console.log(content_weight);
  //文本的实际宽度大于文本的可视宽度  文字溢出
  if(e_weight>content_weight){
    isShowtooltip.value=false;
  }else{
    isShowtooltip.value=true
  }
}
const getlist = async () => {
  await getHeroInfo().then((res) => {
    console.log(res.data.heroList);
    state.data = res.data.heroList;
  });
};
const onSubmit=(item)=>{
    console.log(item);
    msg.value="编辑"
    oneDate.value={
      item:item
    }
    Show.value=true
}
onMounted(() => {
  getlist();
});
</script>

<style lang="scss" scoped="scoped">
.head {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  .ipt {
    .el-input {
      width: 180px;
      position: absolute;
      right: 50px;
      .el-input__inner {
        width: 180px;
      }
    }
  }

  .ipt_icon {
    color: #64bdf0;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    .icon-xinjian {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
}
.box {
  width: 100%;
  height: calc(100% - 32px);
  margin-top: 50px;
  // border-bottom: 1px solid black;
  .box_1 {
    width: 100%;
    height: 100%;
    display: flex;
    .box_2 {
      width: 60%;
      height: 100%;
    display: flex;
      .img {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        .img_yx {
          width: 80%;
          height: 10%;
          border-radius: 50%;
        }
      }
      .jineng{
          width: 80%;
          height: 100%;
          color: white;
          font-weight: 800;
        //   display:flex;
        .jineng_hero {
            display: flex;
            justify-content: center;
            align-items:center;
            padding-top: 20px;
            .jineng_box {
                padding-left: 30px;
                .jn{
                    padding-top: 8px;
                    color: white;
                   
                }
            }
        }
      }
    }

    .form {
      width: 50%;
      height: 100%;
      color: white;
      .hero_info {
          height: calc(100% - 25px);
          padding-top:15px;
          .warp{
              padding-top: 15px;
              color: white;
              font-weight: 800;
              overflow: hidden;
	            text-overflow: ellipsis;
		          white-space: nowrap;
          }
      }
    }
  }
}
</style>