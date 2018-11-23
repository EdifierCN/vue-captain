<template>
  <div>
    <divider @click.native="drawerVisibility = !drawerVisibility">drawer push 模式 (click here)</divider>
    <div style="height: 300px; background: white">
      <drawer
        :show.sync="drawerVisibility"
        show-mode="push"
        :placement="showPlacementValue"
        :drawer-style="{'background-color':'black', color: '#fff', width: '200px'}">
        <div slot="drawer">
          <ul>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
          </ul>
        </div>
        <div>
          整体移动
        </div>
      </drawer>
    </div>

    <divider @click.native="drawerVisibility = !drawerVisibility">drawer overlay 模式 (click here)</divider>
    <div style="height: 300px; background: white">
      <drawer
        :show.sync="drawerVisibility"
        show-mode="overlay"
        :placement="showPlacementValue"
        :drawer-style="{'background-color':'black', color: '#fff',width: '200px'}">
        <div slot="drawer">
          <ul>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
          </ul>
        </div>
        <div>
          侧边栏移动
        </div>
      </drawer>
    </div>

    <divider @click.native="showOff = !showOff">offcanvas （主界面移动）</divider>
    <div style="height: 300px; background: white">
      <offcanvas v-model="showOff">
        <div slot="drawer" style=" color: #FFFFFF">
          <ul>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
          </ul>
        </div>
        <div style="background: #FFFFFF">
          <ul>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
          </ul>
        </div>
      </offcanvas>
    </div>

    <divider @click.native="showOff = !showOff">offcanvas（侧边栏移动）</divider>
    <div style="height: 300px; background: white">
      <offcanvas model="menu-move" v-model="showOff">
        <div slot="drawer" style="color: #FFFFFF">
          <ul>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
          </ul>
        </div>
        <div style=" background: #FFFFFF">
          <ul>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
          </ul>
        </div>
      </offcanvas>
    </div>

    <divider @click.native="showOff = !showOff">offcanvas（整体移侧边栏动）</divider>
    <div style="height: 300px">
      <offcanvas model="all-move" v-model="showOff">
        <div slot="drawer" style="min-height: 100%; color: #FFFFFF">
          <ul>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
          </ul>
        </div>
        <div style="min-height: 100%; background: #FFFFFF">
          <ul>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
            <li> 主界面</li>
          </ul>
        </div>
      </offcanvas>
    </div>

    <divider @click.native="showOff = !showOff">offcanvas（缩放侧滑）</divider>
    <div style="height: 300px; background: white">
      <offcanvas model="main-move-scalable" v-model="showOff">
        <div slot="drawer" style="height: 100%; color: #FFFFFF">
          <ul>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
            <li>侧边栏</li>
          </ul>
        </div>
        <div style="height: 100%; background: #FFFFFF;  overflow-y: scroll">
          <div style="height: 200%;">
            <ul>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
              <li> 主界面</li>
            </ul>
          </div>
        </div>
      </offcanvas>
    </div>
  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Drawer, Offcanvas } from '../../ui/components/drawer'

  export default{
    components:{
      Divider,
      Drawer,
      Offcanvas
    },
    data(){
      return {
        drawerVisibility: false,
        showModeValue: 'push',
        showPlacementValue: 'left',
        showOff: false
      }
    },
    methods:{

    },
    watch:{
      showOff(val){
        console.info(val)
      }
    }
  }
</script>

<style>
</style>
