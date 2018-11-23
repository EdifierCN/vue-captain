import Vue from 'vue'
import { createVM, show, hide, prompt, setInputValue } from './util'

let $vm;

if (!$vm) {
  $vm = createVM(Vue)
}

export default {
  show (options) {
    return show.call(this, $vm, options)
  },
  hide () {
    return hide.call(this, $vm)
  },
  prompt(placeholder, options){
    return prompt.call(this, $vm, placeholder, options)
  },
  setInputValue(val){
    return setInputValue.call(this, $vm, val)
  },
}
