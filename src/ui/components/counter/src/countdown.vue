<template>
  <span>{{ currentTime }}</span>
</template>

<script>
  export default {
    name: 'countdown',
    props: {
      value: Number,
      start: {
        type: Boolean,
        default: true
      }
    },
    created () {
      this.currentTime = this.time;
      if (this.value) this.currentTime = this.value
    },
    methods: {
      tick () {
        this.interval = setInterval(() => {
          if (this.currentTime > 0) {
            this.currentTime--
          } else {
            this.stop();
            this.index++;
            this.$emit('on-finish', this.index)
          }
        }, 1000)
      },
      stop () {
        clearInterval(this.interval)
      }
    },
    watch: {
      value (val) {
        this.currentTime = val
      },
      currentTime (val) {
        this.$emit('input', val)
      },
      start (newVal, oldVal) {
        if (newVal === true && oldVal === false && this.currentTime > 0) {
          this.tick()
        }
        if (newVal === false && oldVal === true) {
          this.stop()
        }
      }
    },
    mounted () {
      if (this.start) {
        this.tick()
      }
    },
    data () {
      return {
        interval: null,
        index: 0,
        currentTime: 60
      }
    }
  }
</script>
