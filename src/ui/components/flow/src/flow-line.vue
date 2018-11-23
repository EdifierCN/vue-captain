<template>
  <div class="zmui-flow__line" :class="classes" :style="styles">
    <div class="zmui-flow__process" :style="{width: getWidth(this.processSpan)}"></div>
    <div v-if="tip" :class="`zmui-flow__info-${finalTipDirection}`" :style="{left: getWidth(this.processSpan)}">{{ tip }}</div>
  </div>
</template>

<script>
  export default {
    name: 'flow-line',
    props: {
      tip: String,
      tipDirection: String,
      isDone: Boolean,
      lineSpan: [Number, String],
      processSpan: [Number, String]
    },
    methods: {
      getWidth: span => typeof span === 'number' ? `${span}%` : span
    },
    computed: {
      finalTipDirection () {
        if (typeof this.tipDirection === 'undefined') {
          return this.$parent.orientation === 'vertical' ? 'left' : 'top'
        }
        return this.tipDirection
      },
      styles () {
        if (!this.lineSpan) {
          return
        }
        const direction = this.$parent.orientation
        const styles = {
          flex: 'none',
          '-webkit-box-flex': '0'
        }
        if (direction === 'vertical') {
          styles.width = '3px'
        }
        if (this.lineSpan) {
          if (direction === 'vertical') {
            styles.height = this.getWidth(this.lineSpan)
          } else {
            styles.width = this.getWidth(this.lineSpan)
          }
        }
        return styles
      },
      classes () {
        if (this.isDone) {
          return 'zmui-flow__line_done'
        }
        if (!this.isDone && this.tip) {
          return 'zmui-flow__line_ing'
        }
      }
    }
  }
</script>
