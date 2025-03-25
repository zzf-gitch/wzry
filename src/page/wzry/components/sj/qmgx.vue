<template>
  <div class="qmgx">
    <div class="header">
      <el-input v-model="input" :suffix-icon="Search" :placeholder="str" clearable class="input" />
      <el-button type="primary" :icon="Upload" @click="exportToExcel">导出</el-button>
      <el-button type="primary" @click="inquire">查询</el-button>
      <el-button type="warning" class="warning" @click="neww">新增</el-button>
    </div>
    <div class="main">
      <el-table class="scroll-table" :data="tableData" border style="width: 100%;margin-top: 20px;">
        <el-table-column prop="name" label="name" width="200"></el-table-column>
        <el-table-column prop="Position" label="Position" width="200"></el-table-column>
        <el-table-column prop="title" label="title" width="200"></el-table-column>
        <el-table-column prop="Specialty" label="Specialty" width="200"></el-table-column>
        <el-table-column prop="status" label="status" width="150">
          <template #default="scope">
            <div v-if="scope.row.status == 0">
              未通过
            </div>
            <div v-if="scope.row.status == 1">
              审核中
            </div>
            <div v-if="scope.row.status == 2">
              已通过
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="150"></el-table-column>
        <el-table-column prop="money" label="money" width="150">
          <template #default="scope">
            <el-tooltip :content="scope.row.money" :disabled="disabled" effect="dark" placement="top">
              <div @mouseenter="mouseenter($event)" class="wz">{{ scope.row.money }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="time" width="200"></el-table-column>
        <el-table-column fixed="right" label="Operations" width="300">
          <template #default="scope">
            <el-button size="small" @click="preview(scope.$index, scope.row)">查看详细</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" v-if="scope.row.status !== 1" type="warning" @click="Sticky(scope.$index, scope.row)">
              置顶
            </el-button>
            <el-button v-if="scope.row.status !== 2 && scope.row.status !== 1" size="small" type="primary"
              @click="handleupd(scope.$index, scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 回显 -->
  <el-dialog v-model="dialogFormVisible" title="Hero Info" :close-on-click-modal="false" :close-on-press-escape="false"
    :show-close="false">
    <el-form :model="form">
      <el-form-item label="支付方式" :label-width="formLabelWidth">
        <el-input v-model="form.payment" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄名字" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄定位" :label-width="formLabelWidth">
        <el-input v-model="form.Position" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄称号" :label-width="formLabelWidth">
        <el-input v-model="form.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄特长" :label-width="formLabelWidth">
        <el-input v-model="form.Specialty" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单状态" :label-width="formLabelWidth">
        <el-input v-model="form.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄ID" :label-width="formLabelWidth">
        <el-input v-model="form.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄价格" :label-width="formLabelWidth">
        <el-input v-model="form.money" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄上架时间" :label-width="formLabelWidth">
        <el-input v-model="form.time" autocomplete="off" />
      </el-form-item>
      <el-form-item label="起止时间" :label-width="formLabelWidth">
        <el-date-picker v-model="form.examinationTime" type="datetimerange" start-placeholder="Start Date"
          end-placeholder="End Date" size="default" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss"
          @change="go" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>


  <!-- 新建编辑dialog -->
  <el-dialog v-model="isshow" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false"
    :before-close="Close">
    <template #title="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">{{ changeyou.msg ? 'Add the hero' : 'Modify the hero' }}</h4>
        <el-button type="danger" @click="Close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button>
      </div>
    </template>
    <el-form :model="ruleForm" :rules="rules">
      <el-form-item label="英雄名字" prop="name" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄定位" prop="Position" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.Position" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄称号" prop="title" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄特长" prop="Specialty" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.Specialty" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄状态" prop="status" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.status" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄ID" prop="id" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.id" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄价格" prop="money" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.money" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄上架时间" prop="time" :label-width="formLabelWidth">
        <el-input v-model="ruleForm.time" autocomplete="off" />
      </el-form-item>
      <el-form-item label="英雄起止时间" :label-width="formLabelWidth">
        <el-date-picker v-model="ruleForm.examinationTime" type="datetimerange" start-placeholder="Start Date"
          end-placeholder="End Date" size="default" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit">{{ changeyou.msg ? '添加英雄' : '修改英雄' }}</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 分页 -->
  <!-- <el-pagination small background layout="prev, pager, next, total, jumper" :total="tableData.length"
    :current-page="currentpage" :page-size="pagesize" @current-change="handcurrentchange" class="mt-4" /> -->
</template>

<script setup>
import { Timer } from "@element-plus/icons-vue";
import { CircleCloseFilled, Upload } from "@element-plus/icons-vue";
import { Search, CirclePlusFilled, Edit } from "@element-plus/icons";
import { getHeroInfocard } from "@/api/heromain/hero/transfer.js";
import { ElButton, ElDialog } from 'element-plus'
import exportExcel from "@/utils/downloadexcel.js";
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
import tab from "../../../../store/tab";
const store = useStore();
const router = useRouter();
const route = useRoute();
const ishow = ref(true);
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//查看英雄详情
const form = reactive({
  name: '',
  payment: '',
  Position: '',
  title: '',
  Specialty: '',
  status: '',
  id: '',
  money: '',
  time: '',
  examinationTime: []
})
//编辑新建对象
const ruleForm = reactive({
  name: '',
  Position: '',
  title: '',
  Specialty: '',
  status: '',
  id: '',
  money: '',
  time: '',
  examinationTime: []
})
const rules = reactive({
  name: [{ required: true, message: ' ', trigger: 'blur' }],
  Position: [{ required: true, message: " ", trigger: "blur" }],
  title: [{ required: true, message: " ", trigger: "blur" }],
  Specialty: [{ required: true, message: " ", trigger: "blur" }],
  status: [{ required: true, message: " ", trigger: "blur" }],
  id: [{ required: true, message: " ", trigger: "blur" }],
  money: [{ required: true, message: " ", trigger: "blur" }],
  time: [{ required: true, message: " ", trigger: "blur" }]
})
const currentpage = ref(1)
const pagesize = ref(15)
const disabled = ref(true)
const mouseenter = (event) => {
  let e = event.target
  // 实际宽度
  let e_weight = e.scrollWidth
  // 可视宽度
  let e_content = e.clientWidth
  if (e_weight > e_content) {
    disabled.value = false
  } else {
    disabled.value = true
  }
}
// 导出
const exportToExcel = async () => {
  const { data } = await getHeroInfocard()
  console.log(data.herolist);
  data.herolist.map(item => {
    item.status = item.status === 0 ? '未通过' : item.status === 1 ? '审核中' : '已通过'
    return item
  })
  let params = {
    name: '英雄名字',
    Position: '英雄定位',
    title: '英雄称号',
    Specialty: '英雄特长',
    status: '审核状态',
    id: '英雄ID',
    money: '英雄价格',
    time: '英雄上架时间',
    story: '英雄背景故事',
    history: '英雄历史原型'
  }
  exportExcel(data.herolist, params, '王者荣耀后台管理系统英雄基本信息')
}
// 分页
const handcurrentchange = (val) => {
  console.log(val);
  currentpage.value = val
}
const go = (val) => {
  console.log(val);
  console.log(val[0]);
  console.log(val[1]);
}
const handleDelete = (index, row) => {
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      const i = tableData.value.indexOf(row)
      if (i > -1) {
        tableData.value.splice(index, 1)
      }
      successmessage("删除成功");
    })
    .catch(() => {
      infomessage("删除失败");
    });
};
const getlist = async () => {
  await getHeroInfocard().then((res) => {
    console.log(res.data.herolist);
    tableData.value = res.data.herolist;
  });
};
const preview = (index, row) => {
  dialogFormVisible.value = true
  if (row.status == 0) {
    form.payment = "支付宝支付"
  } else if (row.status == 1) {
    form.payment = "微信支付"
  } else if (row.status == 2) {
    form.payment = "现金"
  }
  form.name = row.name
  form.Position = row.Position
  form.title = row.title
  form.Specialty = row.Specialty
  if (row.status == 0) {
    form.status = "未通过"
  } else if (row.status == 1) {
    form.status = "审核中"
  } else if (row.status == 2) {
    form.status = "已通过"
  }
  form.id = row.id
  form.money = row.money
  form.time = row.time
  let times = [row.createtime, row.updtime]
  form.examinationTime = times
}
const item = ref('')
const Sticky = (index, row) => {
  // for(let i=0;i<tableData.value.length;i++){
  //   let name=tableData.value[i].name
  //   if(name==row.name){
  //     item.value=row
  //     tableData.value.splice(index,1)
  //   }
  // }
  // tableData.value.unshift(item.value)
  tableData.value.forEach(look => {
    if (look.id == row.id) {
      item.value = row
      const i = tableData.value.indexOf(row)
      if (i > -1) {
        tableData.value.splice(index, 1)
      }
    }
  })
  tableData.value.unshift(item.value)
}
const changeyou = reactive({
  msg: ''
})
//清空添加编辑英雄dialog表单
const reset = () => {
  ruleForm.name = '',
    ruleForm.Position = '',
    ruleForm.title = '',
    ruleForm.Specialty = '',
    ruleForm.status = '',
    ruleForm.id = '',
    ruleForm.money = '',
    ruleForm.time = '',
    ruleForm.examinationTime = []
}
const indexs = ref()
//修改
const isshow = ref(false)
const handleupd = (index, row) => {
  console.log(index, row);
  isshow.value = true
  changeyou.msg = ''
  indexs.value = index
  ruleForm.name = row.name,
    ruleForm.Position = row.Position,
    ruleForm.title = row.title,
    ruleForm.Specialty = row.Specialty
  if (row.status == 0) {
    ruleForm.status = "未通过"
  } else if (row.status == 1) {
    ruleForm.status = "审核中"
  } else if (row.status == 2) {
    ruleForm.status = "已通过"
  }
  ruleForm.id = row.id,
    ruleForm.money = row.money,
    ruleForm.time = row.time
  let stratupdtime = [row.createtime, row.updtime]
  ruleForm.examinationTime = stratupdtime
}
//新增
const neww = () => {
  isshow.value = true
  changeyou.msg = "新建"
  reset()
}
//提交
const submit = () => {
  if (changeyou?.msg) {
    if (ruleForm.name == '') {
      warningmessage("请输入英雄名字")
    } else if (ruleForm.Position == '') {
      warningmessage("请输入英雄定位")
    } else if (ruleForm.title == '') {
      warningmessage("请输入英雄称号")
    } else if (ruleForm.Specialty == '') {
      warningmessage("请输入英雄特长")
    } else if (ruleForm.status == '') {
      warningmessage("请输入英雄状态")
    } else if (ruleForm.id == '') {
      warningmessage("请输入英雄ID")
    } else if (ruleForm.money == '') {
      warningmessage("请输入英雄价格")
    } else if (ruleForm.time == '') {
      warningmessage("请输入英雄上架时间")
    } else if (ruleForm.examinationTime == '') {
      warningmessage("请输入英雄起止时间")
    } else {
      let data = {
        name: ruleForm.name,
        Position: ruleForm.Position,
        title: ruleForm.title,
        Specialty: ruleForm.Specialty,
        status: ruleForm.status,
        id: ruleForm.id,
        money: ruleForm.money,
        time: ruleForm.time,
        createtime: ruleForm.examinationTime[0],
        updtime: ruleForm.examinationTime[1]
      }
      tableData.value.push(data)
      isshow.value = false
      successmessage("添加成功")
    }
  } else {
    let data = {
      name: ruleForm.name,
      Position: ruleForm.Position,
      title: ruleForm.title,
      Specialty: ruleForm.Specialty,
      status: ruleForm.status,
      id: ruleForm.id,
      money: ruleForm.money,
      time: ruleForm.time,
      createtime: ruleForm.examinationTime[0],
      updtime: ruleForm.examinationTime[1]
    }
    tableData.value.splice(indexs.value, 1, data)
    isshow.value = false
    successmessage("修改成功")
  }
}
//关闭dialog
const Close = (done) => {
  ElMessageBox.confirm("你确定要关闭吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      isshow.value = false
      successmessage("关闭成功")
    })
    .catch(() => {
      infomessage("取消关闭")
    });
}
const tableData = ref([]);
const str = ref('')
const placeholder = () => {
  let arr = ['典韦', '刘备', '孙尚香', '高渐离', '司马懿', '李信', '橘右京', '赵云', '百里玄策', '马超', '露娜', '王昭君', '诸葛亮', '镜', '铠', '貂蝉', '澜', '白起']
  let index = Math.floor(Math.random() * arr.length)
  str.value = arr[index]
  setTimeout(() => {
    placeholder()
  }, 1000)
}
const input = ref('')
const inquire = () => {
  currentpage.value = 1
  getlisy()
}
const getlisy = async () => {
  await getlist()
  let list = tableData.value.filter(item => item.name.toLowerCase().includes(input.value.toLowerCase()) || item.id.toLowerCase().includes(input.value.toLowerCase()))
  tableData.value = list
  if (tableData.value.length == false) {
    errormessage("英雄不存在")
  }
}


