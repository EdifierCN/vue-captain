import Vue from 'vue'
import { createVM, show, hide, text } from './util'

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
  text(txt, position){
    return text.call(this, $vm, txt, position)
  }
}
