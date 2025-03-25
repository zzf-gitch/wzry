<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item name="message">
      <span>消息</span>
      <template #icon="props">
        <img :src="props.active ? icon.activemessage : icon.inactivemessage" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="Contact">
      <span>联系人</span>
      <template #icon="props">
        <img :src="props.active ? ico.activeContactactive : ico.inactiveContactinactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="Dynamic">
      <span>动态</span>
      <template #icon="props">
        <img :src="props.active ? ic.activeDynamicactive : ic.inactiveDynamicinactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref , reactive} from "vue";
import router from "../router";
import messageactive from '../assets/QQiphone/消息选中.png'
import messageinactive from '../assets/QQiphone/消息未选中.png'
import Contactactive from '../assets/QQiphone/联系人选中.png'
import Contactinactive from '../assets/QQiphone/联系人未选中.png'
import Dynamicactive from '../assets/QQiphone/动态选中.png'
import Dynamicinactive from '../assets/QQiphone/动态未选中.png'
const active = ref("message");
const icon = reactive({activemessage:messageactive,inactivemessage:messageinactive},)
const ico =reactive({activeContactactive:Contactactive,inactiveContactinactive:Contactinactive})
const ic =reactive({activeDynamicactive:Dynamicactive,inactiveDynamicinactive:Dynamicinactive})
const onChange = () => {
  if (active.value == "message") {
    router.push({ name: "homepage" });
  }
  if (active.value == "Contact") {
    router.push({ name: "Contact" });
  }
  if (active.value == "Dynamic") {
    router.push({ name: "Dynamic" });
  }
};
</script>

<style>
.van-tabbar {
  position: fixed;
  height: 7%;
}
</style>