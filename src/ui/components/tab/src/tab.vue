<template>
  <div class="zmui-tab zmui-clearfix" :class="[{'zmui-tab-no-animate': !animate},{ scrollable }]" >
    <slot></slot>
    <div v-if="animate" class="zmui-tab-ink-bar" :class="barClass" :style="barStyle">
      <span class="zmui-tab-bar-inner" :style="innerBarStyle" v-if="showBar"></span>
    </div>
  </div>
</template>

<script>
  import { parentMixin } from '../../../mixins/multi-items'

  export default {
    name: 'tab',
    mixins: [parentMixin],
    mounted () {
      this.$nextTick(() => {
        this.hasReady = true;
      });
    },
    props: {
      showBar:{
        type: Boolean,
        default: true
      },
      lineWidth: {
        type: Number,
        default: 3
      },
      activeColor: String,
      barActiveColor: String,
      defaultColor: String,
      disabledColor: String,
      animate: {
        type: Boolean,
        default: true
      },
      customBarWidth: [Function, String],
      preventDefault: Boolean,
      scrollThreshold: {  // 大于设置滚动
        type: Number,
        default: 4
      },
      barPosition: {
        type: String,
        default: 'bottom',
        validator (val) {
          return ['bottom', 'top'].indexOf(val) !== -1
        }
      }
    },
    computed: {
      barLeft () {
        if (this.hasReady) {
          const el = this.$children[this.currentIndex || 0].$el;
          const left = el.getBoundingClientRect().left  + (el.getBoundingClientRect().width - Number(this.innerBarStyle.width.replace('px','')))/2 + this.$el.scrollLeft;
          return left + 'px'
        }
      },
      innerBarStyle () {
        if(this.hasReady){
          const el = this.$children[this.currentIndex || 0].$el;
          return {
            width: this.customBarWidth ? (typeof this.customBarWidth === 'function' ? this.customBarWidth(this.currentIndex) : this.customBarWidth) : el.getBoundingClientRect().width + 'px',
            backgroundColor: this.barActiveColor || this.activeColor
          }
        }
      },
      // end
      barStyle () {
        const commonStyle = {
          left: this.barLeft,
          display: 'block',
          height: this.lineWidth + 'px',
          transition: !this.hasReady ? 'none' : null
        };
        if (!this.customBarWidth) {
          commonStyle.backgroundColor = this.barActiveColor || this.activeColor
        } else {
          commonStyle.backgroundColor = 'transparent' // when=prop:custom-bar-width
        }
        return commonStyle
      },
      barClass () {
        return {
          'zmui-tab-ink-bar-transition-forward': this.direction === 'forward',
          'zmui-tab-ink-bar-transition-backward': this.direction === 'backward'
        }
      },
      scrollable () {
        return this.number > this.scrollThreshold
      }
    },
    watch: {
      currentIndex (newIndex, oldIndex) {
        this.direction = newIndex > oldIndex ? 'forward' : 'backward';
        this.$emit('on-index-change', newIndex, oldIndex);

        this.hasReady && this.scrollToActiveTab()
      }
    },
    methods:{
      scrollToActiveTab () {
        if (!this.scrollable || !this.$children || !this.$children.length) {
          return
        }
        const nav = this.$el;
        const currentIndexTab = this.$children[this.currentIndex].$el;
        let count = 0;

        const step = () => {
          const scrollDuration = 15;
          nav.scrollLeft += (currentIndexTab.offsetLeft - (nav.offsetWidth - currentIndexTab.offsetWidth) / 2 - nav.scrollLeft) / scrollDuration;
          if (++count < scrollDuration) {
            window.requestAnimationFrame(step)
          }
        };
        window.requestAnimationFrame(step)
      }
    },
    data () {
      return {
        direction: 'forward',
        right: '100%',
        hasReady: false
      }
    }
  }
</script>


<style lang="less">
  @import '../../../styles/base/fn';

  @prefixClass: zmui-tab;
  @easing-in-out: cubic-bezier(0.35, 0, 0.25, 1);
  @effect-duration: .3s;

  .@{prefixClass} {

    &-ink-bar {
      position: absolute;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: @tab-bar-active-color;
      text-align: center;

      &-transition-forward {
        transition: right @effect-duration @easing-in-out,
        left @effect-duration @easing-in-out @effect-duration * 0.3;
      }
      &-transition-backward {
        transition: right @effect-duration @easing-in-out @effect-duration * 0.3,
        left @effect-duration @easing-in-out;
      }
    }

  }

  .zmui-tab {
    display: flex;
    background-color: #fff;
    width: 100%;
    height: 44px;
    position: relative;
  }
  .zmui-tab button {
    padding: 0;
    border: 0;
    outline: 0;
    background: 0 0;
    appearance: none;
  }
  .zmui-tab .zmui-tab-item {
    flex: 1;
    padding: 0 10px;
    height: 100%;
    box-sizing: border-box;
    background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
    background-size: 100% 1px;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    color: @tab-text-default-color;
  }

  .zmui-tab .zmui-tab-item.zmui-tab-selected {
    color: @tab-text-active-color;
    border-bottom: 3px solid @tab-text-active-color;
  }

  .zmui-tab .zmui-tab-item.zmui-tab-disabled {
    color: @tab-text-disabled-color;
  }

  .zmui-tab.zmui-tab-no-animate .zmui-tab-item.zmui-tab-selected {
    background: 0 0;
  }

  /** when=prop:custom-bar-width **/
  .zmui-tab-bar-inner {
    display: block;
    background-color: @tab-text-active-color;
    margin: auto;
    height: 100%;
    transition: width 0.3s @easing-in-out;
  }

  .zmui-tab-item-badge {
    position: absolute;
    top:0;
    bottom:0;
    box-sizing: border-box;
    display: inline-block;
    height: 18px;
    min-width: 18px;
    padding: 0 4px;
    border-radius: 30px;
    margin: auto 0 auto 4px;
    line-height: 18px;
    font-size: 11px;
    background-clip: padding-box;
    vertical-align: middle;
  }

  .scrollable {
    overflow-y: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .scrollable .zmui-tab-item {
    flex: 0 0 auto;
  }
  .scrollable::-webkit-scrollbar {
    display: none;
  }
</style>
