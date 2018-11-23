import { Confirm as ConfirmComponent } from '../../components/dialog'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  const confirmConstructor = Vue.extend(ConfirmComponent);
  const $vm = new confirmConstructor({
    el: document.createElement('div')
  });
  return $vm
}

export function show ($vm, options) {
  if (typeof options === 'object') {
    mergeOptions($vm, options)
  }else if(typeof options === 'string'){
    $vm.content = options
  }

  $vm.$off('on-cancel');
  $vm.$off('on-confirm');

  $vm.$on('on-cancel', () => {
    options && options.onCancel && options.onCancel()
  });
  $vm.$on('on-confirm', msg => {
    options && options.onConfirm && options.onConfirm(msg)
  });

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

export function prompt($vm, placeholder, options) {
  this.show(Object.assign({}, options, {
    placeholder,
    showInput: true
  }))
}

export function setInputValue($vm, val) {
  $vm.nextTick(() => {
    setTimeout(() => {
      $vm.setInputValue(val)
    }, 10)
  })
}

export default {
  show,
  hide,
  prompt,
  setInputValue
}
