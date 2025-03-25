<template>
  <div class="head">
    <div class="ipt">
      <el-input
        v-model="state.input"
        size="small"
        placeholder="快速搜索"
        :suffix-icon="Search"
      />
    </div>
    <div class="ipt_icon">
      <el-tooltip
        class="item"
        effect="dark"
        content="新建"
        placement="top-start"
        :suffix-icon="Select"
      >
        <img class="img" src="../assets/新建文件.png" @click="xinjian" />
      </el-tooltip>
    </div>
  </div>
  <div class="datalist">
    <el-card
      class="bleft list"
      shadow="always"
      :body-style="{ padding: '0' }"
      v-for="(item, index) in date.dates.slice(
        (currentPage - 1) * Pagesize,
        currentPage * Pagesize
      )"
    >
      <ul>
        <li>地区名称：{{ item.names }}</li>
        <li>地区人数：{{ item.people }}</li>
        <li>地区简称：{{ item.jc }}</li>
        <li>感染人数：{{ item.gr }}</li>
        <li>所属国家：{{ item.country }}</li>
        <li>
          <el-tooltip
            class="item"
            effect="dark"
            content="编辑"
            placement="top-end"
          >
            <img
              class="img"
              src="../assets/编辑.png"
              alt=""
              @click="upd(item, index)"
            />
          </el-tooltip>
          <el-tooltip
            class="item"
            content="删除"
            effect="dark"
            placement="top-start"
          >
            <img
              class="img"
              src="../assets/删除.png"
              alt=""
              @click="del(item, index)"
            />
          </el-tooltip>
        </li>
      </ul>
    </el-card>
  </div>
  <!-- 分页 -->
  <el-pagination
    small
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    layout="'prev, pager, next, total"
    :total="date.dates.length"
    :current-page="currentPage"
    :page-size="Pagesize"
    :page-sizes="pagesizes"
    class="mt-4"
  />

 <!-- 编辑的dialog -->
  <el-dialog
    v-model="dialogFormVisibles"
    title="更改国家信息"
    draggable
    :modal="true"
    :close-on-click-modal="false"
  >
    <el-form :model="states">
      <el-form-item label="地区名称:" :label-width="formLabelWidth">
        <el-input
          v-model="states.name"
          placeholder="请输入地区名称"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="地区人数:" :label-width="formLabelWidth">
        <el-input
          v-model="states.peoples"
          placeholder="请输入地区人数"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="地区简称:" :label-width="formLabelWidth">
        <el-input
          v-model="states.jcs"
          placeholder="请输入地区简称"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="感染人数:" :label-width="formLabelWidth">
        <el-input
          v-model="states.grs"
          placeholder="请输入感染人数"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="所属国家:" :label-width="formLabelWidth">
        <el-input
          v-model="states.countrys"
          placeholder="请输入所属国家"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisibles = false">返回</el-button>
        <el-button type="primary" @click="updd(states)">修改</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 增加的dialog -->
  <el-dialog
    v-model="dialogFormVisible"
    title="添加国家信息"
    draggable
    :modal="true"
    :close-on-click-modal="false"
  >
    <el-form :model="form">
      <el-form-item label="地区名称:" :label-width="formLabelWidth">
        <el-input
          v-model="form.namess"
          placeholder="请输入地区名称"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="地区人数:" :label-width="formLabelWidth">
        <el-input
          v-model="form.peopless"
          placeholder="请输入地区人数"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="地区简称:" :label-width="formLabelWidth">
        <el-input
          v-model="form.jcss"
          placeholder="请输入地区简称"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="感染人数:" :label-width="formLabelWidth">
        <el-input
          v-model="form.grss"
          placeholder="请输入感染人数"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="所属国家:" :label-width="formLabelWidth">
        <el-input
          v-model="form.countryss"
          placeholder="请输入所属国家"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">返回</el-button>
        <el-button type="primary" @click="add">增加</el-button>
      </span>
    </template>
  </el-dialog>
  
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
} from "vue";
import { ElLoading } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { Select } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { da } from "element-plus/lib/locale";
const route = useRoute();
const loading = ref(true);
const state = reactive({
  search: "",
});
const fullscreenLoading = ref(false);
const xinjian = () => {
  dialogFormVisible.value = true;
  reset()
};
const currentPage = ref(1);
const dialogFormVisibles = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const router = useRouter();
const handleSizeChange = (valsize) => {
  Pagesize.value = valsize;
  currentPage.value = 1;
};
const handleCurrentChange = (valpage) => {
  currentPage.value = valpage;
};
const pagesizes = ref([5, 8, 10, 15]);
const Pagesize = ref(5);
const date = reactive({
  dates: [
    {
      names: "山西",
      people: "789749411561",
      jc: "晋",
      gr: "0",
      country: "中国",
    },
    {
      names: "河北",
      people: "1212789749411561",
      jc: "冀",
      gr: "1212",
      country: "中国",
    },
    {
      names: "河南",
      people: "4241244789749411561",
      jc: "豫",
      gr: "98989",
      country: "中国",
    },
    {
      names: "四川",
      people: "789222749411561",
      jc: "川",
      gr: "60",
      country: "中国",
    },
    {
      names: "北京",
      people: "848951461515",
      jc: "京",
      gr: "50",
      country: "中国",
    },
  ],
});
const msg = ref("新建");
//增加dialog的对象
const form = reactive({
  namess: "",
  peopless: "",
  jcss: "",
  grss: "",
  countryss: "",
});
const reset=()=>{
    form.namess= "",
    form.peopless= "",
    form.jcss= "",
    form.grss="",
    form.countryss= ""
}
//dialog增加按钮
const add = () => {
  // console.log(form);
  if (msg.value == "新建") {
    let data={
      names:form.namess,
      people:form.peopless,
      jc:form.jcss,
      gr:form.grss,
      country:form.countryss
    }
    date.dates.push(data)
    ElMessage({
      showClose: true,
      message: "添加成功",
      type: "success",
    });
    dialogFormVisible.value = false;
  } else {
    ElMessage({
      showClose: true,
      message: "添加失败",
      type: "error",
    });
    dialogFormVisible.value = true;
  }
};
//删除按钮
const del = (item, index) => {
  console.log(item);
  ElMessageBox.confirm("你确定要删除吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        showClose: true,
        message: "删除成功",
        type: "success",
      });
      date.dates.splice(index, 1);
    })
    .catch(() => {
      ElMessage({
        showClose: true,
        message: "删除失败",
        type: "error",
      });
    });
};
//编辑的对象
const states = ref({
  name: "",
  peoples: "",
  jcs: "",
  grs: "",
  countrys: "",
});
const msg1 = ref("编辑");
//编辑回显
const upd = (item, index) => {
  //   console.log(item);
  console.log(index);
  if (msg1.value == "编辑") {
    dialogFormVisibles.value = true;
    states.value.name = item.names;
    states.value.peoples = item.people;
    states.value.jcs = item.jc;
    states.value.grs = item.gr;
    states.value.countrys = item.country;

  } else {
  }
};
onMounted(() => {
  console.log(date.dates);
  const loading = ElLoading.service({
    lock: true,
    text: "正在加载中，请稍后.......",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 1000);
});

//编辑dialog的保存按钮
const listData=ref([])
const updd = (item) => {
  console.log(item);
  if (msg1.value == "编辑") {
    let info={
      names:item.names,
      gr:item.gr,
      jc:item.jc,
      country:item.country,
      people:item.people
  }
  listData.value.push(info)
  console.log(date.dates)
    dialogFormVisibles.value = false;
    ElMessage({
      showClose: true,
      message: "修改成功",
      type: "success",
    });
  } else {
    ElMessage({
      showClose: false,
      message: "修改失败",
      type: "success",
    });
  }
};
</script>

<style scoped="scoped">
.head {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.el-icon {
  width: 20px;
  height: 20px;
}
.ipt_icon {
  width: 50px;
  height: 20px;
  color: #64bdf0;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  cursor: pointer;
}
.item {
  width: 100%;
  height: 100%;
}
.img {
  width: 20px;
  height: 20px;
}

.list {
  margin-top: 10px;
}
ul {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.2fr 0.1fr;
  position: relative;
}
li {
  list-style: none;
}
.iconfont {
  position: absolute;
  right: 36px;
  top: 10px;
  cursor: pointer;
}
.icon-sousuo1 {
  position: absolute;
  right: 60px;
  top: 10px;
  font-size: 22px;
}
.icon-chahao {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px !important;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-pagination {
  position: absolute;
  bottom: 60px;
  right: 60px;
}
</style>