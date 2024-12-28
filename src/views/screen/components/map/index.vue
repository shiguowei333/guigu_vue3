<template>
    <div class="box" ref="map"></div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import chinaJSON from './china.json'

  let map = ref()
  echarts.registerMap('china',chinaJSON as any)

  onMounted(() => {
    let mychart = echarts.init(map.value)
    mychart.setOption({
      geo: {
        map: 'china',
        roam: true,
        left: 50,
        right: 50,
        top: 150,
        bottom: -150,
        label: {
          show: true,
          fontSize: 10
        },
        itemStyle: {
          //每一个多边形的样式
          color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: 'skyblue' // 0% 处的颜色
              }, {
                  offset: 1, color: 'skyblue' // 100% 处的颜色
              }],
              global: false // 缺省为 false
          },
          opacity: .8
        },
        //地图高亮的效果
        emphasis: {
          itemStyle: {
              color: 'red'
          },
          label: {
              fontSize: 20,
              color: 'yellow'
          }
        },
      },
      //布局位置
      grid: {
         left: 0,
         top: 0,
         right: 0,
         bottom: 0
      },
      // 航线动画太丑陋了，懒得翻文档找新的，就不显示了
      // series: [
      //   {
      //     type: 'lines',//航线的系列
      //     data: [
      //       {
      //         coords: [
      //           [116.405285, 39.904989],  // 起点
      //           [119.306239, 26.075302]   // 终点
      //         ],
      //         // 统一的样式设置
      //         lineStyle: {
      //           color: 'orange',
      //           width: 5
      //         }
      //       },
      //       {
      //         coords: [
      //           [116.405285, 39.904989],  // 起点
      //           [114.298572,30.584355]   // 终点
      //         ],
      //         // 统一的样式设置
      //         lineStyle: {
      //           color: 'yellow',
      //           width: 5
      //         }
      //       }
      //     ],
      //     //开启动画特效
      //     effect: {
      //       show: true,
      //       symbol: 'arrow',
      //       color: 'black',
      //       symbolSize: 10
      //     }
      //   }
      // ]
    })
  })
</script>
  
<style scoped lang="scss">
  
</style>