<template>
  <div>
    <divider>{{ 'Default usage' }}</divider>
    <marquee>
      <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)" class="align-middle">hello world {{i}}</marquee-item>
    </marquee>
    <br>
    <divider>{{ 'Used in a cell'}}</divider>
    <cell-group>
      <cell :title="'News'">
        <marquee style="overflow:hidden">
          <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)">{{ 'the best language'}} {{i}}</marquee-item>
        </marquee>
      </cell>
    </cell-group>
    <br>
    <divider>{{ 'Async data'}}</divider>
    <marquee>
      <marquee-item v-for="i in asyncCount" :key="i" @click.native="onClick(i)" class="align-middle">hello world {{i}}</marquee-item>
    </marquee>
  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { Marquee, MarqueeItem } from '../../ui/components/marquee'

  export default{
    components:{
      Divider,
      CellGroup, Cell,
      Marquee, MarqueeItem
    },
    mounted () {
      setTimeout(() => {
        this.asyncCount = 5
      }, 1000)
    },
    methods: {
      onClick (i) {
        console.log(i)
      }
    },
    data () {
      return {
        asyncCount: 0
      }
    }
  }
</script>

<style>
  .align-middle {
    text-align: center;
  }
</style>
