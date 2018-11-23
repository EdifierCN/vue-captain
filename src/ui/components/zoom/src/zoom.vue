<template>
  <div class="zmui-zoom">
    <v-touch class="zoom-scroller" ref="scroller"
             @touchstart.native="onTouchstart"
             @touchmove.native="onTouchMove"
             @touchend.native="onTouchEnd"
             @touchcancel.native="onTouchEnd"
             @pinchstart.prevent="onPinchstart"
             @pinchmove.prevent="onPinchmove"
             @pinchend.prevent="onPinchend"
             @doubletap="doubleTapEvent">
        <img :src="src" alt=""  ref="zoomer"/>
    </v-touch>
  </div>
</template>

<script>

  import Vue from 'vue'
  const VueTouch = require('vue-touch');



  export default{
    name: 'zoom',
    props:{
      src: {
        type: String,
        default: 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
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
        scrollerStyle: {},
        zoomerStyle: {},
        scale: 1,
        currentScale: 1,
        isScaling: false,
        isGesturing: false
      }
    },
    mounted(){
      this.wrapper = this.$el;
      this.scroller = this.$refs.scroller.$el;
      this.scrollerStyle = this.scroller && this.scroller.style;
      this.zoomer = this.$refs.zoomer;
      this.zoomerStyle = this.zoomer && this.zoomer.style;

      this.wrapperWidth, this.wrapperHeight, this.imageIsTouched, this.imageIsMoved, this.imageCurrentX, this.imageCurrentY, this.imageMinX, this.imageMinY, this.imageMaxX, this.imageMaxY, this.imageWidth, this.imageHeight, this.imageTouchesStart = {},
      this.imageTouchesCurrent = {},
      this.imageStartX, this.imageStartY, this.velocityPrevPositionX, this.velocityPrevTime, this.velocityX, this.velocityPrevPositionY, this.velocityY;
    },
    methods:{

      onPinchstart(e){
        this.isGesturing = true;
      },
      onPinchmove(e){
        if (!this.isScaling) {
          this.zoomerTransition(0);
          this.isScaling = true;
        }
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
      },
      onTouchstart(e){
        e.preventDefault();
        if(!e.targetTouches[0]) return;
        this.imageIsTouched = true;
        this.imageTouchesStart.x = e.targetTouches[0].pageX;
        this.imageTouchesStart.y = e.targetTouches[0].pageY;
      },
      onTouchMove(e){
        e.preventDefault();
        if (!this.imageIsTouched) return;
        if (!this.imageIsMoved) {

          this.wrapperWidth = this.wrapper.offsetWidth;
          this.wrapperHeight = this.wrapper.offsetHeight;
          this.imageWidth = this.zoomer.offsetWidth;
          this.imageHeight = this.zoomer.offsetHeight;
          let translate = this.parseTranslateMatrix(this.getStyles(this.scroller, 'webkitTransform'));
          this.imageStartX = translate.x || 0;
          this.imageStartY = translate.y || 0;
          this.scrollerTransition(0);
        }

        let scaledWidth = this.imageWidth * this.scale;
        let scaledHeight = this.imageHeight * this.scale;

        if (scaledWidth < this.wrapperWidth && scaledHeight < this.wrapperHeight) return;

        this.imageMinX = Math.min((this.wrapperWidth / 2 - scaledWidth / 2), 0);
        this.imageMaxX = -this.imageMinX;
        this.imageMinY = Math.min((this.wrapperHeight / 2 - scaledHeight / 2), 0);
        this.imageMaxY = -this.imageMinY;

        this.imageTouchesCurrent.x = e.targetTouches[0].pageX;
        this.imageTouchesCurrent.y = e.targetTouches[0].pageY;

        if (!this.imageIsMoved && !this.isScaling) {
          if (
            (Math.floor(this.imageMinX) === Math.floor(this.imageStartX) && this.imageTouchesCurrent.x < this.imageTouchesStart.x) ||
            (Math.floor(this.imageMaxX) === Math.floor(this.imageStartX) && this.imageTouchesCurrent.x > this.imageTouchesStart.x)
          ) {
            this.imageIsTouched = false;
            return;
          }
        }

        this.imageIsMoved = true;
        this.imageCurrentX = this.imageTouchesCurrent.x - this.imageTouchesStart.x + this.imageStartX;
        this.imageCurrentY = this.imageTouchesCurrent.y - this.imageTouchesStart.y + this.imageStartY;

        if (this.imageCurrentX < this.imageMinX) {
          this.imageCurrentX = this.imageMinX + 1 - Math.pow((this.imageMinX - this.imageCurrentX + 1), 0.8);
        }
        if (this.imageCurrentX > this.imageMaxX) {
          this.imageCurrentX = this.imageMaxX - 1 + Math.pow((this.imageCurrentX - this.imageMaxX + 1), 0.8);
        }

        if (this.imageCurrentY < this.imageMinY) {
          this.imageCurrentY = this.imageMinY + 1 - Math.pow((this.imageMinY - this.imageCurrentY + 1), 0.8);
        }
        if (this.imageCurrentY > this.imageMaxY) {
          this.imageCurrentY = this.imageMaxY - 1 + Math.pow((this.imageCurrentY - this.imageMaxY + 1), 0.8);
        }

        //Velocityz
        if (!this.velocityPrevPositionX) this.velocityPrevPositionX = this.imageTouchesCurrent.x;
        if (!this.velocityPrevPositionY) this.velocityPrevPositionY = this.imageTouchesCurrent.y;
        if (!this.velocityPrevTime) this.velocityPrevTime = Date.now();
        this.velocityX = (this.imageTouchesCurrent.x - this.velocityPrevPositionX) / (Date.now() - this.velocityPrevTime) / 2;
        this.velocityY = (this.imageTouchesCurrent.y - this.velocityPrevPositionY) / (Date.now() - this.velocityPrevTime) / 2;
        if (Math.abs(this.imageTouchesCurrent.x - this.velocityPrevPositionX) < 2) this.velocityX = 0;
        if (Math.abs(this.imageTouchesCurrent.y - this.velocityPrevPositionY) < 2) this.velocityY = 0;
        this.velocityPrevPositionX = this.imageTouchesCurrent.x;
        this.velocityPrevPositionY = this.imageTouchesCurrent.y;
        this.velocityPrevTime = Date.now();

        this.scrollerTransform(this.imageCurrentX, this.imageCurrentY);
      },
      onTouchEnd(e){
        if (!e.touches.length) {
          this.isGesturing = false;
        }
        if (!this.imageIsTouched || !this.imageIsMoved) {
          this.imageIsTouched = false;
          this.imageIsMoved = false;
          return;
        }

        this.imageIsTouched = false;
        this.imageIsMoved = false;

        let momentumDurationX = 300;
        let momentumDurationY = 300;
        let momentumDistanceX = this.velocityX * momentumDurationX;
        let newPositionX = this.imageCurrentX + momentumDistanceX;
        let momentumDistanceY = this.velocityY * momentumDurationY;
        let newPositionY = this.imageCurrentY + momentumDistanceY;

        if (this.velocityX !== 0) momentumDurationX = Math.abs((newPositionX - this.imageCurrentX) / this.velocityX);
        if (this.velocityY !== 0) momentumDurationY = Math.abs((newPositionY - this.imageCurrentY) / this.velocityY);

        let momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        this.imageCurrentX = newPositionX;
        this.imageCurrentY = newPositionY;

        let scaledWidth = this.imageWidth * this.scale;
        let scaledHeight = this.imageHeight * this.scale;

        this.imageMinX = Math.min((this.wrapperWidth / 2 - scaledWidth / 2), 0);
        this.imageMaxX = -this.imageMinX;
        this.imageMinY = Math.min((this.wrapperHeight / 2 - scaledHeight / 2), 0);
        this.imageMaxY = -this.imageMinY;
        this.imageCurrentX = Math.max(Math.min(this.imageCurrentX, this.imageMaxX), this.imageMinX);
        this.imageCurrentY = Math.max(Math.min(this.imageCurrentY, this.imageMaxY), this.imageMinY);

        this.scrollerTransition(momentumDuration).scrollerTransform(this.imageCurrentX, this.imageCurrentY);
      },
      doubleTapEvent(e){
        this.toggleZoom(e.center);
      },
      transition(style, time){
        time = time || 0;
        style['webkitTransitionDuration'] = time + 'ms';
        return this
      },
      translate(style, x, y){
        x = x || 0;
        y = y || 0;
        style['webkitTransform'] = 'translate3d(' + x + 'px,' + y + 'px,0px)';
        return this;
      },
      setScale(style, scale){
        scale = scale || 1;
        style['webkitTransform'] = 'translate3d(0,0,0) scale(' + scale + ')';
        return this;
      },
      scrollerTransition(time){
        return this.transition(this.scrollerStyle, time);
      },
      scrollerTransform(x, y){
        return this.translate(this.scrollerStyle, x, y);
      },
      zoomerTransition(time){
        return this.transition(this.zoomerStyle, time);
      },
      zoomerTransform(scale){
        return this.setScale(this.zoomerStyle, scale);
      },
      setZoom(newScale){
        this.scale = this.currentScale = newScale;
        this.scrollerTransition(this.speed).scrollerTransform(0, 0);
        this.zoomerTransition(this.speed).zoomerTransform(this.scale);
      },
      toggleZoom(position, speed){
        if (typeof position === 'number') {
          speed = position;
          position = undefined;
        }
        speed = typeof speed === 'undefined' ? this.speed : speed;
        if (this.scale && this.scale !== 1) {
          this.scale = this.currentScale = 1;
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
            if (offsetX >= this.imageMaxX && offsetX <= (this.imageMaxX + this.wrapperWidth)) { //center
              offsetX = this.imageMaxX - offsetX + this.wrapperWidth / 2;
            } else if (offsetX < this.imageMaxX) { //left
              offsetX = this.imageMaxX - offsetX + this.wrapperWidth / 2;
            } else if (offsetX > (this.imageMaxX + this.wrapperWidth)) { //right
              offsetX = this.imageMaxX + this.wrapperWidth - offsetX - this.wrapperWidth / 2;
            }
            if (offsetY >= this.imageMaxY && offsetY <= (this.imageMaxY + this.wrapperHeight)) { //middle
              offsetY = this.imageMaxY - offsetY + this.wrapperHeight / 2;
            } else if (offsetY < this.imageMaxY) { //top
              offsetY = this.imageMaxY - offsetY + this.wrapperHeight / 2;
            } else if (offsetY > (this.imageMaxY + this.wrapperHeight)) { //bottom
              offsetY = this.imageMaxY + this.wrapperHeight - offsetY - this.wrapperHeight / 2;
            }
            offsetX = Math.min(Math.max(offsetX, this.imageMinX), this.imageMaxX);
            offsetY = Math.min(Math.max(offsetY, this.imageMinY), this.imageMaxY);

            this.scrollerTransition(speed).scrollerTransform(offsetX, offsetY);
          }else{
            this.scrollerTransition(speed).scrollerTransform(0, 0);
          }
        }
        this.zoomerTransition(speed).zoomerTransform(this.scale);
      },
      _cal(){
        this.wrapperWidth = this.wrapper.offsetWidth;
        this.wrapperHeight = this.wrapper.offsetHeight;
        this.imageWidth = this.zoomer.offsetWidth;
        this.imageHeight = this.zoomer.offsetHeight;
        let scaledWidth = this.imageWidth * this.scale;
        let scaledHeight = this.imageHeight * this.scale;
        this.imageMinX = Math.min((this.wrapperWidth / 2 - scaledWidth / 2), 0);
        this.imageMaxX = -this.imageMinX;
        this.imageMinY = Math.min((this.wrapperHeight / 2 - scaledHeight / 2), 0);
        this.imageMaxY = -this.imageMinY;
      },
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
      }
    }
  }
</script>

<style lang="less">

  .zmui-zoom{
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
  }

  .zoom-scroller{
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
  }

  .zmui-zoom > img, .zmui-zoom  > svg, .zmui-zoom  > canvas {
    max-width: 100%;
    max-height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
  }

</style>
