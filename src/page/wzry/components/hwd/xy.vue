<template>
  <div class="xy">
    <div @click="open" class="box" id="box">
      <div id="main"></div>
      <i class="iconfont icon-close" @click="close"></i>
    </div>


    <div class="main">
      <div class="main_top">
        <div
          class="blue"
          :class="{ lineActives: lineActives }"
          v-if="blues"
        ></div>
        <div
          class="green"
          v-if="greens"
          :class="{ lineActivess: lineActivess }"
        ></div>
        <div
          class="red"
          v-if="reds"
          :class="{ lineActivesss: lineActivesss }"
        ></div>
      </div>
      <div class="main_bottom">
        <el-button class="btn1" type="primary" @click="go1">蓝</el-button>
        <el-button class="btn2" type="success" @click="go2">绿</el-button>
        <el-button class="btn3" type="danger" @click="go3">红</el-button>
      </div>
    </div>

  </div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, reactive, onMounted } from "vue";
//浏览器是否支持全屏模式
const isSupport = document.fullscreenEnabled;
const open = () => {
  if (isSupport) {
    let dom = document.getElementById("box");
    if (dom.requestFullscreen) {
        dom.requestFullscreen();
    } else if (dom.webkitRequestFullScreen) {
      dom.webkitRequestFullScreen();
    } else if (dom.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (dom.msRequestFullscreen) {
      dom.msRequestFullscreen();
    }

  }
};
const close = () => {
  document.exitFullscreen();
};
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
const blues = ref(false);
const greens = ref(false);
const reds = ref(false);
const lineActives = ref(false);
const lineActivess = ref(false);
const lineActivesss = ref(false);
const go1 = () => {
  blues.value = true;
  lineActives.value = true;
  greens.value = false;
  lineActivess.value = false;
  reds.value = false;
  lineActivesss.value = false;
};
const go2 = () => {
  greens.value = true;
  lineActivess.value = true;
  blues.value = false;
  lineActives.value = false;
  reds.value = false;
  lineActivesss.value = false;
};
const go3 = () => {
  reds.value = true;
  lineActivesss.value = true;
  blues.value = false;
  lineActives.value = false;
  greens.value = false;
  lineActivess.value = false;
};
onMounted(() => {
      getlist()
});
</script>

<style scoped>
.xy {
  width: 100%;
  height: 100%;
  display:flex;
  padding: 50px;
}
.box {
  width: 300px;
  height: 300px;
  border: 1px solid #e6a349;
  background-color: #fa9899;
  position: relative;
  transition: all 0.5s;
}
.box:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 30px 5px rgba(0, 0, 0, 0.75);
}
#main {
  width: 100%;
  height: 100%;
}
.icon-close {
  color: black;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
}
.main {
  width: 300px;
  height: 600px;
  border: 1px solid red;
  margin: 0 auto;
}
.main_top {
  width: 100%;
  height: 90%;
}
.main_bottom {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: flex-end;
}
.btn1 {
  flex: 1;
}
.btn2 {
  flex: 1;
}
.btn3 {
  flex: 1;
}
.blue {
  width: 100%;
  height: 100%;
  background-color: #499bfb;
}
.green {
  width: 100%;
  height: 100%;
  background-color: #5cc449;
}
.red {
  width: 100%;
  height: 100%;
  background-color: #f76c6f;
}
.lineActives {
  animation: sql 0.5s linear;
}
.lineActivess {
  animation: sql 0.5s linear;
}
.lineActivesss {
  animation: sql 0.5s linear;
}
@keyframes sql {
  0% {
    transform: translateY(-100%);
  }
  50%{
      transform: translateY(-50%)
  }
  100% {
    transform: translateY(0);
  }
}
</style>