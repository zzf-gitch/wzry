<template>
  <div class="common-layout">
    <el-container>
      <el-aside  :width="isCollapse ? '64px' : '200px'">
      <nav_menu></nav_menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="img">
            <img @click="toisCollopse" src="../assets/收起菜单.png" alt="" />
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :replace="true" :to="{ path: '/element_plus' }">地图系统</el-breadcrumb-item>
              <el-breadcrumb-item v-show="showBread" :replace="true" :to="{ path: '/login' }">{{$route.meta.title}}</el-breadcrumb-item>
              <!-- <el-breadcrumb-item :to="{ path: '' }"></el-breadcrumb-item> -->
            </el-breadcrumb>
            <div class="logins">
            <img :src="listDate.img">
            <span style="margin-left: 10px;font-size: 14px;font-weight: 800;">早上好,&nbsp;&nbsp;{{listDate.name}}</span>
          </div>
          </div>
        </el-header>
        <el-main>
          <CommonTags></CommonTags>
          <router-view />
        <keep-alive/>
        </el-main>
        <el-footer>
          <div class="china">
            <p>我爱中国</p>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
      
<script setup>
import nav_menu from '../components/menu.vue'
import { mapState,mapMutations,useStore } from 'vuex'
import { useRouter, useRoute } from "vue-router";
import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
// import CommonTags from '../page/Tag.vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ElLoading } from 'element-plus'
const name=ref('')
name.value=JSON.parse(sessionStorage.getItem('Loginuser')).name
const zzf=ref('')
zzf.value=JSON.parse(sessionStorage.getItem('Loginuser')).img
const tags=computed(()=>store.state.tab.tabsList)
console.log(tags);
const fullscreenLoading = ref(false)
const store = useStore();
const router = useRouter();
const route = useRoute();
const showBread=ref(true);
const isCollapse = computed(() => {return store.state.main.isCollapse})
const listDate=ref('')
listDate.value=JSON.parse(sessionStorage.getItem("administrator"))
console.log(listDate.value);
const toisCollopse = () => {
      store.commit('collapseMenu');
};
const changeMenu=(tag)=>{
      store.commit('selectMenu',tag)
      router.push({name:tag.name})
       
    
}
const handleClose=(tag,index)=>{
      let length=tags.length-1
      close(tag)
      if (tag.name !== route.name) {
        return
      }
      if(index===length){
       router.push({name:tags[index-1].name})
      }else{
       router.push({name:tags[index].name})
      }  
}

      
const gelist = (arr) => {
  let arr1 = ["120", "125", "125", "130", "130", "130", "130", "130"];
  let arr2 = ["120", "125", "130"];
  for (var i = arr1.length - 1; i >= 0; i--) {
    let a = arr1[i];
    for (var j = arr2.length - 1; j >= 0; j--) {
      let b = arr2[j];
      if (a == b) {
        arr1.splice(i, 1);
        arr2.splice(j, 1);
        break;
      }
    }
  }
  // console.log(arr1);
};
onMounted(() => {
  gelist();
  const loading = ElLoading.service({
    lock: true,
    text: '正在加载中，请稍后.......',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
});
</script>
<style scoped="scoped">
.el-breadcrumb{
  margin-left: 15px;
}
.el-breadcrumb__inner.is-link {
    font-weight: 700;
    text-decoration: none;
    transition: black 0.2s !important;
    color: white !important;
}
.logins{
  width: 20%;
  height: 90%;
  margin-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logins img{
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.logins span{
  /* color: white; */
}
.common-layout {
  width: 100%;
  height: 100%;
}
.el-main {
  width: 100%;
  height: 80%;
  /* background: linear-gradient(to right, #8360c3, #2ebf91); */
}
.el-aside {
  /* background: linear-gradient(to bottom #2ebf91); */
  background-color: #001529;
  transition: all 0.5s;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-footer {
  width: 100%;
  height: 5%;
  /* background: linear-gradient(to right, #8360c3, #2ebf91); */
  background-color: whitesmoke;
}
.el-header {
  width: 100%;
  height: 5%;
  padding: 0px !important;
  background-color: whitesmoke;
}
.china p{
  display: flex;
  align-items:center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  margin-top: 5px;
}

.img {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.img img {
  width: 25px;
  height: 25px;
}
</style>
