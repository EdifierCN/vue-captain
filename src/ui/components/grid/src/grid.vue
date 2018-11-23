<template>
  <div class="zmui-grid">
    <slot></slot>
  </div>
</template>

<script>
  export default {
      name: 'grid',
      methods: {
          countColumn(){
              this.childrenSize = this.$children.length
          }
      },
      props: {
          cols:{
              type: Number
          }
      },
      data(){
        return{
            childrenSize: 1
        }
      },
      computed: {
          column(){
              return this.cols || this.childrenSize
          }
      }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/grid/index.less';
</style>
