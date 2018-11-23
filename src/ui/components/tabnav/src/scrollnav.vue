<template>
    <div class="zmui-scrollnav">
        <div class="zmui-scrollnav-tab" :style="{color: color, backgroundColor: bgcolor}" ref="navbox">
            <div class="zmui-scrollnav-unfold" :class="toggle ? 'zmui-scrollnav-unfold-active' : ''">
                <div class="zmui-scrollnav-unfold-header" :style="{height: height, borderColor: borderColor}">
                    <div v-html="toggleText" :style="{backgroundColor: bgcolor}"></div>
                    <span></span>
                </div>
                <ul :style="{color: currentColor, backgroundColor: bgcolor}">
                    <li :style="{color: color}"
                        v-for="item, i in navList" :key="i"
                        @click.stop="scrollContent(i)"
                        :class="activeIndex === i ? 'zmui-scrollnav-current' : ''"
                    >{{item.label}}
                    </li>
                </ul>
            </div>
            <ul class="zmui-scrollnav-tab-item" ref="nav"
                :style="{color: currentColor, height: height}">
                <li :style="{color: color}"
                    v-for="item, i in navList" :key="i"
                    :class="activeIndex === i  ? 'zmui-scrollnav-current' : ''"
                    :ref="'navitem_' + i"
                    @click.stop="scrollContent(i)"
                ><i></i><span>{{item.label}}</span>
                </li>
            </ul>
            <div class="zmui-scrollnav-toggle" :class="toggle ? 'zmui-scrollnav-toggle-active' : ''"
                 @click="toggle = !toggle">
            </div>
        </div>
        <div class="zmui-scrollnav-content" ref="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    import {isColor, scrollTop} from '../../../utils/assist';

    export default {
        name: 'scrollnav',
        data() {
            return {
                toggle: false,
                activeIndex: this.index,
                navList: [],
                currentOffset: 0,
                currentPosition: 0,
                scrolling: false
            }
        },
        props: {
            nav: Array,
            index: {
                validator(val) {
                    return /^(([1-9]\d*)|0)$/.test(val);
                },
                default: 0
            },
            height: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '40px'
            },
            color: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#333'
            },
            currentColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#F00'
            },
            toggleText: {
                type: String,
                default: '切换分类'
            },
            bgcolor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#FFF'
            },
            borderColor: {
                validator(value) {
                    if (!value) return true;
                    return isColor(value);
                },
                default: '#EFEFEF'
            },
            callback: {
                type: Function
            }
        },
        watch: {
            activeIndex(val) {
                this.scrollNav(val);
            },
            index(index) {
                this.activeIndex = index;
                this.scrollContent(index);
            }
        },
        methods: {
            init() {
                this.scrollView = this.$refs.scrollView;

                this.contentOffsetTop = this.scrollView.getBoundingClientRect().top;

                this.nav && (this.navList = [...this.nav]);
                this.bindEvent();

                if (this.index > 0) {
                    this.scrollNav(this.index, false);
                    this.scrollContent(this.index, false);
                }
            },
            addItem(panel) {
              !this.nav && this.navList.push(panel);
            },
            bindEvent() {
                this.scrollView.addEventListener('scroll', this.scrollHandler);
                window.addEventListener('resize', this.scrollHandler);
            },
            getPanels() {
                return this.$children.filter(item => item.$options.name === 'scrollnav-panel');
            },
            scrollHandler() {
                if (this.scrolling || this.nav) return;

                const panels = this.getPanels();
                const panelsLength = panels.length;
                const scrollBox = this.scrollView;

                if (scrollBox.scrollTop >= panels[0].$el.offsetHeight * panelsLength - scrollBox.offsetHeight) {
                    this.activeIndex = panelsLength - 1;
                    return;
                }

                panels.forEach((panel, index) => {
                    if (panel.$el.getBoundingClientRect().top <= scrollBox.offsetHeight / 2 + this.contentOffsetTop) {
                        this.activeIndex = index;
                    }
                });
            },
            scrollNav(_uid, animate = true) {
                const navWidth = ~~this.$refs.nav.offsetWidth / 2;

                this.navList.every((item, index) => {
                    if (index === _uid) {
                        const navitem = this.$refs['navitem_' + index][0];
                        const scrollOffset = navitem.offsetLeft - navWidth + navitem.offsetWidth / 2;

                        this.scrollLeft(this.currentOffset, scrollOffset, animate, () => {
                            this.callback && this.callback(index);
                        });
                        return false;
                    }
                    return true;
                });
            },
            scrollContent(index, animate = true) {
                this.toggle = false;
                this.activeIndex = index;
                this.scrolling = true;

                const panel = this.getPanels()[!this.nav ? index : 0].$el;
                const speed = animate && (window.navigator && window.navigator.userAgent || '').indexOf('MicroMessenger') < 0 ? 500 : 0;

                if(!!this.nav){
                  scrollTop(this.scrollView, this.scrollView.scrollTop, 0, speed, () => {
                    this.scrolling = false;
                  });
                  this.currentPosition = 0;
                }else{
                  scrollTop(this.scrollView, this.currentPosition, panel.offsetTop - this.$refs.navbox.offsetHeight, speed, () => {
                    this.scrolling = false;
                  });
                  this.currentPosition = panel.offsetTop - this.$refs.navbox.offsetHeight;
                }
            },
            scrollLeft(from, to, animate, callback) {
                const difference = Math.abs(from - to);
                const step = animate ? Math.ceil(difference / 600 * 50) : difference;
                const self = this;

                function scroll(start, end, step) {
                    if (start === end) {
                        callback && callback();
                        return;
                    }

                    let d = (start + step > end) ? end : start + step;
                    if (start > end) {
                        d = (start - step < end) ? end : start - step;
                    }
                    self.$refs.nav.scrollLeft = d;
                    self.currentOffset = d;
                    window.requestAnimationFrame(() => scroll(d, end, step));
                }

                scroll(from, to, step);
            }
        },
        mounted() {
            this.$nextTick(this.init);
        },
        destroyed() {
            this.scrollView.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        }
    }
</script>

<style lang="less">
    @import "../../../styles/widget/tabnav/scrollnav.less";
</style>
