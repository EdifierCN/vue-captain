<template>
  <div class="zmui-cropper-container">

    <transition name="mask-transition">
      <div class="zmui-cropper_mask" v-show="show"></div>
    </transition>

    <transition name="cropper-transition" @before-enter="beforeEnter" @after-enter="afterEnter" @before-leave="beforeLeave" @after-leave="afterLeave">
      <div class="zmui-cropper" v-show="show">

        <div class="zmui-cropper__content">

          <v-touch class="cropper-box" ref="cropper"
                   @touchstart.native.prevent="onTouchstart"
                   @touchmove.native.prevent="onTouchmove"
                   @touchend.native="onTouchEnd"
                   @pinchstart="onPinchstart"
                   @pinchmove="onPinchmove"
                   @pinchend="onPinchend"
                   @pinchcancel="onPinchend"
                   @doubletap="doubleTapEvent">

            <div :style="draggerStyles" class="cropper-source">
              <div :style="scrollerStyles" class="cropper-source-scroller">
                <img :style="zoomerStyles" class="cropper-source-zoomer" :src="currentUrl" alt="">
              </div>
            </div>

            <div class="cropper-modal" :class="{'is-touching': !isStatic}">
            </div>

            <div :style="draggerStyles" class="cropper-dragger">
              <div class="cropper-preview">
                <div :style="scrollerStyles" class="cropper-preview-scroller" >
                  <img :style="zoomerStyles" class="cropper-preview-zoomer" :src="currentUrl" alt="">
                </div>
              </div>
              <span class="cropper-dashed dashed-h"></span>
              <span class="cropper-dashed dashed-v"></span>
              <span class="cropper-face">
              </span>
              <span class="cropper-line line-e" data-direction="e"></span>
              <span class="cropper-line line-n" data-direction="n"></span>
              <span class="cropper-line line-w" data-direction="w"></span>
              <span class="cropper-line line-s" data-direction="s"></span>
              <span class="cropper-point point-ne" data-direction="ne"></span>
              <span class="cropper-point point-nw" data-direction="nw"></span>
              <span class="cropper-point point-sw" data-direction="sw"></span>
              <span class="cropper-point point-se" data-direction="se"></span>
            </div>
          </v-touch>

        </div>

        <transition name="opr-transition">
          <div class="zmui-cropper__opr" v-show="active">
            <slot name="opr">
              <a href="javascript:" class="zmui-cropper__btn" @click="onCancel">
                取消
              </a>
              <a href="javascript:" class="zmui-cropper__btn" :class="{'is-disabled': !changed}" @click="onReset">
                还原
              </a>
              <a href="javascript:" class="zmui-cropper__btn" @click="onSave">
                完成
              </a>
              <a href="javascript:" class="zmui-cropper__btn zmui-cropper__rotate" @click="onRotate" v-show="isStatic">
                旋转
              </a>
            </slot>
          </div>
        </transition>

      </div>
    </transition>

  </div>
</template>

