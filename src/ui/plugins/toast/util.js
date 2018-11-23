import { Toast as ToastComponent } from '../../components/toast'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  const ToastConstructor = Vue.extend(ToastComponent);

  const $vm = new ToastConstructor({
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

export function text($vm, text, position = 'default') {
  this.show({
    type: 'text',
    width: 'auto',
    position,
    text
  })
}


export function hide ($vm) {
  $vm.show = false;
}

export default {
  show,
  text,
  hide
}
