<template>
  <div class="fordemo">
    <div class="input" v-for="(item, index) in state.data" :key="index">
      <el-input v-model="item.input" placeholder="Please input" clearable />
      <el-select v-model="item.scroe" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <!-- word预览本地文件 -->
    <div class="my-component" ref="preview">
      <input type="file" @change="previews" ref="files">
    </div>
    <!-- word预览线上文件 -->
    <div class="word">
      <el-button type="primary" @click="download">word文件预览</el-button>
      <el-button type="primary" :loading="isloading" @click="downLoad">word文件下载</el-button>
      <div ref="file" class="file"></div>
    </div>
    <!-- Excel -->
    <div class="excel-view-container">
      <el-button type="primary" @click="downloadxlsx">Excel</el-button>
      <div id="excelView" v-html="excelView"></div>
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
    watchEffect
} from "vue";
import { useStore } from "vuex";
import axios from 'axios'
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const XLSX = require('xlsx')
const docx = require('docx-preview')
window.JSZip = require('jszip')
const isloading = ref(false)
const state = reactive({
    data: [
        {
            scroe: null,
            input: null
        },
        {
            scroe: null,
            input: null
        },
        {
            scroe: null,
            input: null
        },
        {
            scroe: null,
            input: null
        },
        {
            scroe: null,
            input: null
        }
    ]
});
const options = ref([
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
])
const files = ref(null)
const preview = ref(null)
//word预览本地文件
const previews = () => {
  docx.renderAsync(files.value.files[0],preview.value) // 渲染到页面预览
}
// word预览线上文件
const file = ref(null)
const download = () => {
    axios.request({
        method: "GET",
        url: 'http://ashuai.work:10000/getDoc', //路径
        responseType: "blob", //告诉服务器想到的响应格式
    })
        .then((res) => {
            console.log(res);
            docx.renderAsync(res.data, file.value);
        })
}
// 下载
const downLoad = () => {
    isloading.value = true
    axios({
        method: "get",
        responseType: "blob", // 因为是流文件，所以要指定blob类型
        url: "http://ashuai.work:10000/getDoc", // 自己的服务器，提供的一个word下载文件接口
      }).then(({ data }) => {
        console.log(data); // 后端返回的是流文件
        const blob = new Blob([data]); // 把得到的结果用流对象转一下
        var a = document.createElement("a"); //创建一个<a></a>标签
        a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
        a.download = "出师表.docx"; //设置文件名
        a.style.display = "none"; // 障眼法藏起来a标签
        document.body.appendChild(a); // 将a标签追加到文档对象中
        a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
        a.remove(); // 一次性的，用完就删除a标签
        isloading.value = false
      });
}
// Excel
const excelView = ref('')
const downloadxlsx = () => {
    axios
        .request({
            method: "GET",
            url: 'http://192.168.11.16:7703/safe-file-yh/files/B2/xlsx/1659666747290/%E8%91%A3%E5%AE%B6%E5%8F%A3%E9%A1%B9%E7%9B%AE%E6%8E%A5%E5%8F%A3%E4%BA%BA%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F.xlsx', //路径
            responseType: "arraybuffer", //告诉服务器想到的响应格式
            headers: {
                "Content-Type":
                    "application/vnd.ms-excel;application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
        })
        .then((res) => {
            console.log(res);
            const workbook = XLSX.read(new Uint8Array(res.data), {
                type: "array",
            }); // 解析数据
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]; // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
            excelView.value = XLSX.utils.sheet_to_html(worksheet); // 渲染
            nextTick(() => {
                // DOM加载完毕后执行，解决HTMLConnection有内容但是length为0问题。
                setStyle4ExcelHtml();
            });
        })
}
const setStyle4ExcelHtml = () => {
    const excelViewDOM = document.getElementById("excelView");
    if (excelViewDOM) {
        const excelViewTDNodes = excelViewDOM.getElementsByTagName("td"); // 获取的是HTMLConnection
        if (excelViewTDNodes) {
            const excelViewTDArr = Array.prototype.slice.call(excelViewTDNodes);
            for (const i in excelViewTDArr) {
                const id = excelViewTDArr[i].id; // 默认生成的id格式为sjs-A1、sjs-A2......
                if (id) {
                    const idNum = id.replace(/[^0-9]/gi, ""); // 提取id中的数字，即行号
                    if (idNum && (idNum === "1" || idNum === 1)) {
                        // 第一行标题行
                        excelViewTDArr[i].classList.add("class4Title");
                    }
                    if (idNum && (idNum === "2" || idNum === 2)) {
                        // 第二行表头行
                        excelViewTDArr[i].classList.add("class4TableTh");
                    }
                }
            }
        }
    }
}
</script>

<style scoped lang="scss">
.fordemo {
  width: 100%;
  height: 100%;
  .input {
    width: 20%;
    height: auto;
    margin: 0 auto;

    .el-input {
      margin-top: 20px;
    }
  }
  .my-component{
    width: 100%;
    height: 90vh;
    border: 1px solid #000;
  }
  .word {
    width: 50%;
    height: 500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
    display: flex;

    .file {
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: scroll;
    }
  }

  .excel-view-container {
    width: 70% !important;
    height: 600px !important;
    margin: 0 auto;
    background-color: #ffffff;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 15px;

    :deep(table) {
      width: 100% !important;
      border-collapse: collapse !important;
      border-spacing: 0 !important;
      text-align: center !important;
      border: 0px !important;
      overflow-x: auto !important;
    }

    :deep(table) {
      tr {
        td {
          border: 1px solid gray !important;
          width: 300px !important;
          height: 33px !important;
        }
      }
    }

    :deep(.class4Title) {
      font-size: 22px !important;
      font-weight: bold !important;
      padding: 10px !important;
    }

    /**表格表头样式 */
    :deep(.class4TableTh) {
      font-weight: bold !important;
      padding: 2px !important;
      background-color: #ccc !important;
    }
  }
}
</style>
