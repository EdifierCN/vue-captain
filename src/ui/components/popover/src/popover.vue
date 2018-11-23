<template>
  <div class="zmui-popover-container">
    <transition :name="maskTransition">
      <div class="zmui-mask" @click="toggle" v-show="mutableShow" :style="maskStyle" v-if="overlay"></div>
    </transition>

    <transition :name="popoverTransition">
      <div :class="'zmui-popover ' + computedPosition" :style="{ top: top+'px', left: left+'px'}" v-show="mutableShow" ref="popover" @click="close">
        <div class="zmui-popover-angle" :style="{ transform : 'translate3d(' + angleOffset+'px, 0, 0) rotate(45deg)' }"></div>
        <div class="zmui-popover-inner">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { isParent } from '../../../utils/assist'

  // popover's offsetparent should be the same to trigger's
  // issue ：locate isn't works well

  const AUTO = 'zmui-popover_auto';
  const TOP = 'zmui-popover_top';
  const BOTTOM = 'zmui-popover_bottom';

  export default {
    name: 'popover',
    props: {
      trigger: {
        type: String,
        required: true
      },
      position: {
        type: String,
        default: AUTO
      },
      show: {
        type: Boolean,
        default: false
      },
      overlay: {
        type: Boolean,
        default: false
      },
      width: {
        type: Number,
        default: 92
      },
      maskZIndex: [String, Number],
      maskTransition: {
        type: String,
        default: 'zmui-mask'
      },
      popoverTransitionClass: String,
    },

    data () {
      return {
        mutableShow: this.show,
        top: 0,
        left: 0,
        angleOffset: 0,
        computedPosition: TOP,
        triggerElement: undefined,
        parentElement: undefined
      }
    },

    computed: {
      maskStyle () {
        if (typeof this.maskZIndex !== 'undefined') {
          return {
            zIndex: this.maskZIndex
          }
        }
      },
      popoverTransition(){
        let styles = '';
        if(this.computedPosition === BOTTOM){
          styles = 'popover-bottom';
        }else if(this.computedPosition === TOP){
          styles = 'popover-top';
        }else{
          styles = 'popover-fade';
        }
        return (typeof this.popoverTransitionClass === 'undefined' ? styles : this.popoverTransitionClass)
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.bindEvt(true);
      })
    },

    methods: {
      bindEvt( flag = true){
        const $vm = this;
        const action = flag ? 'addEventListener' : 'removeEventListener';
        this.triggerElement = [].slice.call(document.querySelectorAll(this.trigger));

        const documentClickHandler = function(){
          const e = arguments[0];
          const isTarget = $vm.triggerElement.some((d) => {
            return isParent(e.target, d)
          });
          if (!isParent(e.target, $vm.$refs.popover) && !isTarget) {
            $vm.close();
          }
        };

        this.triggerElement.forEach((item) => {
          const itemP = item.offsetParent;
          itemP[action]('scroll', this.locate, false);
          item[action]('click', this.toggle, false);
          document[action]('click', documentClickHandler, false);
        })
      },

      open(){
        this.locate();
        this.mutableShow = true;
        this.$emit('on-open');
      },
      close(){
        this.mutableShow = false;
        this.$emit('on-open');
      },
      toggle () {
        this.target = arguments[0].target;
        if(this.mutableShow){
          if(this.beforeTarget && this.beforeTarget === this.target){
            this.close();
          }else{
            this.beforeTarget = this.target;
            this.locate();
          }

        }else{
          this.beforeTarget = this.target;
          this.open();
        }
      },

      locate () {
        const el = this.$refs.popover;
        const t = this.target;
        const p = t.offsetParent;
        const top = t.getBoundingClientRect().top - p.scrollTop;
        const tsize = t.getBoundingClientRect();
        const psize = p.getBoundingClientRect();

        const elClone = el.cloneNode(true);
        elClone.style.display = 'block';
        elClone.style.position = 'absolute';
        elClone.style.left = '-10000px';
        el.parentNode.appendChild(elClone);
        const elsize = elClone.getBoundingClientRect();
        elClone.parentNode.removeChild(elClone);

        if (this.position !== AUTO) {
          this.computedPosition = this.position
        } else if (top > psize.height / 2) {
          this.computedPosition = TOP
        } else {
          this.computedPosition = BOTTOM
        }

        this.left = t.offsetLeft - elsize.width / 2 + tsize.width / 2;

        if (this.left < 0) {
          const left = 4;
          this.angleOffset = this.left - left;
          this.left = left
        } else if (this.left > psize.width - elsize.width) {
          const left = psize.width - elsize.width - 4;
          this.angleOffset = this.left - left;
          this.left = left
        }

        if (this.computedPosition === TOP) {
          this.top = t.offsetTop - elsize.height - 10;
        } else {
          this.top = t.offsetTop + tsize.height + 10
        }
      }
    },

    destroyed(){
      this.bindEvt(false);
    }
  }
</script>

<style lang="less">
  @import '../../../styles/utils/mask';
  @import '../../../styles/widget/popover/index';
</style>
