<template>
  <div class="zmui-layout" :class="`zmui-layout--${type}`">
    <div class="zmui-layout-hd" v-if="header">
      <slot name="header">

      </slot>
    </div>
    <div class="zmui-layout-bd" :style="bodyStyle">
      <slot name="body">

      </slot>
    </div>

    <transition :name="footerTransition">
      <div class="zmui-layout-ft" v-if="footer">
          <slot name="footer">
          </slot>
      </div>
    </transition>

  </div>
</template>

<script>
  // Q：fixed 布局，由于 fastclick 导致 移动app ios上下滑动时fixed元素不稳定
  // A：暂无解

  // Q：其他布局，由于overflow-scrolling: touch，导致 无法实时获取滚动元素的 scrollTop
  // A：暂无解

  // PS：fixed 布局的好处是，在浏览器中上下滑动时可以隐藏，搜索栏和底栏，可以应用渐变头部

  export default{
    name: 'layout',
    props:{
      type: {
        validate: String,
        default: 'fixed'
      },
      header: {
        type: Boolean,
        default: true
      },
      footer: {
        type: Boolean,
        default: true
      },
      paddingTop: {
        type: Number,
        default: 46
      },
      paddingBottom: {
        type: Number,
        default: 55
      },
      immediately:{
        type: Boolean,
        default: false
      }
    },
    data(){
      return {

      }
    },
    computed: {
      footerTransition(){
        return this.immediately ? 'footer-hidden' : 'footer-slide'
      },
      bodyStyle(){
        return {
          'paddingTop': this.header && this.type !== 'flex' ? this.paddingTop + 'px' : '0px',
          'paddingBottom': this.footer && this.type !== 'flex' ? this.paddingBottom + 'px' : '0px'
        }
      }
    },
    created(){
      const elementList = [].slice.call(document.querySelectorAll('html, body'));
      if(this.type !== 'fixed'){
        elementList.forEach((el) => {
          el.style.height = '100%';
        })
      }
    }
  }
</script>

<style lang="less">
  .zmui-layout{
    overflow-x: hidden;
    >.zmui-layout-hd{
      width: 100%;
    }
    >.zmui-layout-bd{
      box-sizing: border-box;
    }
    >.zmui-layout-ft{
      width: 100%;
      background-color: #f7f7fa;
      opacity: 1;
    }
  }

  .zmui-layout--fixed{
    >.zmui-layout-hd{
      position: fixed;
      z-index: 300;
      left: 0;
      top: 0;
    }
    >.zmui-layout-bd{
      min-height: 100%;
    }
    >.zmui-layout-ft{
      position: fixed;
      z-index: 300;
      left: 0;
      bottom: 0;
    }
  }

  .zmui-layout--flex{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    >.zmui-layout-hd{

    }
    >.zmui-layout-bd{
      flex: 1;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    >.zmui-layout-ft{

    }
  }

  .zmui-layout--absolute{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    >.zmui-layout-hd{
      position: absolute;
      z-index: 300;
      left: 0;
      top: 0;
    }
    >.zmui-layout-bd{
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    >.zmui-layout-ft{
      position: absolute;
      z-index: 300;
      left: 0;
      bottom: 0;
    }
  }


  .footer-hidden-enter,.footer-hidden-leave,.footer-hidden-enter-active,.footer-hidden-leave-active, .footer-hidden-enter-to,.footer-hidden-leave-to{
    display: none;
  }

  .footer-slide-enter-active{
    transition: transform .3s ease;
  }
  .footer-slide-leave-active{
    transition: transform 0s ease;
    opacity: 0;
  }
  .footer-slide-enter, .footer-slide-leave-to{
    transform: translate(0, 100%);
  }
  .footer-slide-enter-to, .footer-slide-leave{
    transform: translate(0, 0);
  }
</style>
