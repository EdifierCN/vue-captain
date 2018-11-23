<template>
  <div>
    <divider> countdown </divider>
    <cell-group :title=" 'Automatic countdown' ">
      <cell title="15s" v-model="value">
        <countdown v-model="time1" @on-finish="finish" v-show="show"></countdown>
      </cell>
    </cell-group>
    <cell-group :title=" 'Manually' ">
      <switch-cell :title=" 'Start' " v-model="start"></switch-cell>
      <cell title="15s">
        <countdown v-model="time2" :start="start" @on-finish="finish2"></countdown>
      </cell>
    </cell-group>

    <divider> countup </divider>
    <div style="text-align:center;">
      <countup prefix="$" :startnum="1" :endnum="1388" :duration="2" class="demo1"></countup>
      <br/>
      <countup prefix="￥" :endnum="88.88" :duration="3" :decimals="2" class="demo1"></countup>
      <br>
      <countup :endnum="1024" :duration="4" :start="doStart" class="demo1"></countup>
      <div style="padding:0 15px;">
        <button-cell @click.native="doStart=true" type="primary"> {{ 'Start' }} </button-cell>
      </div>
    </div>

  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { ButtonCell } from '../../ui/components/button'
  import { SwitchCell } from '../../ui/components/switch'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { Countdown, Countup } from '../../ui/components/counter'

  export default{
    components:{
      Countdown, Countup,
      CellGroup, Cell,
      SwitchCell,
      ButtonCell,
      Divider
    },
    methods: {
      finish (index) {
        this.show = false
        this.value = 'completed'
        console.log('current index', index)
      },
      finish2 (index) {
        this.start = false
        this.time = 20
      }
    },
    data () {
      return {
        show: true,
        time1: 15,
        time2: 15,
        value: '',
        start: false,
        doStart: false
      }
    }
  }
</script>

<style>
</style>
