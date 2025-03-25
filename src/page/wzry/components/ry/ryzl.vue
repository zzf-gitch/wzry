<template>
  <div class="ryzl">
    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
      :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
      :file-list="fileList.slice((currentpage - 1) * pagesize, currentpage * pagesize)" :on-success="success" :on-error="error"
      :http-request="uploadTitleImgEvent">
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible" :close-on-press-escape="false" :close-on-click-modal="false" center>
      <img style="width:100%;height:100%;" w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
  <!-- 分页 -->
  <el-pagination small background @current-change="handleCurrentChange" layout="prev, pager, next,total,jumper"
    :total="fileList.length" :current-page="currentpage" :page-size="pagesize" class="mt-4" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { getHeroUrl } from '../../../../api/heromain/hero/transfer.js'
import { UploadProps } from 'element-plus'
import { async } from 'q';
import zzf from '../../../../assets/wzry-master/hero/67/pi_fu/1.jpg'

const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const getlist = async () => {
  await getHeroUrl().then(res => {
    console.log(res.data);
    fileList.value = res.data.herourl
  })
}
const currentpage = ref(1)
const pagesize = ref(43)
const handleCurrentChange = (val) => {
  console.log(val);
  currentpage.value = val
}
onMounted(() => {
  getlist();
})
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile)
  console.log(uploadFiles)
}
//查看英雄头像
const handlePictureCardPreview = (file) => {
  console.log(file);
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
const success = (uploadFile, uploadFiles) => {
  console.log("上传成功");
}
const error = (uploadFile, uploadFiles) => {
  console.log("上传失败");
}
const uploadTitleImgEvent = (v) => {
  console.log(v);
}
</script>

<style scoped="scoped">
.ryzl {
  width: 100%;
  height: 100%;
}

.avatar-uploader /deep/ .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background-color: #F5F7FA !important;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.el-pagination {
  position: absolute;
  bottom: 60px;
  right: 60px;
}
</style>