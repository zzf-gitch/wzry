<template>
	<div id="main">
		
	</div>
	<div id="box">
		
	</div>
	<div id="xian">
		
	</div>
	<div class = "info">百度地图</div>
	    <div id="container"></div>
		
		    <!-- <ul class = "drawing-panel">
		        <input type="button" class="draw-btn" value="开启测距" onclick="myDis.open()">
		        <input type="button" class="draw-btn" value="关闭测距" onclick="myDis.close()">
		    </ul>
		    <div id = "container"></div>
			
			
			
			<div class = "info">该示例实现基于JSAPI GL版的开源工具库，详情可查看https://github.com/huiyan-fe/BMapGLLib</div>
			    <ul class = "drawing-panel">
			        <li class="bmap-btn bmap-marker" id="marker" onclick="draw(this)"></li>
			        <li class="bmap-btn bmap-polyline" id="polyline" onclick="draw(this)"></li>
			        <li class="bmap-btn bmap-rectangle" id="rectangle" onclick="draw(this)"></li>
			        <li class="bmap-btn bmap-polygon" id="polygon" onclick="draw(this)"></li>
			        <li class="bmap-btn bmap-circle" id="circle" onclick="draw(this)"></li>
			    </ul>
			    <div id = "container"></div> -->
</template>

