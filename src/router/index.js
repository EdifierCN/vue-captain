import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/pages/Main.vue'
import Home from '@/pages/Home.vue'
import Explorer from '@/pages/Explorer.vue'
import Cart from '@/pages/Cart.vue'
import Me from '@/pages/Me.vue'
import More from '@/pages/More.vue'

const Button = () =>  import('@/pages/demo/button.vue');
const Badge = () =>  import('@/pages/demo/badge.vue');
const Check = () =>  import('@/pages/demo/check.vue');
const Cell = () =>  import('@/pages/demo/cell.vue');
const Flexbox = () =>  import('@/pages/demo/flexbox.vue');
const Grid = () =>  import('@/pages/demo/grid.vue');
const Msg = () =>  import('@/pages/demo/msg.vue');
const Flow = () =>  import('@/pages/demo/flow.vue');
const Step = () =>  import('@/pages/demo/step.vue');
const Timeline = () =>  import('@/pages/demo/timeline.vue');
const FormPreview = () =>  import('@/pages/demo/form-preview.vue');
const Card = () =>  import('@/pages/demo/card.vue');
const Panel = () =>  import('@/pages/demo/panel.vue');
const List = () =>  import('@/pages/demo/list.vue');
const Masker = () =>  import('@/pages/demo/masker.vue');
const Navbar = () =>  import('@/pages/demo/navbar.vue');
const Spinner = () =>  import('@/pages/demo/spinner.vue');
const Backtop = () =>  import('@/pages/demo/backtop.vue');

const Counter = () =>  import('@/pages/demo/counter.vue');
const Clocker = () =>  import('@/pages/demo/clocker.vue');
const Marquee = () =>  import('@/pages/demo/marquee.vue');
const Rater = () =>  import('@/pages/demo/rater.vue');
const Range = () =>  import('@/pages/demo/range.vue');
const Number = () =>  import('@/pages/demo/number.vue');
const Swipeout = () =>  import('@/pages/demo/swipeout.vue');
const Accordion = () =>  import('@/pages/demo/accordion.vue');
const Shake = () =>  import('@/pages/demo/shake.vue');
const Sticky = () =>  import('@/pages/demo/sticky.vue');
const Sendcode = () =>  import('@/pages/demo/sendcode.vue');
const Progress = () =>  import('@/pages/demo/progress.vue');
const Lazyimg = () =>  import('@/pages/demo/lazyimg.vue');
const Qrcode = () =>  import('@/pages/demo/qrcode.vue');
const Loading = () =>  import('@/pages/demo/loading.vue');
const LoadMore = () =>  import('@/pages/demo/loadmore.vue');
const Swiper = () =>  import('@/pages/demo/swiper.vue');
const Scroller = () =>  import('@/pages/demo/scroller.vue');
const Search = () =>  import('@/pages/demo/search.vue');
const View = () =>  import('@/pages/demo/view.vue');
const Tabnav = () =>  import('@/pages/demo/tabnav.vue');
const Drawer = () =>  import('@/pages/demo/drawer.vue');
const IndexList = () =>  import('@/pages/demo/index-list.vue');
const Selector = () =>  import('@/pages/demo/selector.vue');
const Zoom = () =>  import('@/pages/demo/zoom.vue');
const Uploader = () =>  import('@/pages/demo/uploader.vue');
const Editbox = () =>  import('@/pages/demo/editbox.vue');
const Picker = () =>  import('@/pages/demo/picker.vue');

const Popover = () =>  import('@/pages/demo/popover.vue');
const Popup = () =>  import('@/pages/demo/popup.vue');

const Datetime = () =>  import('@/pages/demo/datetime.vue');
const Address = () =>  import('@/pages/demo/address.vue');
const Calendar = () =>  import('@/pages/demo/calendar.vue');

const Input = () =>  import('@/pages/demo/input.vue');
const Textarea = () =>  import('@/pages/demo/textarea.vue');
const Table = () =>  import('@/pages/demo/table.vue');

const Dialog = () =>  import('@/pages/demo/dialog.vue');
const Toast = () =>  import('@/pages/demo/toast.vue');
const Actionsheet = () =>  import('@/pages/demo/actionsheet.vue');
const Video = () =>  import('@/pages/demo/video.vue');


Vue.use(Router);

