<template>

  <div>

    <divider>iOS Gradients</divider>
    <box gap="10px 10px">
      <button-cell :gradients="['#1D62F0', '#19D5FD']" class="btn1">iOS Gradients</button-cell>
      <button-cell :gradients="['#A644FF', '#FC5BC4']" class="btn2">iOS Gradients</button-cell>
      <button-cell :gradients="['#FF2719', '#FF61AD']">iOS Gradients</button-cell>
      <button-cell :gradients="['#6F1BFE', '#9479DF']">iOS Gradients</button-cell>
      <button-cell :gradients="['#FF5E3A', '#FF9500']">iOS Gradients</button-cell>
    </box>

    <div>
      <divider>default</divider>
      <box gap="10px 10px">
        <button-cell>submit</button-cell>
        <button-cell type="primary">primary</button-cell>
        <button-cell type="warn">Delete</button-cell>
        <button-cell type="danger">Delete</button-cell>
      </box>
    </div>

    <div>
      <divider>link</divider>
      <box gap="10px 10px">
        <button-cell type="primary" link="/">Go to demo list</button-cell>
        <button-cell type="default" link="BACK">Back</button-cell>
        <button-cell type="danger" link="BACK">Back</button-cell>
      </box>
    </div>

    <div>
      <divider>action type</divider>
      <box gap="10px 10px">
        <button-cell type="primary" action-type="button">submit</button-cell>
        <button-cell type="warn" action-type="reset">reset</button-cell>
        <button-cell type="danger" action-type="reset">reset</button-cell>
      </box>
    </div>

    <div>
      <divider>loading</divider>
      <box gap="10px 10px">
        <button-cell type="default" show-loading>submit</button-cell>
        <button-cell type="primary" show-loading>submit</button-cell>
        <button-cell type="warn" show-loading>submit</button-cell>
        <button-cell type="danger" show-loading>submit</button-cell>
      </box>
    </div>

    <div>
      <divider>mini</divider>
      <box gap="10px 10px">
        <button-cell mini>submit</button-cell>
        <button-cell mini type="primary">primary</button-cell>
        <button-cell mini type="warn">warn</button-cell>
        <button-cell mini type="danger">danger</button-cell>
        <br>
        <button-cell mini plain>submit</button-cell>
        <button-cell mini plain type="primary">primary</button-cell>
        <button-cell mini plain type="warn">warn</button-cell>
        <button-cell mini plain type="danger">danger</button-cell>
      </box>
    </div>

    <div>
      <divider>plain</divider>
      <box gap="10px 10px">
        <button-cell plain>submit</button-cell>
        <button-cell plain type="primary">primary</button-cell>
        <button-cell plain type="warn">warn</button-cell>
        <button-cell plain type="danger">danger</button-cell>
      </box>
    </div>

    <div>
      <divider>you can custom styles</divider>
      <box gap="10px 10px">
        <button-cell plain type="primary" style="border-radius:99px;">primary</button-cell>
        <button-cell plain class="custom-primary-red">primary</button-cell>
      </box>
    </div>

    <div>
      <divider>disabled</divider>
      <box gap="10px 10px">
        <button-cell disabled>disable submit</button-cell>
        <button-cell type="primary" disabled>disable primary</button-cell>
        <button-cell type="warn" disabled>disable warn</button-cell>
        <button-cell type="danger" disabled>disable danger</button-cell>
        <br>
        <button-cell plain disabled>disable plain</button-cell>
        <button-cell plain type="primary" disabled>disable plain primary</button-cell>
        <button-cell plain type="warn" disabled>disable plain warn</button-cell>
        <button-cell plain type="danger" disabled>disable plain danger</button-cell>
        <br>
        <button-cell mini disabled>disable mini submit</button-cell>
        <button-cell mini type="primary" disabled>disable mini primary</button-cell>
        <button-cell mini type="warn" disabled>disable mini warn</button-cell>
        <button-cell mini type="danger" disabled>disable mini danger</button-cell>
      </box>
    </div>
  </div>

</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Box } from '../../ui/components/box'
  import { ButtonCell } from '../../ui/components/button'

  import { friendlyDate } from '../../ui/tools/date/format'

  export default{
    components:{
      Box,
      Divider,
      ButtonCell
    },
    data(){
      return {
        test: false,
        list:[{
          id: 0,
          step: 0,
          showModal: false
        },{
          id: 1,
          step: 1,
          showModal: false
        },{
          id: 2,
          step: 2,
          showModal: false
        }],
      }
    },
    mounted(){

    },
    watch:{

    }

  }
</script>
