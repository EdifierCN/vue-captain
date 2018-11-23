<template>
  <div class="zmui-navbar" :class="{'zmui-navbar-transparent': transparent}" :style="styles">
    <div class="zmui-navbar-left">
      <slot name="overwrite-left">
        <transition :name="transition">
          <a class="zmui-navbar-back" @click.preventDefault v-show="_leftOptions.showBack" @click="onClickBack">{{ typeof _leftOptions.backText === 'undefined' ? '返回' : _leftOptions.backText}}</a>
        </transition>
        <transition :name="transition">
          <div class="left-arrow" @click="onClickBack" v-show="_leftOptions.showBack"></div>
        </transition>
      </slot>
      <slot name="left"></slot>
    </div>
    <h1 class="zmui-navbar-title" @click="$emit('on-click-title')" v-if="!shouldOverWriteTitle">
      <slot>
        <transition :name="transition">
          <span v-show="newTitle">{{newTitle}}</span>
        </transition>
      </slot>
    </h1>
    <div class="zmui-navbar-title-area" v-if="shouldOverWriteTitle">
      <slot name="overwrite-title"></slot>
    </div>
    <div class="zmui-navbar-right">
      <a class="zmui-navbar-more" @click.preventDefault @click="$emit('on-click-more')" v-if="rightOptions.showMore"></a>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  import objectAssign from 'object-assign'

  const EVENT_MOVE = 'ontouchstart' in window ? 'touchmove' : 'mousemove';

  export default {
    name: 'navbar',
    props: {
      leftOptions: Object,
      title: String,
      transition: String,
      rightOptions: {
        type: Object,
        default () {
          return {
            showMore: false
          }
        }
      },
      transparent: {
        type: Boolean,
        default: false
      },
      top: {
        type: Number,
        default: 0
      }, //距离顶部高度(到达该高度即触发)
      offset: {
        type: Number,
        default: 150
      }, //滚动透明距离
      duration: {
        type: Number,
        default: 16
      }, //过渡时间
      scrollBy: {
        type: String,
        default: 'window'
      }//监听滚动距离容器
    },
    beforeMount(){
      if (this.$slots['overwrite-title']) {
        this.shouldOverWriteTitle = true
      }
      if (this.scrollBy === 'window') {
        this.isNativeScroll = true;
        this.scrollByElem = window;
      }else{
        this.scrollByElem = document.querySelector(this.scrollBy);
      }
    },
    mounted(){
      this.transparent && this.initTransparent();
    },
    computed: {
      _leftOptions () {
        return objectAssign({
          showBack: true,
          preventGoBack: false
        }, this.leftOptions || {})
      }
    },
    methods: {
      onClickBack () {
        if (this._leftOptions.preventGoBack) {
          this.$emit('on-click-back')
        } else {
          this.$router ? this.$router.back() : window.history.back()
        }
      },
      initTransparent(){
        this._bgColor = this.$el.style.backgroundColor;
        let color = this.getColor(this.getStyles(this.$el, 'backgroundColor'));
        if (color.length) {
          this._R = color[0];
          this._G = color[1];
          this._B = color[2];
          this._A = parseFloat(color[3]);
          this.lastOpacity = this._A;
          this.bindScrollEvent();
        } else {
          throw new Error("元素背景颜色必须为RGBA");
        }
      },
      bindScrollEvent(){
        this.scrollByElem.addEventListener('scroll', this.handleScroll);
        if (this.isNativeScroll) { //原生scroll
          this.scrollByElem.addEventListener( EVENT_MOVE, this.handleScroll);
        }
      },
      handleScroll(e){
        let y = window.scrollY;
        if (!this.isNativeScroll && e) {
          y = -e.pageY;
        }
        let opacity = (y - this.top) / this.offset + this._A;
        opacity = Math.min(Math.max(this._A, opacity), 1);
        this.styles = {
          backgroundColor: 'rgba(' + this._R + ',' + this._G + ',' + this._B + ',' + opacity + ')'
        };
        this.isActive = opacity > this._A;

        if (this.lastOpacity !== opacity) {
          this.lastOpacity = opacity;
        }
      },
      destroyTransparent(){
        this.scrollByElem.removeEventListener('scroll', this.handleScroll);
        this.scrollByElem.removeEventListener(EVENT_MOVE, this.handleScroll);
        this.$el.style.backgroundColor = this._bgColor;
      },
      getColor(colorStr){
        const rgbaRegex = /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/;
        let matches = colorStr.match(rgbaRegex);
        if (matches && matches.length === 5) {
          return [
            matches[1],
            matches[2],
            matches[3],
            matches[4]
          ];
        }
        return [];
      },
      getStyles(element, property){
        const styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
        if (property) {
          return styles.getPropertyValue(property) || styles[property];
        }
        return styles;
      }
    },
    data () {
      return {
        shouldOverWriteTitle: false,
        isNativeScroll: false,
        isActive: false,
        styles: {},
        newTitle: this.title
      }
    },
    watch:{
      title(newVal){
        this.newTitle = '';
        this.$nextTick(() => {
          this.newTitle = newVal
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../../styles/widget/navbar/index";

  .zmui-navbar-transparent{
    background-color: rgba(247, 247, 247, 0);
    -webkit-box-shadow: none;
    box-shadow: none;
  }

</style>
