import { Actionsheet as ActionComponent } from '../../components/actionsheet'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  const ActionConstructor = Vue.extend(ActionComponent);
  const $vm = new ActionConstructor({
    el: document.createElement('div')
  });
  return $vm
}

export function show ($vm, options) {
  if (typeof options === 'object') {
    mergeOptions($vm, options);
  }else if(typeof options === 'string'){
    $vm.menus = [ options ]
  }

  // 由于动画元素不是最外层，添加transitionEed 事件，不容易确定动画节点，
  // 不想在组件里添加remove方法，添加after-leave代替，
  // PS：可以考虑将所有组件中蒙层独立出来，不过事件和动画不太好处理。
  // 对于动态生成的选项，先获取再显示
  // TODO
  // 记录：想法是单独一个模块进行控制，参数：层级、动画方式、事件api等，事件统一通过 bus 监听，
  // 不过感觉一些东西也做不到完全独立

  const el = $vm.$el;
  $vm.afterLeave = () => {
    el.parentNode.removeChild(el);
  } ;
  document.body.appendChild(el);
  $vm.show = true;
  return $vm    // 必须返回实例，便于使用
}

export function hide ($vm) {
  $vm.show = false;
}

export default {
  show,
  hide
}