// 同级导航，比较 zIndex

 const router = new Router({
	// mode: 'history',
  routes: [
  	// 将页面组件与path指定的路由关联
    {
      path: '/',
      component: Main,
      children:[
      	  {
      		  path: '',
          	redirect: 'home'
      	  },
	      {
	    	name: 'Home',
	    	path: 'home',
	    	component: Home,
        meta:{
	    	  title: '首页',
          zIndex: 0
        }
	    },
	    {
	    	name: 'Categories',
	    	path: 'explorer',
	    	component: Explorer,
        meta:{
          title: '分类',
          zIndex: 1
        }
	    },
	    {
	    	name: 'ShoppingCart',
	    	path: 'cart',
	    	component: Cart,
        meta:{
          title: '购物车',
          zIndex: 2
        }
	    },
	    {
	    	name: 'Me',
	    	path: 'me',
	    	component: Me,
        meta:{
          title: '个人中心',
          zIndex: 3
        }
	    },
      {
        name: 'More',
        path: 'more',
        component: More,
        meta:{
          title: '更多',
          zIndex: 4
        }
      },
        {
          name: 'Button',
          path: 'button',
          component: Button,
          meta:{
            title: 'Button'
          }
        },
        {
          name: 'Badge',
          path: 'badge',
          component: Badge,
          meta:{
            title: 'Badge'
          }
        },
        {
          name: 'Check',
          path: 'check',
          component: Check,
          meta:{
            title: 'Check'
          }
        },
        {
          name: 'Cell',
          path: 'cell',
          component: Cell,
          meta:{
            title: 'Cell'
          }
        },
        {
          name: 'Flexbox',
          path: 'flexbox',
          component: Flexbox,
          meta:{
            title: 'Flexbox'
          }
        },
        {
          name: 'Grid',
          path: 'grid',
          component: Grid,
          meta:{
            title: 'Grid'
          }
        },
        {
          name: 'Counter',
          path: 'counter',
          component: Counter,
          meta:{
            title: 'Counter'
          }
        },
        {
          name: 'Clocker',
          path: 'clocker',
          component: Clocker,
          meta:{
            title: 'Clocker'
          }
        },
        {
          name: 'Flow',
          path: 'flow',
          component: Flow,
          meta:{
            title: 'Flow'
          }
        },
        {
          name: 'Step',
          path: 'step',
          component: Step,
          meta:{
            title: 'Step'
          }
        },
        {
          name: 'Timeline',
          path: 'timeline',
          component: Timeline,
          meta:{
            title: 'Timeline'
          }
        },
        {
          name: 'FormPreview',
          path: 'form-preview',
          component: FormPreview,
          meta:{
            title: 'FormPreview'
          }
        },
        {
          name: 'Marquee',
          path: 'marquee',
          component: Marquee,
          meta:{
            title: 'Marquee'
          }
        },
        {
          name: 'Rater',
          path: 'rater',
          component: Rater,
          meta:{
            title: 'Rater'
          }
        },
        {
          name: 'Range',
          path: 'range',
          component: Range,
          meta:{
            title: 'Range'
          }
        },
        {
          name: 'Number',
          path: 'number',
          component: Number,
          meta:{
            title: 'Number'
          }
        },
        {
          name: 'Swipeout',
          path: 'swipeout',
          component: Swipeout,
          meta:{
            title: 'Swipeout'
          }
        },
        {
          name: 'Card',
          path: 'card',
          component: Card,
          meta:{
            title: 'Card'
          }
        },
        {
          name: 'Panel',
          path: 'panel',
          component: Panel,
          meta:{
            title: 'Panel'
          }
        },
        {
          name: 'List',
          path: 'list',
          component: List,
          meta:{
            title: 'List'
          }
        },
        {
          name: 'Masker',
          path: 'masker',
          component: Masker,
          meta:{
            title: 'Masker'
          }
        },
        {
          name: 'Navbar',
          path: 'navbar',
          component: Navbar,
          meta:{
            title: 'Navbar'
          }
        },
        {
          name: 'Spinner',
          path: 'spinner',
          component: Spinner,
          meta:{
            title: 'Spinner'
          }
        },



        {
          name: 'Accordion',
          path: 'accordion',
          component: Accordion,
          meta:{
            title: 'Accordion'
          }
        },
        {
          name: 'Shake',
          path: 'shake',
          component: Shake,
          meta:{
            title: 'Shake'
          }
        },
        {
          name: 'Sticky',
          path: 'sticky',
          component: Sticky,
          meta:{
            title: 'Sticky'
          }
        },
        {
          name: 'Sendcode',
          path: 'sendcode',
          component: Sendcode,
          meta:{
            title: 'Sendcode'
          }
        },
        {
          name: 'Progress',
          path: 'progress',
          component: Progress,
          meta:{
            title: 'Progress'
          }
        },
        {
          name: 'Lazyimg',
          path: 'lazyimg',
          component: Lazyimg,
          meta:{
            title: 'Lazyimg'
          }
        },
        {
          name: 'Qrcode',
          path: 'qrcode',
          component: Qrcode,
          meta:{
            title: 'Qrcode'
          }
        },
        {
          name: 'Loading',
          path: 'loading',
          component: Loading,
          meta:{
            title: 'Loading'
          }
        },
        {
          name: 'LoadMore',
          path: 'loadMore',
          component: LoadMore,
          meta:{
            title: 'LoadMore'
          }
        },
        {
          name: 'Swiper',
          path: 'swiper',
          component: Swiper,
          meta:{
            title: 'Swiper'
          }
        },
        {
          name: 'Scroller',
          path: 'scroller',
          component: Scroller,
          meta:{
            title: 'Scroller'
          }
        },
        {
          name: 'Search',
          path: 'search',
          component: Search,
          meta:{
            title: 'Search'
          }
        },
        {
          name: 'View',
          path: 'view',
          component: View,
          meta:{
            title: 'View'
          }
        },
        {
          name: 'Tabnav',
          path: 'tabnav',
          component: Tabnav,
          meta:{
            title: 'Tabnav'
          }
        },
        {
          name: 'Drawer',
          path: 'drawer',
          component: Drawer,
          meta:{
            title: 'Drawer'
          }
        },
        {
          name: 'IndexList',
          path: 'index-list',
          component: IndexList,
          meta:{
            title: 'IndexList'
          }
        },
        {
          name: 'Selector',
          path: 'selector',
          component: Selector,
          meta:{
            title: 'Selector'
          }
        },
        {
          name: 'Uploader',
          path: 'uploader',
          component: Uploader,
          meta:{
            title: 'Uploader'
          }
        },
        {
          name: 'Editbox',
          path: 'editbox',
          component: Editbox,
          meta:{
            title: 'Editbox'
          }
        },
        {
          name: 'Popover',
          path: 'popover',
          component: Popover,
          meta:{
            title: 'Popover'
          }
        },
        {
          name: 'Popup',
          path: 'popup',
          component: Popup,
          meta:{
            title: 'Popup'
          }
        },
        {
          name: 'Datetime',
          path: 'datetime',
          component: Datetime,
          meta:{
            title: 'Datetime'
          }
        },
        {
          name: 'Address',
          path: 'address',
          component: Address,
          meta:{
            title: 'Address'
          }
        },
        {
          name: 'Picker',
          path: 'picker',
          component: Picker,
          meta:{
            title: 'Picker'
          }
        },
        {
          name: 'Calendar',
          path: 'calendar',
          component: Calendar,
          meta:{
            title: 'Calendar'
          }
        },
        {
          name: 'Input',
          path: 'input',
          component: Input,
          meta:{
            title: 'Input'
          }
        },
        {
          name: 'Textarea',
          path: 'textarea',
          component: Textarea,
          meta:{
            title: 'Textarea'
          }
        },
        {
          name: 'Table',
          path: 'table',
          component: Table,
          meta:{
            title: 'Table'
          }
        },
        {
          name: 'Dialog',
          path: 'dialog',
          component: Dialog,
          meta:{
            title: 'Dialog'
          }
        },
        {
          name: 'Toast',
          path: 'toast',
          component: Toast,
          meta:{
            title: 'Toast'
          }
        },
        {
          name: 'Actionsheet',
          path: 'actionsheet',
          component: Actionsheet,
          meta:{
            title: 'Actionsheet'
          }
        },
        {
          name: 'Msg',
          path: 'msg',
          component: Msg,
          meta:{
            title: 'Msg'
          }
        },
        {
          name: 'Backtop',
          path: 'backtop',
          component: Backtop,
          meta:{
            title: 'Backtop'
          }
        },
        {
          name: 'Zoom',
          path: 'zoom',
          component: Zoom,
          meta:{
            title: 'Zoom'
          }
        },
        {
          name: 'Video',
          path: 'video',
          component: Video,
          meta:{
            title: 'Video'
          }
        },



      ]
    },
  ]
});

