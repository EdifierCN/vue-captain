import Vue from 'vue'
import { createVM, show, hide } from './util'

let $vm;

const plugin = {

  install (Vue) {
    if (!$vm) {
      $vm = createVM(Vue)
    }

    const loading = {
      show (options = {}) {
        return show.call(this, $vm, options)
      },
      hide () {
        return hide.call(this, $vm)
      }
    };

    if (!Vue.$loading) {
      Vue.$loading = loading
    }

    // 全局混合，影响所有Vue实例
    // 钩子函数混合：将与组件的钩子合并为数组都将被调用，并在组件钩子前调用
    // 对象混合：浅合并，键名冲突时，保留组件属性
    Vue.mixin({
      created: function () {
        this.$loading = Vue.$loading
      }
    })

  }
};

if(!Vue.prototype.$isServer){
  Vue.use(plugin);
}

export default plugin
export const install = plugin.install;