<script setup>
	import 'echarts-gl';
	import {onMounted} from 'vue'
	import $ from 'jquery'
	import * as echarts from 'echarts';
	const ditu=()=>{
		var map = new BMapGL.Map('container'); // 创建Map实例
		map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 12); // 初始化地图,设置中心点坐标和地图级别
		map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
	}
	// const jiantin=()=>{
	// 	var map = new BMapGL.Map("container", {enableMapClick:false}); // 创建Map实例,GL版命名空间为BMapGL(鼠标右键控制倾斜角度)
	// 				map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);      // 初始化地图,设置中心点坐标和地图级别
		   
	// 	   var myDis = new BMapGLLib.DistanceTool(map);
				
	// 	   // 监听测距过程中的鼠标事件
	// 	   myDis.addEventListener('drawend', function(e) {
	// 	       console.log("drawend");
	// 	       console.log(e.points);
	// 	       console.log(e.overlays);
	// 				    console.log(e.distance);
	// 	   });
	// 	   myDis.addEventListener("addpoint", function(e) {
	// 	       console.log("addpoint");
	// 	       console.log(e.point);
	// 	       console.log(e.pixel);
	// 	       console.log(e.index);
	// 	       console.log(e.distance);
	// 	   });
	// 	   myDis.addEventListener("removepolyline", function(e) {
	// 	       console.log("removepolyline");
	// 	       console.log(e);
	// 	   });
	// }
	// const huizhi=()=>{
	// 	var map = new BMapGL.Map("container", {enableMapClick:false}); // 创建Map实例,GL版命名空间为BMapGL(鼠标右键控制倾斜角度)
	// 		map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11);      // 初始化地图,设置中心点坐标和地图级别
	// 	    map.enableScrollWheelZoom(true);                               // 开启鼠标滚轮缩放
		
	// 	    var styleOptions = {
	// 	        strokeColor: '#5E87DB',   // 边线颜色
	// 	        fillColor: '#5E87DB',     // 填充颜色。当参数为空时，圆形没有填充颜色
	// 	        strokeWeight: 2,          // 边线宽度，以像素为单位
	// 	        strokeOpacity: 1,         // 边线透明度，取值范围0-1
	// 	        fillOpacity: 0.2          // 填充透明度，取值范围0-1
	// 	    };
	// 	    var labelOptions = {
	// 	        borderRadius: '2px',
	// 	        background: '#FFFBCC',
	// 	        border: '1px solid #E1E1E1',
	// 	        color: '#703A04',
	// 	        fontSize: '12px',
	// 	        letterSpacing: '0',
	// 	        padding: '5px'
	// 	    };
		
	// 	    // 实例化鼠标绘制工具
	// 	    var drawingManager = new BMapGLLib.DrawingManager(map, {
	// 	        // isOpen: true,        // 是否开启绘制模式
	// 	        enableCalculate: false, // 绘制是否进行测距测面
	// 	        enableSorption: true,   // 是否开启边界吸附功能
	// 	        sorptiondistance: 20,   // 边界吸附距离
	// 	        circleOptions: styleOptions,     // 圆的样式
	// 	        polylineOptions: styleOptions,   // 线的样式
	// 	        polygonOptions: styleOptions,    // 多边形的样式
	// 	        rectangleOptions: styleOptions,  // 矩形的样式
	// 	        labelOptions: labelOptions,      // label样式
	// 	    });  
		
	// 	    function draw(e) {
	// 	        var arr = document.getElementsByClassName('bmap-btn');
	// 	        for(var i = 0; i<arr.length; i++) {
	// 	            arr[i].style.backgroundPositionY = '0';
	// 	        }
	// 	        e.style.backgroundPositionY = '-52px';
	// 	        switch(e.id) {
	// 	            case 'marker': {
	// 	                var drawingType = BMAP_DRAWING_MARKER;
	// 	                break;
	// 	            }
	// 	            case 'polyline': {
	// 	                var drawingType = BMAP_DRAWING_POLYLINE;
	// 	                break;
	// 	            }
	// 	            case 'rectangle': {
	// 	                var drawingType = BMAP_DRAWING_RECTANGLE;
	// 	                break;
	// 	            }
	// 	            case 'polygon': {
	// 	                var drawingType = BMAP_DRAWING_POLYGON;
	// 	                break;
	// 	            }
	// 	            case 'circle': {
	// 	                var drawingType = BMAP_DRAWING_CIRCLE;
	// 	                break;
	// 	            }
	// 	        }
	// 	        // 进行绘制
	// 	        if (drawingManager._isOpen && drawingManager.getDrawingMode() === drawingType) {
	// 	            drawingManager.close();
	// 	        } else {
	// 	            drawingManager.setDrawingMode(drawingType);
	// 	            drawingManager.open();
	// 	        }
	// 	    };
	// }
	onMounted(()=>{
		ditu()
		// jiantin()
		// huizhi()
		
		
		var ROOT_PATH =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
var app = {};

var chartDoma = document.getElementById('xian');
var myCharta = echarts.init(chartDoma);
var optiona;

$.get(ROOT_PATH + '/data/asset/data/lines-bus.json', function (data) {
  let hStep = 300 / (data.length - 1);
  let busLines = [].concat.apply(
    [],
    data.map(function (busLine, idx) {
      let prevPt = [];
      let points = [];
      for (let i = 0; i < busLine.length; i += 2) {
        let pt = [busLine[i], busLine[i + 1]];
        if (i > 0) {
          pt = [prevPt[0] + pt[0], prevPt[1] + pt[1]];
        }
        prevPt = pt;
        points.push([pt[0] / 1e4, pt[1] / 1e4]);
      }
      return {
        coords: points,
        lineStyle: {
          normal: {
            color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
          }
        }
      };
    })
  );
  myCharta.setOption(
    (optiona = {
      bmap: {
        center: [116.46, 39.92],
        zoom: 10,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              featureType: 'water',
              elementType: 'all',
              stylers: {
                color: '#031628'
              }
            },
            {
              featureType: 'land',
              elementType: 'geometry',
              stylers: {
                color: '#000102'
              }
            },
            {
              featureType: 'highway',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry.fill',
              stylers: {
                color: '#000000'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#0b3d51'
              }
            },
            {
              featureType: 'local',
              elementType: 'geometry',
              stylers: {
                color: '#000000'
              }
            },
            {
              featureType: 'railway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#000000'
              }
            },
            {
              featureType: 'railway',
              elementType: 'geometry.stroke',
              stylers: {
                color: '#08304b'
              }
            },
            {
              featureType: 'subway',
              elementType: 'geometry',
              stylers: {
                lightness: -70
              }
            },
            {
              featureType: 'building',
              elementType: 'geometry.fill',
              stylers: {
                color: '#000000'
              }
            },
            {
              featureType: 'all',
              elementType: 'labels.text.fill',
              stylers: {
                color: '#857f7f'
              }
            },
            {
              featureType: 'all',
              elementType: 'labels.text.stroke',
              stylers: {
                color: '#000000'
              }
            },
            {
              featureType: 'building',
              elementType: 'geometry',
              stylers: {
                color: '#022338'
              }
            },
            {
              featureType: 'green',
              elementType: 'geometry',
              stylers: {
                color: '#062032'
              }
            },
            {
              featureType: 'boundary',
              elementType: 'all',
              stylers: {
                color: '#465b6c'
              }
            },
            {
              featureType: 'manmade',
              elementType: 'all',
              stylers: {
                color: '#022338'
              }
            },
            {
              featureType: 'label',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            }
          ]
        }
      },
      series: [
        {
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: busLines,
          silent: true,
          lineStyle: {
            // color: '#c23531',
            // color: 'rgb(200, 35, 45)',
            opacity: 0.2,
            width: 1
          },
          progressiveThreshold: 500,
          progressive: 200
        },
        {
          type: 'lines',
          coordinateSystem: 'bmap',
          polyline: true,
          data: busLines,
          lineStyle: {
            width: 0
          },
          effect: {
            constantSpeed: 20,
            show: true,
            trailLength: 0.1,
            symbolSize: 1.5
          },
          zlevel: 1
        }
      ]
    })
  );
});

