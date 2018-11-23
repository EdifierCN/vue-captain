<template>
  <div v-transfer-dom :id="id" class="zmui-preview-image zmui-preview-fullscreen zmui-slider">
    <div class="zmui-preview-header">
      <span class="zmui-preview-indicator" ref="indicator"></span>
    </div>
    <div class="zmui-preview-body zmui-slider-group" ref="scroller">
      <div class="zmui-slider-item zmui-zoom-wrapper" v-for="(itemData, index) in currentGroup" :class="{ 'zmui-active': index === currentIndex }">
        <div class="zmui-zoom-scroller">
          <img class="zmui-zoom" :src="itemData.src"  :data-preview-lazyload="itemData.lazyload" :style="itemData.sWidth ? '-webkit-transform:translate3d(0,0,0) scale(' + itemData.sScale + ');transform:translate3d(0,0,0) scale(' + itemData.sScale + ')' : ''" >
        </div>
      </div>
    </div>
    <div class="zmui-preview-footer" v-if="hasFooterSlot">
      <slot name="footer"></slot>
    </div>
    <div class="zmui-preview-loading" ref="loader" v-show="loading">
      <span class="zmui-spinner zmui-spinner-white"></span>
    </div>
  </div>
</template>

<script>

  import TransferDom from '../../../directives/transfer-dom'

  export default{
    name: 'magicpop-imgviewer',
    directives: {
      TransferDom
    },
    props:{
      id: {
        type: String,
        default: '__MAGIC_PREVIEWIMAGE',
      },
      zoom: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        defaultGroupName: '__DEFAULT',
        hasFooterSlot: false,
        groups: {},
        currentGroup: [],
        loading: false
      }
    },
    mounted(){
      this.hasFooterSlot = !!this.$slots.footer;
      this.init();
      this.initEvent();
    },
    methods:{
      init(){
        this.scroller = this.$refs.scroller;
        this.indicator = this.$refs.indicator;
        this.loader = this.$refs.loader;
        this.addImages();
      },
      initEvent(){
        const self = this;
        let laterClose = null;

        const tapHandler = function () {
          self.open(this);
          return false;
        };

        Array.from(document.querySelectorAll('img[data-preview-src]')).map((item) => {
          item.addEventListener('tap', tapHandler)
        });

        const laterCloseEvent = function () {
          !laterClose && (laterClose = $z.later(function() {
            self.loader.removeEventListener('tap', laterCloseEvent);
            self.scroller.removeEventListener('tap', laterCloseEvent);
            self.close();
          }, 300));
        };

        self.scroller.addEventListener('doubletap', function() {
          if (laterClose) {
            laterClose.cancel();
            laterClose = null;
          }
        });

        self.$el.addEventListener('webkitAnimationEnd', function() {
          if (self.$el.classList.contains('zmui-preview-out')) { //close
            self.$el.style.display = 'none';
            self.$el.classList.remove('zmui-preview-out');
            self.$el.classList.remove('zmui-preview-in');
            laterClose = null;
          } else { //open
            self.loader.addEventListener('tap', laterCloseEvent);
            self.scroller.addEventListener('tap', laterCloseEvent);
          }
        });

        self.$el.addEventListener('slide', function(e) {
          if (self.zoom) {
            let lastZoomerEl = self.$el.querySelector('.zmui-zoom-wrapper:nth-child(' + (self.lastIndex + 1) + ')');
            if (lastZoomerEl) {
              $z(lastZoomerEl).zoom().setZoom(1);
            }
          }
          let slideNumber = e.detail.slideNumber;
          self.lastIndex = slideNumber;
          self.indicator && (self.indicator.innerText = (slideNumber + 1) + '/' + self.currentGroup.length);

          self.$nextTick(() => {
            self._loadItem(slideNumber);
          })

        });

      },
      addImages(group, index){
        // 当前组别
        this.groups = {};

        let imgs = [];
        if (group) {
          if (group === this.defaultGroupName) {
            imgs = document.querySelectorAll("img[data-preview-src]:not([data-preview-group])");
          } else {
            imgs = document.querySelectorAll("img[data-preview-src][data-preview-group='" + group + "']");
          }
        } else {
          imgs = document.querySelectorAll("img[data-preview-src]");
        }

        if (imgs.length) {
          for (let i = 0, len = imgs.length; i < len; i++) {
            this.addImage(imgs[i]);
          }
        }
      },
      addImage(img){
        // 分组
        let group = img.getAttribute('data-preview-group');
        group = group || this.defaultGroupName;
        if (!this.groups[group]) {
          this.groups[group] = [];
        }
        let src = img.getAttribute('src');
        if (img.__zmui_img_data && img.__zmui_img_data.src === src) { //已缓存且图片未变化
          this.groups[group].push(img.__zmui_img_data);
        } else {
          let lazyload = img.getAttribute('data-preview-src');
          if (!lazyload) {
            lazyload = src;
          }
          let imgObj = {
            src: src,
            lazyload: src === lazyload ? '' : lazyload,
            loaded: src === lazyload,
            sWidth: 0,
            sHeight: 0,
            sTop: 0,
            sLeft: 0,
            sScale: 1,
            el: img
          };
          this.groups[group].push(imgObj);
          img.__zmui_img_data = imgObj;
        }
      },
      _initImgData(itemData, imgEl){
        if (!itemData.sWidth) {
          let img = itemData.el;
          itemData.sWidth = img.offsetWidth;
          itemData.sHeight = img.offsetHeight;
          itemData.sTop = img.offsetTop;
          itemData.sLeft = img.offsetLeft;
          itemData.sScale = Math.max(itemData.sWidth / window.innerWidth, itemData.sHeight / window.innerHeight);
        }
        imgEl.style.webkitTransform = 'translate3d(0,0,0) scale(' + itemData.sScale + ')';
      },
      _getScale(from, to) {
        let scaleX = from.width / to.width;
        let scaleY = from.height / to.height;
        let scale = 1;
        if (scaleX <= scaleY) {
          scale = from.height / (to.height * scaleX);
        } else {
          scale = from.width / (to.width * scaleY);
        }
        return scale;
      },
      _imgTransitionEnd(e) {
        let img = e.target;
        img.classList.remove('zmui-transitioning');
        img.removeEventListener('webkitTransitionEnd', this._imgTransitionEnd.bind(this));
      },
      _loadItem(index, isOpening) { //TODO 暂时仅支持img
        let itemEl = this.scroller.querySelector('.zmui-slider-item:nth-child(' + (index + 1) + ')');
        let itemData = this.currentGroup[index];
        let imgEl = itemEl.querySelector('img');
        this._initImgData(itemData, imgEl);

        if (isOpening) {
          let posi = this._getPosition(itemData);
          imgEl.style.webkitTransitionDuration = '0ms';
          imgEl.style.webkitTransform = 'translate3d(' + posi.x + 'px,' + posi.y + 'px,0) scale(' + itemData.sScale + ')';
        }

        if (!itemData.loaded && imgEl.getAttribute('data-preview-lazyload')) {
          const self = this;
          self.loading = true;
          //移动位置动画
          imgEl.style.webkitTransitionDuration = '0.5s';
          imgEl.addEventListener('webkitTransitionEnd', self._imgTransitionEnd.bind(self));

          imgEl.style.webkitTransform = 'translate3d(0,0,0) scale(' + itemData.sScale + ')';

          this.loadImage(imgEl, function() {
            itemData.loaded = true;
            imgEl.src = itemData.lazyload;
            self._initZoom(itemEl, this.width, this.height);
            imgEl.classList.add('zmui-transitioning');
            imgEl.addEventListener('webkitTransitionEnd', self._imgTransitionEnd.bind(self));
            imgEl.setAttribute('style', '');
            self.loading = false;
          });
        } else {
          itemData.lazyload && (imgEl.src = itemData.lazyload);
          this._initZoom(itemEl, imgEl.width, imgEl.height);
          imgEl.classList.add('zmui-transitioning');
          imgEl.addEventListener('webkitTransitionEnd', this._imgTransitionEnd.bind(this));
          imgEl.setAttribute('style', '');
        }
        this._preloadItem(index + 1);
        this._preloadItem(index - 1);
      },
      _preloadItem(index) {
        let itemEl = this.scroller.querySelector('.zmui-slider-item:nth-child(' + (index + 1) + ')');
        if (itemEl) {
          let itemData = this.currentGroup[index];
          if (itemData.sWidth) {
            let imgEl = itemEl.querySelector('img');
            this._initImgData(itemData, imgEl);
          }
        }
      },
      _initZoom(zoomWrapperEl, zoomerWidth, zoomerHeight) {
        if (!this.zoom) {
          return;
        }
        if (zoomWrapperEl.getAttribute('data-zoomer')) {
          return;
        }
        const zoomEl = zoomWrapperEl.querySelector('.zmui-zoom');
        if (zoomEl.tagName === 'IMG') {
          const self = this;
          const maxZoom = self._getScale({
            width: zoomWrapperEl.offsetWidth,
            height: zoomWrapperEl.offsetHeight
          }, {
            width: zoomerWidth,
            height: zoomerHeight
          });
          $z(zoomWrapperEl).zoom({
            maxZoom: Math.max(maxZoom, 1)
          });
        } else {
          $z(zoomWrapperEl).zoom();
        }
      },
      loadImage(imgEl, callback) {
        const onReady = function() {
          callback && callback.call(this);
        };
        const img = new Image();
        img.onload = onReady;
        img.onerror = onReady;
        img.src = imgEl.getAttribute('data-preview-lazyload');
      },
      getRangeByIndex(index, length) {
        return {
          from: 0,
          to: length - 1
        };
      },
      _getPosition(itemData) {
        let sLeft = itemData.sLeft - window.pageXOffset;
        let sTop = itemData.sTop - window.pageYOffset;
        let left = (window.innerWidth - itemData.sWidth) / 2;
        let top = (window.innerHeight - itemData.sHeight) / 2;
        return {
          left: sLeft,
          top: sTop,
          x: sLeft - left,
          y: sTop - top
        };
      },
      refresh(index, groupArray) {

        this.currentGroup = groupArray;
        this.currentIndex = index;

        for (let i = 0; i < this.currentGroup.length; i++) {
          if (i === this.currentIndex ) {
            this.currentIndex = i;
          }
        }

        this.$el.style.display = 'block';
        this.$el.classList.add('zmui-preview-in');
        this.lastIndex = this.currentIndex;

        setTimeout(() => {
          const instance = $z(this.$el).slider();
          instance.gotoItem(this.currentIndex, 0);
          this.indicator && (this.indicator.innerText = (this.currentIndex + 1) + '/' + this.currentGroup.length);
          this._loadItem(this.currentIndex, true);
        }, 0);

      },
      openByGroup(index, group) {
        index = Math.min(Math.max(0, index), this.groups[group].length - 1);
        this.refresh(index, this.groups[group]);
      },
      open(index, group) {
        if (this.isShown()) {
          return;
        }

        if (typeof index === "number") {
          group = group || defaultGroupName;
          this.addImages(group, index); //刷新当前group
          this.openByGroup(index, group);
        } else {
          group = index.getAttribute('data-preview-group');
          group = group || defaultGroupName;
          this.addImages(group, index); //刷新当前group
          this.openByGroup(this.groups[group].indexOf(index.__zmui_img_data), group);
        }
      },
      close(index, group) {
        if (!this.isShown()) {
          return;
        }
        this.$el.classList.remove('zmui-preview-in');
        this.$el.classList.add('zmui-preview-out');
        const itemEl = this.scroller.querySelector('.zmui-slider-item:nth-child(' + (this.lastIndex + 1) + ')');
        const imgEl = itemEl.querySelector('img');
        if (imgEl) {
          imgEl.classList.add('zmui-transitioning');
          let itemData = this.currentGroup[this.lastIndex];
          let posi = this._getPosition(itemData);
          let sLeft = posi.left;
          let sTop = posi.top;
          if (sTop > window.innerHeight || sLeft > window.innerWidth || sTop < 0 || sLeft < 0) { //out viewport
            imgEl.style.opacity = 0;
            imgEl.style.webkitTransitionDuration = '0.5s';
            imgEl.style.webkitTransform = 'scale(' + itemData.sScale + ')';
          } else {
            if (this.zoom) {
              $z(imgEl.parentNode.parentNode).zoom().toggleZoom(0);
            }
            imgEl.style.webkitTransitionDuration = '0.5s';
            imgEl.style.webkitTransform = 'translate3d(' + posi.x + 'px,' + posi.y + 'px,0) scale(' + itemData.sScale + ')';
          }
        }
        var zoomers = this.$el.querySelectorAll('.zmui-zoom-wrapper');
        for (var i = 0, len = zoomers.length; i < len; i++) {
          $z(zoomers[i]).zoom().destroy();
        }
        $z(this.$el).slider().destroy();
      },
      isShown() {
        return this.$el.classList.contains('zmui-preview-in');
      }
    }
  }
