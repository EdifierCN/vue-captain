<template>
<div>

  <divider> 默认使用 </divider>
  <cell-group>
    <switch-cell v-model="show" :title="'Toggle'"></switch-cell>
    <switch-cell v-model="show2" :title="'use .sync'"></switch-cell>
    <switch-cell v-model="showHideOnBlur" :title="'hide on clicking mask'"></switch-cell>
    <switch-cell v-model="showDialogStyle" :title="'Toggle'" :inline-desc="'custom dialog style'"></switch-cell>
  </cell-group>

  <div v-transfer-dom>
    <x-dialog v-model="showToast" class="dialog-demo">
      <div style="padding:15px;">
        <button-cell @click.native="doShowToast" type="primary"></button-cell>
      </div>
      <div @click="showToast=false">
        <span class="zmui-close"></span>
      </div>
    </x-dialog>
  </div>

  <div v-transfer-dom>
    <x-dialog v-model="show" class="dialog-demo">
      <div class="img-box">
        <img src="../../assets/images/287424.jpg" style="max-width:100%">
      </div>
      <div @click="show=false">
        <span class="zmui-close"></span>
      </div>
    </x-dialog>
  </div>

  <div v-transfer-dom>
    <x-dialog :show.sync="show2" class="dialog-demo">
      <div class="img-box">
        <img src="../../assets/images/287424.jpg" style="max-width:100%">
      </div>
      <div @click="show2=false">
        <span class="zmui-close"></span>
      </div>
    </x-dialog>
  </div>

  <div v-transfer-dom>
    <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
      <div class="img-box">
        <img src="../../assets/images/287424.jpg" style="max-width:100%">
      </div>
      <div @click="showHideOnBlur=false">
        <span class="zmui-close"></span>
      </div>
    </x-dialog>
  </div>

  <div v-transfer-dom>
    <x-dialog v-lock-page v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
      <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
        <span style="font-size:30px;">HELLO WORLD</span>
      </p>
    </x-dialog>
  </div>

  <cell-group>
    <switch-cell v-model="showScrollBox" :title="'long long content'"></switch-cell>
  </cell-group>

  <div v-transfer-dom>
    <x-dialog v-model="showScrollBox" class="dialog-demo">
      <p class="dialog-title">Long content</p>
      <div v-lock-page class="img-box" style="height:100px;padding:15px 0;overflow:scroll;-webkit-overflow-scrolling:touch;">
        <p v-for="i in 20">{{i}}</p>
      </div>
      <div @click="showScrollBox=false">
        <span class="zmui-close"></span>
      </div>
    </x-dialog>
  </div>

  <br>
  <br>

  <divider> alert </divider>
  <cell-group>
    <switch-cell :title="'Show Me'" v-model="show3"></switch-cell>
  </cell-group>
  <div v-transfer-dom>
    <alert v-model="show3" :title="'Congratulations'" @on-show="onShow" @on-hide="onHide"> {{ 'Your Message is sent successfully~' }}</alert>
  </div>

  <cell-group title="Prop: content">
    <switch-cell :title="'Show Me'" v-model="show4"></switch-cell>
  </cell-group>
  <div v-transfer-dom>
    <alert v-model="show4" :title="'Congratulations'" :content="'Your Message is sent successfully~'"></alert>
  </div>

  <divider> confirm </divider>

  <cell-group>
    <switch-cell :title="'Toggle'" v-model="show7"></switch-cell>
  </cell-group>
  <cell-group>
    <switch-cell :title="'Toggle show-input'" v-model="show8"></switch-cell>
  </cell-group>
  <cell-group>
    <switch-cell :title="'Set default input value'" v-model="show9"></switch-cell>
  </cell-group>
  <cell-group>
    <switch-cell :title="'Toggle_android'" v-model="show10"></switch-cell>
  </cell-group>
  <cell-group>
    <switch-cell :title="'closeOnConfirm=false'" v-model="show11"></switch-cell>
  </cell-group>

  <br>

  <divider> 插件 </divider>
  <button-cell type="primary" @click.native="openPlugin0">插件大法0</button-cell>
  <button-cell type="primary" @click.native="openPlugin">插件大法1</button-cell>
  <button-cell type="primary" @click.native="openPlugin2">插件大法2</button-cell>
  <br>

  <divider> 模块 </divider>
  <button-cell type="primary" @click.native="openModule0">模块大法0</button-cell>
  <button-cell type="primary" @click.native="openModule">模块大法1</button-cell>
  <button-cell type="primary" @click.native="openModule2">插件大法2</button-cell>



  <confirm v-model="show7"
           :title="'Confirm deleting the item'"
           @on-cancel="onCancel"
           @on-confirm="onConfirm"
           @on-show="onShow"
           @on-hide="onHide">
    <p style="text-align:center;">{{ 'Are you sure?' }}</p>
  </confirm>

  <confirm v-model="show8"
           show-input
           :title="'Confirm deleting the item'"
           @on-cancel="onCancel"
           @on-confirm="onConfirm"
           @on-show="onShow"
           @on-hide="onHide">
  </confirm>

  <confirm v-model="show9"
           show-input
           ref="confirm5"
           :title="'Confirm deleting the item'"
           @on-cancel="onCancel"
           @on-confirm="onConfirm5"
           @on-show="onShow5"
           @on-hide="onHide">
  </confirm>

  <confirm v-model="show10"
           :title="'Confirm deleting the item'"
           theme="android"
           @on-cancel="onCancel"
           @on-confirm="onConfirm"
           @on-show="onShow"
           @on-hide="onHide">
    <p style="text-align:center;">{{ 'I miss u sunyi' }}</p>
  </confirm>

  <confirm
    v-model="show11"
    :close-on-confirm="false"
    :title="'Confirm deleting the item'"
    @on-confirm="onConfirm4">
    <p style="text-align:center;">{{ 'Are you sure?' }}</p>
  </confirm>