optiona && myCharta.setOption(optiona);


		
		var chartDom1 = document.getElementById('box');
		var myChart1 = echarts.init(chartDom1);
		var options;
		
		const data = [];
		for (let i = 0; i < 5; ++i) {
		  data.push(Math.round(Math.random() * 200));
		}
		options = {
		  xAxis: {
		    max: 'dataMax'
		  },
		  yAxis: {
		    type: 'category',
		    data: ['A', 'B', 'C', 'D', 'E'],
		    inverse: true,
		    animationDuration: 300,
		    animationDurationUpdate: 300,
		    max: 2 // only the largest 3 bars will be displayed
		  },
		  series: [
		    {
		      realtimeSort: true,
		      name: 'X',
		      type: 'bar',
		      data: data,
		      label: {
		        show: true,
		        position: 'right',
		        valueAnimation: true
		      }
		    }
		  ],
		  legend: {
		    show: true
		  },
		  animationDuration: 0,
		  animationDurationUpdate: 3000,
		  animationEasing: 'linear',
		  animationEasingUpdate: 'linear'
		};
		function run() {
		  for (var i = 0; i < data.length; ++i) {
		    if (Math.random() > 0.9) {
		      data[i] += Math.round(Math.random() * 2000);
		    } else {
		      data[i] += Math.round(Math.random() * 200);
		    }
		  }
		  myChart1.setOption({
		    series: [
		      {
		        type: 'bar',
		        data
		      }
		    ]
		  });
		}
		setTimeout(function () {
		  run();
		}, 0);
		setInterval(function () {
		  run();
		}, 3000);
		
		options && myChart1.setOption(options);
		
		
		
		var ROOT_PATH =
		  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
		
		var chartDom = document.getElementById('main');
		var myChart = echarts.init(chartDom);
		var option;
		
		const updateFrequency = 2000;
		const dimension = 0;
		const countryColors = {
		  Australia: '#00008b',
		  Canada: '#f00',
		  China: '#ffde00',
		  Cuba: '#002a8f',
		  Finland: '#003580',
		  France: '#ed2939',
		  Germany: '#000',
		  Iceland: '#003897',
		  India: '#f93',
		  Japan: '#bc002d',
		  'North Korea': '#024fa2',
		  'South Korea': '#000',
		  'New Zealand': '#00247d',
		  Norway: '#ef2b2d',
		  Poland: '#dc143c',
		  Russia: '#d52b1e',
		  Turkey: '#e30a17',
		  'United Kingdom': '#00247d',
		  'United States': '#b22234'
		};
		$.when(
		  $.getJSON('https://cdn.jsdelivr.net/npm/emoji-flags@1.3.0/data.json'),
		  $.getJSON(ROOT_PATH + '/data/asset/data/life-expectancy-table.json')
		).done(function (res0, res1) {
		  const flags = res0[0];
		  const data = res1[0];
		  const years = [];
		  for (let i = 0; i < data.length; ++i) {
		    if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
		      years.push(data[i][4]);
		    }
		  }
		  function getFlag(countryName) {
		    if (!countryName) {
		      return '';
		    }
		    return (
		      flags.find(function (item) {
		        return item.name === countryName;
		      }) || {}
		    ).emoji;
		  }
		  let startIndex = 10;
		  let startYear = years[startIndex];
		  option = {
		    grid: {
		      top: 10,
		      bottom: 30,
		      left: 150,
		      right: 80
		    },
		    xAxis: {
		      max: 'dataMax',
		      axisLabel: {
		        formatter: function (n) {
		          return Math.round(n) + '';
		        }
		      }
		    },
		    dataset: {
		      source: data.slice(1).filter(function (d) {
		        return d[4] === startYear;
		      })
		    },
		    yAxis: {
		      type: 'category',
		      inverse: true,
		      max: 10,
		      axisLabel: {
		        show: true,
		        fontSize: 14,
		        formatter: function (value) {
		          return value + '{flag|' + getFlag(value) + '}';
		        },
		        rich: {
		          flag: {
		            fontSize: 25,
		            padding: 5
		          }
		        }
		      },
		      animationDuration: 300,
		      animationDurationUpdate: 300
		    },
		    series: [
		      {
		        realtimeSort: true,
		        seriesLayoutBy: 'column',
		        type: 'bar',
		        itemStyle: {
		          color: function (param) {
		            return countryColors[param.value[3]] || '#5470c6';
		          }
		        },
		        encode: {
		          x: dimension,
		          y: 3
		        },
		        label: {
		          show: true,
		          precision: 1,
		          position: 'right',
		          valueAnimation: true,
		          fontFamily: 'monospace'
		        }
		      }
		    ],
		    // Disable init animation.
		    animationDuration: 0,
		    animationDurationUpdate: updateFrequency,
		    animationEasing: 'linear',
		    animationEasingUpdate: 'linear',
		    graphic: {
		      elements: [
		        {
		          type: 'text',
		          right: 160,
		          bottom: 60,
		          style: {
		            text: startYear,
		            font: 'bolder 80px monospace',
		            fill: 'rgba(100, 100, 100, 0.25)'
		          },
		          z: 100
		        }
		      ]
		    }
		  };
		  // console.log(option);
		  myChart.setOption(option);
		  for (let i = startIndex; i < years.length - 1; ++i) {
		    (function (i) {
		      setTimeout(function () {
		        updateYear(years[i + 1]);
		      }, (i - startIndex) * updateFrequency);
		    })(i);
		  }
		  function updateYear(year) {
		    let source = data.slice(1).filter(function (d) {
		      return d[4] === year;
		    });
		    option.series[0].data = source;
		    option.graphic.elements[0].style.text = year;
		    myChart.setOption(option);
		  }
		});
		
		option && myChart.setOption(option);

	})
