<template>

  <div class="wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <native-view style="text-align: center" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore">

      <list :theme="1" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="200">
        <list-item v-for="(item, index) in viewlist" :key="index">
          <img slot="img" v-lazy="item.img">
          <span slot="title">{{item.title}}</span>
          <list-other slot="other">
            <span class="list-price"><em>¥</em>{{item.price}}</span>
            <span class="list-del-price">¥{{item.w_price}}</span>
          </list-other>
        </list-item>
      </list>

      <loadmore :tip="loading ? '正在加载' : (loadend ? '我是有底线的' : '')" :showLoading="loading"></loadmore>

      <div slot="top" class="zmui-native-view-top">
        <span class="arrow" v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'pull'">下拉刷新</span>
        <span v-show="topStatus === 'drop'">释放更新</span>
        <span v-show="topStatus === 'loading'">
          <spinner type="lines" style="stroke: #C20C0C;"></spinner>
        </span>
      </div>

    </native-view>
  </div>
</template>

<script>
  import { Loadmore } from '../../ui/components/loadmore'
  import { Spinner } from '../../ui/components/spinner'
  import { List, ListItem, ListOther } from '../../ui/components/list'
  import { NativeView } from '../../ui/components/view'
  import InfiniteScroll from '../../ui/directives/infinite-scroll/infinite-scroll'

  import Vue from 'vue'
  import VueLazyLoad from 'vue-lazyload'
  Vue.use(VueLazyLoad,{
    error:'',
    loading: 'https://o5omsejde.qnssl.com/demo/test1.jpg'
  });

  // 容器必须有固定高度

  const arr = [
    {img: "http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg", title: "标题标题标题标题标题", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg", title: "骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg", title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg", title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg", title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg", title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
    {img: "http://img1.shikee.com/try/2016/06/19/09430120929215230041.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36}
  ];

  const list = [
    {img: "https://o5omsejde.qnssl.com/demo/test1.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test2.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test3.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test4.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test5.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test6.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test7.jpg", title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服", price: 56.23, w_price: 89.36},
    {img: "https://o5omsejde.qnssl.com/demo/test8.jpg", title: "男装衣服男夏t恤 男士短袖t恤圆领夏季潮牌宽松原宿风半截袖男", price: 56.23, w_price: 89.36}
  ];

  export default{
    components:{
      NativeView,
      Spinner,
      Loadmore,
      List,ListItem, ListOther
    },
    directives: {
      InfiniteScroll
    },
    data(){
      return {
        loading: false,
        loadend: false,
        viewlist: [],
        topStatus: '',
        wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0
      }
    },
    created() {
      this.viewlist = [...this.viewlist, ...arr]
    },
    mounted() {
      // 此处获取高度浏览器和手机效果不统一
      this.wrapperHeight = document.documentElement.clientHeight -this.$refs.wrapper.offsetTop;

      console.info(this.$refs.wrapper.getBoundingClientRect().top); // 负值
      console.info(this.$refs.wrapper.offsetTop);  // 0
      console.info(window.innerHeight); // 一致
      console.info(document.documentElement.clientHeight);  // 一致
    },
    methods:{
      loadMore() {
        if(this.viewlist.length > 300){
          this.loadend = true;
          return false
        }
        this.loading = true;
        setTimeout(() => {
          this.viewlist = [...this.viewlist, ...arr];
          this.loading = false;
        }, 50);
      },
      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        console.info(translate);
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          this.viewlist = [...list, ...this.viewlist];
          this.$refs.loadmore.onTopLoaded();
        }, 1000);
      },
    }
  }
</script>

<style lang="less">
  .wrapper{
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .zmui-native-view-top{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow{
    transition: .2s linear;
    font-size: 18px;
    margin-right: 5px;
    &.is-rotate {
      transform: rotate(180deg)!important;
    }
  }


  .list-price {
    font-size: 13px;
    color: #eb5211;
  }
  .list-del-price {
    padding-left: .06rem;
    font-size: 13px;
    margin-left: .02rem;
    position: relative;
    color: #8c8c8c;
  }
  .list-del-price:after {
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    width: 100%;
    border-top: 1px solid #8c8c8c;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    top: auto;
    bottom: 50%;
  }
</style>
