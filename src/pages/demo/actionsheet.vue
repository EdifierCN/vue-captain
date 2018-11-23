<template>
<div>

  <divider> 默认使用 </divider>
  <cell-group>
    <switch-cell :title="'Basic Usage'" v-model="show1"></switch-cell>
    <switch-cell :title="'Android Theme'" v-model="show7"></switch-cell>
    <switch-cell :title="'Show cancel menu'" v-model="show2"></switch-cell>
    <switch-cell :title="'Array menu'" v-model="show5"></switch-cell>
  </cell-group>

  <cell-group :title="'Prevent closing when clicking mask'">
    <switch-cell :title="'Basic Usage'" v-model="show4"></switch-cell>
  </cell-group>

  <cell-group>
    <switch-cell :title="'Menu as tips'" v-model="show3"></switch-cell>
    <switch-cell :title="'Slot: header'" v-model="show6"></switch-cell>
    <switch-cell :title="'Prevent auto closing'" v-model="show8"></switch-cell>
  </cell-group>

  <actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel @on-click-mask="console('on click mask')"></actionsheet>

  <actionsheet v-model="show1" :menus="menus1" @on-click-menu="click"></actionsheet>

  <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>

  <actionsheet v-model="show3" :menus="menus3" @on-click-menu="click" @on-click-menu-delete="onDelete" show-cancel></actionsheet>

  <actionsheet v-model="show5" :menus="menus5" show-cancel @on-click-menu="click5"></actionsheet>

  <actionsheet v-model="show6" :menus="menus1">
    <p slot="header" v-html="'此乃标题'"></p>
  </actionsheet>

  <actionsheet v-model="show7" :menus="menu7" theme="android" @on-click-menu="click">
  </actionsheet>

  <actionsheet v-model="show8" :menus="menus8" @on-click-menu="demo8doClose" :close-on-clicking-mask="false" :close-on-clicking-menu="false">
  </actionsheet>

  <br>

  <divider> 插件 </divider>
  <button-cell type="primary" @click.native="pluginOpen">插件大法</button-cell>

  <br>

  <divider> 模块 </divider>
  <button-cell type="primary" @click.native="moduleOpen">模块大法</button-cell>




</div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { SwitchCell } from '../../ui/components/switch'
  import { ButtonCell } from '../../ui/components/button'
  import { CellGroup } from '../../ui/components/cell'
  import TransferDom from '../../ui/directives/transfer-dom'

  import { Actionsheet } from '../../ui/components/actionsheet'
  import '../../ui/plugins/actionsheet/index'
  import ActionModule  from '../../ui/plugins/actionsheet/module'


  export default{
    components:{
      Actionsheet,
      SwitchCell,
      ButtonCell,
      CellGroup,
      Divider
    },
    directives: {
      TransferDom
    },
    data(){
      return {
        show1: false,
        menus1: {
          menu1: 'Share to friends',
          menu2: 'Share to timeline'
        },
        show2: false,
        menus2: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        menus5: [{
          label: 'Actionsheet header',
          type: 'info'
        }, {
          label: 'Primary',
          type: 'primary',
          value: 'primary',
          otherProp: 'hey'
        }, {
          label: 'Warn',
          type: 'warn'
        }, {
          label: 'Disabled',
          type: 'disabled'
        }, {
          label: 'Default'
        }],
        menu7: {
          menu1: '北京烤鸭',
          menu2: '陕西油泼面',
          menu3: '西安肉夹馍'
        },
        showSuccess: false,
        menus3: {
          'title': '分享',
          'delete': '<span style="color:red">Delete</span>'
        },
        menus8: {
          menu1: 'Close me',
          menu2: 'Close me'
        }
      }
    },
    methods:{
      demo8doClose () {
        setTimeout(() => {
          this.show8 = false
        }, 1000)
      },
      console (msg) {
        console.log(msg)
      },
      click (key) {
        console.log(key)
      },
      click5 (key, item) {
        console.log(key, item)
      },
      onDelete () {
        this.showSuccess = true
      },
      pluginOpen(){
        const vm = this;
        vm.$actionsheet.show({    // show 方法返回实例
          menus: ['删除','打印'],
          onMenuClick(text){
            vm.$actionsheet.show({
              title: `您选择了${text}`,
              menus: {'label': '确定'},
              onMenuClick(){
                vm.$actionsheet.hide()
              }
            })
          }
        })
      },
      moduleOpen(){
        let menu = ['分享', '修改', '删除'];
        ActionModule.show({      // show 方法返回实例
          menus: menu,
          onMenuClick(text){
            ActionModule.show({
              title: `您选择了${text}`,
              menus: {'label': '<span style="color:red">确定</span>'},
              onMenuClick(){
                ActionModule.hide()
              }
            })
          }
        });
      }

    }
  }
</script>

<style>
</style>
