<template>
  <div>
    <loadmore :tip="'正在加载'"></loadmore>
    <loadmore :show-loading="false" :tip="'暂无数据'" background-color="#fbf9fe"></loadmore>
    <loadmore :show-loading="false" background-color="#fbf9fe"></loadmore>
  </div>
</template>

<script>
  import { Loadmore } from '../../ui/components/loadmore'

  export default{
    components: {
      Loadmore
    }
  }
</script>

<style>
</style>
