<template>
  <div>
    <divider>2 columns</divider>
    <grid>
      <grid-item :label="'Grid'" v-for="i in 2" :key="i">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
    </grid>
    <divider>3 columns</divider>
    <grid>
      <grid-item link="/component/cell" :label="'Go to Cell'">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
      <grid-item :link="{ path: '/component/cell'}" :label="'Go to Cell'">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
      <grid-item link="/component/cell" @on-item-click="onItemClick">
        <img slot="icon" src="../../assets/grid_icon.png">
        <span slot="label">{{ 'Go to Cell' }}</span>
      </grid-item>
    </grid>
    <divider>4 columns</divider>
    <grid>
      <grid-item :label="'Grid'" v-for="i in 4" :key="i">
        <img slot="icon" src="../../assets/grid_icon.png">
      </grid-item>
    </grid>
    <divider> {{ 'Custom content' }} </divider>
    <grid>
      <grid-item v-for="i in 5" :key="i">
        <span class="grid-center">{{i}}</span>
      </grid-item>
    </grid>
    <divider> {{ 'Custom col' }} </divider>
    <grid :cols="3">
      <grid-item v-for="i in 6" :key="i">
        <span class="grid-center">{{i}}</span>
      </grid-item>
    </grid>
  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Grid, GridItem } from '../../ui/components/grid'

  export default{
    components:{
      Divider,
      Grid,GridItem
    },
    methods: {
      onItemClick () {
        console.log('on item click')
      }
    }
  }
</script>

<style>
  .grid-center {
    display: block;
    text-align: center;
    color: #666;
  }
</style>
