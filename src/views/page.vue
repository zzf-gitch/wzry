<template>
     <div class="zhangjielist">
      <div
        class="zhangjie"
        v-for="item in list.listpage"
        :key="item.id"
      >
        {{ item.chapter }}
      </div>
      
<van-pagination
    @change="handleCurrentChange"
     v-model="page"
     :total-items="total_page"
     :page-count="pagenum"
      :items-per-page="perpage"
     force-ellipses
/>
    </div>
</template>

<script setup>
import axios from "axios"
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const store = useStore();
const router = useRouter();
const route = useRoute();
const page=ref(1);
const total_page=ref(10)
const pagenum=ref("")
const perpage=ref(10)
const list=reactive({
  listpage:[],
})
onMounted(()=>{
  getlist()
})
const getlist=()=>{
  axios.get("/page.json").then(res=>{
    console.log(res.data);
    list.listpage=res.data.listpage;
    total_page.value=res.data.listpage.length/total_page;
    pagenum.value=res.data.listpage.length
  })
}
const handleCurrentChange=(page)=> {
  list.page = page;
  axios.get('/page.json').then(res=>{
    list.listpage=res.data.listpage;
    
  })
      
    }
</script>

<style scoped>
  
.zhangjielist {
  height: 18.6667rem;
  margin: 0.5333rem;
}
.zhangjie {
   border-bottom: 1px solid rgb(226, 226, 243);
   padding: 0 0.5333rem;
   height: 0.9333rem;
   margin-right: 0.8rem;
   line-height: 0.9333rem;
}
</style>