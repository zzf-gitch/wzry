<template>
  <van-tabbar v-model="active"  @change="onChange">
    <van-tabbar-item name="homepageQQcopy">
      <span>自定义</span>
      <template #icon="props">
        <img :src="props.active ? icon.active : icon.inactive" />
      </template>
    </van-tabbar-item>
     <van-tabbar-item name="ContactQQcopy">
      <span>自定义</span>
      <template #icon="props">
        <img :src="props.active ? ico.active : ico.inactive" />
      </template>
    </van-tabbar-item>
     <van-tabbar-item name="DynamicQQcopy">
      <span>自定义</span>
      <template #icon="props">
        <img :src="props.active ? ic.active : ic.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import {ref,reactive} from 'vue'
import router from "../router";
import messageactive from '../assets/QQiphone/消息选中.png'
import messageinactive from '../assets/QQiphone/消息未选中.png'
import Contactactive from '../assets/QQiphone/联系人选中.png'
import Contactinactive from '../assets/QQiphone/联系人未选中.png'
import Dynamicactive from '../assets/QQiphone/动态选中.png'
import Dynamicinactive from '../assets/QQiphone/动态未选中.png'
const active = ref('homepageQQcopy');
const icon=reactive(
        {
            active:messageactive,
            inactive:messageinactive
        }
)
const ico=reactive({
    active:Contactactive,
            inactive:Contactinactive
})
const ic=reactive({
    active:Dynamicactive,
            inactive:Dynamicinactive
})
const onChange=()=>{
    if(active.value=='homepageQQcopy'){
        router.push('homepageQQcopy')
    }else if(active.value=='ContactQQcopy'){
        router.push('ContactQQcopy')
    }else if(active.value=='DynamicQQcopy') {
        router.push('DynamicQQcopy')
    }
}
</script>

<style scoped>
.van-tabbar {
  position: fixed;
  height: 7%;
}
</style>