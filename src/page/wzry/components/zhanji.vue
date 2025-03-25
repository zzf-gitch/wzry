<template>
  <div class="yx">
    <el-button type="primary" round @click="add">点击添加英雄</el-button>
    <div class="form" v-for="(item, index) in state.add" :key="index">
      <el-form label-width="80px" :rules="rules" :model="state.add">
        <el-form-item label="英雄名字" prop="yxname">
          <el-input placeholder="请输入英雄名字" v-model="item.yxname" />
        </el-form-item>
        <el-form-item label="英雄技能" prop="yxjn">
          <el-input placeholder="请输入英雄技能" v-model="item.yxjn" />
        </el-form-item>
        <el-form-item label="英雄性别" prop="yxsex">
          <el-input placeholder="请输入英雄性别" v-model="item.yxsex" />
        </el-form-item>
        <el-form-item label="英雄属性" prop="yxsx">
          <el-input placeholder="请输入英雄属性" v-model="item.yxsx" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="onSubmit">添加英雄</el-button>
          <el-button type="danger" round @click="onSubmitremove(item)">删除英雄</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
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
import {
  successmessage,
  warningmessage,
  errormessage,
  infomessage,
} from "@/api/message.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const state = reactive({
  add: [
    {
      yxname: "",
      yxjn: "",
      yxsex: "",
      yxsx: "",
    }
  ],
});
const rules = reactive({
  yxname: [{ required: true, message: " ", trigger: "blur" }],
  yxjn: [{ required: true, message: " ", trigger: "blur" }],
  yxsex: [{ required: true, message: " ", trigger: "blur" }],
  yxsx: [{ required: true, message: " ", trigger: "blur" }],
});
const add = () => {
  let form = {
    yxname: "",
    yxjn: "",
    yxsex: "",
    yxsx: "",
  };
  state.add.push(form);
  successmessage("添加英雄信息成功");
};
const onSubmit = () => {
  state.add.forEach(item => {
    if (item.yxname == '') {
      warningmessage("请输入英雄名字");
    } else if (item.yxjn == '') {
      warningmessage("请输入英雄技能")
    } else if (item.yxsex == '') {
      warningmessage("请输入英雄性别")
    } else if (item.yxsx == '') {
      warningmessage("请输入英雄属性")
    } else {
      successmessage("添加成功");
    }
  })
};
const onSubmitremove = (item) => {
  ElMessageBox.confirm("确认要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "返回",
    type: "warning",
  })
    .then(() => {
      if (state.add.length <= 1) {
        infomessage("不能为空")
      } else {
        successmessage("删除成功");
        state.add.splice(item, 1);
      }
    })
    .catch(() => {
      infomessage("删除失败");
    });
};
</script>

<style scoped="scoped">
.yx {
  width: 100%;
  height: 100%;
  color: whitesmoke;
  margin-top: 20px;
}

.el-form {
  width: 50%;
  margin-top: 20px;
}

.el-form-item:deep(.el-form-item__label) {
  color: white !important;
}

.form {
  width: 100%;
  border-top: 2px solid #375987;
  margin-top: 20px;
}

.el-input {
  width: 100% !important;
}

.el-input_inner {
  width: 80px !important;
}
</style>