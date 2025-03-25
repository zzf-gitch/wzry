<template>
  <div class="dzzl">
    <div class="head">
      <div class="ipt">
        <el-input
          v-model="state.input"
          :suffix-icon="Search"
          placeholder="快速搜索"
          @click="searchData"
          clearable
        />
      </div>
      <div class="ipt_icon">
        <el-tooltip
          class="item"
          effect="dark"
          content="新建"
          placement="top-start"
        >
          <span class="iconfont icon-xinjian" @click="xinjian"></span>
        </el-tooltip>
      </div>
    </div>

    <div class="main_ddzl">
      <el-card
        class="bleft list"
        shadow="always"
        :body-style="{ padding: '0' }"
        v-for="(item, index) in date.datas.slice(
          (currentPage - 1) * Pagesize,
          currentPage * Pagesize
        )"
        :key="index"
      >
        <div class="ul">
          <li class="li">英雄名字：{{ item.name }}</li>
          <li class="li">英雄定位：{{ item.Position }}</li>
          <li class="li">英雄特长：{{ item.Specialty }}</li>
          <li class="li">英雄称号：{{ item.title }}</li>
          <li class="li">英雄价格：{{ item.money }}</li>
          <li class="li">英雄上架时间：{{ item.time }}</li>
          <li class="li">英雄身高：{{ item.stature }}</li>
          <li class="li">英雄皮肤：{{ item.pf }}</li>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-end"
          >
            <span class="iconfont icon-icon" @click="upd(item, index)"></span>
          </el-tooltip>
          <el-tooltip
            class="item"
            content="删除"
            effect="dark"
            placement="top-start"
          >
            <span
              class="iconfont icon-shanchu"
              @click="del(item, index)"
            ></span>
          </el-tooltip>
        </div>
      </el-card>
    </div>
    <CountTo :start='start' :end='end' prefix="$" suffix="rmb" :autoPlay="true" :duration='duration' />
    <!-- 分页 -->
    <!-- @size-change="handleSizeChange" -->
    <el-pagination
      small
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next, total"
      :total="date.datas.length"
      :current-page="currentPage"
      :page-size="Pagesize"
      class="mt-4"
    />

    <newForm v-if="show" @goBack="goBack" :msg="msg" :oneData="oneData" :getlist="getlist" :data="date.datas"></newForm>
  </div>
</template>

<script setup>
import {
  getHeroInfocard,
  delHerocard,
} from "../../../../api/heromain/hero/transfer.js";
import newForm from '../../../../components/newcardForm.vue'
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
import {errormessage} from '@/api/message.js'
import { Search } from "@element-plus/icons";
const state = reactive({
  input: "",
});
const start = ref(10)
const end = ref(200000009849)
const duration = ref(10000)
const msg=ref('')
const show=ref(false);
const currentPage = ref(1);
const Pagesize = ref(10);
// const handleSizeChange = (valsize) => {
//   Pagesize.value = valsize;
//   currentPage.value = 1;
// };
const handleCurrentChange = (valpage) => {
  console.log(valpage);
  currentPage.value = valpage;
};
const searchData=()=>{
  currentPage.value = 1;
  list();
}
const list=async()=>{
         await getlist();
            //前端过滤条件查询信息
            let list = date.datas.filter(hero => hero.name.toLowerCase().includes(state.input.toLowerCase()) || hero.id.toLowerCase().includes(state.input.toLowerCase()));
            console.log(list);
            //二次赋值
            date.datas = list;
            // list.filter((block,index) => index < currentPage.value * Pagesize.value && index >= Pagesize.value * (currentPage.value - 1));
            // date.datas.length = list.length
            if(date.datas.length == ''){
                errormessage('英雄信息不存在')
            }
}
//新建
const xinjian=()=>{
    msg.value='新建'
    show.value=true;
}
//编辑
const oneData=ref('')
const upd=(item,index)=>{
    msg.value='编辑'
    show.value=true;
    oneData.value={
        item:item
    }
}
const goBack=(e)=>{
    console.log(e);
    show.value=e;
}
const store = useStore();
const router = useRouter();
const route = useRoute();
const date = reactive({
  datas: [],
});
const del = (item,index) => {
  console.log(item);
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    const i = date.datas.indexOf(item)
    if(i > -1){
      date.datas.splice(index,1)
    }
      ElMessage({
        type: "success",
        message: "删除成功",
      });
  })
  .catch(() => {
    ElMessage({
      type: "info",
      message: "删除失败",
    });
  });
};
const getlist = async() => {
  await getHeroInfocard().then((res) => {
    console.log(res.data);
    date.datas = res.data.herolist;
  });
};
onMounted(() => {
  getlist();
});
</script>

<style scoped lang="scss">
.dzzl {
  width: 100%;
  height: 100%;
  .head {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .ipt {
      .el-input {
        width: 180px;
        .el-input__inner {
          width: 180px;
        }
      }
    }
    .ipt_icon {
      color: #64bdf0;
      padding: 0 0 0 10px;
      padding-right: 20px;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .main_ddzl {
    height: calc(100% - 50px);
    .list {
      margin-top: 10px;
      margin-left: 20px;
      margin-right: 20px;
      .ul {
        padding: 10px;
        display: grid;
        list-style: none;
        position: relative;
        grid-template-columns: 1.8fr 2fr 2fr 2.5fr 3fr 2.5fr 2fr 2fr 0.2fr 0.1fr;
        .li {
          line-height: 25px;
          font-weight: bold;
          .icon-icon {
            position: absolute;
            right: 10px;
            top: 10px;
          }
          .icon-shanchu {
            position: absolute;
            right: 30px;
            top: 30px;
          }
        }
      }
    }
  }
  .el-pagination {
    position: absolute;
    bottom: 60px;
    right: 60px;
  }
}
</style>