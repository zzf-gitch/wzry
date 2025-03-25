<template>
    <div class="users">
        <!-- <video src="@/assets/CGkaichang.mp4" controls="controls" autoplay="autoplay" loop="loop" :webkit-playsinline="true"
        ref="video"></video> -->
        <!-- 前端分页 -->
      <div v-for="(item,index) in data.list" :key="index">
        {{ item.name }}</div>
      <el-pagination background layout="prev, pager, next" :total="data.total" :page-size="data.size"
        @current-change="currentChange" />
    </div>
    <!-- Excel导入功能 -->
    <div class="index">
        <el-button type="success">
            导入：
            <input class="file_uploader" type="file" accept=".xlsx, .xls" @input="onImportEx" />
            <!-- accept限定传入的文件格式 -->
        </el-button>
    </div>
    <!-- Excel导出功能 -->
    <div>
        <el-button type="primary" @click="getOutExcel">导出</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="formData.data" style="width: 100%" id="table">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="name" label="name" width="180" />
        <el-table-column prop="notes" label="notes" />
    </el-table>
</template>
<script setup>
import XLSX from 'xlsx'//导入的依赖包
// import FileSaver from "file-saver";//导出的依赖包
import { ref , onMounted } from 'vue'
const formData = ref({
    data: [],//导入的数据
})
//导出函数
const exportClick = () => {
    // 导出文件名
    const filename = "导出.xlsx";
    // 导出表格加id,通过id获取要导出的表单
    const a = XLSX.utils.table_to_book(document.getElementById("table"));
    const b = XLSX.write(a, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
    });
    try {
        FileSaver.saveAs(
            new Blob([b], {
                type: "application/octet-stream",
            }),
            filename
        );
    } catch (e) {
        console.log(e);
    }
    return b;
};

const getOutExcel = () => {
    exportClick();
}
//导入函数
const onImportEx = (file) => {
    const { files } = file.target;
    const fileReader = new FileReader(); // 创建FileReader 对象 读取文件
    fileReader.onload = (event) => {
        try {
            const { result } = event.target;
            // 二进制读取 excel表格对象
            const workList = XLSX.read(result, { type: "binary" });
            // 存储数据
            let data = [];
            for (let sheet in workList.Sheets) {
                if (workList.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workList.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }
            // 最终获取到并且格式化后的 json 数据
            data.forEach(e => {
                const list = {
                    id: e.序号,
                    name: e.姓名,
                    notes: e.备注
                }
                formData.value.data.push(list)
            })
        } catch (error) {
            console.log("上传失败,err:", error);
        }
    };

    fileReader.readAsBinaryString(files[0]);
}




//前端分页功能
// import ssr from '../../../public/json/Shikigami.json'
// import { onMounted, ref } from "vue";
const data = ref({
    srrList: [],
    total: 0,
    size: 10,
    pageIndex: 1,
    list: []
})
onMounted(() => {
    data.value.srrList = ssr.ssr[0].list
    data.value.total = data.value.srrList.length
    currentChange()
})
const currentChange = (index) => {
    if (index) {
        data.value.pageIndex = index
        data.value.list = data.value.srrList.slice(
            (data.value.pageIndex - 1) * data.value.size,
            data.value.pageIndex * data.value.size
        );
        return
    }
    data.value.list = data.value.srrList.slice(
        (data.value.pageIndex - 1) * data.value.size,
        data.value.pageIndex * data.value.size
    );
}
</script>
  
<style scoped>
/* .users {
    width: 100%;
    height: 100%;
    background: url('@/assets/img/index.jpg');
    background-size: 100%;
    overflow-y: hidden;
  } */

.users video {
    z-index: -1;
    margin: 5% 10%;
    overflow-x: auto;
}
</style>
  