// 关于路由钩子

// 一：全局守卫
// 前置守卫
// router.beforeEach((to, from, next) => {
//   // ...
// })
// 后置守卫
//router.afterEach((to, from) => {
// ...
// })
// 解析守卫
// 这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
// router.beforeResolve((to, from, next) => {
//
// });

// 二：路由独享的守卫
// const router = new VueRouter({
//   routes: [
//     {
//       path: '/foo',
//       component: Foo,
//       beforeEnter: (to, from, next) => {
//         // ...
//       }
//     }
//   ]
// })

// 三：组件内的守卫  （注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫）
// beforeRouteEnter (to, from, next) {
//   // 在渲染该组件的对应路由被 confirm 前调用
//   // 不！能！获取组件实例 `this`
//   // 因为当守卫执行前，组件实例还没被创建
      // next(vm => {
      //   // 通过 `vm` 访问组件实例
      // })
// },
// beforeRouteUpdate (to, from, next) {
//   // 在当前路由改变，但是该组件被复用时调用
//   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
//   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
//   // 可以访问组件实例 `this`
// },
// beforeRouteLeave (to, from, next) {
//   // 导航离开该组件的对应路由时调用
//   // 可以访问组件实例 `this`
// }

// PS: beforeRouteLeave 常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
// beforeRouteLeave (to, from , next) {
//   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//   if (answer) {
//     next()
//   } else {
//     next(false)
//   }
// }

