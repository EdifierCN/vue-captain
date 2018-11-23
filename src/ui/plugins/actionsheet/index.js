import Vue from 'vue'
import { createVM, show, hide } from './util'

let $vm;

// Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
// Vue.use() 执行install方法
const plugin = {

  install (Vue) {
    if (!$vm) {
      $vm = createVM(Vue)
    }

    const actionsheet = {
      show (options = {}) {
        return show.call(this, $vm, options)
      },
      hide () {
        return hide.call(this, $vm)
      }
    };

    if (!Vue.$actionsheet) {
      Vue.$actionsheet = actionsheet;
    }

    // 全局混合，影响所有Vue实例
    // 钩子函数混合：将与组件的钩子合并为数组都将被调用，并在组件钩子前调用
    // 对象混合：浅合并，键名冲突时，保留组件属性
    Vue.mixin({
      created: function () {
        this.$actionsheet = Vue.$actionsheet
      }
    })
  }
};

// 插件自启
if (!Vue.prototype.$isServer) {
  Vue.use(plugin);
}

export default plugin
export const install = plugin.install;

