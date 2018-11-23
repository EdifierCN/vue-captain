<template>
  <transition :name="transition" @after-leave="afterLeave">
    <div class="zmui-loading_toast zmui-loading_primary" v-show="show">
      <div class="zmui-mask_transparent"></div>
      <div class="zmui-toast" :style="{ position: position }">
        <i class="zmui-loading zmui-icon_toast"></i>
        <p class="zmui-toast__content">{{ text || '加载中' }}<slot></slot></p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'loading',
    model: {
      prop: 'show',
      event: 'change'
    },
    props: {
      show: Boolean,
      text: String,
      position: String,
      transition: {
        type: String,
        default: 'zmui-mask'
      }
    },
    methods:{
      afterLeave(){
        this.$emit('after-leave');
      }
    },
    watch: {
      show (val) {
        this.$emit('update:show', val)
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/utils/mask';
  @import '../../../styles/widget/toast/index';
  @import '../../../styles/widget/loading/index.less';

  .zmui-loading_primary .zmui-toast {
    z-index: 5001;
  }
  .zmui-icon_toast.zmui-loading {
    margin: 30px 0 0;
    width: 38px;
    height: 38px;
    vertical-align: baseline;
    display: inline-block;
  }
  .zmui-mask-enter, .zmui-mask-leave-active {
    opacity: 0;
  }
  .zmui-mask-leave-active, .zmui-mask-enter-active {
    transition: opacity 300ms;
  }
</style>
