<template>
    <div class="zmui-scrolltab">
        <div class="zmui-scrolltab-nav" ref="navbox">
            <a href="javascript:;"
               class="zmui-scrolltab-item"
               v-for="item, key in navList"
               :key="key"
               :ref="`tabitem_${key}`"
               :class="activeIndex === key ? 'zmui-scrolltab-active' : ''"
               @click="handleMove(key)">
                <div class="zmui-scrolltab-icon"><i :class="item.icon"></i></div>
                <div class="zmui-scrolltab-title">{{item.label}}</div>
            </a>
        </div>
        <div class="zmui-scrolltab-content" ref="scrollView">
          <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
  import { oneOf } from '../../../libs/assist'

  // scrollTop 不支持小数
  // currentIndexTab.scrollIntoView();  // 元素进入视口，params：Boolean

    export default {
        name: 'scrolltab',
        data() {
            return {
                scrolling: false,
                navList: [],
                activeIndex: this.index,
                timer: null,
                navtop: 0,
                isReady: false
            }
        },
        props: {
            nav: Array,
            type:{
              validator(val){
                return oneOf(val, ['single', 'multi'])
              },
              default: 'multi'
            } ,
            index: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                },
                default: 0
            },
          callback: {
            type: Function
          }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;
                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;
                this.nav && (this.navList = [...this.nav]);
                this.bindEvent();
            },
            addItem(panel) {
              !this.nav && this.navList.push(panel);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'scrolltab-panel');
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            setDefault() {
                this.getPanels().every((panel, index) => {
                    if (this.activeIndex === index) {
                        this.handleMove(index);
                        return false;
                    }
                    return true;
                });
            },
            handleMove(index) {
              if(index === this.activeIndex){
                return
              }
              this.activeIndex = index;
              this.$emit('on-item-click', index);
              this.scrollContent(index);
            },
            scrollTab(index, animate = true){     // 保证当前选项卡始终居中
              if(!this.isReady){
                return
              }
              const nav = this.$refs.navbox;
              const currentTab = nav.children[index || 0];
              const scrollOffset = currentTab.offsetTop - nav.offsetHeight / 2 + currentTab.offsetHeight / 2;
              this.scrollTop(nav.scrollTop, scrollOffset, animate, () => {
                this.callback && this.callback(index);
              });
            },
            scrollTop(from, to, animate, callback) {
              const difference = Math.abs(from - to);
              const step = animate ? Math.ceil(difference / 600 * 50) : difference;
              const self = this;
              const nav = self.$refs.navbox;

              function scroll(start, end, step) {
                if (start === end) {
                  callback && callback();
                  return;
                }

                let d = (start + step > end) ? end : start + step;
                if (start > end) {
                  d = (start - step < end) ? end : start - step;
                }
                nav.scrollTop = d;
                window.requestAnimationFrame(() => scroll(d, end, step));
              }

              scroll(from, to, step);
            },
            scrollContent(index) {
                if (this.scrolling || !this.isReady) return;
                this.scrollView.scrollTop = this.getPanels()[ !this.nav ? index : 0].$el.offsetTop;

                setTimeout(() => {
                    this.scrolling = false;
                }, 10);
            },
            scrollHandler() {
                if (this.scrolling || this.nav) return;

                const panels = this.getPanels();
                const scrollBox = this.scrollView;
                const scrollBoxTop = scrollBox.scrollTop;

                panels.forEach((panel, index) => {
                  if (scrollBoxTop > panel.$el.offsetTop && scrollBoxTop < panel.$el.offsetTop + panel.$el.offsetHeight) {
                      this.activeIndex = index;
                  }
                });
            }
        },
        watch: {
            navList() {
                this.setDefault();
            },
            activeIndex(index, prevIndex) {
              this.scrollTab(index, prevIndex);
              this.$emit('on-change', index)
            },
            index(index) {
                this.scrollContent(index);
                this.activeIndex = index;
            }
        },
        mounted() {
          this.init();
          this.$nextTick(() => {
            setTimeout(() => {
              this.isReady = true;
            },0)
          })
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="less">
  @import "../../../styles/widget/tabnav/scrolltab.less";

  .fade-in-enter-active, .fade-in-leave-active{
    transition: all 0.3s
  }
  .fade-in-enter, .fade-in-leave-to{
    opacity: 0;
  }
  .fade-in-enter-to, .fade-in-leave{
    opacity: 1;
  }

</style>
