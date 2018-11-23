<template>
  <div style="text-align:center;margin-top:15px;">
    <divider>{{ 'default type = img' }}</divider>
    <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
    <br>
    <br>
    <divider>{{ 'type = canvas' }}</divider>
    <qrcode value="https://vux.li?x-page=demo_qrcode"></qrcode>
    <br>
    <qrcode :value="value" :fg-color="fgColor"></qrcode>
    <br>
    <span>{{ 'current url' }}: {{value}}</span>
    <br>
    <span>{{ 'current fgColor' }}: {{fgColor}}</span>
  </div>
</template>

<script>
  import { Qrcode } from '../../ui/components/qrcode'
  import { Divider } from '../../ui/components/divider'

  export default {
    mounted () {
      setInterval(() => {
        this.value = `https://vux.li?t=${Math.random()}`;
        this.fgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
      }, 1000)
    },
    components: {
      Qrcode,
      Divider
    },
    data () {
      return {
        value: 'https://vux.li',
        fgColor: '#000000'
      }
    }
  }
</script>
