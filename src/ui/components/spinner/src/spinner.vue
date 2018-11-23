<template>
  <span class="zmui-spinner" :class="className" :style="styles"></span>
</template>

<script>
  import Spinner from './spinner'
  const types = ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral'];

  export default {
    name: 'spinner',
    mounted () {
      this.$nextTick(() => {
        Spinner(this.$el, this.type, this.size)
      })
    },
    props: {
      type: {
        type: String,
        default: 'ios'
      },
      size: String
    },
    computed: {
      styles () {
        if (typeof this.size !== 'undefined' && this.size !== '28px') {
          return {
            width: this.size,
            height: this.size
          }
        }
      },
      className () {
        let rs = {};
        for (let i = 0; i < types.length; i++) {
          rs[`zmui-spinner-${types[i]}`] = this.type === types[i]
        }
        return rs
      }
    }
  }
</script>

<style>
  .zmui-spinner {
    stroke: #444;
    fill: #444;
    vertical-align: middle;
    display: inline-block;
    width: 28px;
    height: 28px;
  }

  .zmui-spinner svg {
    width: 28px;
    height: 28px;
  }

  .zmui-spinner.zmui-spinner-inverse {
    stroke: #fff;
    fill: #fff;
  }

  .zmui-spinner-android {
    stroke: #4b8bf4;
  }

  .zmui-spinner-ios, .zmui-spinner-ios-small {
    stroke: #69717d;
  }

  .zmui-spinner-spiral .stop1 {
    stop-color: #fff;
    stop-opacity: 0;
  }

  .zmui-spinner-spiral.zmui-spinner-inverse .stop1 {
    stop-color: #000;
  }

  .zmui-spinner-spiral.zmui-spinner-inverse .stop2 {
    stop-color: #fff;
  }
</style>
