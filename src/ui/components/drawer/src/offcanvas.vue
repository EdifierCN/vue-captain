<template>
  <div ref="offCanvasWrapper"
       class="zmui-off-canvas-wrap zmui-draggable"
       :class="{'zmui-slide-in': model === 'menu-move', 'zmui-scalable': model === 'main-move-scalable', 'zmui-active': active}"
       @touchstart="handleEvent"
       @touchmove="handleEvent"
       @touchend="handleEvent">

    <!--侧滑菜单部分-->
    <aside ref="offCanvas" class="zmui-off-canvas-left" :class="{'zmui-transitioning': isTransition}" v-if="model !== 'all-move'">
        <slot name="drawer">
          侧边栏
        </slot>
    </aside>

    <!--主界面部分-->
    <div ref="scroller" class="zmui-inner-wrap" :class="{'zmui-transitioning': isTransition}">

      <!--侧滑菜单部分-->
      <aside ref="offCanvas" class="zmui-off-canvas-left" :class="{'zmui-transitioning': isTransition}" v-if="model === 'all-move'">
        <slot name="drawer">
          侧边栏
        </slot>
      </aside>

      <transition name="menu">
      <div class="zmui-menu-wrap" v-if="hasMenuSlot" v-show="menuOpen" :style="{'top': menuTop + 'px'}">
          <div class="zmui-menu" :class="menuOpen ? 'bounce-in-down' : 'bounce-out-up'">
            <slot name="menu">
              下沉菜单
            </slot>
          </div>
      </div>
      </transition>

      <div class="zmui-off-canvas-content" :style="{'backgroundColor': contentBg}">
        <!-- 包裹一层，遮盖侧边栏 -->
        <div class="zmui-off-canvas-inner-content">
          <slot>
            主界面
          </slot>
        </div>
      </div>

      <!-- off-canvas backdrop -->
      <div ref="backdrop" class="zmui-off-canvas-backdrop" @click="close"></div>
    </div>

  </div>
</template>

