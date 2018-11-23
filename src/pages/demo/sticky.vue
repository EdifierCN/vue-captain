<template>
  <div>
    <br/>
    <br/>
    <div class="space-btn" @click="spaceChange">显示间隔</div>
    <div class="space" v-if="showSpace">间隔</div>

    <sticky top="45px">
      <tab>
        <tab-item selected>正在正映</tab-item>
        <tab-item>即将上映</tab-item>
      </tab>
    </sticky>

    <p v-for="i in 100">{{i}}<br></p>
  </div>
</template>

<script>
  import { Tab, TabItem } from '../../ui/components/tab'
  import { Sticky } from '../../ui/components/sticky'

  export default {
    components: {
      Tab,
      TabItem,
      Sticky
    },
    data () {
      return {
        showSpace: false
      }
    },
    methods: {
      spaceChange () {
        this.showSpace = !this.showSpace;
      }
    }
  }
</script>

<style>
  .space-btn {
    padding: 5px 0;
    margin: 10px;
    text-align: center;
    border: 1px red solid;
  }

  .space {
    padding: 30px 0;
    margin: 10px;
    text-align: center;
    border: 1px green solid;
  }
</style>
