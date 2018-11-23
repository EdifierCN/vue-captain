// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//   key: '1f648c12a2709a14b0e79551fdc5f791',
//   plugin: ['AMap.DistrictSearch', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 默认高德 sdk 版本为 1.4.4
//   v: '1.4.4'
// });

import { sync } from 'vuex-router-sync'

const FastClick = require('fastclick');
FastClick.attach(document.body);

Vue.config.productionTip = false;

// simple history management
const history = window.sessionStorage;
// history.clear();

let historyCount = history.getItem('count') * 1 || 0;
history.setItem('/', 0);
let isPush = false;

let methods = ['push', 'go', 'replace', 'forward', 'back'];

methods.forEach(key => {
  let method = router[key].bind(router);
  router[key] = function (...args) {
    isPush = true;
    method.apply(null, args)
  }
});

// 同级导航比较zIndex
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true});

  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);

  if (toIndex) {

    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {

      if(from.meta.zIndex && to.meta.zIndex){

        if(from.meta.zIndex < to.meta.zIndex){
          store.commit('updateDirection', {direction: 'forward'})
        }else{
          store.commit('updateDirection', {direction: 'reverse'})
        }
      }else{
        if(!isPush){
          store.commit('updateDirection', {direction: ''});
        }else{
          store.commit('updateDirection', {direction: 'forward'});
        }

      }
      store.commit('updateFooter', {isFooter: false});
    } else {

      // 判断是否是ios左滑返回
      if (!isPush) {
        store.commit('updateDirection', {direction: ''});
        store.commit('updateFooter', {isFooter: true});
      } else {
        if(from.meta.zIndex && to.meta.zIndex){

          if(from.meta.zIndex < to.meta.zIndex){
            store.commit('updateDirection', {direction: 'forward'})
          }else{
            store.commit('updateDirection', {direction: 'reverse'})
          }

        }else{
          store.commit('updateDirection', { direction: 'reverse' })
        }
        store.commit('updateFooter', {isFooter: false});
      }

    }
  } else {

    ++historyCount;
    history.setItem('count', historyCount);
    to.path !== '/' && history.setItem(to.path, historyCount);

    if(from.meta.zIndex && to.meta.zIndex){

      if(from.meta.zIndex < to.meta.zIndex){
        store.commit('updateDirection', {direction: 'forward'})
      }else{
        store.commit('updateDirection', {direction: 'reverse'})
      }

    }else{
      store.commit('updateDirection', {direction: 'forward'})
    }
    store.commit('updateFooter', {isFooter: false});
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1];
    window.location.href = `http${url}`
  } else {
    next()
  }
});

router.afterEach(function (to) {
  isPush = false;
  store.commit('updateLoadingStatus', {isLoading: false});
});

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
