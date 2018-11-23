<template>
  <div>

    <div class="zmui-uploader-list">
      <div class="zmui-uploader-list__hd" v-if="header">
        <p class="zmui-uploader-list__title">图片上传</p>
        <div class="zmui-uploader-list__info">{{ fileList.length }}/{{ maxNum }}</div>
      </div>

      <div class="zmui-uploader-list__bd" v-if="orientation === 'horizontal'">
        <aw-swiper class="zmui-uploader-list__files" ref="thumbnail" :class="`zmui-uploader-list--${orientation}`" :options="{spaceBetween : 10,slidesPerView : 'auto', slideToClickedSlide: true}">
          <aw-swiper-slide class="zmui-uploader-list__file zmui-uploader__slide" v-for="item in fileList" :key="item.uid" :style="{width: item.thumb.width + 'px', height: item.thumb.height + 'px'}">
            <template v-if="item.status >= 3">
              <img :src="item.thumbnail" @click="openGallery(item)" :style="{maxWidth: item.thumb.width + 'px', maxHeight: item.thumb.height+ 'px'}">
            </template>
            <template v-else>
              <progress-bar v-if="item.preview_showProgress" :percent="item.preview_percentage" hide-info></progress-bar>
            </template>
          </aw-swiper-slide>
          <aw-swiper-slide class="zmui-uploader__slide" v-show="fileList.length < maxNum">
            <slot></slot>
          </aw-swiper-slide>
        </aw-swiper>
      </div>

      <div class="zmui-uploader-list__bd" v-else>
        <ul class="zmui-uploader-list__files" :class="`zmui-uploader-list--${orientation}`">
          <li class="zmui-uploader-list__file" v-for="item in fileList" :key="item.uid" :style="{width: item.thumb.width + 'px', height: item.thumb.height + 'px'}">
            <template v-if="item.status >= 3">
              <img :src="item.thumbnail" @click="openGallery(item)" :style="{maxWidth: item.thumb.width + 'px', maxHeight: item.thumb.height + 'px'}">
            </template>
            <template v-else>
              <progress-bar v-if="item.preview_showProgress" :percent="item.preview_percentage" hide-info></progress-bar>
            </template>
          </li>
          <li>
            <slot></slot>
          </li>
        </ul>
      </div>

    </div>

    <gallery :preview="imgItem"
             :gallery="fileList"
             v-model="show"
             @on-delete="handleDelete"
             v-transfer-dom ></gallery>

  </div>
</template>

<script>

  import TransferDom from '../../../directives/transfer-dom'
  import { AwSwiper, AwSwiperSlide } from '../../swiper'
  import Gallery from './gallery.vue'
  import { ProgressBar } from '../../progress'

  export default {
    name: 'zuploader-list',
    components:{
      AwSwiper,
      AwSwiperSlide,
      Gallery,
      ProgressBar
    },
    directives:{
      TransferDom
    },
    props:{
      orientation: {
        type: String,
        default: 'vertical'
      },
      header:{
        type: Boolean,
        default: true
      },
      fileList: Array,
      maxNum: {
        type: Number,
        default: 9
      }
    },
    data () {
      return {
        show: false,
        imgItem: {}
      }
    },
    mounted(){
      this.$refs.thumbnail && (this.swiper = this.$refs.thumbnail.swiper)
    },
    methods: {
      openGallery(item){
        console.info(item.status);
        if(item.status < 3){
          return
        }
        this.imgItem = item;
        this.show = true;
      },
      closeGallery(){
        this.show = false;
      },
      handleDelete(file){
        if(this.$slots.default[0].componentInstance.$options.name === 'zuploader'){
          const zuploader = this.$slots.default[0].componentInstance;
          zuploader.handleRemove(file);
          this.$nextTick(() => {
            if(this.fileList.length <= 0){
              this.closeGallery();
            }
          });

        }
      }
    },
    watch:{
      fileList(){
        this.$nextTick(() => {
          let len = this.fileList.length;
          let index = len-1 < 0 ? 0 : len-1;
          this.swiper && this.swiper.slideTo(index, 500, false);
        });

      }
    }
  }
</script>

<style lang="less">

  .zmui-uploader-list{
    /*padding: 10px 0;*/
    position: relative;
    line-height: 1.47058824;
    font-size: 17px;
    background-color: #FFFFFF;

    /*&:after, &:before {*/
      /*content: " ";*/
      /*position: absolute;*/
      /*left: 0;*/
      /*right: 0;*/
      /*height: 1px;*/
      /*color: #e5e5e5;*/
      /*z-index: 2;*/
    /*}*/

    /*&:after {*/
      /*bottom: 0;*/
      /*border-bottom: 1px solid #e5e5e5;*/
      /*-webkit-transform-origin: 0 100%;*/
      /*transform-origin: 0 100%;*/
      /*-webkit-transform: scaleY(.5);*/
      /*transform: scaleY(.5);*/
    /*}*/

    /*&:before {*/
      /*top: 0;*/
      /*border-top: 1px solid #e5e5e5;*/
      /*-webkit-transform-origin: 0 0;*/
      /*transform-origin: 0 0;*/
      /*-webkit-transform: scaleY(.5);*/
      /*transform: scaleY(.5);*/
    /*}*/

    .zmui-uploader-list__hd{
      display:-webkit-box;
      display:-webkit-flex;
      display:flex;
      padding: 0 15px 10px 15px;
      -webkit-box-align:center;
      -webkit-align-items:center;
      align-items:center;
    }
    .zmui-uploader-list__title{
      -webkit-box-flex:1;
      -webkit-flex:1;
      flex:1;
    }
    .zmui-uploader-list__info{
      color:#B2B2B2;
    }
    .zmui-uploader-list__bd{
      overflow:hidden;
    }
    .zmui-uploader-list__files{
      list-style:none;
      overflow: hidden;
      li{
        float:left;
      }
    }
    .zmui-uploader-list__file{
      margin-left:9px;
      margin-bottom:9px;
      display: flex;
      align-items: center;
      justify-content: center;
      background:no-repeat center center;
      background-size:cover;
      border: 1px solid transparent;
      border-radius: 6px;
      overflow: hidden;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
  }

  .zmui-uploader-list--horizontal{
    padding: 0 10px!important;
    box-sizing: border-box!important;
    .swiper-slide{
      margin: 0;
      width: auto;
      height: auto;
    }
    .zmui-uploader__input-box{
      margin: 0;
    }
  }
</style>
