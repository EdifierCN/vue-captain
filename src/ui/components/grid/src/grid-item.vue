<template>
  <a href="javascript:;" class="zmui-grid-item" @click="onClick" :style="style">
    <div class="zmui-grid-item__icon" v-if="hasIconSlot || icon">
      <slot name="icon">
        <img :src="icon" alt="">
      </slot>
    </div>
    <div class="zmui-grid-item__label" v-if="hasLabelSlot || label">
      <slot name="label">
          <span v-html="label"></span>
      </slot>
    </div>
    <slot></slot>
  </a>
</template>

<script>
  import { go } from '../../../libs/router'

  export default{
    name: 'grid-item',
    props: ['icon', 'label', 'link'],
    created(){
      this.$parent.countColumn()
    },
    mounted(){
        this.$slots.icon && (this.hasIconSlot = true);
        this.$slots.label && (this.hasLabelSlot = true);
    },
    destroyed(){
      this.$parent.countColumn()
    },
    data(){
      return{
        hasIconSlot: false,
        hasLabelSlot: false
      }
    },
    computed: {
      style(){
        let column = this.$parent.column;

        return {
          width: `${100 / column}%`
        };
      }
    },
    methods:{
      onClick(){
        this.$emit('on-item-click');
        go(this.link, this.$router)
      },

    }
  }
</script>
