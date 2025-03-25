<template>
    <div class="childcard">
        <div class="header">
            <el-tooltip class="box-item" effect="dark" content="清空" placement="top">
               <i class="iconfont icon-rubber" @click="reset"></i>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="保存" placement="top">
                <i class="iconfont icon-baocun" @click="add"></i>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark" content="关闭" placement="top">
                <i class="iconfont icon-shanchu" @click="close"></i>
            </el-tooltip>
        </div>
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
          <el-input v-model="ruleForm.story" placeholder="请输入英雄背景故事" type="textarea" />
        </el-form-item>
        <el-form-item label="英雄历史原型" prop="history">
          <el-input v-model="ruleForm.history" placeholder="请输入英雄历史原型" type="textarea" />
        </el-form-item>
      </el-form>
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
    infomessage,
    errormessage,
    warningmessage,
} from "@/api/message.js";
const store = useStore();
const router = useRouter();
const route = useRoute();
const props = defineProps(['state', 'msg', 'obj','obi'])
const emit = defineEmits(['close'])
const ruleForm = reactive({
  id:"",  
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
});
//清空表单
const reset=()=>{
    ruleForm.id=""
    ruleForm.name=""
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
}
//添加英雄
const add=()=>{
    if(props?.msg){
        if(ruleForm.id==''){
        warningmessage("请输入英雄ID")
    }else if(ruleForm.name==''){
        warningmessage("请输入英雄名字")
    }else if(ruleForm.Position==''){
        warningmessage("请输入英雄定位")
    }else if(ruleForm.stature==''){
        warningmessage("请输入英雄身高")
    }else if(ruleForm.Specialty==''){
        warningmessage("请输入英雄特长")
    }else if(ruleForm.title==''){
        warningmessage("请输入英雄称号")
    }else if(ruleForm.money==''){
        warningmessage("请输入英雄价格")
    }else if(ruleForm.time==''){
        warningmessage("请输入英雄上架时间")
    }else if(ruleForm.Damage==''){
        warningmessage("请输入攻击伤害")
    }else if(ruleForm.viability==''){
        warningmessage("请输入生存能力")
    }else if(ruleForm.Skill==''){
        warningmessage("请输入技能效果")
    }else if(ruleForm.difficulty==''){
        warningmessage("请输入上手难度")
    }else if(ruleForm.story==''){
        warningmessage("请输入英雄背景故事")
    }else if(ruleForm.history==''){
        warningmessage("请输入英雄历史原型")
    }else{
        let data={
            id: ruleForm.id,
            name:ruleForm.name,
            Position:ruleForm.Position,
            stature:ruleForm.stature,
            Specialty:ruleForm.Specialty,
            title:ruleForm.title,
            money:ruleForm.money,
            time:ruleForm.time,
            Damage:ruleForm.Damage,
            viability:ruleForm.viability,
            Skill:ruleForm.Skill,
            difficulty:ruleForm.difficulty,
            story:ruleForm.story,
            history:ruleForm.history,
        }
        props.state.push(data);
        successmessage("添加成功")
        close()
    }
    }else{
        let data={
            id: ruleForm.id,
            name:ruleForm.name,
            Position:ruleForm.Position,
            stature:ruleForm.stature,
            Specialty:ruleForm.Specialty,
            title:ruleForm.title,
            money:ruleForm.money,
            time:ruleForm.time,
            Damage:ruleForm.Damage,
            viability:ruleForm.viability,
            Skill:ruleForm.Skill,
            difficulty:ruleForm.difficulty,
            story:ruleForm.story,
            history:ruleForm.history,
        }
        props.state.splice(props.obi,1,data)
        successmessage("修改成功")
        close()
    }
}
const rules= reactive({
    id:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    name:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    Position:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    stature:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    Specialty:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    title:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    money:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    time:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    Damage:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    viability:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    Skill:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    difficulty:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    story:[
        { required: true, message: ' ', trigger: 'blur'}
    ],
    history:[
        { required: true, message: ' ', trigger: 'blur'}
    ]
})
onMounted(() => {
    if (props?.msg) {
        reset()
    } else {
        console.log(props.obj);
        ruleForm.id=props.obj.id
        ruleForm.name=props.obj.name
        ruleForm.Position=props.obj.Position
        ruleForm.stature=props.obj.stature
        ruleForm.Specialty=props.obj.Specialty
        ruleForm.title=props.obj.title
        ruleForm.money=props.obj.money
        ruleForm.time=props.obj.time
        ruleForm.Damage=props.obj.Damage
        ruleForm.viability=props.obj.viability
        ruleForm.Skill=props.obj.Skill
        ruleForm.difficulty=props.obj.difficulty
        ruleForm.story=props.obj.story
        ruleForm.history=props.obj.history
    }
})
const close = () => {
    emit("close", false)
}
</script>

<style scoped>
.childcard {
    width: 400px;
    height: 95%;
    background-color: white;
    z-index: 2;
    position: fixed;
    top: 5%;
    right: 0;
}

.header {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}

.icon-shanchu {
    margin-right: 20px;
    font-size:20px;
    cursor: pointer;
}

.icon-baocun {
    margin-right: 10px;
    font-size:20px;
    cursor: pointer;
}

.icon-rubber {
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
}
.el-form{
    margin-top:20px;
}
.el-input{
    width: 260px;
}
.el-textarea{
    width: 260px;
}
</style>