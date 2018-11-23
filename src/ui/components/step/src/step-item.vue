<template>
  <div class="zmui-step-item" :class=" { 'zmui-step-item-with-tail' : !currentStepLast} ">
    <div :class="'zmui-step-item-tail ' + 'zmui-step-item-tail-' + currentStatus" v-show="!currentStepLast" :style="{right: $parent.gutter}"></div>
    <div :class="'zmui-step-item-head ' + 'zmui-step-item-head-' + currentStatus">
      <div class="zmui-step-item-head-inner">
        <span v-if="!icon && currentStatus!='finish'" class="zmui-step-item-icon">{{currentStepNumber}}</span>
        <span v-else :class="'zmui-step-item-icon ' + 'zmui-step-item-' + iconName">
        <icon type="success_no_circle" class="zmui-step-item-checked"></icon>
      </span>
      </div>
    </div>
    <div :class="'zmui-step-item-main ' + 'zmui-step-item-main-' + currentStatus" :style="{backgroundColor: $parent.backgroundColor, paddingRight: currentStepLast ? 0 : $parent.gutter}">
      <span class="zmui-step-item-title">{{title}}</span>
      <div class="zmui-step-item-description">{{description}}</div>
    </div>
  </div>
</template>

<script>
  import { Icon } from '../../icon'

  export default {
    name: 'step-item',
    props: {
      title: String,
      description: String,
      stepNumber: Number,
      stepLast: Boolean,
      icon: String,
      status: String,
      tailWidth: Object
    },
    computed: {
      iconName () {
        return this.icon || 'check'
      }
    },
    created () {
      this.currentStatus = this.status;
      this.currentStepLast = this.stepLast;
      this.currentStepNumber = this.stepNumber
    },
    data () {
      return {
        currentStatus: '',
        currentStepLast: false,
        currentStepNumber: 0
      }
    },
    components: {
      Icon
    }
  }
</script>
