<template>
  <button class="zmui-swipeout-button"
          :class="{'zmui-swipeout-button-primary': type === 'primary', 'zmui-swipeout-button-warn': type === 'warn', 'zmui-swipeout-button-default': type === 'default'}" :style="{width: `${width}px`, backgroundColor: backgroundColor}" @click="onButtonClick" type="button">
    <slot>{{text}}</slot>
  </button>
</template>

<script>
  export default {
    name: 'swipeout-button',
    props: {
      text: String,
      backgroundColor: String,
      type: String,
      width: {
        type: Number,
        default: 80
      }
    },
    methods: {
      onButtonClick () {
        if (this.$parent.$options._componentTag === 'swipeout-item') {
          this.$parent.onItemClick(this.text)
        }
      }
    }
  }
</script>