</script>

<style>
  .zmui-preview-image.zmui-preview-fullscreen {
    position: fixed;
    z-index: 20;
    background-color: #000;
  }

  .zmui-preview-fullscreen{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .zmui-preview-fullscreen.zmui-slider .zmui-slider-group {
    height: 100%;
  }

  .zmui-slider .zmui-slider-group {
    font-size: 0;
    position: relative;
    -webkit-transition: all 0s linear;
    transition: all 0s linear;
    white-space: nowrap;
  }

  .zmui-slider .zmui-slider-group .zmui-slider-item {
    font-size: 14px;
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: top;
    white-space: normal;
  }

  .zmui-preview-header,
  .zmui-preview-footer {
    position: absolute;
    width: 100%;
    left: 0;
    z-index: 10;
  }
  .zmui-preview-header {
    height: 44px;
    top: 0;
  }
  .zmui-preview-footer {
    height: 50px;
    bottom: 0;
  }
  .zmui-preview-header .zmui-preview-indicator {
    display: block;
    line-height: 25px;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 4px;
    width: 70px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 12px;
    font-size: 16px;
  }
  .zmui-preview-image {
    display: none;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .zmui-slider .zmui-slider-group .zmui-slider-item img {
    width: 100%;
  }
  .zmui-preview-image.zmui-preview-in {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }
  .zmui-preview-image.zmui-preview-out {
    background: none;
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }
  .zmui-preview-image.zmui-preview-out .zmui-preview-header,
  .zmui-preview-image.zmui-preview-out .zmui-preview-footer {
    display: none;
  }
  .zmui-zoom-scroller {
    position: absolute;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    -webkit-backface-visibility: hidden;
  }
  .zmui-zoom {
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }
  .zmui-slider .zmui-slider-group .zmui-slider-item img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }

  .zmui-preview-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
  }
  .zmui-preview-loading.zmui-active {
    display: block;
  }
  .zmui-preview-loading .zmui-spinner-white {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -25px;
    margin-top: -25px;
    height: 50px;
    width: 50px;
  }
  .zmui-preview-image img.zmui-transitioning {
    -webkit-transition: -webkit-transform 0.5s ease, opacity 0.5s ease;
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @-webkit-keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  p img {
    max-width: 100%;
    height: auto;
  }
</style>
