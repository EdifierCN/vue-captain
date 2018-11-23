<template>
  <div title="SendCode">
    <cell-group>
      <input-cell title="发送验证码">
        <sendcode v-model="start1" @click.native="sendCode" slot="right" type="primary" mini></sendcode>
      </input-cell>
    </cell-group>

    <sendcode
      v-model="start2"
      @click.native="start2 = true"
      second="15"
      runStr="在{%s}秒后你就可以重新获取啦"
      resetStr="你可以重新获取验证码啦"
      size="large"
      type="primary"
    ></sendcode>

    <sendcode
      v-model="start3"
      storageKey="dashuaibi"
      @click.native="start3 = true"
      size="large"
      type="warn"
      initStr="刷新页面倒计时还会继续"
    ></sendcode>

  </div>
</template>

<script type="text/babel">
  import { CellGroup } from '../../ui/components/cell'
  import { Sendcode } from '../../ui/components/sendcode'
  import { InputCell } from '../../ui/components/input'

  export default {
    components:{
      CellGroup,
      InputCell,
      Sendcode
    },
    data() {
      return {
        start1: false,
        start2: false,
        start3: false,
      }
    },
    methods: {
      sendCode() {
        setTimeout(() => {
          this.start1 = true;
        }, 1000);
      }
    }
  }
</script>