</div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Cell, CellGroup } from '../../ui/components/cell'
  import { ButtonCell } from '../../ui/components/button'
  import { SwitchCell } from '../../ui/components/switch'
  import { Icon } from '../../ui/components/icon'

  import { Dialog as XDialog, Alert, Confirm } from '../../ui/components/dialog'

  // dialog
  import '../../ui/plugins/dialog/index'
  import DialogModule  from '../../ui/plugins/dialog/module'

  // alert
  import '../../ui/plugins/alert/index'
  import AlertModule  from '../../ui/plugins/alert/module'

  //  confirm
  import '../../ui/plugins/confirm/index'
  import ConfirmModule  from '../../ui/plugins/confirm/module'

  import TransferDom from '../../ui/directives/transfer-dom'
  import LockPage from '../../ui/directives/lock-page'

  import img01 from '../../assets/images/287424.jpg'

  export default{
    components:{
      Divider,
      XDialog, Alert, Confirm,
      ButtonCell,
      SwitchCell,
      Cell, CellGroup,
      Icon
    },
    directives:{
      TransferDom,
      LockPage
    },
    data () {
      return {
        show: false,
        show2: false,
        showToast: false,
        showHideOnBlur: false,
        showScrollBox: false,
        showDialogStyle: false,

        show3: false,
        show4: false,
        show5: false,

        show7: false,
        show8: false,
        show9: false,
        show10: false,
        show11: false
      }
    },
    methods:{
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      showPlugin () {

      },
      showModule () {

      },
      showModuleAuto () {
        this.showModule();
      },
      showPluginAuto () {
        this.showPlugin();
      },


      onCancel () {
        console.log('on cancel')
      },
      onConfirm (msg) {
        console.log('on confirm');
        if (msg) {
          alert(msg)
        }
      },
      onConfirm4 () {
        console.log('on confirm');
        setTimeout(() => {
          this.show4 = false
        }, 1000)
      },
      onHide () {
        console.log('on hide')
      },
      onShow () {
        console.log('on show')
      },
      onShow5 () {
        this.$refs.confirm5.setInputValue('default')
      },
      onConfirm5 (value) {
        this.$refs.confirm5.setInputValue('');
      },

      openPlugin0(){
        this.$dialog.show({
          hideOnBlur: true,
          content: `<div class="img-box">
                      <img src="${img01}" style="max-width: 100%" >
                    </div>`
        });
      },
      openPlugin(){
        this.$alert.show('插件大法好！');
      },
      openPlugin2(){
        this.$confirm.show({
          title: '模块',
          content: '模块大法好！',
          onCancel(){
            console.info('不好')
          },
          onConfirm(){
            console.info('好')
          }
        });
      },

      openModule0(){
        DialogModule.show({
          hideOnBlur: true,
          content: `<div class="img-box">
                      <img src="${img01}" style="max-width: 100%" >
                    </div>`
        });
      },
      openModule(){
        AlertModule.show('模块大法好！');
      },
      openModule2(){
        ConfirmModule.show({
          title: '模块',
          content: '模块大法好！',
          onCancel(){
            console.info('不好')
          },
          onConfirm(){
            console.info('好')
          }
        });
      }

    }
  }
</script>

<style lang="less">
  @import "../../ui/styles/utils/close.less";
</style>
