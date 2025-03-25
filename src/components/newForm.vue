
<template>
  <popup-drawer>
    <template #popheader>
      <i class="iconfont icon-qingkong-" content="清空" @click="reset"></i>
      <i class="iconfont icon-baocun" content="保存" @click="add"></i>
      <i class="iconfont icon-shanchu" content="退出" @click="goBack"></i>
    </template>
    <template #popupform>
      <el-form :model="state.FormData" :rules="rules">
        <el-form-item label="英雄名字：" prop="name">
          <el-input
            v-model="state.FormData.name"
            placeholder="请输入英雄名字"
          ></el-input>
        </el-form-item>
        <el-form-item label="英雄皮肤：" prop="pifu">
          <el-select
            v-model="state.FormData.pf"
            class="m-2"
            placeholder="请选择添加英雄皮肤"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="英雄定位：" prop="dw">
          <el-input
            v-model="state.FormData.dw"
            placeholder="请输入英雄定位"
          ></el-input>
        </el-form-item>
        <el-form-item label="英雄时间：" prop="time">
          <el-date-picker
            v-model="state.FormData.time"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请输入英雄上架时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="英雄价格：" prop="money">
          <el-input
            v-model="state.FormData.money"
            placeholder="请输入英雄价格/兑换"
          ></el-input>
        </el-form-item>
        <!-- <div v-if="state.msg == '新建'">
          <el-form-item label="英雄图片：">
            <span style="color: #64bdf0; cursor: pointer" @click="fileuplong"
              >点击上传</span
            >
            <input
              id="file"
              v-show="state.active"
              type="file"
              @change="GetFile($event)"
            />
          </el-form-item>
        </div>

        <div v-else>
          <el-form-item label="英雄图片：">
            <span style="color: #64bdf0; cursor: pointer" @click="fileuplong"
              >点击替换</span
            >
            <input
              id="file"
              v-show="state.active"
              type="file"
              @change="GetFile($event)"
            />
          </el-form-item>
        </div>

        <div v-if="state.msg == '新建'" style="border-bottom: 1px solid #000">
          <el-form-item label="其他英雄：">
            <span @click="fileuplongs">
              <el-tooltip
                class="item"
                effect="dark"
                content="点击上传其它附件"
                placement="top-end"
              >
                <i class="iconfont icon-zengjiatianjiajiahao"></i>
              </el-tooltip>
            </span>
            <input
              id="files"
              v-show="state.active"
              type="file"
              @change="GetFiles($event)"
            />
          </el-form-item>
        </div> -->

        <!-- <div v-else>
          <el-form-item label="其他英雄：">
            <span @click="fileuplongs">
              <el-tooltip
                class="item"
                effect="dark"
                content="点击上传其它附件"
                placement="top-end"
              >
                <i class="iconfont icon-zengjiatianjiajiahao"></i>
              </el-tooltip>
            </span>
            <input
              id="files"
              v-show="state.active"
              type="file"
              @change="GetFiles($event)"
            />
          </el-form-item>
        </div>
        <el-form-item class="opt">
          <div class="a" v-if="state.FormData.fileList.length != 0">
            <p>{{ state.FormData.fileList.fileName }}</p>
            <p>
              <el-tooltip content="删除" placement="top" effect="dark">
                <span @click="del">
                  <i class="iconfont icon-shanchuyixuanqunchengyuanchacha"></i>
                </span>
              </el-tooltip>
            </p>
          </div>
          <div class="b" v-if="state.FormData.fileListQT.length != 0">
            <p>{{ state.FormData.fileListQT.fileName }}</p>
            <p>
              <el-tooltip content="删除" placement="top" effect="dark">
                <span @click="del2">
                  <i class="iconfont icon-shanchuyixuanqunchengyuanchacha"></i>
                </span>
              </el-tooltip>
            </p>
          </div> -->
        <!-- </el-form-item> -->
      </el-form>
    </template>
  </popup-drawer>
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
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import popupDrawer from "../components/PopupDrawer/popup-drawer.js";
import {successmessage,warningmessage} from "@/api/message.js"
const emit = defineEmits(["goBack"]);
const props = defineProps(["getlist", "oneData", "msg"]);
const router = useRouter();
const route = useRoute();
const store = useStore();
const state = reactive({
  active: false,
  msg: props.msg,
  FormData: {
    fileListQT: [],
    filename: "",
    fileList: [],
    name: "",
    pf: "",
    dw: "",
    time: "",
    money: "",
  },
});
const options = [
  {
    value: "1",
    label: "岱宗",
  },
  {
    value: "2",
    label: "蓝屏警告",
  },
  {
    value: "3",
    label: "铁甲之心",
  },
  {
    value:'4',
    label: "穷奇"
  },
  {
    value:'5',
    label:'黄金武士'
  }
];
const rules=reactive({
  name:[
    { required: true, message: ' ', trigger: 'blur'}
  ],
  pf:[
    { required: true, message: ' ', trigger: 'blur'}
  ],
  dw:[
    { required: true, message: ' ', trigger: 'blur'}
  ],
  time:[
    { required: true, message: ' ', trigger: 'blur'}
  ],
  money:[
    { required: true, message: ' ', trigger: 'blur'}
  ]
})
onMounted(() => {
  console.log(props.msg);
  if(props.msg=="编辑"){
    state.FormData.name=props.oneData.item.name
    state.FormData.pf=props.oneData.item.pf,
    state.FormData.dw=props.oneData.item.Position,
    state.FormData.time=props.oneData.item.time,
    state.FormData.money=props.oneData.item.money
  }else {
    reset();
  }
});
// const open4 = () => {
//   ElMessage.error("警告, 上传文件只限PDF格式且文件最大为10MB.");
// };
// const a = ref("1");
// const b = ref("1");
// const fileuplong = () => {
//   let onfile = document.getElementById("file");
//   a.value = "2";
//   onfile.click();
// };
// const fileuplongs = () => {
//   let inp = document.getElementById("files");
//   b.value = "2";
//   inp.click();
// };
// const GetFiles = (e) => {
//   const file = document.getElementById("files").files[0];
//   state.FormData.fileListQT = file;
   
