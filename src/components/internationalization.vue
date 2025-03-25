<template>
  <div class="content">
    <div class="content-header">
        <div class="content-header1"><span>国际化</span></div>
        <div class="content-header2"><i class="iconfont icon-close" @click="close"></i></div>
    </div>
    <div class="content-main">
        <div :class="currentIndex === index ? 'sphover' :'sp'" v-for="(item,index) in EnglishArr" :key="index" @click="language(item,index)">
          <span>{{item.name}}</span>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive , defineEmits , defineProps } from "vue";
const EnglishArr = ref([
  {
    id:0,
    name:"中文",
    language:'zh'
  },
  {
    id:1,
    name:"English",
    language:'en'
  },
  {
    id:2,
    name:"日本語",
    language:'rn'
  },
  {
    id:3,
    name:"Русский",
    language:'an'
  },
  {
    id:4,
    name:"한국어",
    language:'hn'
  },
  {
    id:5,
    name:"Deutsch",
    language:'dn'
  },
  {
    id:6,
    name:"Français",
    language:'fn'
  },
  {
    id:7,
    name:"Italiano",
    language:'yn'
  },
  {
    id:8,
    name:"粵語",
    language:'yuen'
  }
])
const currentIndex = ref(null)
const emit = defineEmits(['close','language'])
const close = () => {
  emit('close',false)
}
const language = (item,i) => {
  currentIndex.value = i
  emit('language',item)
}
const props = defineProps(['Gid'])
currentIndex.value = props?.Gid ? props.Gid : 0
</script>

<style scoped>
.content{
  position: absolute;
  width: 300px;
  height: 100%;
  background: white;
  right: 0%;
  top: 0%;
  z-index: 99999;
}
.content-header{
  width: 100%;
  height: 10%;
  display: flex;
}
.content-header1{
  flex: 1;
  display: flex;
  align-items: center;
}
.content-header span{
  padding-left: 20px;
  font-size: 30px;
  font-weight: 700;
  color: #4796f5;
}
.content-main{
  width: 100%;
  height: 10%;
  display: flex;
  flex-wrap: wrap;
}
.sp{
  width: auto;
  height: 20px;
  padding: 13px;
  cursor: pointer;
}
.sphover{
  width: auto;
  height: 20px;
  padding: 13px;
  cursor: pointer;
  background: whitesmoke;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  text-shadow: 0 1px 2px #000;
}
.content-header2{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.icon-close{
  padding-right: 20px;
  font-size: 30px;
  font-weight: 700;
  color: black;
  cursor: pointer;
}
</style>
