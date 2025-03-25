<template>
   <div class="container">
      <h3>Oops! Page not found.</h3>
      <h1>404</h1>
      <h2>您访问的页面不存在</h2>
      <a href="#" @click="gohome">Go back home</a>
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
} from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const gohome=()=>{
    router.push('/')
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
  font-family: "montserrat",sans-serif;
  min-height: 100vh;
  background-image: linear-gradient(125deg,#6a89cc,#b8e994);
}
.container{
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #343434
}
.container h1{
  font-size: 160px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 20px;
  background: url(../assets/wappler.jpg);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.container h2{
  font-size: 50px;
  margin: 0;
  font-weight: 900;
  letter-spacing: 10px;
  background: url(../assets/wappler.jpg);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.container a{
  text-decoration: none;
  background: #e55039aa;
  color: #fff;
  padding: 12px 24px;
  display: inline-block;
  border-radius: 25px;
  font-size: 14px;
  text-transform: uppercase;
  transition: 0.4s;
}
.container a:hover{
  background: #e55039;
}
</style>