<script>

  import Vue from 'vue'
  const VueTouch = require('vue-touch');

  VueTouch.registerCustomEvent('doubletap', {
    type: 'tap',
    taps: 2,
  });

  Vue.use(VueTouch, {name: 'v-touch'});

  // 对于旋转，可在旋转完的瞬间，将图片替换为canvas旋转后的
  // 图片的四个方向可做缓存处理
  // PS：此处使用的mui的zoom， 存在问题，双值缩放的时候，飘得有点厉害。
  // hammer的pinchend事件有时不触发

  export default{
    name: 'cropper',
    props:{
      value: Boolean,
      url: {
        type: String,
        default: ''
      },
      speed: {
        type: Number,
        default: 300
      },
      maxZoom: {
        type: Number,
        default: 3
      },
      minZoom: {
        type: Number,
        default: 1
      }
    },
    data(){
      return {
        // 显隐控制
        show: false,
        active: false,
        inited: false,
        changed: false,
        rotating: false,
        touching: false,
        isStatic: true,
        cropped: false,

        // 四个顶点的坐标，暂时无用
        pointNW:{
          x: 0,
          y: 0
        },
        pointNE:{
          x: 0,
          y: 0
        },
        pointSW:{
          x: 0,
          y: 0
        },
        pointSE:{
          x: 0,
          y: 0
        },

        // 截取框
        draggerW: 0,
        draggerH: 0,
        draggerL: 0,
        draggerT: 0,

        // 目标节点的宽高
        targetW: 0,
        targetH: 0,

        // 变量
        initScale: 1,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        isGesturing: false,
        angle: 0,

        // scroller
        sTranslateX: 0,
        sTranslateY: 0,
        sTranslateZ: 0,
        sDuration: 300,

        // zoomer
        zTranslateX: 0,
        zTranslateY: 0,
        zTranslateZ: 0,
        zDuration: 300,

        // 实际尺寸
        source: {
          url: '',
          width: 0,
          height: 0,
          naturalWidth: 0,
          naturalHeight: 0
        },

        currentUrl: ''
      }
    },
    computed: {
      zoomerStyles(){
        return {
          width: this.targetW ? this.targetW + 'px' : 'auto',
          height: this.targetH ? this.targetH + 'px' : 'auto',
          webkitTransform: 'translate3d('+ this.zTranslateX +'px, '+ this.zTranslateY +'px, '+ this.zTranslateZ +'px) scale(' + this.scale + ')',
          transform: 'translate3d('+ this.zTranslateX +'px, '+ this.zTranslateY +'px, '+ this.zTranslateZ +'px) scale(' + this.scale + ')',
          webkitTransition: 'webkitTransform '+ this.zDuration +'ms',
          transition: 'transform '+ this.zDuration +'ms',
        }
      },
      scrollerStyles(){
        return {
          webkitTransform: 'translate3d('+ this.sTranslateX +'px, '+ this.sTranslateY +'px, '+ this.sTranslateZ +'px)',
          transform: 'translate3d('+ this.sTranslateX +'px, '+ this.sTranslateY +'px, '+ this.sTranslateZ +'px)',
          webkitTransition: 'webkitTransform '+ this.sDuration +'ms',
          transition: 'transform '+ this.sDuration +'ms'
        }
      },
      draggerStyles(){
        this.resetDragger();

        return {
          left: this.draggerL + 'px',
          top: this.draggerT + 'px',
          width: this.draggerW  + 'px',
          height: this.draggerH  + 'px',
          transition: 'transform 300ms'
        }
      }
    },
    created(){
      this.show = this.value;
    },
    mounted(){
      const cropper = this.$refs.cropper.$el;
      this.wrapper = cropper.querySelector('.cropper-preview');
      this.scroller = cropper.querySelector('.cropper-preview-scroller');
      this.zoomer = cropper.querySelector('.cropper-preview-zoomer');

      this.targetIsTouched, this.targetIsMoved, this.targetCurrentX, this.targetCurrentY, this.targetMinX, this.targetMinY, this.targetMaxX, this.targetMaxY, this.targetTouchesStart = {},
      this.targetTouchesCurrent = {},
      this.targetStartX, this.targetStartY, this.velocityPrevPositionX, this.velocityPrevTime, this.velocityX, this.velocityPrevPositionY, this.velocityY;
      if( this.zoomer.tagName === 'IMG' ){
        this.imgLoader(this.zoomer, () => {
          this.init();
        })
      }

      window.addEventListener('resize', () => {
        this.init();
      }, false)

    },
    watch: {
      value(val){
        this.show = val;
      },
      show(val){
        this.$emit('input', val);
      },
      url(val){
        this.source.url = this.currentUrl = val;
        this.inited = false;
      }
    },
    methods:{
      resetDragger(){
        const winW = document.documentElement.clientWidth || document.body.clientWidth;
        const winH = document.documentElement.clientHeight || document.body.clientHeight;

        const winMin = Math.min(winW, winH);

        this.draggerW = winMin * 0.8;
        this.draggerH = winMin * 0.8;

        this.draggerT = winW === winMin ? winMin * 0.26 : (winH-this.draggerH)/2;
        this.draggerL = winW === winMin ?  winMin * 0.1 : (winW-this.draggerW)/2;
      },
      init(){
        this.resetDragger();
        this.targetW = this.zoomer.naturalWidth || this.draggerW;
        this.targetH = this.zoomer.naturalHeight || this.draggerH;

        this.pointNW = {
          x: this.draggerL,
          y: this.draggerT
        };

        this.pointNE = {
          x: this.draggerL + this.draggerW,
          y: this.draggerT
        };

        this.pointSW = {
          x: this.draggerL,
          y: this.draggerT + this.draggerH
        };

        this.pointSE = {
          x: this.draggerW + this.draggerL,
          y: this.draggerH + this.draggerT
        };

        if(this.currentUrl === ''){
          return;
        }

        // 注意：不是按原图比例伸缩！
        let radio = 1;
        if( this.targetW/this.targetH > this.draggerW/this.draggerH ){
          // 高度
          this.targetH = this.draggerH;
          radio = this.targetH/this.zoomer.naturalHeight;
          this.targetW = this.zoomer.naturalWidth*radio;
        }else{
          // 宽度
          this.targetW = this.draggerW;
          radio = this.targetW/this.zoomer.naturalWidth;
          this.targetH = this.zoomer.naturalHeight*radio;
        }

        //保留元信息
        if(!this.inited){
          this.source.naturalWidth = this.zoomer.naturalWidth;
          this.source.naturalHeight = this.zoomer.naturalHeight;
          this.source.width = this.targetW;
          this.source.height = this.targetH;
          this.inited = true;
        }

      },

      onTouchstart(e){
        if(!e.targetTouches[0]) return;
        this.targetIsTouched = true;
        this.targetTouchesStart.x = e.targetTouches[0].pageX;
        this.targetTouchesStart.y = e.targetTouches[0].pageY;
        this.touching = true;
      },
      onTouchmove(e){
        this.isStatic = false;
        if (!this.targetIsTouched) return;
        if (!this.targetIsMoved) {
          let translate = this.parseTranslateMatrix(this.getStyles(this.scroller, 'webkitTransform'));
          this.targetStartX = translate.x || 0;
          this.targetStartY = translate.y || 0;
          this.scrollerTransition(0);
        }

        let scaledWidth = this.targetW * this.scale;
        let scaledHeight = this.targetH * this.scale;

        if (scaledWidth < this.draggerW && scaledHeight < this.draggerH) return;

        this.targetMinX = Math.min((this.draggerW / 2 - scaledWidth / 2), 0);
        this.targetMaxX = -this.targetMinX;
        this.targetMinY = Math.min((this.draggerH / 2 - scaledHeight / 2), 0);
        this.targetMaxY = -this.targetMinY;

        this.targetTouchesCurrent.x = e.targetTouches[0].pageX;
        this.targetTouchesCurrent.y = e.targetTouches[0].pageY;

        if (!this.targetIsMoved && !this.isScaling) {
          if (
            (Math.floor(this.targetMinX) === Math.floor(this.targetStartX) && this.targetTouchesCurrent.x < this.targetTouchesStart.x) ||
            (Math.floor(this.targetMaxX) === Math.floor(this.targetStartX) && this.targetTouchesCurrent.x > this.targetTouchesStart.x)
          ) {
            this.targetIsTouched = false;
            return;
          }
        }

        this.targetIsMoved = true;
        this.targetCurrentX = this.targetTouchesCurrent.x - this.targetTouchesStart.x + this.targetStartX;
        this.targetCurrentY = this.targetTouchesCurrent.y - this.targetTouchesStart.y + this.targetStartY;

        if (this.targetCurrentX < this.targetMinX) {
          this.targetCurrentX = this.targetMinX + 1 - Math.pow((this.targetMinX - this.targetCurrentX + 1), 0.8);
        }
        if (this.targetCurrentX > this.targetMaxX) {
          this.targetCurrentX = this.targetMaxX - 1 + Math.pow((this.targetCurrentX - this.targetMaxX + 1), 0.8);
        }

        if (this.targetCurrentY < this.targetMinY) {
          this.targetCurrentY = this.targetMinY + 1 - Math.pow((this.targetMinY - this.targetCurrentY + 1), 0.8);
        }
        if (this.targetCurrentY > this.targetMaxY) {
          this.targetCurrentY = this.targetMaxY - 1 + Math.pow((this.targetCurrentY - this.targetMaxY + 1), 0.8);
        }

        if (!this.velocityPrevPositionX) this.velocityPrevPositionX = this.targetTouchesCurrent.x;
        if (!this.velocityPrevPositionY) this.velocityPrevPositionY = this.targetTouchesCurrent.y;
        if (!this.velocityPrevTime) this.velocityPrevTime = Date.now();
        this.velocityX = (this.targetTouchesCurrent.x - this.velocityPrevPositionX) / (Date.now() - this.velocityPrevTime) / 2;
        this.velocityY = (this.targetTouchesCurrent.y - this.velocityPrevPositionY) / (Date.now() - this.velocityPrevTime) / 2;
        if (Math.abs(this.targetTouchesCurrent.x - this.velocityPrevPositionX) < 2) this.velocityX = 0;
        if (Math.abs(this.targetTouchesCurrent.y - this.velocityPrevPositionY) < 2) this.velocityY = 0;
        this.velocityPrevPositionX = this.targetTouchesCurrent.x;
        this.velocityPrevPositionY = this.targetTouchesCurrent.y;
        this.velocityPrevTime = Date.now();
        this.scrollerTransform(this.targetCurrentX, this.targetCurrentY);
      },
      onTouchEnd(e){
        if (!e.touches.length) {
          this.isGesturing = false;
        }
        if (!this.targetIsTouched || !this.targetIsMoved) {
          this.targetIsTouched = false;
          this.targetIsMoved = false;
          return;
        }

        this.targetIsTouched = false;
        this.targetIsMoved = false;

        let momentumDurationX = 300;
        let momentumDurationY = 300;
        let momentumDistanceX = this.velocityX * momentumDurationX;
        let newPositionX = this.targetCurrentX + momentumDistanceX;
        let momentumDistanceY = this.velocityY * momentumDurationY;
        let newPositionY = this.targetCurrentY + momentumDistanceY;

        if (this.velocityX !== 0) momentumDurationX = Math.abs((newPositionX - this.targetCurrentX) / this.velocityX);
        if (this.velocityY !== 0) momentumDurationY = Math.abs((newPositionY - this.targetCurrentY) / this.velocityY);

        let momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        this.targetCurrentX = newPositionX;
        this.targetCurrentY = newPositionY;

        let scaledWidth = this.targetW * this.scale;
        let scaledHeight = this.targetH * this.scale;

        this.targetMinX = Math.min((this.draggerW / 2 - scaledWidth / 2), 0);
        this.targetMaxX = -this.targetMinX;
        this.targetMinY = Math.min((this.draggerH / 2 - scaledHeight / 2), 0);
        this.targetMaxY = -this.targetMinY;
        this.targetCurrentX = Math.max(Math.min(this.targetCurrentX, this.targetMaxX), this.targetMinX);
        this.targetCurrentY = Math.max(Math.min(this.targetCurrentY, this.targetMaxY), this.targetMinY);

        this.scrollerTransition(momentumDuration).scrollerTransform(this.targetCurrentX, this.targetCurrentY);
        this.checkTouching();
      },

      onPinchstart(e){
        this.isGesturing = true;
        this.touching = true;
      },
      onPinchmove(e){
        if (!this.isScaling) {
          this.zoomerTransition(0);
          this.isScaling = true;
        }
        this.isStatic = false;
        this.scale = (e.scale) * this.currentScale;
        if (this.scale > this.maxZoom) {
          this.scale = this.maxZoom - 1 + Math.pow((this.scale - this.maxZoom + 1), 0.5);
        }
        if (this.scale < this.minZoom) {
          this.scale = this.minZoom + 1 - Math.pow((this.minZoom - this.scale + 1), 0.5);
        }
        this.zoomerTransform(this.scale);
      },
      onPinchend(e){
        this.scale = Math.max(Math.min(this.scale, this.maxZoom), this.minZoom);
        this.zoomerTransition(this.speed).zoomerTransform(this.scale);
        this.currentScale = this.scale;
        this.isScaling = false;
        this.touching = false;
        this.checkTouching();
      },

      doubleTapEvent(e){
        this.touching = true;
        this.isStatic = false;
        this.toggleZoom(e.center);
        this.checkTouching();
      },
      toggleZoom(position, speed){
        if (typeof position === 'number') {
          speed = position;
          position = undefined;
        }
        speed = typeof speed === 'undefined' ? this.speed : speed;
        if (this.scale && this.scale !== this.initScale) {
          this.scale = this.currentScale = this.initScale;
          this.scrollerTransition(speed).scrollerTransform(0, 0);
        } else {
          this.scale = this.currentScale = this.maxZoom;
          if (position) {
            const offset = this.getOffset(this.zoomer);
            let top = offset.top;
            let left = offset.left;

            let offsetX = (position.x - left) * this.scale;
            let offsetY = (position.y - top) * this.scale;

            this._cal();

            if (offsetX >= this.targetMaxX && offsetX <= (this.targetMaxX + this.draggerW)) { //center
              offsetX = this.targetMaxX - offsetX + this.draggerW / 2;
            } else if (offsetX < this.targetMaxX) { //left
              offsetX = this.targetMaxX - offsetX + this.draggerW / 2;
            } else if (offsetX > (this.targetMaxX + this.draggerW)) { //right
              offsetX = this.targetMaxX + this.draggerW - offsetX - this.draggerW / 2;
            }
            if (offsetY >= this.targetMaxY && offsetY <= (this.targetMaxY + this.draggerH)) { //middle
              offsetY = this.targetMaxY - offsetY + this.draggerH / 2;
            } else if (offsetY < this.targetMaxY) { //top
              offsetY = this.targetMaxY - offsetY + this.draggerH / 2;
            } else if (offsetY > (this.targetMaxY + this.draggerH)) { //bottom
              offsetY = this.targetMaxY + this.draggerH - offsetY - this.draggerH / 2;
            }
            offsetX = Math.min(Math.max(offsetX, this.targetMinX), this.targetMaxX);
            offsetY = Math.min(Math.max(offsetY, this.targetMinY), this.targetMaxY);

            this.scrollerTransition(speed).scrollerTransform(offsetX, offsetY);
          }else{
            this.scrollerTransition(speed).scrollerTransform(0, 0);
          }
        }
        this.zoomerTransition(speed).zoomerTransform(this.scale);
      },

      checkTouching(){
        this.touching = false;
        let touchTimer = setTimeout(()=>{
          this.isStatic = true;
          clearTimeout(touchTimer);
        },2000)
      },
      scrollerTransition(time){
        this.sDuration = time || 0;
        return this;
      },
      scrollerTransform(x, y){
        this.sTranslateX = x || 0;
        this.sTranslateY = y || 0;

        if(x > 20 || y > 20 || x < -20 || y < -20){
          this.changed = true;
        }
        return this;
      },
      zoomerTransition(time){
        this.zDuration = time || 0;
        return this;
      },
      zoomerTransform(scale){
        this.zTranslateX = this.zTranslateY = 0;
        this.scale = scale || this.initScale;
        this.changed = true;
        return this;
      },
      setZoom(newScale){
        this.scale = this.currentScale = newScale || this.initScale;
        this.scrollerTransition(this.speed).scrollerTransform(0, 0);
        this.zoomerTransition(this.speed).zoomerTransform(this.scale);
      },

      _cal(){
        let scaledWidth = this.targetW * this.scale;
        let scaledHeight = this.targetH * this.scale;
        this.targetMinX = Math.min((this.draggerW / 2 - scaledWidth / 2), 0);
        this.targetMaxX = -this.targetMinX;
        this.targetMinY = Math.min((this.draggerH / 2 - scaledHeight / 2), 0);
        this.targetMaxY = -this.targetMinY;
      },

      onRotate(){
        if(this.rotating){
          return
        }
        this.rotating = true;
        this.setZoom();
        this.angle -= 90;
        this.createNewImg(this.source, this.angle, (data, ww, hh) => {
          this.currentUrl = data;

          this.targetW = ww;
          this.targetH = hh;
          this.rotating = false;
          this.changed = true;
        })
      },

      onReset(){
        if(!this.changed){
          return false
        }
        this.setZoom();
        this.currentUrl = this.source.url;
        this.targetW = this.source.width;
        this.targetH = this.source.height;
        this.angle = 0;
        this.changed = false;
        this.cropped = false;
      },

      onSave(){
        if(this.cropped){
          return
        }
        this.cropped = true;

        let img = this.zoomer;
        let mimeType = this.getImageType(img.src);
        let cvs = document.createElement('canvas');
        let ctx = cvs.getContext('2d');
        let radio;

        if( this.angle % 360 % 180 !== 0){
          radio = this.targetW/this.source.naturalHeight;
        }else{
          radio = this.targetW/this.source.naturalWidth;
        }

        let x = this.targetW*this.scale/2 - this.sTranslateX - this.draggerW/2;
        let y = this.targetH*this.scale/2 - this.sTranslateY - this.draggerH/2;
        cvs.width = this.draggerW;
        cvs.height = this.draggerH;
        ctx.drawImage(img, x/radio/this.scale, y/radio/this.scale, cvs.width/radio/this.scale, cvs.height/radio/this.scale, 0 , 0, this.draggerW, this.draggerH);
        let cropData = cvs.toDataURL(mimeType, 1);
        this.currentUrl = cropData;
        this.targetW = this.draggerW;
        this.targetH = this.draggerH;
        this.setZoom();
        this.$emit('on-save', {
          url: cropData,
          width: cvs.width,
          height: cvs.height,
          source: this.source,
          timeStamp: Date.now()
        });
      },

      onCancel(){
        this.show = false;
      },

      createNewImg(source, angle, callback){
        let cvs = document.createElement('canvas');
        let ctx = cvs.getContext('2d');

        let mimeType = this.getImageType(source.url);
        let w = source.naturalWidth, h = source.naturalHeight;
        let ww = source.width, hh = source.height;
        cvs.width = source.naturalWidth;
        cvs.height = source.naturalHeight;

        angle %= 360;

        if(angle === 0){   // up
          return callback(source.url, ww, hh)
        }

        if ((angle % 180) !== 0) {
          [cvs.width, cvs.height] = [cvs.height, cvs.width];
          [ww, hh] = [hh, ww];

          if (angle === -90 || angle === 270) {   // left

            ctx.rotate(-90*Math.PI/180);
            ctx.translate(-w,0);
          } else {    // right

            ctx.rotate(90*Math.PI/180);
            ctx.translate(0,-h);
          }

        } else {  // down

          ctx.rotate(-180*Math.PI/180);
          ctx.translate(-w,-h);
        }

        let img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, w, h, 0, 0, w, h);
          let data = cvs.toDataURL(mimeType, 1);
          callback(data, ww, hh);

          cvs = null;
          ctx = null;
          img = null;
        };
        img.src = source.url;

      },

      getImageType: function _getImageType(str) {
        let mimeType = 'image/jpeg';
        let outputType = str.match(/(image\/[\w]+)\.*/)[0];
        if (typeof outputType !== 'undefined') {
          mimeType = outputType;
        }
        return mimeType;
      },

      // 样式处理
      getOffset(element){
        let box = {
          top : 0,
          left : 0
        };
        if ( typeof element.getBoundingClientRect !== undefined) {
          box = element.getBoundingClientRect();
        }
        return {
          top : box.top + window.pageYOffset - element.clientTop,
          left : box.left + window.pageXOffset - element.clientLeft
        }
      },
      getStyles(element, property){
        let styles = element.ownerDocument.defaultView.getComputedStyle(element, null);
        if (property) {
          return styles.getPropertyValue(property) || styles[property];
        }
        return styles;
      },
      parseTranslateMatrix(translateString, position){
        const translateMatrixRE = /matrix(3d)?\((.+?)\)/;
        let matrix = translateString.match(translateMatrixRE);
        let is3D = matrix && matrix[1];
        if (matrix) {
          matrix = matrix[2].split(",");
          if (is3D === "3d")
            matrix = matrix.slice(12, 15);
          else {
            matrix.push(0);
            matrix = matrix.slice(4, 7);
          }
        } else {
          matrix = [0, 0, 0];
        }
        let result = {
          x: parseFloat(matrix[0]),
          y: parseFloat(matrix[1]),
          z: parseFloat(matrix[2])
        };
        if (position && result.hasOwnProperty(position)) {
          return result[position];
        }
        return result;
      },

      // 加载器
      imgLoader(img, success, error){
        img.onload = () => {
          success && success.call(img, img);
        };
        img.onerror = (e) =>{
          error && error.call(img, img);
        };
      },

      // 浮层打开
      cancelHandler(){
        this.show = false;
      },
      beforeEnter(){

      },
      afterEnter(){
        this.active = true;
      },
      beforeLeave(){
        this.active = false;
      },
      afterLeave(){
        this.onReset();
      }
    }
  }
