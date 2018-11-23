import Vue from 'vue'
import Emotion from './emotion.vue'

export default function (index) {
  const EmotionConstructor = Vue.extend(Emotion);
  return  new EmotionConstructor({
    el: document.createElement('div'),
    data:{
      index: index
    }
  });
}