// };
// const GetFile = (e) => {
//   const file = document.getElementById("file").files[0];
//   const size = Math.ceil(file.size / 1024);
//   if (file.name.split(".")[1] == "pdf" && size < 10240) {
//     // state.FormData.fileList=file ;
    
//   } else {
//     open4();
//   }
// };
const time = () => {
  let nowDate = new Date();
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
    hh: nowDate.getHours(),
    mm: nowDate.getMinutes(),
    ss: nowDate.getSeconds(),
  };
  let newmonth = date.month >= 10 ? date.month : "0" + date.month;
  let day = date.date >= 10 ? date.date : "0" + date.date;
  let hh = date.hh >= 10 ? date.hh : "0" + date.hh;
  let mm = date.mm >= 10 ? date.mm : "0" + date.mm;
  let ss = date.ss >= 10 ? date.ss : "0" + date.ss;
  let timemm = hh + ":" + mm + ":" + ss;
  return timemm;
};
const add = () => {
  if (props.msg == "新建") {
    if(state.FormData.name == ""){
      warningmessage("请输入英雄名字")
    }else if(state.FormData.pf == ""){
      warningmessage("请选择添加英雄皮肤")
    }else if(state.FormData.dw == ""){
      warningmessage("请输入英雄定位")
    }else if(state.FormData.time == ""){
      warningmessage("请输入英雄上架时间")
    }else if(state.FormData.money == ""){
      warningmessage("请输入英雄价格/兑换")
    }else{
      successmessage("添加成功")
      goBack();
    }
  } else if (props.msg == "编辑") {
    console.log(2);
  }
};
const goBack = () => {
  emit("goBack", false);
};
const reset = () => {
  state.FormData= {
    fileListQT: [],
    filename: "",
    fileList: [],
    name: "",
    pf: "",
    dw: "",
    time: "",
    money: "",
  }
};
</script>

<style lang="scss" scoped>

</style>