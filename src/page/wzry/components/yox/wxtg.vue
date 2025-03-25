<template>
    <div class="wxtg">
        <div class="content" id="content_main">
            <div id="main" @click="open"></div>
            <i class="iconfont icon-close" @click="close"></i>
        </div>
    </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";
const isSupport=document.fullscreenEnabled
const open=()=>{
    if(isSupport){
        let element = document.getElementById("content_main")
        if(element.requestFullscreen){
            element.requestFullscreen();
        }else if(element.mozRequestFullScreen){
            element.mozRequestFullScreen();
        }else if(element.webkitRequestFullScreen){
            element.webkitRequestFullScreen();
        }else if(element.msRequestFullScreen){
            element.msRequestFullScreen();
        }
    }
}
const close=()=>{
    document.exitFullscreen();
}
const getlist = () => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;
  window.addEventListener("click",()=>{
      myChart.resize()
  })
  // prettier-ignore
  let dataAxis = ['以', '雷', '霆', '击', '碎', '黑', '暗'];
  // prettier-ignore
  let data = [220, 182, 191, 234, 290, 330, 310, 123, 442];
  let yMax = 500;
  let dataShadow = [];
  for (let i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
  }
  option = {
    title: {
      text: "特性示例：渐变色 阴影 点击缩放",
      subtext: "Feature Sample: Gradient Color, Shadow, Click Zoom",
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };
  // Enable data zoom when user click bar.
  const zoomSize = 6;
  myChart.on("click", function (params) {
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    myChart.dispatchAction({
      type: "dataZoom",
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)],
    });
  });

    myChart.setOption(option);
};
onMounted(() => {
    getlist()
})
</script>

<style scoped>
    .wxtg{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content{
        width: 300px;
        height: 300px;
        background-color: skyblue;
        transition: all 0.5s;
        position: relative;
    }
    #main{
        width: 100%;
        height: 100%;
    }
    .content:hover{
        transform: translateY(-5px);
        box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.75);
    }
    .icon-close{
        position:absolute;
        top: 10px;
        right: 10px;
        background-color: whitesmoke;
        border-radius: 50%;
    }
</style>