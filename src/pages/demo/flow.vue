<template>
  <div>
    <flow>
      <flow-state state="1" :title="`Paid`" is-done></flow-state>
      <flow-line is-done></flow-line>

      <flow-state state="2" is-done>
        <span slot="title">{{ `Shipped` }}</span>
      </flow-state>
      <flow-line :tip="`In progress`"></flow-line>

      <flow-state state="3" :title="`Delivered`"></flow-state>
      <flow-line></flow-line>

      <flow-state state="4" :title="`Done`"></flow-state>
    </flow>

    <flow>
      <flow-state :title="`Paid`" is-done></flow-state>
      <flow-line is-done :line-span="15"></flow-line>

      <flow-state :title="`Shipped`" is-done></flow-state>
      <flow-line is-done :line-span="30"></flow-line>

      <flow-state :title="`Delivered`" is-done></flow-state>
      <flow-line :tip="`In progress`" tip-direction="bottom" :line-span="45" :process-span="60"></flow-line>

      <flow-state :title="`Done`"></flow-state>
    </flow>

    <flow orientation="vertical" style="height:250px;">
      <flow-state state="1" :title="`Paid`" is-done></flow-state>
      <flow-line is-done></flow-line>

      <flow-state state="2" :title="`Shipped`" is-done></flow-state>
      <flow-line :tip="`In progress`"></flow-line>

      <flow-state state="3" :title="`Delivered`"></flow-state>
      <flow-line></flow-line>

      <flow-state state="4" :title="`Done'`"></flow-state>
    </flow>

    <flow orientation="vertical" style="height:200px;">
      <flow-state state="1" :title="`Paid`" is-done></flow-state>
      <flow-line is-done :line-span="15"></flow-line>

      <flow-state state="2" :title="`Shipped`" is-done></flow-state>
      <flow-line :line-span="30"></flow-line>

      <flow-state state="3" :title="`Delivered`"></flow-state>
      <flow-line :line-span="45"></flow-line>

      <flow-state state="4" :title="`Done`"></flow-state>
    </flow>

  </div>
</template>

<script>
  import { CellGroup } from '../../ui/components/cell'
  import { Flow, FlowLine, FlowState } from '../../ui/components/flow'

  export default{
    components:{
      CellGroup,
      Flow, FlowLine, FlowState
    }
  }
</script>

<style>
</style>
