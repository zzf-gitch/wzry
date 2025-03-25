<template>
  <div class="login">
    <div id="china_map_box">
      <div ref="maps" id="china_map"></div>
    </div>
  </div>
</template>

<script setup>
import chart from "../echartsa.vue";
import china from "../utils/china.js";
import * as echarts from "echarts";
import "echarts-gl";
import $ from "jquery";
import { ref, onMounted } from "vue";
import { ElLoading } from 'element-plus'
const fullscreenLoading = ref(false)
const maps = ref("");
const map = () => {
  // 初始化echarts实例
  var myEcharts = echarts.init(maps.value);
  var option = {
    title: {
      //标题样式
      text: "中国地图",
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
          color: "#1f307b",
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
      map: "china",
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
          {
            name: "南海诸岛",
            value: 100,
            eventTotal: 100,
            specialImportant: 10,
            import: 10,
            compare: 10,
            common: 40,
            specail: 20,
          },
          { name: "北京", value: 35 },
          { name: "天津", value: 12 },
          { name: "上海", value: 3000 },
          { name: "重庆", value: 92000 },
          { name: "河北", value: 25000 },
          { name: "河南", value: 20000 },
          { name: "云南", value: 50 },
          { name: "辽宁", value: 123 },
          { name: "黑龙江", value: 80 },
          { name: "湖南", value: 2000 },
          { name: "安徽", value: 24580 },
          { name: "山东", value: 40629 },
          { name: "新疆", value: 23 },
          { name: "江苏", value: 13569 },
          { name: "浙江", value: 24956 },
          { name: "江西", value: 15194 },
          { name: "湖北", value: 41398 },
          { name: "广西", value: 41150 },
          { name: "甘肃", value: 17630 },
          { name: "山西", value: 120 },
          { name: "内蒙古", value: 2300 },
          { name: "陕西", value: 97208 },
          { name: "吉林", value: 200 },
          { name: "福建", value: 19978 },
          { name: "贵州", value: 94485 },
          { name: "广东", value: 89426 },
          { name: "青海", value: 35484 },
          { name: "西藏", value: 36 },
          { name: "四川", value: 54161 },
          { name: "宁夏", value: 56515 },
          { name: "海南", value: 54871 },
          { name: "台湾", value: 48544 },
          { name: "香港", value: 49474 },
          { name: "澳门", value: 34594 },
        ],
      },
    ],
  };

  // 使用刚指定的配置项和数据显示图表。
  myEcharts.setOption(option);
};

onMounted(() => {
  map();
  const loading = ElLoading.service({
    lock: true,
    text: '正在加载中，请稍后.......',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 1000)
});
const checked1 = ref(false);
const disabled = ref(true);
const get = (z) => {
  console.log(z);
  if (z == false) {
    disabled.value = true;
  } else if (z == true) {
    disabled.value = false;
  }
};
</script>

<style scoped>
.login {
  height: 100%;
}
#china_map_box {
  height: 100%;
  position: relative;
}
#china_map_box #china_map {
  height: 100%;
}
</style>