<template>
  <div class="tags">
    <!-- tag标签页 -->
    <el-tabs v-model="activeIndex" type="card" @tab-click="clickTab" @tab-remove="removeTab" closable>
      <el-tab-pane v-for="item in openTab" :key="item.name" :label="item.name" :name="item.route">
      </el-tab-pane>
    </el-tabs>
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
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const openTab = computed(() => { return store.state.Tag.openTab })
// const openTab = computed(()=> store.state.Tag.openTab)
const activeIndex = computed({ 
  get(){
    return store.state.Tag.activeIndex
  },
  set(val){
    return store.commit('set_active_index', val)
  }
})
watch(route, (newValue, oldValue) => {
  let flag = false
  console.log(newValue.name);
  console.log(newValue.path);
  for (let item of openTab.value) {
    if (item.name === newValue.name) {
      store.commit('set_active_index', newValue.path)
      flag = true
      break
    }
  }

  if (!flag) {
    store.commit('add_tabs', { route: newValue.path, name: newValue.name })
    store.commit('set_active_index', newValue.path)
  }
})
const clickTab = (tab) => {
  console.log(activeIndex.value);
  router.push({ path: activeIndex.value })
  console.log(route.path)
}
const removeTab = (target) => {
  console.log(target);
  if (target == '/zhuye' || target == '/zhuye') {
    return
  }
  store.commit('delete_tabs', target)
  if (activeIndex.value === target) {
    // 设置当前激活的路由
    if (openTab.value && openTab.value.length >= 1) {
      console.log('=============', openTab.value[openTab.value.length - 1].route)
      store.commit('set_active_index',openTab.value[openTab.value.length - 1].route)
      router.push({ path: activeIndex.value })
    }
  }
}
onMounted(() => {
  // 刷新时以当前路由做为tab加入tabs
  // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
  // 当当前路由是首页时，添加首页到store，并设置激活状态
  if (route.path == '/zhuye') {
    store.commit('add_tabs', { route: route.path, name: route.name })
    store.commit('set_active_index', route.path)
    console.log(route.path);
  }
  else {
    store.commit('add_tabs', { route: '/zhuye', name: '主页' })
    store.commit('add_tabs', { route: route.path, name: route.name })
    store.commit('set_active_index', route.path)
  }
})
</script>
<style scoped="scoped">
.tags {
  background-color: #314c71;
  height: 40px;
}
</style>