<template>
  <div ref="mapOption" id="main"></div>
</template>

<script setup>
import shanxi from '../page/utils/shanxi.js'
import * as echarts from 'echarts';
import 'echarts-gl';
import $ from 'jquery'
import { ref, onMounted } from 'vue'
import { ElLoading } from 'element-plus'
const fullscreenLoading = ref(false)
const mapOption = ref('')
const a = () => {
  var myChart = echarts.init(mapOption.value);
  var option = {
    title: {  //标题样式
      text: '山西地图',
      x: "center",
      textStyle: {
        fontSize: 18,
        color: "red"
      },
    },
    tooltip: {  //这里设置提示框
      triggerOn: "mousemove",   //mousemove、click
      padding: 8,
      borderWidth: 1,
      borderColor: '#409eff',
      backgroundColor: 'rgba(255,255,255,0.7)',
      textStyle: {
        color: '#000000',
        fontSize: 13
      },
      formatter: function (e, t, n) {
        //   console.log(e,t,n)
        let data = e.data;
        //模拟数据
        data.specialImportant = Math.random() * 1000 | 0;
        data.import = Math.random() * 1000 | 0;
        data.compare = Math.random() * 1000 | 0;
        data.common = Math.random() * 1000 | 0;
        data.specail = Math.random() * 1000 | 0;
        data.life = Math.random() * 1000 | 0;
        data.death = Math.random() * 1000 | 0;

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
            `
        return context;
      }
    },
    visualMap: {//视觉映射组件
      show: true,
      left: 26,
      bottom: 40,
      showLabel: true,
      pieces: [        //根据数据大小，各省显示不同颜色
        {
          gte: 100,
          label: ">= 1000",
          color: "#1f307b"
        },
        {
          gte: 500,
          lt: 999,
          label: "500 - 999",
          color: "#3c57ce"
        },
        {
          gte: 100,
          lt: 499,
          label: "100 - 499",
          color: "#6f83db"
        },
        {
          gte: 10,
          lt: 99,
          label: "10 - 99",
          color: "#9face7"
        },
        {
          lt: 10,
          label: '<10',
          color: "#bcc5ee"
        }
      ]

    },
    geo: {                 //中国地图设置
      map: "shanxi",
      scaleLimit: {
        min: 1,
        max: 2
      },
      zoom: 1,
      top: 120,
      label: {
        normal: {
          show: true,
          fontSize: "14",
          color: "rgba(0,0,0,0.7)"
        }
      },
      itemStyle: {
        normal: {
          borderColor: "rgba(0, 0, 0, 0.2)"
        },
        emphasis: {
          areaColor: "#f2d5ad",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          borderWidth: 0
        }
      }
    },

    series: [
      {
        name: "突发事件",
        type: "map",
        geoIndex: 0,
        data: [//自定义数据与返回的城市进行匹配
          { name: "太原市", value: 130 },
          { name: "晋中市", value: 140 },
          { name: "吕梁市", value: 50 },
          { name: "临汾市", value: 121 },
          { name: "大同市", value: 155 },
          { name: "方山市", value: 190 },
          { name: "临县市", value: 110 },
          { name: "运城市", value: 170 },
          { name: "离石市", value: 1150 },
          { name: "柳林市", value: 310 },
          { name: "汾阳市", value: 150 },
          { name: "朔州市", value: 150 },
          { name: "忻州市", value: 150 },
          { name: "阳泉市", value: 150 },
          { name: "长治市", value: 150 },
          { name: "晋城市", value: 150 },
        ],
      }
    ]

  }
  myChart.setOption(option);
}
onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: '正在加载中，请稍后.......',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
  a()
})
</script>

<style scoped>
#main {
  width: 800px;
  height: 600px;
}
</style>
