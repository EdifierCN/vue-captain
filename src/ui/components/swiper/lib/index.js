
/*
* VueAwesomeSwiper
* Author: surmon@foxmail.com
* Github: https://github.com/surmon-china/vue-awesome-swiper
*/


import { Swiper$1 as _Swiper } from './swiper.js'
import SlideComponent from './slide.vue'
import SwiperComponent from './swiper.vue'

const Swiper = window.Swiper || _Swiper
const AwSwiper = SwiperComponent
const AwSwiperSlide = SlideComponent
const install = function (Vue, globalOptions) {
  if (globalOptions) {
    SwiperComponent.props.globalOptions.default = () => globalOptions
  }
  Vue.component(SwiperComponent.name, SwiperComponent)
  Vue.component(SlideComponent.name, SlideComponent)
}
const VueAwesomeSwiper = { Swiper, AwSwiper, AwSwiperSlide, install }

export default VueAwesomeSwiper
export { Swiper, AwSwiper, AwSwiperSlide, install }
