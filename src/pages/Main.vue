<template>
	<layout :footer="footer" :immediately="isFooter">

    <navbar slot="header"
            transparent
            :left-options="leftOptions"
            :title="title"
            :transition="headerTransition">
    </navbar>

    <template slot="body">
      <!-- 每个页面必须包裹一层div -->
      <transition :name="viewTransition" :css="!!direction">
          <router-view class="router-view"></router-view>
      </transition>
    </template>

    <tabbar slot="footer">
      <tabbar-item :link="{name:'Home'}" :selected="$route.name === 'Home'">
        <icon-ivu slot="icon" type="ios-home"></icon-ivu>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :link="{name:'Categories'}" :selected="$route.name === 'Categories'">
        <icon-ivu slot="icon" type="navicon-round"></icon-ivu>
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item :link="{name:'ShoppingCart'}" :selected="$route.name === 'ShoppingCart'">
        <icon-ivu slot="icon" type="ios-cart"></icon-ivu>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item :link="{name:'Me'}" :selected="$route.name === 'Me'">
        <icon-ivu slot="icon" type="person"></icon-ivu>
        <span slot="label">个人中心</span>
      </tabbar-item>
      <tabbar-item :link="{name:'More'}" :selected="$route.name === 'More'">
        <icon-ivu slot="icon" type="more"></icon-ivu>
        <span slot="label">更多</span>
      </tabbar-item>
    </tabbar>

  </layout>

</template>

<script>
  import { Layout } from '../ui/components/layout'
  import { Navbar } from '../ui/components/navbar'
  import { Tabbar, TabbarItem } from '../ui/components/tabbar'
  import { IconIvu } from '../ui/components/icon'
  import { Loading } from '../ui/components/loading'

  import transferDom from '../ui/directives/transfer-dom'

  import { mapState } from 'vuex'

	export default {
    data(){
      return {

      }
    },
    computed:{
      ...mapState({
        route: state => state.route,
        isFooter: state => state.page.isFooter,
        direction: state => state.page.direction,
        isLoading: state => state.page.isLoading,
      }),
      footer(){
        return this.route.name === 'Home' || this.route.name === 'Categories' || this.route.name === 'ShoppingCart'|| this.route.name === 'Me' || this.route.name === 'More'
      },
      leftOptions () {
        return {
          showBack: this.route.name !== 'Home' && this.route.name !== 'Categories' && this.route.name !== 'ShoppingCart' && this.route.name !== 'Me' && this.route.name !== 'More'
        }
      },
      headerTransition () {
        if (!this.direction) return '';
        return this.direction === 'forward' ? 'zmui-navbar-fade-in-right' : 'zmui-navbar-fade-in-left'
      },
      title(){
        return this.$route.meta.title
      },
      viewTransition () {
        if (!this.direction) return '';
        return 'zmui-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    },
    components:{
      Layout,
      Navbar,
      Tabbar, TabbarItem,
      IconIvu,
      Loading
    },
    directives:{
      transferDom
    }
	}
</script>

<style lang="scss">
  .router-view {
    width: 100%;
    top: 46px;
  }

  .zmui-pop-out-enter-active,
  .zmui-pop-out-leave-active,
  .zmui-pop-in-enter-active,
  .zmui-pop-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    top: 46px;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .zmui-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .zmui-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .zmui-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .zmui-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