</script>

<style scoped="scoped">
	#main{
		width: 18.75rem;
		height: 18.75rem;
	}
	#box{
		width: 18.75rem;
		height: 18.75rem;
	}
	#xian{
		width: 18.75rem;
		height: 18.75rem;
	}
	 body,
	    html,
	    #container {
	        overflow: hidden;
	        width: 100%;
	        height: 100%;
	        margin: 0;
	        font-family: "微软雅黑";
	    }
	    .info {
	        z-index: 999;
	        width: auto;
	        min-width: 22rem;
	        padding: .75rem 1.25rem;
	        margin-left: 1.25rem;
	        position: fixed;
	        top: 1rem;
	        background-color: #fff;
	        border-radius: .25rem;
	        font-size: 14px;
	        color: #666;
	        box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
	    }
		body, html, #container {width: 100%; height: 100%; overflow: hidden; margin: 0; font-family: "微软雅黑";}
		        ul li {list-style: none;}
		        .info {
		            z-index: 999;
		            width: auto;
		            min-width: 22rem;
		            padding: .75rem 1.25rem;
		            margin-left: 1.25rem;
		            position: fixed;
		            top: 1rem;
		            background-color: #fff;
		            border-radius: .25rem;
		            font-size: 14px;
		            color: #666;
		            box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
		        }
		        .drawing-panel {
		            z-index: 999;
		            position: fixed;
		            bottom: 3.5rem;
		            margin-left: 3rem;
		            padding: 1rem 1rem;
		            border-radius: .25rem;
		            background-color: #fff;
		            box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
		        }
		        .draw-btn {
		            width: 75px;
		            height: 30px;
		            background-color: #fff;
		            color: rgba(27, 142, 236, 1);
		            border:1px solid rgba(27, 142, 236, 1);
		            border-radius: 5px;
		            margin: 0 5px;
		        }
				body, html, #container {width: 100%; height: 100%; overflow: hidden; margin: 0; font-family: "微软雅黑";}
				        ul li {list-style: none;}
				        .info {
				            z-index: 999;
				            width: auto;
				            min-width: 22rem;
				            padding: .75rem 1.25rem;
				            margin-left: 1.25rem;
				            position: fixed;
				            top: 1rem;
				            background-color: #fff;
				            border-radius: .25rem;
				            font-size: 14px;
				            color: #666;
				            box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
				        }
				        .drawing-panel {
				            z-index: 999;
				            position: fixed;
				            bottom: 3.5rem;
				            margin-left: 2.5rem;
				            padding-left: 0;
				            border-radius: .25rem;
				            height: 47px;
				            box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
				        }
				        .bmap-btn {
				            border-right: 1px solid #d2d2d2;
				            float: left;
				            width: 64px;
				            height: 100%;
				            background-image: url(//api.map.baidu.com/library/DrawingManager/1.4/src/bg_drawing_tool.png);
				            cursor: pointer;
				        }
				        .drawing-panel .bmap-marker {
				            background-position: -65px 0;
				        }
				        .drawing-panel .bmap-polyline {
				            background-position: -195px 0;
				        }
				        .drawing-panel .bmap-rectangle {
				            background-position: -325px 0;
				        }
				        .drawing-panel .bmap-polygon {
				            background-position: -260px 0;
				        }
				        .drawing-panel .bmap-circle {
				            background-position: -130px 0;
				        }
</style>