</script>

<style lang="less">
  @import "./cropper.less";

  .zmui-cropper_mask{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index: 999;
    background-color:#000000;
  }

  .zmui-cropper{
    position:fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:1000;
    overflow: hidden;
  }

  .zmui-cropper__title{
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
    justify-content: flex-end;
  }

  .zmui-cropper__content{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .zmui-cropper__opr{
    position:absolute;
    right:0;
    bottom:0;
    left:0;
    height: 55px;
    color:#FFFFFF;
    background: rgba(3, 3, 3, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #333;
      transform: scaleY(0.5);
    }
  }

  .zmui-cropper__rotate{
    position: absolute;
    top: -40px;
    left: 0;
  }

  .zmui-cropper__btn{
    display:block;
    color: #FFFFFF;
    padding: 5px 15px;

    &.is-disabled{
      color: #333;
    }
  }

  .cropper-transition-enter-active,.cropper-transition-leave-active  {
    transition: all .3s ease;
  }
  .cropper-transition-enter, .cropper-transition-leave-to{
    transform: scale(0.6);
    opacity: 0;
  }
  .cropper-transition-leave, .cropper-transition-enter-to{
    transform: scale(1);
    opacity: 1;
  }

  .mask-transition-enter-active,.mask-transition-leave-active  {
    transition: opacity .3s ease;
  }
  .mask-transition-enter, .mask-transition-leave-to{
    opacity: 0
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
