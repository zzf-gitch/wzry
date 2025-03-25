<template>
  <div class="body">
    <button type="button" @click="a">Button</button>
    <button type="button" @click="a">Button</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
// import { ElLoading } from 'element-plus'
// const fullscreenLoading = ref(false)

const a = () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;
      let span = document.createElement("span");
      span.style.left = x + "px";
      span.style.top = y + "px";
      this.appendChild(span);

      setTimeout(() => {
        span.remove();
      }, 800);
    });
  });
};
// onMounted(()=>{
//   const loading = ElLoading.service({
//     lock: true,
//     text: 'Loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   })
//   setTimeout(() => {
//     loading.close()
//   }, 2000)
// })
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
}
.body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background-color: #040d15;
}
button {
  position: relative;
  /* display: inline-block; */
  border: none;
  overflow: hidden;
  padding: 12px 36px;
  margin: 10px 0;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  letter-spacing: 2px;
  border-radius: 40px;
  background: linear-gradient(90deg, #0162c8, #55e7fc);
}
button:nth-child(2) {
  background: linear-gradient(90deg, #755bea, #ff72c0);
}
span {
  position: absolute;
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 0.5),
    rgba(255, 255, 0, 0.5),
    rgba(0, 255, 255, 0.5),
    rgba(0, 0, 255, 0.5)
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear infinite;
}
@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
}
</style>