import { Alert as AlertComponent } from '../../components/dialog'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  const AlertConstructor = Vue.extend(AlertComponent);

  const $vm = new AlertConstructor({
    el: document.createElement('div')
  });
  return $vm
}

export function show ($vm, options) {
  if (typeof options === 'object') {
    mergeOptions($vm, options)
  } else if (typeof options === 'string') {
    $vm.content = options
  }

  const el = $vm.$el;
  $vm.afterLeave = () => {
    el.parentNode.removeChild(el);
  };
  document.body.appendChild(el);
  $vm.showValue = true;
  return $vm
}

export function hide ($vm) {
  $vm.showValue = false;
}

export default {
  show,
  hide
}
