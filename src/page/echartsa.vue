<template>
	<div ref="chart" id="main">
		
	</div>
</template>

<script setup> 
	import { ref, defineEmits, defineProps, nextTick, reactive, onMounted, watch, computed, onUnmounted } from 'vue'
	import * as echarts from 'echarts';
	import 'echarts-gl';
	import $ from 'jquery'
	// import data from './baidu/geoMap.json'
	// require('./baidu/geoMap.json')
	// import 'echarts/extension/bmap/bmap'
	const props=defineProps({//对象解构
		chartType:{
			type:String
		},
		chartData:{
			type:Array
		}
	})
	const chart=ref()
	const obj=()=>{
		 // 基于准备好的dom，初始化echarts实例
		      var myChart = echarts.init(chart.value);
		
		      // 指定图表的配置项和数据
		      var option = {
		        title: {
		          text: 'ECharts 入门示例'
		        },
		        xAxis: {//x轴
		          data: ['衬衫', '羊毛', '雪纺衫', '裤子', '高跟鞋', '袜子']
		        },
		        yAxis://y轴 
				{},
		        series: [
		          {
		            name: '销量',
		            type: props.chartType, //图表类型
		            data: props.chartData//图表数据
		          }
		        ]
		      };
		
		      // 使用刚指定的配置项和数据显示图表。
		      myChart.setOption(option);
	}
	onMounted(()=>{
		obj()
	})
</script>

<style>
	#main{
		width: 37.5rem;
		height: 18.75rem;
	}
</style>
