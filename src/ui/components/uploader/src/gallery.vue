<template>
<div class="zmui-gallery-container">

  <transition name="mask-transition">
    <div class="zmui-gallery_mask" v-show="show"></div>
  </transition>

  <transition name="gallery-transition" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave">
    <div class="zmui-gallery" v-show="show">

      <transition name="title-transition">
        <div class="zmui-gallery__title" v-show="active">
          <div class="zmui-gallery__title-left"></div>
          <div class="zmui-gallery__title-center">
            <h3>{{ curIndex+1 }}/{{ gallery.length }}</h3>
          </div>
          <div class="zmui-gallery__title-right">
            <a class="zmui-gallery__cancel" href="javascript:" @click="cancelHandler">关闭</a>
          </div>
        </div>
      </transition>

      <div class="zmui-gallery__content">
        <slot name="content">
          <aw-swiper :options="swiperOption" class="zmui-gallery__img" ref="swiper">
            <aw-swiper-slide class="zmui-gallery__slide" v-for="pic in gallery" :key="pic.uid">
              <div class="swiper-zoom-container">
                <img :src="pic.url" :alt="pic.name">
              </div>
            </aw-swiper-slide>
          </aw-swiper>
        </slot>
      </div>

      <transition name="opr-transition">
        <div class="zmui-gallery__opr" v-show="active">
          <slot name="opr">
            <a href="javascript:" class="zmui-gallery__del" @click="delHandler">
              <icon-ivu type="trash-a"></icon-ivu>
            </a>
          </slot>
        </div>
      </transition>

    </div>
  </transition>

</div>
</template>

<script>

  import { AwSwiper,AwSwiperSlide } from '../../swiper'
  import { IconIvu } from '../../icon';

  export default{
    name: 'gallery',
    components:{
      IconIvu,
      AwSwiper,
      AwSwiperSlide
    },
    props:{
      gallery: Array,
      preview: Object,
      value: Boolean
    },
    data(){
      return {
        show: false,
        active: false,
        curIndex: 0,
        swiperOption:{
          spaceBetween : 20,
          zoom : true,
          observer:true,
          observeParents:true
        }
      }
    },
    created(){
      this.show = this.value;
    },
    mounted(){
      this.swiper = this.$refs.swiper.swiper;
      this.bindEvent();
    },
    watch: {
      value(val){
        this.show = val;
      },
      show(val){
        this.$emit('input', val);
      }
    },
    methods:{
      bindEvent(){
        this.swiper.on('slideChangeTransitionEnd', () => {
          this.curIndex = this.swiper.activeIndex;
        })
      },
      cancelHandler(){
        this.show = false;
      },
      delHandler(){
        let index = this.swiper.activeIndex;
        this.curIndex = index <= 0 ? 0 : index-1;
        const file = this.gallery[index];
        this.$emit('on-delete',file)
      },
      beforeEnter(){
        let index = this.gallery.indexOf(this.preview);
        this.curIndex = index;
        this.swiper.slideTo(index, 0, false);
        this.swiper.zoom.out();
      },
      afterEnter(){
        this.active = true;
      },
      beforeLeave(){
        this.active = false;
      }
    }
  }
</script>

<style lang="less">

  @import "../../swiper/lib/swiper.css";

  .zmui-gallery_mask{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 999;
    background-color:#000000;
  }

  .zmui-gallery{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:1000;
    overflow: hidden;
  }

  .zmui-gallery__title{
    position:absolute;
    right:0;
    top:0;
    left:0;
    background-color:#0D0D0D;
    color:#FFFFFF;
    height:50px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .zmui-gallery__title-left{
    flex: 0.5;
    text-align: left;
  }
  .zmui-gallery__title-center{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    line-height: 2;
    font-weight: 400;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .zmui-gallery__title-right{
    flex: 0.5;
    text-align: right;
  }


  .zmui-gallery__content{
    position: absolute;
    top: 50px;
    right: 0;
    bottom: 60px;
    left: 0;
    overflow: hidden;
  }

  .zmui-gallery__cancel{
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #FFFFFF;
  }

  .zmui-gallery__img{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
  }

  .zmui-gallery__slide{
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    display: flex;
    align-items: center;
    justify-content: center;

    >img{
      max-width: 100%;
      max-height: 100%;
    }
  }

  .zmui-gallery__opr{
    position:absolute;
    right:0;
    bottom:0;
    left:0;
    background-color:#0D0D0D;
    color:#FFFFFF;
    line-height:60px;
    text-align:center;
  }

  .zmui-gallery__del{
    display:block;
    i{
      display: inline-block;
      vertical-align: middle;
      color: rgb(255, 255, 255);
      font-size: 30px;
    }
  }

  .gallery-transition-enter-active,.gallery-transition-leave-active  {
    transition: all .3s ease;
  }
  .gallery-transition-enter, .gallery-transition-leave-to{
    transform: scale(0.6);
    opacity: 0;
  }
  .gallery-transition-leave, .gallery-transition-enter-to{
    transform: scale(1);
    opacity: 1;
  }

  .mask-transition-enter-active,.mask-transition-leave-active  {
    transition: opacity .3s ease;
  }
  .mask-transition-enter, .mask-transition-leave-to{
    opacity: 0;
  }
  .mask-transition-leave, .mask-transition-enter-to{
    opacity: 1;
  }

  .title-transition-enter-active{
    transition: transform .3s;
  }
  .title-transition-leave-active{
    transition: transform 0s;
  }
  .title-transition-enter, .title-transition-leave-to{
    transform: translateY(-100%);
  }
  .title-transition-leave, .title-transition-enter-to{
    transform: translateY(0);
  }

  .opr-transition-enter-active{
    transition: transform .3s;
  }
  .opr-transition-leave-active{
    transition: transform 0s;
  }
  .opr-transition-enter, .opr-transition-leave-to{
    transform: translateY(100%);
  }
  .opr-transition-leave, .opr-transition-enter-to{
    transform: translateY(0);
  }


</style>
