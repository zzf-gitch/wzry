<template>
  <div class="zhanji">
    <div class="cardlist1">
      <div class="HeroCard" v-for="(item, index) in state.data" :key="index">
        <div class="id">No.{{ item.id }}</div>
        <div class="select-mask">
          <img :src="item.headimg" alt="" class="head" />
          <h1
            class="view cursor-pointer"
            @click="go(item)"
            @mouseenter="mouseOver"
            @mouseleave="mouseLeave"
            :style="active"
          >
            查看详情
          </h1>
          <div
            class="line"
            :class="{ lineActive: lineActive }"
            ref="line"
          ></div>
          <el-button class="button" type="danger" @click="del(item, index)"
            >删除英雄</el-button
          >
        </div>
        <img
          class="bg"
          :src="item.cover"
          :style="{
            top: item.offset.top,
            transform: item.offset.transform,
          }"
        />
        <div class="bottom">
          <div class="name">{{ item.name }}</div>
          <div class="mark">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getHeroInfo } from "@/api/heromain/hero/transfer";
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
import { successmessage, infomessage } from "@/api/message.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = reactive({
  id: "",
  data: [],
});
const lineActive = ref(false);
const active = ref("");
const mouseOver = () => {
  active.value = "color:#000a48";
  lineActive.value = true;
};
const mouseLeave = () => {
  active.value = "color:white";
  lineActive.value = false;
};
const getlist = async () => {
  await getHeroInfo().then((res) => {
    console.log(res.data);
    state.data = res.data.heroList;
  });
};
const go = (item) => {
  console.log(item);
  router.push({ name: "heroInfo"});
  store.commit('heroinfo',item);
};
const del = (item, index) => {
  console.log(item);
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const i = state.data.indexOf(item)
      if(i > -1){
        state.data.splice(index,1)
      }
      successmessage("删除成功");
    })
    .catch(() => {
      infomessage("删除失败");
    });
};
onMounted(() => {
  getlist();
});
</script>

<style scoped lang="scss">
.zhanji {
  width: 100%;
  height: 100%;
  .cardlist1 {
    width: 100%;
    height: 30%;
    display: flex;
    flex-wrap: wrap;
    .HeroCard {
      display: flex;
      position: relative;
      word-break: break-all;
      flex-direction: column;
      word-wrap: break-word;
      margin-top:1rem;
      margin-left: 15px;
      width: 10%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.25);
      transition: all 0.35s cubic-bezier(0, 0.88, 0.52, 1.67);
      box-shadow: 0 5px 10px 5px rgba(0, 0, 0, 0.75);
      cursor: pointer;
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.75);
        .select-mask {
          opacity: 1;
          transition: all 0.5s 0.25s;
        }
        .bottom {
          @keyframes springbackL {
            33% {
              transform: translateY(-10px);
            }
            75% {
              transform: translateY(5px);
            }
            0%,
            100% {
              transform: translateY(0px);
            }
          }
          .name {
            animation: springbackL 0.5s 0.1s;
          }
          .mark {
            animation: springbackL 0.5s 0.025s;
          }
        }
        .id {
          animation: springbackS 0.5s 0.025s;
          @keyframes springbackS {
            33% {
              transform: translateY(-5px);
            }
            75% {
              transform: translateY(5px);
            }
            0%,
            100% {
              transform: translateY(0px);
            }
          }
        }
      }
      .id {
        z-index: 1;
        font-size: 16px;
        color: white;
        margin: 15px;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        pointer-events: none;
      }
      .select-mask {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
        z-index: 2;
        opacity: 0;
        transition: all 0.5s;
        .head {
          border-radius: 50%;
          width: 50%;
          margin-bottom: 15px;
        }
        .view {
          color: white;
          transition: all 0.5s;
        }

        .line {
          width: 0%;
          height: 3px;
          transition: all 0.25s;
          background-color: #000a48;
        }
        .lineActive {
          width: 8em !important;
        }
      }
      .bg {
        position: absolute;
        min-width: 100%;
        max-height: 100%;
        pointer-events: none;
      }
      .bottom {
        display: flex;
        z-index: 1;
        position: absolute;
        bottom: 0;
        width: 100%;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
        .name {
          width: fit-content;
          color: white;
          font-size: 16px;
          line-height: 1;
          margin-bottom: 5px;
          font-weight: 800;
        }
        .mark {
          color: white;
          font-weight: 800;
          font-size: 14px;
        }
      }
      .button {
        margin-top: 20px;
        margin-bottom: -40px;
      }
    }
  }
}

</style>