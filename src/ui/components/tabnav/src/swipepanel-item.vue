<template>
  <div
    v-show="$parent.swiping || id === $parent.currentActive"
    class="zmui-swipepanel-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'swipepanel-item',
    props: ['id']
  };
</script>

<style>

  .zmui-swipepanel-item {
      flex-shrink: 0;
      width: 100%;
    }

</style>
