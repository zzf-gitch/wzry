<template>
	<dv-full-screen-container>
		<dv-border-box-1>
			
			<dv-percent-pond :config="config"  />
			<dv-flyline-chart :config="config" style="width:100%;height:100%;" />
			<dv-scroll-ranking-board :config="config" style="width:500px;height:300px" />
			<dv-charts :option="option1" />
			<dv-charts :option="option2" />
			<dv-loading>Loading...</dv-loading>
		</dv-border-box-1>
	</dv-full-screen-container>
	
</template>

<script setup>
	import {ref} from 'vue'
	const option1 = ref({
	  title: {
	    text: '剩余油量表'
	  },
	  series: [
	    {
	      type: 'gauge',
	      data: [
	        { name: '油箱A', value: 59 ,  gradient: ['#e7bcf3', '#e690d1', '#fb7293'], localGradient: true},
	        { name: '油箱B', value: 78, radius: '40%' ,  gradient: ['#e7bcf3', '#e690d1', '#fb7293'], localGradient: true},
	        { name: '油箱C', value: 45, radius: '20%' , gradient: ['#e7bcf3', '#e690d1', '#fb7895'], localGradient: true}
	      ],
	      axisLabel: {
	        formatter: '{value}%'
	      },
	      pointer: {
	        valueIndex: 2,
	        style: {
	          scale: [.6, .6]
	        }
	      },
	      details: {
	        show: true,
	        formatter: '{name}剩余{value}%',
	        position: 'start',
	        offset: [10, 0],
	        style: {
	          fontSize: 13,
	          textAlign: 'left'
	        }
	      }
	    }
	  ]
	})
	
	const option2 = ref({
	  title: {
	    text: '剩余油量表'
	  },
	  series: [
	    {
	      type: 'gauge',
	      data: [
	        { name: '油箱A', value: 78 },
	        { name: '油箱B', value: 65, radius: '40%' },
	        { name: '油箱C', value: 55, radius: '20%' }
	      ],
	      axisLabel: {
	        formatter: '{value}%'
	      },
	      pointer: {
	        valueIndex: 2,
	        style: {
	          scale: [.6, .6]
	        }
	      },
	      details: {
	        show: true,
	        formatter: '{name}剩余{value}%',
	        position: 'start',
	        offset: [10, 0],
	        style: {
	          fontSize: 13,
	          textAlign: 'left'
	        }
	      }
	    }
	  ]
	})
	const config=ref({
		value:66,
		  centerPoint: [0.48, 0.35],
		   points: [
		     {
		       position: [0.52, 0.235],
		       text: '新乡'
		     },
		     {
		       position: [0.43, 0.29],
		       text: '焦作'
		     },
		     {
		       position: [0.59, 0.35],
		       text: '开封'
		     },
		     {
		       position: [0.53, 0.47],
		       text: '许昌'
		     },
		     {
		       position: [0.45, 0.54],
		       text: '平顶山'
		     },
		     {
		       position: [0.36, 0.38],
		       text: '洛阳'
		     },
		     {
		       position: [0.62, 0.55],
		       text: '周口'
		     },
		     {
		       position: [0.56, 0.56],
		       text: '漯河'
		     },
		     {
		       position: [0.37, 0.66],
		       text: '南阳'
		     },
		     {
		       position: [0.55, 0.81],
		       text: '信阳'
		     },
		     {
		       position: [0.55, 0.67],
		       text: '驻马店'
		     },
		     {
		       position: [0.37, 0.29],
		       text: '济源'
		     },
		     {
		       position: [0.20, 0.36],
		       text: '三门峡'
		     },
		     {
		       position: [0.76, 0.41],
		       text: '商丘'
		     },
		     {
		       position: [0.59, 0.18],
		       text: '鹤壁'
		     },
		     {
		       position: [0.68, 0.17],
		       text: '濮阳'
		     },
		     {
		       position: [0.59, 0.10],
		       text: '安阳'
		     }
		   ],
		   k: 0.5,
		   data: [
		       {
		         name: '周口',
		         value: 55
		       },
		       {
		         name: '南阳',
		         value: 120
		       },
		       {
		         name: '西峡',
		         value: 78
		       },
		       {
		         name: '驻马店',
		         value: 66
		       },
		       {
		         name: '新乡',
		         value: 80
		       },
		       {
		         name: '信阳',
		         value: 45
		       },
		       {
		         name: '漯河',
		         value: 29
		       }
		     ],
			 
	})
	
</script>

<style scoped="scoped">
	#dv-full-screen-container{
		width: 100%;
		height: 100%;
		background-color: black;
		overflow: hidden;
		overflow-y: scroll;
	}
	.dv-border-box-1{
		width: 100%;
		height: 100%;
	}
	.dv-percent-pond{
		width: 12.5rem;
		height: 6.25rem;
		margin: 0 auto;
	}
</style>
