<template>
	<div id="main">
		
	</div>
	<div id="box">
		
	</div>
	<div id="bx">
		
	</div>
</template>

<script setup>
	import * as echarts from 'echarts';
	import {onMounted} from 'vue'
	import 'echarts-gl'
	// import 'echarts/extension/bmap/bmap'
	import $ from 'jquery'
	// import {loadBMap} from './baidu/baidu.js'
	const ditu=()=>{
			var ROOT_PATH =
			  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
			var app = {};
			
			var chartDom = document.getElementById('main');
			var myChart = echarts.init(chartDom, 'dark');
			var option;
			
			var indices = {
			  name: 0,
			  group: 1,
			  id: 16
			};
			var schema = [
			  { name: 'name', index: 0 },
			  { name: 'group', index: 1 },
			  { name: 'protein', index: 2 },
			  { name: 'calcium', index: 3 },
			  { name: 'sodium', index: 4 },
			  { name: 'fiber', index: 5 },
			  { name: 'vitaminc', index: 6 },
			  { name: 'potassium', index: 7 },
			  { name: 'carbohydrate', index: 8 },
			  { name: 'sugars', index: 9 },
			  { name: 'fat', index: 10 },
			  { name: 'water', index: 11 },
			  { name: 'calories', index: 12 },
			  { name: 'saturated', index: 13 },
			  { name: 'monounsat', index: 14 },
			  { name: 'polyunsat', index: 15 },
			  { name: 'id', index: 16 }
			];
			var data;
			var fieldIndices = schema.reduce(function (obj, item) {
			  obj[item.name] = item.index;
			  return obj;
			}, {});
			var groupCategories = [];
			var groupColors = [];
			var data;
			var fieldNames = schema.map(function (item) {
			  return item.name;
			});
			fieldNames = fieldNames.slice(2, fieldNames.length - 2);
			function getMaxOnExtent(data) {
			  var colorMax = -Infinity;
			  var symbolSizeMax = -Infinity;
			  for (var i = 0; i < data.length; i++) {
			    var item = data[i];
			    var colorVal = item[fieldIndices[config.color]];
			    var symbolSizeVal = item[fieldIndices[config.symbolSize]];
			    colorMax = Math.max(colorVal, colorMax);
			    symbolSizeMax = Math.max(symbolSizeVal, symbolSizeMax);
			  }
			  return {
			    color: colorMax,
			    symbolSize: symbolSizeMax
			  };
			}
			var config = (app.config = {
			  xAxis3D: 'protein',
			  yAxis3D: 'fiber',
			  zAxis3D: 'sodium',
			  color: 'fiber',
			  symbolSize: 'vitaminc',
			  onChange: function () {
			    var max = getMaxOnExtent(data);
			    if (data) {
			      myChart.setOption({
			        visualMap: [
			          {
			            max: max.color / 2
			          },
			          {
			            max: max.symbolSize / 2
			          }
			        ],
			        xAxis3D: {
			          name: config.xAxis3D
			        },
			        yAxis3D: {
			          name: config.yAxis3D
			        },
			        zAxis3D: {
			          name: config.zAxis3D
			        },
			        series: {
			          dimensions: [
			            config.xAxis3D,
			            config.yAxis3D,
			            config.yAxis3D,
			            config.color,
			            config.symbolSiz
			          ],
			          data: data.map(function (item, idx) {
			            return [
			              item[fieldIndices[config.xAxis3D]],
			              item[fieldIndices[config.yAxis3D]],
			              item[fieldIndices[config.zAxis3D]],
			              item[fieldIndices[config.color]],
			              item[fieldIndices[config.symbolSize]],
			              idx
			            ];
			          })
			        }
			      });
			    }
			  }
			});
			app.configParameters = {};
			['xAxis3D', 'yAxis3D', 'zAxis3D', 'color', 'symbolSize'].forEach(function (
			  fieldName
			) {
			  app.configParameters[fieldName] = {
			    options: fieldNames
			  };
			});
			$.getJSON(ROOT_PATH + '/data/asset/data/nutrients.json', function (_data) {
			  data = _data;
			  var max = getMaxOnExtent(data);
			  myChart.setOption({
			    tooltip: {},
			    visualMap: [
			      {
			        top: 10,
			        calculable: true,
			        dimension: 3,
			        max: max.color / 2,
			        inRange: {
			          color: [
			            '#1710c0',
			            '#0b9df0',
			            '#00fea8',
			            '#00ff0d',
			            '#f5f811',
			            '#f09a09',
			            '#fe0300'
			          ]
			        },
			        textStyle: {
			          color: '#fff'
			        }
			      },
			      {
			        bottom: 10,
			        calculable: true,
			        dimension: 4,
			        max: max.symbolSize / 2,
			        inRange: {
			          symbolSize: [10, 40]
			        },
			        textStyle: {
			          color: '#fff'
			        }
			      }
			    ],
			    xAxis3D: {
			      name: config.xAxis3D,
			      type: 'value'
			    },
			    yAxis3D: {
			      name: config.yAxis3D,
			      type: 'value'
			    },
			    zAxis3D: {
			      name: config.zAxis3D,
			      type: 'value'
			    },
			    grid3D: {
			      axisLine: {
			        lineStyle: {
			          color: '#fff'
			        }
			      },
			      axisPointer: {
			        lineStyle: {
			          color: '#ffbd67'
			        }
			      },
			      viewControl: {
			        // autoRotate: true
			        // projection: 'orthographic'
			      }
			    },
			    series: [
			      {
			        type: 'scatter3D',
			        dimensions: [
			          config.xAxis3D,
			          config.yAxis3D,
			          config.yAxis3D,
			          config.color,
			          config.symbolSiz
			        ],
			        data: data.map(function (item, idx) {
			          return [
			            item[fieldIndices[config.xAxis3D]],
			            item[fieldIndices[config.yAxis3D]],
			            item[fieldIndices[config.zAxis3D]],
			            item[fieldIndices[config.color]],
			            item[fieldIndices[config.symbolSize]],
			            idx
			          ];
			        }),
			        symbolSize: 12,
			        // symbol: 'triangle',
			        itemStyle: {
			          borderWidth: 1,
			          borderColor: 'rgba(255,255,255,0.8)'
			        },
			        emphasis: {
			          itemStyle: {
			            color: '#fff'
			          }
			        }
			      }
			    ]
			  });
			});
			
			option && myChart.setOption(option);

	}
	const bt=()=>{
		var ROOT_PATH =
		  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
		
		var chartDom = document.getElementById('box');
		var myChart = echarts.init(chartDom);
		var option;
		
		const indices = {
		  name: 0,
		  group: 1,
		  id: 16
		};
		const schema = [
		  { name: 'name', index: 0 },
		  { name: 'group', index: 1 },
		  { name: 'protein', index: 2 },
		  { name: 'calcium', index: 3 },
		  { name: 'sodium', index: 4 },
		  { name: 'fiber', index: 5 },
		  { name: 'vitaminc', index: 6 },
		  { name: 'potassium', index: 7 },
		  { name: 'carbohydrate', index: 8 },
		  { name: 'sugars', index: 9 },
		  { name: 'fat', index: 10 },
		  { name: 'water', index: 11 },
		  { name: 'calories', index: 12 },
		  { name: 'saturated', index: 13 },
		  { name: 'monounsat', index: 14 },
		  { name: 'polyunsat', index: 15 },
		  { name: 'id', index: 16 }
		];
		const groupCategories = [];
		const groupColors = [];
		$.get(ROOT_PATH + '/data/asset/data/nutrients.json', function (data) {
		  normalizeData(data);
		  myChart.setOption((option = getOption(data)));
		});
		function normalizeData(originData) {
		  const groupMap = {};
		  originData.forEach(function (row) {
		    const groupName = row[indices.group];
		    if (!groupMap.hasOwnProperty(groupName)) {
		      groupMap[groupName] = 1;
		    }
		  });
		  originData.forEach(function (row) {
		    row.forEach(function (item, index) {
		      if (
		        index !== indices.name &&
		        index !== indices.group &&
		        index !== indices.id
		      ) {
		        // Convert null to zero, as all of them under unit "g".
		        row[index] = parseFloat(item) || 0;
		      }
		    });
		  });
		  for (const groupName in groupMap) {
		    if (groupMap.hasOwnProperty(groupName)) {
		      groupCategories.push(groupName);
		    }
		  }
		  const hStep = Math.round(300 / (groupCategories.length - 1));
		  for (var i = 0; i < groupCategories.length; i++) {
		    groupColors.push(echarts.color.modifyHSL('#5A94DF', hStep * i));
		  }
		}
		function getOption(data) {
		  const lineStyle = {
		    width: 0.5,
		    opacity: 0.05
		  };
		  return {
		    backgroundColor: '#333',
		    tooltip: {
		      padding: 10,
		      backgroundColor: '#222',
		      borderColor: '#777',
		      borderWidth: 1
		    },
		    title: [
		      {
		        text: 'Groups',
		        top: 0,
		        left: 0,
		        textStyle: {
		          color: '#fff'
		        }
		      }
		    ],
		    visualMap: {
		      show: true,
		      type: 'piecewise',
		      categories: groupCategories,
		      dimension: indices.group,
		      inRange: {
		        color: groupColors //['#d94e5d','#eac736','#50a3ba']
		      },
		      outOfRange: {
		        color: ['#ccc'] //['#d94e5d','#eac736','#50a3ba']
		      },
		      top: 20,
		      textStyle: {
		        color: '#fff'
		      },
		      realtime: false
		    },
		    parallelAxis: [
		      { dim: 16, name: schema[16].name, scale: true, nameLocation: 'end' },
		      { dim: 2, name: schema[2].name, nameLocation: 'end' },
		      { dim: 4, name: schema[4].name, nameLocation: 'end' },
		      { dim: 3, name: schema[3].name, nameLocation: 'end' },
		      { dim: 5, name: schema[5].name, nameLocation: 'end' },
		      { dim: 6, name: schema[6].name, nameLocation: 'end' },
		      { dim: 7, name: schema[7].name, nameLocation: 'end' },
		      { dim: 8, name: schema[8].name, nameLocation: 'end' },
		      { dim: 9, name: schema[9].name, nameLocation: 'end' },
		      { dim: 10, name: schema[10].name, nameLocation: 'end' },
		      { dim: 11, name: schema[11].name, nameLocation: 'end' },
		      { dim: 12, name: schema[12].name, nameLocation: 'end' },
		      { dim: 13, name: schema[13].name, nameLocation: 'end' },
		      { dim: 14, name: schema[14].name, nameLocation: 'end' },
		      { dim: 15, name: schema[15].name, nameLocation: 'end' }
		    ],
		    parallel: {
		      left: 280,
		      top: 20,
		      // top: 150,
		      // height: 300,
		      width: 400,
		      layout: 'vertical',
		      parallelAxisDefault: {
		        type: 'value',
		        name: 'nutrients',
		        nameLocation: 'end',
		        nameGap: 20,
		        nameTextStyle: {
		          color: '#fff',
		          fontSize: 14
		        },
		        axisLine: {
		          lineStyle: {
		            color: '#aaa'
		          }
		        },
		        axisTick: {
		          lineStyle: {
		            color: '#777'
		          }
		        },
		        splitLine: {
		          show: false
		        },
		        axisLabel: {
		          color: '#fff'
		        },
		        realtime: false
		      }
		    },
		    animation: false,
		    series: [
		      {
		        name: 'nutrients',
		        type: 'parallel',
		        lineStyle: lineStyle,
		        inactiveOpacity: 0,
		        activeOpacity: 0.01,
		        progressive: 500,
		        smooth: true,
		        data: data
		      }
		    ]
		  };
		}
		
		option && myChart.setOption(option);

	}
	const bx=()=>{
		var ROOT_PATH =
		  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
		
		var chartDom = document.getElementById('bx');
		var myChart = echarts.init(chartDom);
		var option;
		
		myChart.showLoading();
		$.get(ROOT_PATH + '/data/asset/geo/USA.json', function (usaJson) {
		  myChart.hideLoading();
		  echarts.registerMap('USA', usaJson, {
		    Alaska: {
		      // 把阿拉斯加移到美国主大陆左下方
		      left: -131,
		      top: 25,
		      width: 15
		    },
		    Hawaii: {
		      left: -110,
		      top: 28,
		      width: 5
		    },
		    'Puerto Rico': {
		      // 波多黎各
		      left: -76,
		      top: 26,
		      width: 2
		    }
		  });
		  var data = [
		    { name: 'Alabama', value: 4822023 },
		    { name: 'Alaska', value: 731449 },
		    { name: 'Arizona', value: 6553255 },
		    { name: 'Arkansas', value: 2949131 },
		    { name: 'California', value: 38041430 },
		    { name: 'Colorado', value: 5187582 },
		    { name: 'Connecticut', value: 3590347 },
		    { name: 'Delaware', value: 917092 },
		    { name: 'District of Columbia', value: 632323 },
		    { name: 'Florida', value: 19317568 },
		    { name: 'Georgia', value: 9919945 },
		    { name: 'Hawaii', value: 1392313 },
		    { name: 'Idaho', value: 1595728 },
		    { name: 'Illinois', value: 12875255 },
		    { name: 'Indiana', value: 6537334 },
		    { name: 'Iowa', value: 3074186 },
		    { name: 'Kansas', value: 2885905 },
		    { name: 'Kentucky', value: 4380415 },
		    { name: 'Louisiana', value: 4601893 },
		    { name: 'Maine', value: 1329192 },
		    { name: 'Maryland', value: 5884563 },
		    { name: 'Massachusetts', value: 6646144 },
		    { name: 'Michigan', value: 9883360 },
		    { name: 'Minnesota', value: 5379139 },
		    { name: 'Mississippi', value: 2984926 },
		    { name: 'Missouri', value: 6021988 },
		    { name: 'Montana', value: 1005141 },
		    { name: 'Nebraska', value: 1855525 },
		    { name: 'Nevada', value: 2758931 },
		    { name: 'New Hampshire', value: 1320718 },
		    { name: 'New Jersey', value: 8864590 },
		    { name: 'New Mexico', value: 2085538 },
		    { name: 'New York', value: 19570261 },
		    { name: 'North Carolina', value: 9752073 },
		    { name: 'North Dakota', value: 699628 },
		    { name: 'Ohio', value: 11544225 },
		    { name: 'Oklahoma', value: 3814820 },
		    { name: 'Oregon', value: 3899353 },
		    { name: 'Pennsylvania', value: 12763536 },
		    { name: 'Rhode Island', value: 1050292 },
		    { name: 'South Carolina', value: 4723723 },
		    { name: 'South Dakota', value: 833354 },
		    { name: 'Tennessee', value: 6456243 },
		    { name: 'Texas', value: 26059203 },
		    { name: 'Utah', value: 2855287 },
		    { name: 'Vermont', value: 626011 },
		    { name: 'Virginia', value: 8185867 },
		    { name: 'Washington', value: 6897012 },
		    { name: 'West Virginia', value: 1855413 },
		    { name: 'Wisconsin', value: 5726398 },
		    { name: 'Wyoming', value: 576412 },
		    { name: 'Puerto Rico', value: 3667084 }
		  ];
		  data.sort(function (a, b) {
		    return a.value - b.value;
		  });
		  const mapOption = {
		    visualMap: {
		      left: 'right',
		      min: 500000,
		      max: 38000000,
		      inRange: {
		        // prettier-ignore
		        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
		      },
		      text: ['High', 'Low'],
		      calculable: true
		    },
		    series: [
		      {
		        id: 'population',
		        type: 'map',
		        roam: true,
		        map: 'USA',
		        animationDurationUpdate: 1000,
		        universalTransition: true,
		        data: data
		      }
		    ]
		  };
		  const barOption = {
		    xAxis: {
		      type: 'value'
		    },
		    yAxis: {
		      type: 'category',
		      axisLabel: {
		        rotate: 30
		      },
		      data: data.map(function (item) {
		        return item.name;
		      })
		    },
		    animationDurationUpdate: 1000,
		    series: {
		      type: 'bar',
		      id: 'population',
		      data: data.map(function (item) {
		        return item.value;
		      }),
		      universalTransition: true
		    }
		  };
		  let currentOption = mapOption;
		  myChart.setOption(mapOption);
		  setInterval(function () {
		    currentOption = currentOption === mapOption ? barOption : mapOption;
		    myChart.setOption(currentOption, true);
		  }, 2000);
		});
		
		option && myChart.setOption(option);

	}
	onMounted(()=>{
		ditu()
		bt()
		bx()
	})
</script>

<style>
	#main{
		width: 18.75rem;
		height: 18.75rem;
	}
	#box{
		width: 62.5rem;
		height: 62.5rem;
	}
	#bx{
		width: 62.5rem;
		height: 62.5rem;
	}
</style>