<script>
  import { oneOf } from '../../../libs/assist'

  export default{
    props:{
      contentBg:{
        type: String,
        default: '#FFFFFF'
      },
      value: Boolean,
      placement:{
        validator(val){
          return oneOf(val, ['left', 'right'])
        },
        default: 'left'
      },
      model: {
        validator(val){
          return oneOf(val, ['main-move', 'menu-move', 'all-move', 'main-move-scalable'])
        },
        default: 'main-move'
      },
      options:{
        type: Object
      },
      menuTop: {
        type: Number,
        default: 45
      }
    },
    data(){
      return {
        busying: false,
        menuOpen: false,
        hasMenuSlot: false,
        isTransition: false,
        session: {},
        active: false,
      }
    },
    created(){
      this.hasMenuSlot = !!this.$slots.menu;
    },
    computed: {
      _options(){
        return Object.assign({
          dragThresholdX: 10,
          scale: 0.8,
          opacity: 0.1,
          preventDefaultException: {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|VIDEO)$/
          }
        }, this.options || {})
      }
    },
    mounted(){
      this.init();
    },
    watch:{
      value(val){
        this.isTransition = true;
        this.active = val;
      },
      active(val){
        if(val){
          this.openPercentage(100)
        }else{
          this.openPercentage(0)
        }
        this.$emit('input', val)
      }
    },
    methods:{
      init(){
        this.scroller = this.$refs.scroller;
        this.offCanvas = this.$refs.offCanvas;
        this.refresh();
        this.initEvent();
      },
      _preventDefaultException(el, exceptions){
        for (let i in exceptions) {
          if (exceptions[i].test(el[i])) {
            return true;
          }
        }
        return false;
      },
      refresh: function() {
        this.offCanvasWidth = this.offCanvas.offsetWidth;
        this._options.dragThresholdX = this._options.dragThresholdX || 10;
        this.visible = false;
        this.startX = null;
        this.lastX = null;
        this.offsetX = null;
        this.lastTranslateX = null;
      },
      handleEvent: function(e) {
        switch (e.type) {
          case 'webkitTransitionEnd':
            if (e.target === this.scroller) {
              this._dispatchEvent();
            }
            break;
          case 'touchstart':
            e.now = Date.now();
            this.session.start = e;
            e.target && !this._preventDefaultException(e.target, this._options.preventDefaultException);
            break;
          case 'touchmove':
            const detail = this.wrapEvent(e);
            if (!this.startX) {
              this.startX = detail.center.x;
              this.lastX = this.startX;
            } else {
              this.lastX = detail.center.x;
            }
            if (!this.isDragging && ( Math.abs(this.lastX - this.startX) > this._options.dragThresholdX ) && (detail.direction === 'left' || (detail.direction === 'right'))) {
              if(this.model === 'menu-move'){
                this.scroller = this.$refs.scroller;
                if(!this.active){
                  if(detail.direction !== 'left' && detail.direction !== 'right'){
                    this.scroller = null;
                  }
                }
              }
              if (this.scroller) {
                this.startX = this.lastX;
                this.isDragging = true;
                this.isTransition = false;
                this.offsetX = this.getTranslateX();
              }
            }
            if (this.isDragging) {
              this.updateTranslate(this.offsetX + (this.lastX - this.startX));
              e.preventDefault();
              e.stopPropagation();
            }
            break;
          case 'touchend':
            e.now = Date.now();
            this.session.end = e;
            if (this.isDragging) {
              const detail = this.wrapEvent(e);
              const direction = detail.direction;
              this.isDragging = false;
              this.isTransition = true;
              let ratio = 0;
              let x = this.getTranslateX();
              let swipe = false;

              if((this.session.end.now - this.session.start.now) < 300 && Math.abs(this.session.end.changedTouches[0].pageX - this.session.start.changedTouches[0].pageX) > 18){
                swipe = true
              }
              if (this.model !== 'menu-move') {
                ratio = (this.offCanvasWidth && (x / this.offCanvasWidth)) || 0;
                if (ratio === 0) {
                  this.openPercentage(0);
                  this._dispatchEvent();
                  return;
                }
                if (direction === 'right' && ratio >= 0 && (ratio >= 0.5 || swipe)) { //右滑打开
                  this.openPercentage(100);
                } else if (direction === 'right' && ratio < 0 && (ratio > -0.5 || swipe)) { //右滑关闭
                  this.openPercentage(0);
                } else if (direction === 'right' && ratio > 0 && ratio < 0.5) { //右滑还原关闭
                  this.openPercentage(0);
                } else if (direction === 'right' && ratio < 0.5) { //右滑还原打开
                  this.openPercentage(-100);
                } else if (direction === 'left' && ratio <= 0 && (ratio <= -0.5 || swipe)) { //左滑打开
                  this.openPercentage(-100);
                } else if (direction === 'left' && ratio > 0 && (ratio <= 0.5 || swipe)) { //左滑关闭
                  this.openPercentage(0);
                } else if (direction === 'left' && ratio < 0 && ratio >= -0.5) { //左滑还原关闭
                  this.openPercentage(0);
                } else if (direction === 'left' && ratio > 0.5) { //左滑还原打开
                  this.openPercentage(100);
                } else { //默认关闭
                  this.openPercentage(0);
                }
                if (ratio === 1 || ratio === -1) { //此处不触发webkitTransitionEnd,所以手动dispatch
                  this._dispatchEvent();
                }
              } else {
                ratio = (this.offCanvasWidth && (x / this.offCanvasWidth)) || 0;
                if (direction === 'right' && ratio <= 0 && (ratio >= -0.5 || swipe)) { //右滑打开
                  this.openPercentage(100);
                } else if (direction === 'right' && ratio > 0 && (ratio >= 0.5 || swipe)) { //右滑关闭
                  this.openPercentage(0);
                } else if (direction === 'right' && ratio <= -0.5) { //右滑还原关闭
                  this.openPercentage(0);
                } else if (direction === 'right' && ratio > 0 && ratio <= 0.5) { //右滑还原打开
                  this.openPercentage(-100);
                } else if (direction === 'left' && ratio >= 0 && (ratio <= 0.5 || swipe)) { //左滑打开
                  this.openPercentage(-100);
                } else if (direction === 'left' && ratio < 0 && (ratio <= -0.5 || swipe)) { //左滑关闭
                  this.openPercentage(0);
                } else if (direction === 'left' && ratio >= 0.5) { //左滑还原关闭
                  this.openPercentage(0);
                } else if (direction === 'left' && ratio >= -0.5 && ratio < 0) { //左滑还原打开
                  this.openPercentage(100);
                } else {
                  this.openPercentage(0);
                }
                if (ratio === 1 || ratio === -1 || ratio === 0) {
                  this._dispatchEvent();
                  return;
                }

              }
            }
            break;
        }
      },
      _dispatchEvent: function() {
        if (this.active) {
          this.$emit('on-shown');
        } else {
          this.$emit('on-hidden');
        }
      },
      initEvent: function() {
        this.$el.addEventListener('webkitTransitionEnd', this.handleEvent);
      },
      openPercentage: function(percentage) {
        let p = percentage / 100;
        if (this.model !== 'menu-move') {
          if (this.placement === 'left' && percentage >= 0) {
            this.updateTranslate(this.offCanvasWidth * p);
          } else if (this.placement === 'right' && percentage <= 0) {
            this.updateTranslate(this.offCanvasWidth * p);
          }
          this.active = p !== 0;
        } else {
          if (this.placement === 'left' && percentage >= 0) {
            p = p === 0 ? -1 : 0;
            this.updateTranslate(this.offCanvasWidth * p);
          } else if (this.placement === 'right' && percentage <= 0) {
            p = p === 0 ? 1 : 0;
            this.updateTranslate(this.offCanvasWidth * p);
          }
          this.active = percentage !== 0;
        }
      },
      updateTranslate: function(x) {
        if (x !== this.lastTranslateX) {
          if (this.model !== 'menu-move') {
            if ((this.placement !== 'left' && x > 0) || (this.placement !== 'right' && x < 0)) {
              this.setTranslateX(0);
              return;
            }
            if (this.leftShowing && x > this.offCanvasWidth) {
              this.setTranslateX(this.offCanvasWidth);
              return;
            }
            if (this.rightShowing && x < -this.offCanvasWidth) {
              this.setTranslateX(-this.offCanvasWidth);
              return;
            }
            this.setTranslateX(x);
            if (x >= 0) {
              this.leftShowing = true;
              this.rightShowing = false;
              if (x > 0) {
                if (this.placement === 'left') {
                  this.offCanvas.style.zIndex = 0;
                } else {
                  this.offCanvas.style.zIndex = -1;
                }
              }
            } else {
              this.rightShowing = true;
              this.leftShowing = false;
              if (this.placement === 'right') {
                this.offCanvas.style.zIndex = 0;
              } else {
                this.offCanvas.style.zIndex = -1;
              }
            }
          } else {
            if (this.placement === 'right') {
              if (x < 0) {
                this.setTranslateX(0);
                return;
              }
              if (x > this.offCanvasWidth) {
                this.setTranslateX(this.offCanvasWidth);
                return;
              }
            } else {
              if (x > 0) {
                this.setTranslateX(0);
                return;
              }
              if (x < -this.offCanvasWidth) {
                this.setTranslateX(-this.offCanvasWidth);
                return;
              }
            }
            this.setTranslateX(x);
          }
          this.lastTranslateX = x;
        }
      },
      setTranslateX(x){
        const handler = (x) => {
          if (this.model === 'main-move-scalable') {
            let percent = Math.abs(x) / this.offCanvasWidth;
            let zoomOutScale = 1 - (1 - this._options.scale) * percent;
            let zoomInScale = this._options.scale + (1 - this._options.scale) * percent;
            let zoomOutOpacity = 1 - (1 - this._options.opacity) * percent;
            let zoomInOpacity = this._options.opacity + (1 - this._options.opacity) * percent;
            if (this.placement === 'left') {
              this.offCanvas.style.webkitTransformOrigin = '-100%';
              this.scroller.style.webkitTransformOrigin = 'left';
            } else {
              this.offCanvas.style.webkitTransformOrigin = '200%';
              this.scroller.style.webkitTransformOrigin = 'right';
            }
            this.offCanvas.style.opacity = zoomInOpacity;
            this.offCanvas.style.webkitTransform = 'translate3d(0,0,0) scale(' + zoomInScale + ')';
            this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0) scale(' + zoomOutScale + ')';
          } else {
            if (this.model === 'menu-move') {
              this.offCanvas.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            } else {
              this.scroller.style.webkitTransform = 'translate3d(' + x + 'px,0,0)';
            }
          }
        };

        this.animationFrame(handler)(x)
      },
      getTranslateX() {
        if (this.offCanvas) {
          const scroller = this.model === 'menu-move' ? this.offCanvas : this.scroller;
          let result = this.parseTranslateMatrix(this.getStyles(scroller, 'webkitTransform'));
          return (result && result.x) || 0;
        }
        return 0;
      },
      isShown() {
        const direction = this.placement;
        let shown = false;
        if (this.model !== 'menu-move') {
          let x = this.getTranslateX();
          if (direction === 'right') {
            shown = this.active && x < 0;
          } else if (direction === 'left') {
            shown = this.active && x > 0;
          } else {
            shown = this.active && x !== 0;
          }
        } else {
          if(direction === 'left'){
            shown = this.active && this.placement === 'left';
          } else if (direction === 'right'){
            shown = this.active && this.placement === 'right';
          } else{
            shown = this.active && (this.placement === 'left' || this.placement === 'right');
          }
        }
        return shown;
      },
      close() {
        this.offCanvasWidth = this.offCanvas.offsetWidth;
        if (this.scroller) {
          this.isTransition = true;
          this.openPercentage(0);
        }
      },
      show() {
        if (this.isShown()) {
          return false;
        }
        if (!direction) {
          direction = this.placement;
        }
        if (this.scroller) {
          this.isTransition = true;
          this.openPercentage(direction === 'left' ? 100 : -100);
        }
        return true;
      },
      toggle() {
        direction = this.placement;
        this.refresh();
        if (!this.show()) {
          this.close();
        }
      },
      toggleMenu(){
        this.menuOpen = !this.menuOpen;
      },
      animationFrame(cb){
        let args, isQueued, context;
        return function() {
          args = arguments;
          context = this;
          if (!isQueued) {
            isQueued = true;
            requestAnimationFrame(function() {
              cb.apply(context, args);
              isQueued = false;
            });
          }
        };
      },
      parseTranslateMatrix(translateString, position){
        const translateMatrixRE = /matrix(3d)?\((.+?)\)/;
        let matrix = translateString.match(translateMatrixRE);
        let is3D = matrix && matrix[1];
        if (matrix) {
          matrix = matrix[2].split(",");
          if (is3D === "3d")
            matrix = matrix.slice(12, 15);
          else {
            matrix.push(0);
            matrix = matrix.slice(4, 7);
          }
        } else {
          matrix = [0, 0, 0];
        }
        let result = {
          x: parseFloat(matrix[0]),
          y: parseFloat(matrix[1]),
          z: parseFloat(matrix[2])
        };
        if (position && result.hasOwnProperty(position)) {
          return result[position];
        }
        return result;
      },
      getStyles(element, property){
        const styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
        if (property) {
          return styles.getPropertyValue(property) || styles[property];
        }
        return styles;
      },
      wrapEvent(e){
        let distX = this.session.start.touches[0].pageX - e.changedTouches[0].pageX;
        let distY = this.session.start.touches[0].pageY - e.changedTouches[0].pageY;
        e.direction = this.getDirection(distX, distY);
        e.center = this.getMultiCenter(e.changedTouches);
        return e
      },
      getDirection(x, y){
        if(x === y) {
          return '';
        }
        if(Math.abs(x) >= Math.abs(y)) {
          return x > 0 ? 'left' : 'right';
        }
        return y > 0 ? 'up' : 'down';
      },
      getMultiCenter(touches){
        let touchesLength = touches.length;
        if(touchesLength === 1) {
          return {
            x: Math.round(touches[0].pageX),
            y: Math.round(touches[0].pageY)
          };
        }

        let x = 0;
        let y = 0;
        let i = 0;
        while(i < touchesLength) {
          x += touches[i].pageX;
          y += touches[i].pageY;
          i++;
        }
        return {
          x: Math.round(x / touchesLength),
          y: Math.round(y / touchesLength)
        };
      }
    }
  }
