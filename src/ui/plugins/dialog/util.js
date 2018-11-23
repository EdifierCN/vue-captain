import { Dialog as DialogComponent } from '../../components/dialog'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  const DialogConstructor = Vue.extend(DialogComponent);
  const $vm = new DialogConstructor({
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

  // 由于 dialog 使用的 .sync ，直接修改 show ，没报错，但是 点击遮罩关闭时，watch 和 clickmask 中 emit 两次，所以此处执行两次
  $vm.$off('update:show');
  $vm.$on('update:show', (val) => {
    $vm.show = val
  });

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
