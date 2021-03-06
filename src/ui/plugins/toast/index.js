import Vue from 'vue'
import { createVM, show, hide, text } from './util'

let $vm;

const plugin = {

  install (Vue) {
    if (!$vm) {
      $vm = createVM(Vue)
    }

    const toast = {
      show (options = {}) {
        return show.call(this, $vm, options)
      },
      text (txt, position) {
        return text.call(this, $vm, txt, position)
      },
      hide () {
        return hide.call(this, $vm)
      }
    };

    if (!Vue.$toast) {
      Vue.$toast = toast;
    }

    // 全局混合，影响所有Vue实例
    // 钩子函数混合：将与组件的钩子合并为数组都将被调用，并在组件钩子前调用
    // 对象混合：浅合并，键名冲突时，保留组件属性
    Vue.mixin({
      created: function () {
        this.$toast = Vue.$toast
      }
    })

  }
};

if(!Vue.prototype.$isServer){
  Vue.use(plugin);
}

export default plugin
export const install = plugin.install;
