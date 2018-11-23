<template>
    <div style="height: 500px; position: relative">

      <button class="button" style="position: absolute; left: 0; top: 0;">button1</button>
      <button class="button" style="position: absolute; right: 0; top: 0;">button2</button>
      <button class="button" style="position: absolute; left: 0; bottom: 0;">button3</button>
      <button class="button" style="position: absolute; right: 0; bottom: 0;">button4</button>

      <button id="fire" style="position: absolute; left: 50%; top: 50%;">button5</button>

      <popover trigger=".button">
        <popover-item>选项卡一</popover-item>
        <popover-item>选项卡二</popover-item>
        <popover-item>选项卡三</popover-item>
        <popover-item>选项卡四</popover-item>
      </popover>

      <popover trigger="#fire">
        <popover-item>选项卡一</popover-item>
        <popover-item>选项卡二</popover-item>
        <popover-item>选项卡三</popover-item>
        <popover-item>选项卡四</popover-item>
        <popover-item>选项卡五</popover-item>
        <popover-item>选项卡六</popover-item>
        <popover-item>选项卡七</popover-item>
      </popover>

  </div>
</template>

<script>
  import { Popover, PopoverItem } from '../../ui/components/popover'

  export default{
    components:{
      Popover, PopoverItem
    },
    data(){
      return {
        pop1: false
      }
    }
  }
</script>

<style>
</style>
