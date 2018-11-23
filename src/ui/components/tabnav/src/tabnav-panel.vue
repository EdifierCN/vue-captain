<template>
  <div class="zmui-tabnav-panel-item" :class="classes">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'tabnav-panel',
    props: {
      label: String,
      active: Boolean,
      tabkey: [String, Number]
    },
    computed: {
      classes() {
        return this.$parent.activeIndex === this._uid ? 'zmui-tabnav-active' : '';
      }
    },
    watch: {
      active() {
        this.$parent.init(true);
      },
      label() {
        this.$parent.init(false, 'label');
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$parent.init(false);
      });
    }
  }
</script>
