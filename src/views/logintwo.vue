<template>
  <div class="logintwo">
    <div class="main">
      <div class="header">
        <img class="img" :src="ruleForm.zzf" alt="" />
        <p class="zi">王者荣耀后台管理系统</p>
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
      <el-form-item props="account">
          <el-input v-model="ruleForm.account" :placeholder="str"/>
      </el-form-item>
      <el-form-item props="password">
          <el-input v-model="ruleForm.password" show-password/>
      </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineEmits, defineProps } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { successmessage, warningmessage, errormessage } from "../api/message";
import { ElLoading } from "element-plus";
import zzf from "@/assets/zzf.jpg";
import video from "@/assets/video/new.mp4";
const store = useStore();
const router = useRouter();
const route = useRoute();
const ruleForm = reactive({
  zzf: zzf,
  account: '',
  password:''
});
const str=ref('请输入账号')
const getchange=()=>{
  let arr=['请输入账号','雷神','钢铁侠','蜘蛛侠','迪迦','盖亚','戴拿']
  let index=Math.floor(Math.random()*arr.length)
  str.value=arr[index]
  setTimeout(()=>{
    getchange()
  },1000)
}
onMounted(() => {
  getchange();
})
const rules=reactive({
    account:[
        { required: true, message: "账号不能为空", trigger: "blur"}
    ],
    password:[
        { required: true, message: ' ', trigger: 'blur'}
    ]
})
</script>

<style scoped>
.logintwo {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  width: 500px;
  height: 400px;
  border: 1px solid red;
}
.header {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.zi {
  font-size: 30px;
  font-weight: 800;
  margin-left: 30px;
}
</style>