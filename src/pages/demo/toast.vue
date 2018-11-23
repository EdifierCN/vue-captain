<template>
  <div>
    <div style="padding:15px;">
      <button-cell @click.native="showPosition('top')" type="primary">Top</button-cell>
      <button-cell @click.native="showPosition('middle')" type="primary">Middle</button-cell>
      <button-cell @click.native="showPosition('bottom')" type="primary">Bottom</button-cell>
      <button-cell @click.native="showPosition('')" type="primary">Default</button-cell>
    </div>

    <toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" :position="position">{{ 'Basic Usage' }}</toast>
    <cell-group>
      <switch-cell :title="'Basic Usage'" v-model="show1"></switch-cell>
      <switch-cell :title="'type:text'" v-model="show2"></switch-cell>
      <switch-cell :title="'type:cancel'" v-model="show3"></switch-cell>
      <switch-cell :title="'type:warn'" v-model="show4"></switch-cell>
      <switch-cell :title="'time:1s'" v-model="show5"></switch-cell>
      <switch-cell :title="'long text'" v-model="show6"></switch-cell>
    </cell-group>

    <toast v-model="show1" @on-hide="onHide">{{ 'Basic Usage' }}</toast>
    <toast v-model="show2" type="text">{{'success'}}</toast>
    <toast v-model="show3" type="cancel">{{'type:cancel'}}</toast>
    <toast v-model="show4" type="warn">{{'type:warn'}}</toast>
    <toast v-model="show5" :time="1000">{{'time:1s'}}</toast>
    <toast v-model="show6" type="text" width="20em">{{'show me code'}}</toast>

    <cell-group :title="'prop:text'">
      <switch-cell :title="'type:success'" v-model="show7"></switch-cell>
      <switch-cell :title="'type:text'" v-model="show8"></switch-cell>
    </cell-group>

    <toast v-model="show7" text="Hello World"></toast>
    <toast v-model="show8" type="text" text="Hello World"></toast>

    <divider> 插件 </divider>
    <button-cell type="primary" @click.native="openPlugin">点我</button-cell>


    <divider> 模块 </divider>
    <button-cell type="primary" @click.native="openModule">点我</button-cell>


  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Toast } from '../../ui/components/toast'
  import { CellGroup } from '../../ui/components/cell'
  import { SwitchCell } from '../../ui/components/switch'
  import { ButtonCell } from '../../ui/components/button'

  import '../../ui/plugins/toast/index'
  import ToastModule from '../../ui/plugins/toast/module'

  export default{
    data(){
      return {}
    },
    components:{
      Divider,
      Toast,
      CellGroup,
      SwitchCell,
      ButtonCell
    },
    methods: {
      showPosition (position) {
        this.position = position;
        this.showPositionValue = true
      },
      onHide () {
        console.log('on hide')
      },
      onChange (val) {

      },

      openPlugin(){
        this.$toast.show('success');
      },
      openModule(){
        ToastModule.show('success');
      },
    },
    data () {
      return {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        position: 'default',
        showPositionValue: false
      }
    }
  }
</script>

<style>
</style>
