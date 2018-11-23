<template>
  <div class="vux-circle-demo">
    <divider> progress-bar </divider>
    <progress-bar :percent="25"></progress-bar>
    <progress-bar :percent="45" status="active"></progress-bar>
    <progress-bar :percent="65" status="wrong"></progress-bar>
    <progress-bar :percent="100"></progress-bar>
    <progress-bar :percent="25" hide-info></progress-bar>

    <divider> progress-circle </divider>
    <div style='width:150px;height:150px;'>
      <progress-circle :percent="percent1" :stroke-width="10" stroke-color="#04BE02">
        <span>{{percent1}}</span>
      </progress-circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <progress-circle :percent="percent1" :stroke-width="5" stroke-color="#04BE02">
        <span>{{percent1}}</span>
      </progress-circle>
    </div>
    <br>
    <div style='width:50px;height:50px;'>
      <progress-circle :percent="percent1" :stroke-width="5" stroke-color="#04BE02">
        <span>{{percent1}}</span>
      </progress-circle>
    </div>
    <br>
    <div style="width:180px;">
      <range v-model="percent1" :min="0" :max="100"></range>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <progress-circle :percent="100" :stroke-width="3" stroke-color="#04BE02">
        <icon type="success"></icon>
      </progress-circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <progress-circle :percent="percent2" :stroke-width="6" :trail-width="6" :stroke-color="strokeColor2" trail-color="#ececec">
        <span :style="{color: strokeColor2}">{{percent2}}%</span>
      </progress-circle>
    </div>
  </div>
</template>

<script>
  import { ProgressBar, ProgressCircle } from '../../ui/components/progress'
  import { Range } from '../../ui/components/range'
  import { Icon } from '../../ui/components/icon'
  import { Divider } from '../../ui/components/divider'

  export default {
    ready () {
      setInterval(this.update2, 2000)
    },
    components: {
      ProgressBar, ProgressCircle,
      Range,
      Icon,
      Divider
    },
    data () {
      return {
        percent1: 10,
        percent2: 30,
        strokeColor2: '#3FC7FA'
      }
    },
    methods: {
      update2 () {
        const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
        this.percent2 = parseInt(Math.random() * 100, 10);
        this.strokeColor2 = colorMap[parseInt(Math.random() * 3, 10)]
      }
    }
  }
</script>



<style scoped>
  .vux-circle-demo {
    text-align: center;
  }
  .vux-circle-demo > div {
    margin: 0 auto;
  }
</style>