</script>

<style lang="scss">

  @mixin transform($transform...) {
    -webkit-transform: $transform;
    transform: $transform;
  }

  .zmui-off-canvas-wrap{
    .zmui-bar{//fix android
      position: absolute!important;
      @include transform(translate3d(0, 0, 0));//fix ios(offcanvas scalable的时候,bar会消失)
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }

  .zmui-off-canvas-wrap{
    position: relative;
    width:100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    .zmui-inner-wrap{
      position: relative;
      width: 100%;
      height:100%;
      z-index: 1;
      &.zmui-transitioning{
        -webkit-transition: -webkit-transform 350ms ;
        transition: transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      .zmui-off-canvas-left {
        @include transform(translate3d(-100%, 0, 0));
      }
      .zmui-off-canvas-right{
        @include transform(translate3d(100%, 0, 0));
      }
    }
    &.zmui-active{
      overflow:hidden;
      height:100%;
      .zmui-off-canvas-backdrop{
        -webkit-backface-visibility: hidden;
        transition: background 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
        box-shadow: -4px 0 4px rgba(0, 0, 0, 0.5), 4px 0 4px rgba(0, 0, 0, 0.5);
        display: block;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 998;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    &.zmui-slide-in{
      .zmui-off-canvas-right {
        -webkit-transform: translate3d(100%, 0px, 0px);
        z-index: 10000!important;
      }
      .zmui-off-canvas-left {
        -webkit-transform: translate3d(-100%, 0px, 0px);
        z-index: 10000!important;
      }
    }
  }

  .zmui-off-canvas-content{
    height:100%;
    overflow: hidden;
  }

  .zmui-off-canvas-inner-content{
    height:100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .zmui-off-canvas-left, .zmui-off-canvas-right {
    -webkit-backface-visibility: hidden;
    width: 70%;
    height:100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    top: 0;
    bottom: 0;
    position: absolute;
    background: #333;
    z-index: -1;
    &.zmui-transitioning{
      -webkit-transition: -webkit-transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
      transition: transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
    }
  }
  .zmui-off-canvas-left {
    left: 0;
  }
  .zmui-off-canvas-right {
    right: 0;
  }

  //scalable
  .zmui-off-canvas-wrap:not(.zmui-slide-in).zmui-scalable {
    background-color: #333;
    >.zmui-off-canvas-left,>.zmui-off-canvas-right{
      width: 80%;
      @include transform(scale(0.8));
      opacity: 0.1;
      &.zmui-transitioning{
        -webkit-transition: -webkit-transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: transform 350ms cubic-bezier(0.165, 0.84, 0.44, 1), opacity 350ms cubic-bezier(0.165, 0.84, 0.44, 1);
      }
    }
    >.zmui-off-canvas-left{
      -webkit-transform-origin: -100%;
      transform-origin: -100%;
    }
    >.zmui-off-canvas-right{
      -webkit-transform-origin: 200%;
      transform-origin: 200%;
    }
    &.zmui-active{
      >.zmui-inner-wrap{
        @include transform(scale(0.8));
      }
      >.zmui-off-canvas-left,>.zmui-off-canvas-right{
        @include transform(scale(1));
        opacity: 1;
      }
    }
  }

  .zmui-menu-wrap{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: #333;
    width: 100%;
    z-index: 999;
  }

  .zmui-menu-wrap, .zmui-menu{
     -webkit-animation-duration: 0.5s;
     animation-duration: 0.5s;
     -webkit-animation-fill-mode: both;
     animation-fill-mode: both;
  }

  .menu-enter-active{
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
  }
  .menu-leave-active{
    -webkit-animation-name: fadeOutUp;
    animation-name: fadeOutUp;
  }

  .bounce-in-down {
    -webkit-animation-name: bounceInDown;
    animation-name: bounceInDown;
  }
  .bounce-out-up {
    -webkit-animation-name: bounceOutUp;
    animation-name: bounceOutUp;
  }

  // menu wrapper transition
  @-webkit-keyframes fadeInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes fadeInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @-webkit-keyframes fadeOutUp {
    20% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes fadeOutUp {
    20% {
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0px, 0);
      transform: translate3d(0, 0px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }


  // menu transition
  @-webkit-keyframes bounceInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes bounceInDown {
    0%, 60%, 75%, 90%, 100% {
      -webkit-transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
      transition-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    100% {
      -webkit-transform: none;
      transform: none;
    }
  }

  @-webkit-keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }


</style>
