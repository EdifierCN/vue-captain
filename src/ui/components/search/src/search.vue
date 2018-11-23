<template>
  <div
    class="zmui-search-box"
    :class="{ 'zmui-search-fixed':isFixed }"
    :style="{ top: isFixed ? top : '', position: fixPosition }">
    <div
      class="zmui-search-bar"
      :class="{'zmui-search-bar_focusing': !isCancel || currentValue}" @touchmove="$event.preventDefault()">
      <slot name="left"></slot>
      <form class="zmui-search-bar__form" @submit.prevent="$emit('on-submit', value)" action=".">

        <label
          :for="`search_input_${uuid}`"
          class="zmui-search-mask"
          @click="touch"
          v-show="!isFixed && autoFixed"></label>

          <div class="zmui-search-bar__box">
            <i class="zmui-icon-search"></i>
            <input
              v-model="currentValue"
              ref="input"
              type="search"
              autocomplete="off"
              class="zmui-search-bar__input"
              :id="`search_input_${uuid}`"
              :placeholder="placeholder"
              :required="required"
              @focus="onFocus"
              @blur="onBlur"
              @compositionstart="onComposition($event, 'start')"
              @compositionend="onComposition($event, 'end')"
              @input="onComposition($event, 'input')"/>
            <a
              href="javascript:"
              class="zmui-icon-clear"
              @click="clear"
              v-show="currentValue"></a>
          </div>

        <transition name="input-slide">
        <label
          :for="`search_input_${uuid}`"
          class="zmui-search-bar__label"
          v-show="!isFocus && !value">
          <i class="zmui-icon-search"></i>
          <span>{{ placeholder || '搜索' }}</span>
        </label>
        </transition>
      </form>
      <a
        href="javascript:"
        class="zmui-search-bar__cancel-btn"
        @click="cancel">{{ cancelText || '取消' }}
      </a>
      <slot name="right"></slot>
    </div>
    <div class="zmui-cells zmui-search_show" v-clock-scroll v-show="isFixed" @touhmove="$event.stopPropagation()">
      <slot></slot>
      <div
        class="zmui-cell zmui-cell_access"
        v-for="item in results"
        @click="handleResultClick(item)">
        <div class="zmui-cell__bd zmui-cell_primary">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import uuidMixin from '../../../mixins/uuid'
  import ClockScroll from '../../../directives/lock-page'

  export default {
    name: 'search',
    mixins: [uuidMixin],
    directives:{
      ClockScroll
    },
    props: {
      required: {
        type: Boolean,
        default: false
      },
      placeholder: String,
      cancelText: String,
      value: {
        type: String,
        default: ''
      },
      results: {
        type: Array,
        default () {
          return []
        }
      },
      autoFixed: {
        type: Boolean,
        default: true
      },
      top: {
        type: String,
        default: '0px'
      },
      position: {
        type: String,
        default: 'fixed'
      },
      autoScrollToTop: Boolean
    },
    created () {
      if (this.value) {
        this.currentValue = this.value
      }
    },
    computed: {
      fixPosition () {
        if (this.isFixed) {
          return this.position === 'absolute' ? 'absolute' : 'fixed'
        }
        return 'static'
      }
    },
    methods: {
      emitEvent () {
        this.$nextTick(() => {
          this.$emit('input', this.currentValue);
          this.$emit('on-change', this.currentValue)
        })
      },
      onComposition ($event, type) {
        if (type === 'start') {
          this.onInput = true
        }
        if (type === 'end') {
          this.onInput = false;
          this.emitEvent()
        }
        if (type === 'input') {
          if (!this.onInput) {
            this.emitEvent()
          }
        }
      },
      clear () {
        this.currentValue = '';
        this.emitEvent();
        this.isFocus = true;
        this.setFocus();
        if (this.autoFixed && !this.isFixed) {
          this.isFixed = true
        }
      },
      cancel () {
        this.isCancel = true;
        this.currentValue = '';
        this.emitEvent();
        this.isFixed = false;
        this.$emit('on-cancel')
      },
      handleResultClick (item) {
        this.$emit('result-click', item); // just for compatibility
        this.$emit('on-result-click', item);
        this.isCancel = true;
        this.isFixed = false
      },
      touch () {
        this.isCancel = false;
        if (this.autoFixed) {
          this.isFixed = true
        }
        this.$emit('on-touch')
      },
      setFocus () {
        this.$refs.input.focus()
      },
      setBlur () {
        this.$refs.input.blur()
      },
      onFocus () {
        this.isFocus = true;
        this.$emit('on-focus');
        this.touch();
      },
      onBlur () {
        this.isFocus = false;
        this.$emit('on-blur')
      }
    },
    data () {
      return {
        onInput: false,
        currentValue: '',
        isCancel: true,
        isFocus: false,
        isFixed: false
      }
    },
    watch: {
      isFixed (val) {
        if (val === true) {
          this.setFocus();
          this.isFocus = true;

          if (this.autoScrollToTop) {
            setTimeout(() => {
              window.scrollTo(0, 0)
            }, 150)
          }
        } else {}
      },
      value (val) {
        this.currentValue = val
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/icon/icon_font';
  @import '../../../styles/widget/cell/global';
  @import '../../../styles/widget/cell/access';
  @import '../../../styles/widget/search/index';

  .zmui-search-fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 1);
    backdrop-filter: blur(5px);
  }
  .zmui-search-box {
    width: 100%;
  }

  .zmui-cells.zmui-search_show {
    margin-top: 0!important;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    width: 100%;
    max-height: 100%;

    .zmui-cell:last-child {
      margin-bottom: 150px;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    &::after {
      display: none;
    }
  }
  .zmui-search-mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 90%;
    height: 100%;
    z-index: 5;
  }

  .input-slide-enter-active{
    transition: width 0.08s;
  }
  .input-slide-leave-active{
    transition: width 0s;
  }
  .input-slide-enter, .input-slide-leave-to{
    width: 20%;
  }
  .input-slide-leave, .input-slide-enter-to{
    width: 80%;
  }
</style>
