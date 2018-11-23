<template>
  <div>
    <div class="zmui-1px-t">

      <swipeout>

        <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Yes'}}</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Right'}}</swipeout-button>
          </div>
          <div slot="content" class="demo-content zmui-1px-t">
            {{'JavaScript is the best language'}}
          </div>
        </swipeout-item>

        <swipeout-item :threshold=".5" underlay-color="#ccc">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" background-color="#336DD6">{{'Fav'}}</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" background-color="#D23934">{{'Delete'}}</swipeout-button>
          </div>
          <div slot="content" class="demo-content zmui-1px-tb">
            {{'threshold = 0.5'}}
          </div>
        </swipeout-item>

        <swipeout-item :disabled="disabled" ref="swipeoutItem" :right-menu-width="210" :sensitivity="15">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary" :width="70">{{'Fav'}}</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn" :width="70">{{'Delete'}}</swipeout-button>
            <swipeout-button @click.native="onButtonClick('ignore')" type="default" :width="70">{{'Ignore'}}</swipeout-button>
          </div>

          <div slot="left-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">{{'Fav'}}</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">{{'Delete'}}</swipeout-button>
          </div>

          <div slot="content" class="demo-content zmui-1px-b">
            {{'now ' + (disabled ? 'disabled' : 'enabled')}}
          </div>
        </swipeout-item>

      </swipeout>
    </div>


    <div style="padding:15px;">
      <button-cell @click.native="disabled = false" type="primary" :disabled="!disabled">{{ 'set Enabled' }}</button-cell>
      <button-cell @click.native="disabled = true" type="warn" :disabled="disabled">{{ 'set Disabled' }}</button-cell>
      <button-cell @click.native="$refs.swipeoutItem.open('left')" type="primary">{{ 'open left menu' }}</button-cell>
      <button-cell @click.native="$refs.swipeoutItem.open('right')" type="primary">{{ 'open right menu' }}</button-cell>
      <button-cell @click.native="$refs.swipeoutItem.close()" type="warn">{{ 'close menu' }}</button-cell>
    </div>
    <br>
    <divider>use zmui-1px to style items</divider>
    <swipeout class="zmui-1px-tb">
      <swipeout-item transition-mode="follow" v-for="i in 3" :key="i">
        <div slot="right-menu">
          <swipeout-button type="primary">{{'Yes'}}</swipeout-button>
          <swipeout-button type="warn">{{'Right'}}</swipeout-button>
        </div>
        <div slot="content" :class="{'zmui-1px-b': i !== 3, 'zmui-1px-t': i === 1}" style="padding:12px;">{{ 'JavaScript is the best language' }}</div>
      </swipeout-item>
    </swipeout>
    <br>
    <br>
  </div>
</template>

<script>
  import { ButtonCell } from '../../ui/components/button'
  import { Divider } from '../../ui/components/divider'
  import { Swipeout, SwipeoutItem, SwipeoutButton } from '../../ui/components/swipeout'

  export default{
    components: {
      Divider,
      ButtonCell,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    methods: {
      onButtonClick (type) {
        alert('on button click ' + type)
      },
      handleEvents (type) {
        console.log('event: ', type)
      }
    },
    data () {
      return {
        disabled: false
      }
    }
  }
</script>

<style lang="less">
  .demo-content {
    padding: 10px 10px;
  }
</style>
