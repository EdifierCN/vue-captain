<template>
  <div class="zmui-indexlist">
    <search v-model="keyword" v-if="showSearch" :auto-fixed="false"></search>

    <div class="zmui-indexlist-inner">
      <ul class="zmui-indexlist-content" ref="content" :style="{ 'height': currentHeight + 'px', 'padding-right': navWidth + 'px'}">
        <slot></slot>
        <li class="zmui-indexlist-empty-alert" :style="{ 'display': alertStyle }">无匹配数据</li>
      </ul>

      <div class="zmui-indexlist-nav" @touchstart="handleTouchStart" ref="nav">
        <ul class="zmui-indexlist-navlist" :class="{'is-active': moving}">
          <li class="zmui-indexlist-navitem" :class="{'is-active': section.index === currentIndicator }" v-for="section in sections" :key="section.index">{{ section.index }}</li>
        </ul>
      </div>

      <div class="zmui-indexlist-indicator" v-if="showIndicator" v-show="moving">{{ currentIndicator }}</div>
    </div>

  </div>
</template>

<script type="text/babel">
  import { Search } from '../../search'

  export default {
    name: 'index-list',

    components:{
      Search
    },

    props: {
      height: Number,
      offsetBottom: {
        type: Number,
        default: 0
      },
      showIndicator: {
        type: Boolean,
        default: true
      },
      showSearch: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        sections: [],
        navWidth: 0,
        indicatorTime: null,
        moving: false,
        firstSection: null,
        currentIndicator: '',
        currentHeight: this.height,
        navOffsetX: 0,
        keyword: '',
        alertStyle: 'none',
        isTouching: false
      };
    },

    computed:{
      selected(){
        const arr = [];
        this.sections.forEach((item) => {
          const orr = item.list.filter((c) => {
            return c.isCheck === true
          });
          arr.push(...orr)
        });
        return arr;
      }
    },

    watch: {
      sections() {
        this.init();
      },
      height(val) {
        if (val) {
          this.currentHeight = val;
        }
      },
      keyword(val){
        this.search(val)
      }
    },

    methods: {
      init() {
        this.$nextTick(() => {
          this.navWidth = this.$refs.nav.clientWidth;
        });
        let listItems = this.$refs.content.getElementsByTagName('li');
        if (listItems.length > 0) {
          this.firstSection = listItems[0];
        }
      },

      handleTouchStart(e) {
        if (e.target.tagName !== 'LI') {
          return;
        }
        this.navOffsetX = e.changedTouches[0].clientX;
        this.scrollList(e.changedTouches[0].clientY);
        if (this.indicatorTime) {
          clearTimeout(this.indicatorTime);
        }
        this.moving = true;
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleTouchEnd);
      },

      handleTouchMove(e) {
        e.preventDefault();
        this.scrollList(e.changedTouches[0].clientY);
      },

      handleTouchEnd() {
        this.indicatorTime = setTimeout(() => {
          this.moving = false;
          this.currentIndicator = '';
        }, 100);
        window.removeEventListener('touchmove', this.handleTouchMove);
        window.removeEventListener('touchend', this.handleTouchEnd);
      },

      scrollList(y) {
        let currentItem = document.elementFromPoint(this.navOffsetX, y); //传入坐标值，返回当前页面上包含该坐标点的顶层元素
        if (!currentItem || !currentItem.classList.contains('zmui-indexlist-navitem')) {
          return;
        }
        this.currentIndicator = currentItem.innerText;
        let targets = this.sections.filter(section => section.index === currentItem.innerText);
        let targetDOM;
        if (targets.length > 0) {
          targetDOM = targets[0].$el;
          this.$refs.content.scrollTop = targetDOM.getBoundingClientRect().top - this.firstSection.getBoundingClientRect().top;
        }
      },

      search( keyword ){
        keyword = (keyword || '').toLowerCase();

        let searchArr = [];

        this.sections.forEach((item) => {
          let resLength = 0;

          item.list.forEach((cell, index) => {
            let text = (cell.title || '').toLowerCase();

            if(keyword && text.indexOf(keyword) < 0){
              cell.isShow = false
            }else{
              cell.isShow = true;
              searchArr.push(cell);
              resLength++;
            }
          });
          item.$el.style.display = resLength <= 0 ? 'none' : null
        });

        if(searchArr.length > 0 || keyword === ''){
          this.alertStyle = 'none'
        }else {
          this.alertStyle = 'block'
        }
        this.$refs.content.scrollTop = 0;
      }

    },

    mounted() {
      if (!this.currentHeight) {
        this.$nextTick(() => {
          window.scrollTo(0, 0);
          setTimeout(() => {
            requestAnimationFrame(()=>{
              this.currentHeight = document.documentElement.clientHeight - this.$refs.content.getBoundingClientRect().top - this.offsetBottom;
            });
            this.init();
          });
        });
      }

    }
  };
</script>

<style lang="less">

  .zmui-indexlist {
      width: 100%;
      position: relative;
      overflow: hidden;

    &-inner{
      position: relative;
    }

    &-content {
      margin: 0;
      padding: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      background: #FFFFFF;
    }

    &-nav {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      margin: 0;
      background-color: lightgrey;
      border-left: solid 1px #ddd;
      text-align: center;
      height: 100%;
    }

    &-navlist {
      padding: 0;
      margin: 0;
      list-style: none;
      height: 100%;
      display: flex;
      flex-direction: column;
      &.is-active{
        background-color: rgb(200, 200, 200);
        .zmui-indexlist-navitem{
          color: #333333;
          &.is-active{
            color: #3cc51f;
          }
        }
      }
    }

    &-navitem {
      display: flex;
      flex: 1;
      box-sizing: border-box;
      padding: 0 7px;
      font-size: 12px;
      user-select: none;
      -webkit-touch-callout: none;
      color: #aaa;
    }

    &-indicator {
      position: absolute;
      width: 50px;
      size: 50px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 50px;
      background-color: rgba(0, 0, 0, .7);
      border-radius: 50%;
      color: #fff;
      font-size: 22px;
    }

    &-empty-alert {
      padding: 30px 15px;
      text-align: center;
      color: #ccc;
    }

  }

</style>