// 表格自动滚动
const scrollHeight = ref(0)
const currentScrollTop = ref(0)
const maxScrollTop = ref(0)
const timeInter = ref(null)
const timeInters = ref(null)
const tableNode = ref(null)

const updateList = () => {
  // 数据大于10条才会滑动
  if (tableData.value && tableData.value.length > 15) {
    // 获取滑动区域DOM 最新版本的element-plus节点有变化, 此版本为1.2.0-beta.3
    tableNode.value = document.querySelector('.scroll-table').querySelector('.el-scrollbar__wrap')
    // 设置每次滑动几行
    scrollHeight.value = tableNode.value.querySelectorAll('tr')[0].offsetHeight * 15
    // 设置每次滑动的PX和滑动区域的高度
    tableNode.value.style.height = `${scrollHeight.value}px`
    // 获取最大滑动空间
    maxScrollTop.value = tableNode.value.firstElementChild.offsetHeight - scrollHeight.value
    // 开始
    restTimeInter()
  }
}

const restTimeInter = () => {
  // 清除所有定时器
  clearAllInterval()
  // 设置定时器
  timeInter.value = setInterval(setMultiLine, 800)
}
const clearAllInterval = () => {
  clearInterval(timeInter.value)
  clearInterval(timeInters.value)
}
const setScrollTop = () => {
  tableNode.value.scrollTop++
  if (tableNode.value.scrollTop >= currentScrollTop.value) { // 达到下次应该滑动的位置
    clearInterval(timeInters.value)
  }
  if (tableNode.value.scrollTop > maxScrollTop.value) { // 滑到底了
    tableNode.value.scrollTop = maxScrollTop.value
    clearInterval(timeInters.value)
  }
}
const setMultiLine = () => {
  // 下次应该滑到哪
  currentScrollTop.value = (tableNode.value.scrollTop || 0) + scrollHeight.value + currentScrollTop.value % scrollHeight.value
  if (tableNode.value.scrollTop >= maxScrollTop.value) { // 滑完了 重置
    currentScrollTop.value = 0
    tableNode.value.scrollTop = 0
    restTimeInter()
  } else {
    // 清除上一个定时器
    clearInterval(timeInters.value)
    // 开始滑
    timeInters.value = setInterval(setScrollTop, 5)
  }
}


onMounted(() => {
  // window.addEventListener("load", () => {
  //   alert('aaa')
  // });
  // window.onload = (event) => {
  //   alert('小黄人')
  // }
  const companyId = 'YH'
  const key = companyId.toLocaleLowerCase()
  const actions = {
    'yh': 'http://10.161.54.105:8006',
    'w1': "",
    'jxr': 'http://10.156.46.90:8006',
    'ld': 'http://10.160.79.90:8006',
    'b2': 'http://10.144.107.96:8006',
    't7': "",
    'hq': "",
  }
  const url = actions[key]
  console.log(url);
  getlist();
  placeholder()
  setTimeout(() => {
    updateList()
  }, 1000)
});
</script>

<style scoped>
.qmgx {
  width: 100%;
  height: 100%;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.input {
  width: 180px !important;
  margin-right: 15px;
}

.warning {
  margin-right: 15px;
}

.main {
  width: 100%;
  height: calc(100% - 32px);
}

.el-pagination {
  position: absolute;
  right: 60px;
  bottom: 60px;
}

.wz {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>