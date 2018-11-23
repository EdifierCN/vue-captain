<template>
  <div class="zmui-uploader__input-box" :style="{width: thumb.width-2 + 'px', height: thumb.height-2 + 'px'}">
    <input @change="handleChange" class="zmui-uploader__input" type="file" ref="input"
           :multiple="multiple"
           :accept="accept">
    <slot><icon-ivu type="camera" size="40" color="#666"></icon-ivu></slot>
  </div>
</template>

<script>
  //  将dataURL变成一个blob： https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
  //  demo：https://qiutc.me/post/uploading-image-file-in-mobile-fe.html
  // 图片处理库  https://github.com/JackPu/daycaca/blob/master/src/index.js
  // 解决canvas图片变模糊 https://segmentfault.com/q/1010000002391424，暂未使用

  // Q: 缩略图模糊； A: canvas 放大两倍，使用css限定尺寸
  // PS: 无法用 imageData 来进行操作，改变canvas尺寸后，之前的状态消失；

  // canvas.toBlob()
  //  Q: XHR in Android 4.0 sends empty content for FormData with blob. 导致上传空文档
  //  A: 通过自己包装 FormDataShim 和重写 XMLHttpRequest.prototype.send 函数：
  //  let NFormData = needsFormDataShim() ? FormDataShim : window.FormData;
  //    const oData = new NFormData();
  //    oData.append('file', blob);
  // 文件分片上传可以通过 blob 实现;
  // 水印功能待添加

  import '../../../libs/formdata-shim'
  import ajax from './ajax';
  import EXIF from 'exif-js'
  import { IconIvu } from '../../icon';

  export default{
    name: 'zuploader',
    components:{
      IconIvu
    },
    props:{
      action: {
        type: String,
        default: '//jsonplaceholder.typicode.com/posts/'
      },
      multiple: {   // 是否多选  单选模式不保留原数据
        type: Boolean,
        default: true
      },
      accept: {   //  类型
        type: String,
        default: 'image/gif, image/jpeg, image/png'
      },
      format: {   // 格式
        type: Array,
        default () {
          return ['jpg','jpeg','png'];
        }
      },
      maxNum: {     // 最大数量
        type: Number,
        default: 9
      },
      maxSize: {    // 尺寸
        type: Number
      },
      thumb: {
        type: Object,
        default() {
          return {
            width: 80,
            height: 80,
            quality: 70,
            allowMagnify: true,
            crop: true,
            type: 'image/jpeg'
          }
        }
      },
      headers: {
        type: Object,
        default () {
          return {};
        }
      },
      withCredentials: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'file'
      },
      data: {
        type: Object
      },
      onProgress: {
        type: Function,
        default () {
          return {};
        }
      },
      onSuccess: {
        type: Function,
        default () {
          return {};
        }
      },
      onError: {
        type: Function,
        default () {
          return {};
        }
      },
      onRemove: {
        type: Function,
        default () {
          return {};
        }
      },
      autoUpload: {
        type: Boolean,
        default: true
      },
      defaultFileList: {
        type: Array,
        default() {
          return [
//            {
//              'name': 'a42bdcc1178e62b4694c830f028db5c0',
//              'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//              'thumbnail': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
//            },
//            {
//              'name': 'a42bdcc1178e62b4694c830f028db5c0',
//              'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//              'thumbnail': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
//            }
          ];
        }
      }
    },
    data(){
      return {
        fileList: [],
        tempIndex: 1,
      }
    },
    watch: {
      defaultFileList: {
        immediate: true,
        async handler(fileList) {
          for(let item of fileList){
            let {img} = await this.readFile(item.url);
            let obj = this.formatFile(7, {
              ...item,
              source: null,
              type: this.getImgType(item.url),
              size: img.width * img.height
            });
            this.fileList.push(obj);
          }

          if(!this.multiple){
            this.fileList = this.fileList.slice(0, 1);
          }
        }
      }
    },
    methods:{
      // 选择文件
      handleChange(e){
        let files = e.target.files || e.dataTransfer.files;
        if (!files) {
          return;
        }
        this.checkFile(files);
        this.$refs.input.value = null;
      },

      // 检查文件
      checkFile(files){
        let curFiles = Array.prototype.slice.call(files);
        let totalLen = curFiles.length;

        // check num
        if (!this.multiple){
          curFiles = curFiles.slice(0, 1);
        }else{
          curFiles = curFiles.slice(0, (this.maxNum  && ( this.maxNum - this.fileList.length ) < totalLen) ? ( this.maxNum - this.fileList.length ) : totalLen);
        }

        if (curFiles.length <= 0) return;

        curFiles.forEach(file => {
          console.info(file);

          // check format
          if (this.format.length) {
            const _file_format = file.name.split('.').pop().toLocaleLowerCase();
            const checked = this.format.some(item => item.toLocaleLowerCase() === _file_format);
            if (!checked) {
              this.onErrorHandler('format', file, this.fileList);
              return false;
            }
          }

          // check maxSize
          if (this.maxSize) {
            if (file.size > this.maxSize * 1024) {
              this.onErrorHandler('maxSize', file, this.fileList);
              return false;
            }
          }

         this.handleFile(file)
           .then((data) => {
            console.info(data);

            this.$emit('on-before-upload', data);
            this.autoUpload && this.upload(data)
           })
           .catch(() => {
             console.log('format fail!');
           })

        });
      },

      // 校验提示
      onErrorHandler(status){
        switch (status){
          case 'format': console.log('格式不符!');break;
          case 'maxSize': console.log('尺寸过大!');break;
          default: console.log('warning!')
        }
      },

      // 格式化文件
      async handleFile(file){

        const _file = this.formatFile(0, {
          source: file,
          name: file.name,
          type: file.type,
          size: file.size,
          sizeFormat: this.formatSize(file.size),
        });

        // 单选清空
        if(!this.multiple){
          this.clearFiles();
        }
        this.fileList.push(_file);

        const sourceObj = await this.readFile(file);
        const adjustUrl = this.adjustImg(sourceObj.img, sourceObj.orientation);
        const thumbUrl = await this.makeThumb(adjustUrl, this.thumb);

        _file.preview_percentage = 100;

        await this.delayPromise(300);

        _file.status = 3;
        _file.url = adjustUrl;
        _file.thumbnail = thumbUrl;
        return _file
      },

      delayPromise(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      },

      // 上传文件
      upload(file){
//        let formData = new FormData();
//        formData.append(this.name, file);
        ajax({
          headers: this.headers,
          withCredentials: this.withCredentials,
          file: file,
          data: this.data,
          filename: this.name,
          action: this.action,
          onProgress: e => {
            this.handleProgress(e, file);
          },
          onSuccess: res => {
            this.handleSuccess(res, file);
          },
          onError: (err, response) => {
            this.handleError(err, response, file);
          }
        });
      },

      // 上传处理
      handleProgress (e, file) {
        const _file = this.getFile(file);
        this.onProgress(e, _file, this.fileList);
        _file.upload_percentage = e.percent || 0;
      },
      handleSuccess (res, file) {
        const _file = this.getFile(file);
        if (_file) {
          console.info('上传成功！');
          _file.response = res;
          this.onSuccess(res, _file, this.fileList);
          this.$nextTick(() => {
            _file.status = 6;
            _file.upload_showProgress = false;
          });
        }
      },
      handleError (err, response, file) {
        const _file = this.getFile(file);
        const fileList = this.fileList;
        console.info('上传失败！');
        fileList.splice(fileList.indexOf(_file), 1);
        this.onError(err, response, file);
        this.$nextTick(() => {
          this.handleRemove(_file)
        });
      },


      // 获取文件
      getFile (file) {
        const fileList = this.fileList;
        let target;
        fileList.every(item => {
          target = file.uid === item.uid ? item : null;
          return !target;
        });
        return target;
      },

      // 删除文件
      handleRemove(file) {
        const fileList = this.fileList;
        fileList.splice(fileList.indexOf(file), 1);
        this.onRemove(file, fileList);
      },

      // 清空队列
      clearFiles() {
        this.fileList = [];
      },

      formatFile(status = 0, args){
        let now = Date.now() || new Date().getTime();
        args = args !== null && typeof args === 'object' ? args : {};
        return {
          ...args,
          status: status,    // 0:queued => 1:before_preview => 2:previewing => 3:previewed => 4:before_upload => 5:uploading => 6:uploaded => 7:finish
          uid: now + this.tempIndex++,
          thumb:{
            width: this.thumb.width,
            height: this.thumb.height
          },
          time_stamp: now,
          upload_percentage: status >= 6 ? 100: 0,
          upload_showProgress: status < 6,
          preview_percentage: status >= 3 ? 100: 0,
          preview_showProgress: status < 3,
        };
      },
      // 格式化 size
      formatSize(size){
        return size / 1024 > 1024 ? (~~(10 * size / 1024 / 1024)) / 10 + "MB" : ~~(size / 1024) + "KB";
      },
      getImgType(src){
        const imageReg = /\.(png|jpeg|jpg|gif|bmp)/;
        const arr = imageReg.exec(src);
        let mimeType = 'image/jpeg';

        if (arr && arr[1]) {
          mimeType = 'image/' + arr[1]
        }
        return mimeType;
      },
      isFileObj(source){
        return (typeof source === 'object' && source.type && source.size > 0)
      },
      readFile(source){
        return new Promise((resolve, reject) => {
          const loadImg = (src, callback) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
              callback && callback(img);
            };
            img.orror = () => {
              reject(new Error('image load error!'))
            };
            img.src = src;
          };

          let orientation = 1;

          if(this.isFileObj(source)){
            const reader = new FileReader();
            reader.onload = (e) => {
              loadImg(e.target.result, (img) => {
                EXIF.getData(source, function () {
                  orientation = EXIF.getTag(this, 'Orientation') || 1;
                  resolve({img, 'src': img.src, orientation})
                });
              })
            };
            reader.onerror = () => {
              reject(new Error('file read error!'))
            };
            reader.readAsDataURL(source)
          }else{
            loadImg(source, (img) => {
              resolve({img, 'src': source, orientation})
            })
          }
        })
      },
      adjustImg(img, orientation){
        const cvs = document.createElement("canvas");
        const ctx = cvs.getContext('2d');

        let width = img.width;
        let height = img.height;

        let ratio = 1;
        if ((ratio = width * height / 4000000) > 1) {
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        }

        let naturalW = width,
          naturalH = height;

        switch ( orientation ) {
          case 5:
          case 6:
          case 7:
          case 8:
            naturalW = height;
            naturalH = width;
            break;
        }

        cvs.width = naturalW;
        cvs.height = naturalH;

        switch ( orientation ) {
          case 2:    // horizontal flip
            ctx.translate( width, 0 );
            ctx.scale( -1, 1 );
            break;

          case 3:    // 180 rotate left
            ctx.translate( width, height );
            ctx.rotate( Math.PI );
            break;

          case 4:    // vertical flip
            ctx.translate( 0, height );
            ctx.scale( 1, -1 );
            break;

          case 5:    // vertical flip + 90 rotate right
            ctx.rotate( 90 * Math.PI / 180);
            ctx.scale( 1, -1 );
            break;

          case 6:    // 90 rotate right
            ctx.rotate( 90 * Math.PI / 180 );
            ctx.translate( 0, -height);
            break;

          case 7:    // horizontal flip + 90 rotate right
            ctx.rotate( 0.5 * Math.PI );
            ctx.translate( width, -height );
            ctx.scale( -1, 1 );
            break;

          case 8:    // 90 rotate left
            ctx.rotate( -0.5 * Math.PI );
            ctx.translate( -width, 0 );
            break;
        }

        ctx.drawImage(img, 0, 0, width, height);
        return cvs.toDataURL(this.getImgType(img.src), 1);
      },
      makeThumb(url, opts){
        return new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = () => {
            const thumbCvs = document.createElement('canvas'),
                  thumbCtx = thumbCvs.getContext('2d');

            let naturalW = img.width,
                naturalH = img.height;
            let thumbW = opts.width * 2,
                thumbH = opts.height* 2;
            let scale, w, h, x, y;

            // 如果 width/height 的值介于 0 - 1, 说明设置的是百分比。
            if ( thumbW <= 1 && thumbW > 0 ) {
              thumbW = naturalW * thumbW;
            }
            if ( thumbH <= 1 && thumbH > 0 ) {
              thumbH = naturalH * thumbH;
            }

            scale = Math[ opts.crop ? 'max' : 'min' ]( thumbW / naturalW, thumbH / naturalH );

            // 不允许放大。
            opts.allowMagnify || (scale = Math.min( 1, scale ));

            w = naturalW * scale;
            h = naturalH * scale;

            if ( opts.crop ) {
              thumbCvs.width = thumbW;
              thumbCvs.height = thumbH;

              x = (thumbCvs.width - w) / 2;
              y = (thumbCvs.height - h) / 2;

            } else {
              thumbCvs.width = w;
              thumbCvs.height = h;

              x = 0;
              y = 0;
            }

            thumbCtx.drawImage(img, x, y, w, h);
            const thumbUrl = thumbCvs.toDataURL(opts.type, opts.quality/100);
            resolve(thumbUrl)
          };

          img.onerror = () => {
            reject(new Error('make thumb fail!'))
          };
          img.src = url;
        });
      },

      // dataUrl 转blob
      dataUrlToBlob(dataUrl){
        let binaryString = atob(dataUrl.slit(',')[1]);
        let arrayBuffer = new ArrayBuffer(binaryString.length);
        let intArray = new Unit8Array(arrayBuffer);
        let mime = dataUrl.split(',')[0].match(/:(.*?);/)[1];

        for(let i=0,j=binaryString.length; i<j; i++){
          intArray[i] = binaryString.charCodeAt(i);
        }
        let data = [intArray];
        let result;
        try {
          result = new Blob(data, { type: mime });
        } catch (error) {
          window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
          if (error.name === 'TypeError' && window.BlobBuilder){
            let builder = new BlobBuilder();
            builder.append(arrayBuffer);
            result = builder.getBlob(type);
          } else {
            throw new Error('to blob fail!');
          }
        }
        return result;
      },

    }
  }
</script>

<style lang="less">
  .zmui-uploader__input-box {
    position: relative;
    margin-left: 9px;
    margin-bottom: 9px;
    border-width: 1px;
    border-style: dashed;
    border-color: rgb(217, 217, 217);
    border-image: initial;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .zmui-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