// PS: 路由全局守卫中，使用vuex 的示例
// 方式一：使用 router.app.$options.store
// const store = router.app.$options.store;
// 方式二：直接import 进来
// import store from '../store'
// 方式三：若使用action ，可以 actionName(store)

// 对于module中的state，需要 store.state.module_name.state_name


// router.beforeEach((to, from , next) => {
//   next()
// });

// 关于滚动行为
// 注意: 这个功能只在支持 history.pushState 的浏览器中可用。
// const router = new VueRouter({
//   routes: [...],
//   scrollBehavior (to, from, savedPosition) {
//     // return 期望滚动到哪个的位置

        // if (savedPosition) {
        //   return savedPosition
        // } else {
        //   return { x: 0, y: 0 }
        // }

        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     resolve({ x: 0, y: 0 })
        //   }, 500)
        // })

//   }
// })

// 组件懒加载
// const Foo = () => import('./Foo.vue')

// 传参
// 可以使用 props 将路由参数设为组件属性

// 页面设置title
// 方式一：npm install vue-wechat-title --save
// 1、import VueWechatTitle from 'vue-wechat-title';
// Vue.use(VueWechatTitle)
// 2、
// {
// path: '/Login',
//   /* *  按需加载   */
//   component: (resolve) => {
//   require(['@/components/Login.vue'], resolve)
// },
//   meta: {
//   title: '登录'
// }
// },
// 3、<router-view v-wechat-title="$route.meta.title"></router-view>

// 方式二：路由meta里设置
// 通过beforeEach 修改
/* 路由发生变化修改页面title */
// if (to.meta.title) {
//   document.title = to.meta.title
// }

// 方式三：存在vuex中

// 方式四：设置全局变量或全局函数（使用document.title = ×××来改变网页标题。
// 但是在IOS APP里这种方式不起作用，原因是在IOS webview中网页标题只加载一次，动态改变是无效的）
// function setMetaTitle(title) {
//   document.title = title
//   let mobile = navigator.userAgent.toLowerCase()
//   if (/iphone|ipad|ipod/.test(mobile)) {
//     let iframe = document.createElement('iframe')
//     iframe.style.visibility = 'hidden'
//     // 替换成站标favicon路径或者任意存在的较小的图片即可
//     iframe.setAttribute('src', 'static/img/blank.png')
//     let iframeCallback = function () {
//       setTimeout(function () {
//         iframe.removeEventListener('load', iframeCallback)
//         document.body.removeChild(iframe)
//       }, 0)
//     }
//     iframe.addEventListener('load', iframeCallback)
//     document.body.appendChild(iframe)
//   }
// }

export default router
