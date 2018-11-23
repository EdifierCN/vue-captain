import { Loading as LoadingComponent } from '../../components/loading'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  const LoadingConstructor = Vue.extend(LoadingComponent);
  const $vm = new LoadingConstructor({
    el: document.createElement('div')
  });
  return $vm
}

export function show ($vm, options) {
  if (typeof options === 'object') {
    mergeOptions($vm, options)
  } else if (typeof options === 'string') {
    $vm.text = options
  }

  const el = $vm.$el;
  $vm.afterLeave = () => {
    el.parentNode.removeChild(el);
  };
  document.body.appendChild(el);
  $vm.show = true;
  return $vm
}

export function hide ($vm) {
  $vm.show = false;
}

export default {
  show,
  hide
}
