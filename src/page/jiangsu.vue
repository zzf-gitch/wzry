<template>
  <div ref="jiangsumap" id="main"></div>
</template>

<script setup>
import jiangsu from './utils/jiangsu.js'
import * as echarts from "echarts";
import "echarts-gl";
import $ from "jquery";
import { ref, onMounted } from "vue";
import { ElLoading } from 'element-plus'
const fullscreenLoading = ref(false)
const jiangsumap = ref("");
const c = () => {
  var myChart = echarts.init(jiangsumap.value);
  var option = {
    title: {
      //标题样式
      text: "江苏地图",
      x: "center",
      textStyle: {
        fontSize: 18,
        color: "red",
      },
    },
    tooltip: {
      //这里设置提示框
      triggerOn: "mousemove", //mousemove、click
      padding: 8,
      borderWidth: 1,
      borderColor: "#409eff",
      backgroundColor: "rgba(255,255,255,0.7)",
      textStyle: {
        color: "#000000",
        fontSize: 13,
      },
      formatter: function (e, t, n) {
        //   console.log(e,t,n)
        let data = e.data;
        //模拟数据
        data.specialImportant = (Math.random() * 1000) | 0;
        data.import = (Math.random() * 1000) | 0;
        data.compare = (Math.random() * 1000) | 0;
        data.common = (Math.random() * 1000) | 0;
        data.specail = (Math.random() * 1000) | 0;
        data.life = (Math.random() * 1000) | 0;
        data.death = (Math.random() * 1000) | 0;

        let context = `
               <div>
                <p><b style="font-size:15px;">疫情实时地图</b>(${data.name})</p>
                   <p class="tooltip_style"><span class="tooltip_left">新增本土</span><span class="tooltip_right">${data.value}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">新增本土无症状</span><span class="tooltip_right">${data.specialImportant}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">新增境外</span><span class="tooltip_right">${data.import}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">新增确诊</span><span class="tooltip_right">${data.compare}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">现有确诊</span><span class="tooltip_right">${data.common}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">累计确诊</span><span class="tooltip_right">${data.specail}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">累计治愈</span><span class="tooltip_right">${data.life}</span></p>
                   <p class="tooltip_style"><span class="tooltip_left">累计死亡</span><span class="tooltip_right">${data.death}</span></p>
               </div>
            `;
        return context;
      },
    },
    visualMap: {
      //视觉映射组件
      show: true,
      left: 26,
      bottom: 40,
      showLabel: true,
      pieces: [
        //根据数据大小，各省显示不同颜色
        {
          gte: 100,
          label: ">= 1000",
          color: "red",
        },
        {
          gte: 500,
          lt: 999,
          label: "500 - 999",
          color: "#3c57ce",
        },
        {
          gte: 100,
          lt: 499,
          label: "100 - 499",
          color: "#6f83db",
        },
        {
          gte: 10,
          lt: 99,
          label: "10 - 99",
          color: "#9face7",
        },
        {
          lt: 10,
          label: "<10",
          color: "#bcc5ee",
        },
      ],
    },
    geo: {
      //中国地图设置
      map: "jiangsu",
      scaleLimit: {
        min: 1,
        max: 2,
      },
      zoom: 1,
      top: 120,
      label: {
        normal: {
          show: true,
          fontSize: "14",
          color: "rgba(0,0,0,0.7)",
        },
      },
      itemStyle: {
        normal: {
          borderColor: "rgba(0, 0, 0, 0.2)",
        },
        emphasis: {
          areaColor: "#f2d5ad",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderWidth: 0,
        },
      },
    },

    series: [
      {
        name: "突发事件",
        type: "map",
        geoIndex: 0,
        data: [
          //自定义数据与返回的城市进行匹配
          {name: '南京市', value: 4822},
                {name: '常州市', value: 731},
                {name: '徐州市', value: 55},
                {name: '淮安市', value: 31},
                {name: '南通市', value: 380},
                {name: '宿迁市', value: 52},
                {name: '无锡市', value: 357},
                {name: '扬州市', value: 992},
                {name: '盐城市', value: 2323},
                {name: '苏州市', value: 193},
                {name: '泰州市', value: 9945},
                {name: '镇江市', value:13},
                {name: '连云港市', value: 128}
        ],
      },
    ],
  };
  myChart.setOption(option);
};
onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: '正在加载中，请稍后.......',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
  c();
});
</script>

<style scoped="scoped">
#main {
  width: 800px;
  height: 600px;
}
</style>