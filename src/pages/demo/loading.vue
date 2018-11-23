<template>
  <div>
    <divider> inline-loading </divider>
    <p style="text-align:center;">
      <inline-loading></inline-loading>
    </p>
    <br>
    <p style="text-align:center;">
      <span style="vertical-align:middle;display:inline-block;font-size:14px;">{{ 'loading' }}&nbsp;&nbsp;</span><inline-loading></inline-loading>
    </p>
    <br>
    <p style="text-align:center;">
      <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;{{ 'loading' }}</span>
    </p>

    <br>
    <br>

    <divider> loading </divider>
    <cell-group>
      <switch-cell :title="'Toggle'" v-model="show1" @on-change="show1change"></switch-cell>
    </cell-group>

    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>

    <divider> 插件 </divider>
    <button-cell type="primary" @click.native="openPlugin">插件</button-cell>

    <divider> 模块 </divider>
    <button-cell type="primary" @click.native="openModule">模块</button-cell>

  </div>
</template>

<script>
  import { Loading, InlineLoading } from '../../ui/components/loading'
  import { ButtonCell } from '../../ui/components/button'
  import { Divider } from '../../ui/components/divider'
  import { SwitchCell } from '../../ui/components/switch'
  import { Cell, CellGroup } from '../../ui/components/cell'
  import TransferDom from '../../ui/directives/transfer-dom'

  import '../../ui/plugins/loading/index'
  import LoadingModule from  '../../ui/plugins/loading/module'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Loading, InlineLoading,
      Divider,
      SwitchCell,
      ButtonCell,
      CellGroup
    },
    data () {
      return {
        show1: false,
        text1: 'Processing'
      }
    },
    methods: {
      showLoading () {
        this.$zmui.loading.show({
          text: 'Loading'
        });
        setTimeout(() => {
          this.$zmui.loading.hide()
        }, 2000)
      },
      showDelayLoading () {
        this.$zmui.loading.show({
          text: 'Loading',
          delay: 1e3
        });
        setTimeout(() => {
          this.$zmui.loading.hide()
        }, 2000)
      },
      show1change (val) {
        if (val) {
          tick(0, (percent) => {
            if (percent === 100) {
              this.show1 = false;
              return
            }
            this.text1 = `${percent}%`
          })
        }
      },

      openPlugin(){
        this.$loading.show();
      },
      openModule(){
        LoadingModule.show();
      }
    }
  }

  function tick (i, cb) {
    setTimeout(function () {
      i++
      cb(i)
      if (i < 100) {
        tick(i, cb)
      }
    }, 10)
  }
</script>
