<template>
  <div class="QQ">
    <div class="header">
      <img src="../../QQ.png" alt="" />
      <p>QQ</p>
    </div>
    <div class="main">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item prop="account">
          <el-input
            type="text"
            clearable
            v-model="ruleForm.account"
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            clearable
            show-password
            v-model="ruleForm.password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <div class="main_fotter">
            <el-checkbox v-model="radio" size="large" @change="check"/>
        <div>已阅读并同意<span style="color:#2186e4" @click="service">服务协议</span>和<span style="color:#2186e4" @click="contract">QQ隐私保护指引</span></div>
        </div>
        <div class="arrows" @click="submitForm(ruleFormRef)" :class="{lineActive:lineActive}" :disabled="disabled">
            <img src="../assets/右箭头.png" alt="">
        </div>
      </el-form>
    </div>
    <div class="footer">
        <p>手机号登录</p>
        <p>找回密码</p>
        <p>新用户注册</p>
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
import zzf from '../assets/zzf.jpg'
const dialogVisible = ref(false)
const store = useStore();
const router = useRouter();
const route = useRoute();
const ruleForm = reactive({
  account: "",
  password: "",
  name:'故',
  img:zzf,
  WIFI:'Iphone 15plus在线'
});
const disabled= ref(false)
const lineActive=ref(false)
const active = ref('')
const rules = reactive({
  account: [
    { required: true, message: "账号不能为空", trigger: "blur" },
    { min: 1, max: 15, message: "长度只能在1到15位之间", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
});
const service=()=>{
    router.push({name:'service'})
}
const contract=()=>{
    router.push({name:'contract'})
}
const check=()=>{
    if(radio.value==true) {
        lineActive.value=true;
        disabled.value=true;
    }else if(radio.value==false) {
        lineActive.value=false;
        disabled.value =false;
    }
}
const submitForm = async (formEl) => {
  if (ruleForm.account == "" || ruleForm.password == "") {
    ElMessage({
      message: "账号密码不能为空",
      type: "warning",
    });
    return
  }else if(ruleForm.account !='2452884452' || ruleForm.password !='15903509849fx..'){
    if(ruleForm.account !='2067765949' || ruleForm.password !='15903509849ghs'){
      ElMessage({
      message: "账号或密码错误",
      type: "error",
    });
    }else {
    sessionStorage.setItem("Loginzzf", JSON.stringify(ruleForm));
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    router.push('/homepageQQcopy');
  }
    return
  }
  else {
    sessionStorage.setItem("Loginzzf", JSON.stringify(ruleForm));
    ElMessage({
      message: "登录成功",
      type: "success",
    });
    router.push('/homepageQQcopy');
  }
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
      
  //   }else {
  //     console.log('error submit!', fields)
  //   }
  // })
  
};
const radio=ref(false)
</script>

<style scoped>
.QQ {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  width: 100%;
  height: 70%;
}

.footer {
  width: 100%;
  height: 10%;
  display:grid;
  grid-template-columns: 2fr 2fr 2fr;
  font-size: 14px;
  font-weight: bold;
}
.footer p{
    align-self: center;
    justify-self: center;
}
.header img {
  width: 50px;
  height: 50px;
}
.lineActive{
    background-color: #01c2fb !important;
}
.header p {
  font-size: 35px;
}
.el-form {
  width: 100%;
  height: 100%;
}
.arrows{
    width: 70px;
    height:70px;
    background-color: #e8ebf2;
    margin: 0 auto;
    border-radius: 50%;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
.arrows img{
    width: 50%;
    height: 50%;
}
.main_fotter{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-top: 10px;
    height: 5%;
}
.el-checkbox{
    margin-top: 3px !important;
    margin-right: 5px !important;
}
.el-form-item {
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
.el-form-item /deep/ .el-form-item__content {
  margin-left: 0px !important;
}
.el-form-item__content /deep/ .el-autocomplete {
  width: 100% !important;
}
.el-input /deep/ .el-input__inner {
  text-align: center !important;
}
.el-input /deep/ .el-input__inner:focus {
    color: #2186e4;
}
.el-input /deep/ .el-input__inner::placeholder {
  text-align: center !important;
  color: #ced1d8 !important;
}
.demo-ruleForm >>> input {
  height: 50px !important;
  border-radius: 30px !important;
  background-color: #f2f3f5;
}
.demo-ruleForm >>> input {
  outline: none;
  box-shadow: none;
}

/* .demo-ruleForm >>> input::focus {
  outline: none;
} */
</style>