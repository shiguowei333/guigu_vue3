<template>
    <div class="box">
      <div class="top">
        <p class="title">实时游客统计</p>
        <p></p>
        <p class="right">可预约总量<span>99999</span>人</p>
      </div>
      <div class="number">
        <span v-for="(item,index) in people" :key="index">{{ item }}</span>
      </div>
      <div ref="charts" class="charts">

      </div>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts'
  import 'echarts-liquidfill'

  let people = ref('215908人')
  let charts = ref()

  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    mycharts.setOption({
      title: {
        text: '水球图'
      },
      xAxis: {},
      yAxis: {},
      series: {
        type: 'liquidFill',
        data: [0.6],
        waveAnimation: true,
        animationDuration: 5,
        animationDruationUpdate: 0,
        radius: '80%'
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    })
  })
</script>
  
<style scoped lang="scss">
  .box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
    .top {
      margin-left: 20px;
      .title {
        color: white;
        font-size: 20px;
        margin-top: 20px;
      }
      .bg {
        width: 68px;
        height: 7px;
        background: url(../../images/dataScreen-title.png);
        background-size: 100% 100%;
        margin-top: 10px;
      }
      .right {
        float: right;
        color: white;
        font-size: 20px;
        span {
          color: yellowgreen;
        }
      }
    }
    .number {
      margin-top: 30px;
      display: flex;
      padding: 10px;
      span {
        flex: 1;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: url(../../images/total.png) no-repeat;
        background-size: 100% 100%;
        color: #29fcff;
      }
    }
    .charts {
      width: 100%;
      height: 250px;
    }
  }
</style>