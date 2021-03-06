<template>
  <div>
    <div class="zmui-mask" v-model="show" @click.native="close"></div>
    <div class="zmui-keyboard" :class="show ? 'zmui-keyboard-active' : ''">
      <div class="zmui-keyboard-head">
        <strong>{{inputText}}</strong>
      </div>
      <div class="zmui-keyboard-error">{{error}}</div>
      <ul class="zmui-keyboard-password">
        <li v-for="n, k in 6" :key="k"><i v-show="nums.length >= n"></i></li>
      </ul>
      <div class="zmui-keyboard-content">
        <div class="zmui-keyboard-title">{{title}}</div>
        <ul class="zmui-keyboard-numbers">
          <li v-for="i, k in 4" :key="k">
            <template v-if="triggerClose">
              <a href="javascript:;" v-if="i == 4" @click.stop="close">{{cancelText}}</a>
            </template>
            <template v-else>
              <a href="javascript:;" v-if="i == 4"></a>
            </template>
            <template v-if="isMobile">
              <a href="javascript:;" v-for="n, k in numsArr.slice((i - 1) * 3, i * 3)" @touchstart.stop="numclick(n)" :key="k">{{n}}</a>
            </template>
            <template v-else>
              <a href="javascript:;" v-for="n, k in numsArr.slice((i - 1) * 3, i * 3)" @click.stop="numclick(n)" :key="k">{{n}}</a>
            </template>
            <a href="javascript:;" v-if="i == 4" @click.stop="backspace"></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import {isIOS, pageScroll} from '../../../utils/assist';

  export default {
    name: 'keyboard',
    data() {
      return {
        nums: '',
        show: this.value,
        error: '',
        numsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      }
    },
    props: {
      inputDone: {
        type: Function
      },
      callback: {
        type: Function
      },
      disorder: {
        type: Boolean,
        default: false
      },
      value: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'zmuiUI安全键盘'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      inputText: {
        type: String,
        default: '输入数字密码'
      },
      triggerClose: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      value(val) {
        if (isIOS) {
          val ? pageScroll.lock() : pageScroll.unlock();
        }

        this.nums = '';
        this.error = '';
        this.show = val;

        if (this.show && this.disorder) {
          this.numsArr = this.upsetOrder(this.numsArr);
        }
      },
      nums(val) {
        if (val.length >= 6) {
          this.callback && this.callback(val);
        }
      }
    },
    methods: {
      init() {
        this.$on('zmuiui.keyboard.error', (error) => {
          this.setError(error);
        });

        this.$on('zmuiui.keyboard.close', this.close);
      },
      numclick(num) {
        this.error = '';
        if (this.nums.length >= 6)return;
        this.nums += num;
      },
      backspace() {
        const nums = this.nums;

        if (nums) {
          this.nums = nums.substr(0, nums.length - 1);
        }
      },
      upsetOrder(arr) {
        const floor = Math.floor;
        const random = Math.random;
        const len = arr.length;

        let i, j, temp, n = floor(len / 2) + 1;

        while (n--) {
          i = floor(random() * len);
          j = floor(random() * len);
          if (i !== j) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
        return arr;
      },
      close() {
        if(!this.triggerClose) return;
        this.$emit('input', false);
      },
      setError(error) {
        this.error = error;
        this.nums = '';
      }
    },
    created() {
      const ua = window.navigator && window.navigator.userAgent || '';

      this.isMobile = !!ua.match(/AppleWebKit.*Mobile.*/) || 'ontouchstart' in document.documentElement;

      this.$nextTick(this.init);
    },
    destroyed() {
      this.close();
      pageScroll.unlock();
    }
  }
</script>

<style lang="less">
  @import "../../../styles/widget/keyboard/index.less";
</style>
