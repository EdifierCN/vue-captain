<template>
  <div :class="wrapClasses">
    <div :class="outerClasses">
      <div :class="innerClasses">
        <div :class="bgClasses" :style="bgStyle"></div>
      </div>
    </div>
    <span v-if="!hideInfo" :class="textClasses">
        <slot>
            <span v-if="isStatus" :class="textInnerClasses">
                <icon-ivu :type="statusIcon"></icon-ivu>
            </span>
            <span v-else :class="textInnerClasses">
                {{ percent }}%
            </span>
        </slot>
    </span>
  </div>
</template>
<script>

  import { IconIvu } from '../../icon';
  import { oneOf } from '../../../libs/assist';

  const prefixCls = 'zmui-progress-bar';

  export default {
    name: 'progress-bar',
    components: { IconIvu },
    props: {
      percent: {
        type: Number,
        default: 0
      },
      status: {
        validator (value) {
          return oneOf(value, ['normal', 'active', 'wrong', 'success']);
        },
        default: 'normal'
      },
      hideInfo: {
        type: Boolean,
        default: false
      },
      strokeWidth: {
        type: Number,
        default: 10
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentStatus: this.status
      };
    },
    computed: {
      isStatus () {
        return this.currentStatus === 'wrong' || this.currentStatus === 'success';
      },
      statusIcon () {
        let type = '';
        switch (this.currentStatus) {
          case 'wrong':
            type = 'ios-close';
            break;
          case 'success':
            type = 'ios-checkmark';
            break;
        }

        return type;
      },
      bgStyle () {
        return this.vertical ? {
          height: `${this.percent}%`,
          width: `${this.strokeWidth}px`
        } : {
          width: `${this.percent}%`,
          height: `${this.strokeWidth}px`
        };
      },
      wrapClasses () {
        return [
          `${prefixCls}`,
          `${prefixCls}-${this.currentStatus}`,
          {
            [`${prefixCls}-show-info`]: !this.hideInfo,
            [`${prefixCls}-vertical`]: this.vertical

          }
        ];
      },
      textClasses () {
        return `${prefixCls}-text`;
      },
      textInnerClasses () {
        return `${prefixCls}-text-inner`;
      },
      outerClasses () {
        return `${prefixCls}-outer`;
      },
      innerClasses () {
        return `${prefixCls}-inner`;
      },
      bgClasses () {
        return `${prefixCls}-bg`;
      }
    },
    created () {
      this.handleStatus();
    },
    methods: {
      handleStatus (isDown) {
        if (isDown) {
          this.currentStatus = 'normal';
          this.$emit('on-status-change', 'normal');
        } else {
          if (parseInt(this.percent, 10) === 100) {
            this.currentStatus = 'success';
            this.$emit('on-status-change', 'success');
          }
        }
      }
    },
    watch: {
      percent (val, oldVal) {
        if (val < oldVal) {
          this.handleStatus(true);
        } else {
          this.handleStatus();
        }
      },
      status (val) {
        this.currentStatus = val;
      }
    }
  };
</script>

<style lang="less">

  @progress-prefix: zmui-progress-bar;

  .@{progress-prefix} {
    display: inline-block;
    width: 100%;
  &-vertical {
     height: 100%;
     width: auto;
   }

  font-size: 12px;
  position: relative;

  &-outer {
     display: inline-block;
     width: 100%;
     margin-right: 0;
     padding-right: 0;

  .@{progress-prefix}-show-info & {
                           padding-right: 55px;
                           margin-right: -55px;
                         }
  }
  &-vertical &-outer {
     height: 100%;
     width: auto;
   }

  &-inner {
     display: inline-block;
     width: 100%;
     background-color: #f3f3f3;
     border-radius: 100px;
     vertical-align: middle;
   }
  &-vertical &-inner {
     height: 100%;
     width: auto;

  & > *, &:after {
            display: inline-block;
            vertical-align: bottom;
          }

  &:after {
     content: '';
     height: 100%;
   }
  }

  &-bg {
     border-radius: 100px;
     background-color: #2db7f5;
     transition: all 0.2s linear;
     position: relative;
   }

  &-text {
     display: inline-block;
     margin-left: 5px;
     text-align: left;
     font-size: 1em;
     vertical-align: middle;
   }

  &-active {
  .@{progress-prefix}-bg:before {
                           content: '';
                           opacity: 0;
                           position: absolute;
                           top: 0;
                           left: 0;
                           right: 0;
                           bottom: 0;
                           background: #fff;
                           border-radius: 10px;
                           animation: progress-active 2s ease-in-out infinite;
                         }
  }

  &-wrong {
  .@{progress-prefix}-bg {
                           background-color: #CE3C39;
                         }
  .@{progress-prefix}-text {
                           color: #CE3C39;
                         }
  }

  &-success {
  .@{progress-prefix}-bg {
                           background-color: #19be6b
                         }
  .@{progress-prefix}-text {
                           color: #19be6b
                         }
  }
  }

  @keyframes progress-active {
    0% {
      opacity: .3;
      width: 0;
    }
    100% {
      opacity: 0;
      width: 100%;
    }
  }

</style>
