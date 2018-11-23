<template>
  <li class="zmui-timeline-item">
    <div :class="['zmui-timeline-item-color', {'zmui-timeline-item-head': !isFirst,'zmui-timeline-item-head-first': isFirst }]" :style="headStyle">
      <icon v-show="isFirst && $parent.isShowIcon" type="success_no_circle" class="zmui-timeline-item-checked"></icon>
    </div>
    <div class="zmui-timeline-item-tail" :style="tailStyle"></div>
    <div class="zmui-timeline-item-content">
      <slot></slot>
    </div>
  </li>
</template>

<script>
  import { Icon } from '../../icon'

  export default {
    name: 'timeline-item',
    data () {
      return {
        isLast: true,
        isFirst: true,
        headStyle: { backgroundColor: this.$parent.color }
      }
    },
    mounted () {
      this.$parent.setChildProps()
    },
    beforeDestroy () {
      // this will be null
      const $parent = this.$parent;
      this.$nextTick(() => {
        $parent.setChildProps()
      })
    },
    components: {
      Icon
    },
    computed: {
      tailStyle () {
        return this.isLast ? { display: 'none', backgroundColor: this.$parent.color } : { display: 'block', backgroundColor: this.$parent.color }
      }
    }
  }
</script>

