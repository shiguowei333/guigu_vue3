<template>
    <div class="container">
      <div class="screen" ref="screen">
        <div class="top">
          <Top></Top>
        </div>
        <div class="bottom">
          <div class="left">
            <Tourist class="tourist"></Tourist>
            <Sex class="sex"></Sex>
            <Age class="age"></Age>
          </div>
          <div class="center">
            <Map class="map"></Map>
            <Line class="line"></Line>
          </div>
          <div class="right">
            <Rank class="rank"></Rank>
            <Year class="year"></Year>
            <Counter class="counter"></Counter>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue'
  import Top from './components/top/index.vue'
  import Tourist from './components/tourist/index.vue'
  import Sex from './components/sex/index.vue'
  import Age from './components/age/index.vue'
  import Map from './components/map/index.vue'
  import Line from './components/line/index.vue'
  import Rank from './components/rank/index.vue'
  import Year from './components/year/index.vue'
  import Counter from './components/counter/index.vue'

  let screen = ref()

  onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  })

  window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  }

  const getScale = (w =1920, h = 1080) => {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ?ww:wh
  }
</script>
  
<style scoped lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    .screen {
      position: fixed;
      left: 50%;
      top: 50%;
      width: 1920px;
      height: 1080px;
      transform-origin: left top;
      .top {
        width: 100%;
        height: 40px;
      }
      .bottom {
        display: flex;
        .left {
          flex: 1;
          height: 1040px;
          display: flex;
          flex-direction: column;
          .tourist {
            flex: 1.2;
          };
          .sex {
            flex: 1;
          };
          .age {
            flex: 1;
          }
        }
        .center {
          flex: 2;
          display: flex;
          flex-direction: column;
          .map {
            flex: 3;
          }
          .line {
            flex: 1;
          }
        }
        .right {
          margin-left: 20px;
          flex: 0.9;
          display: flex;
          flex-direction: column;
          .rank {
            flex: 1;
          }
          .year {
            flex: 0.8;
          }
          .counter {
            flex: 1;
          }
        }
      }
    }
  }
</style>