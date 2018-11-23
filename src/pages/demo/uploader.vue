<template>
  <div>

    <divider> 上传+预览 </divider>
    <zuploader-list :fileList="uploadList">
      <zuploader ref="upload" v-show="uploadList.length < 9"></zuploader>
    </zuploader-list>

    <divider> 上传+裁剪 </divider>
    <div>
      <zuploader ref="upload2" :multiple="false" :autoUpload="false" @on-before-upload="beforeUploadHandle"></zuploader>
      <cropper :url="url" v-model="show"></cropper>
    </div>

    <divider> iview-uploader </divider>
    <uploader
      :before-upload="handleUpload"
      action="//jsonplaceholder.typicode.com/posts/">
      <button>戳我</button>
    </uploader>
    <div v-if="file !== null">Upload file: {{ file.name }} <button @click="upload">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</button></div>

  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Uploader,UploaderList, Zuploader, ZuploaderList,Cropper } from '../../ui/components/uploader'

  export default {
    components:{
      Divider,
      Zuploader,
      ZuploaderList,
      Cropper,
      Uploader,UploaderList
    },
    data () {
      return {
        uploadList: [],
        url: '',
        show: false,

        file: null,
        loadingStatus: false
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
      beforeUploadHandle(file){
        this.url = file.url;
        this.show = true;
      },

      handleUpload (file) {
        this.file = file;
        return false;
      },
      upload () {
        this.loadingStatus = true;
        setTimeout(() => {
          this.file = null;
          this.loadingStatus = false;
        }, 1500);
      }
    }
  }
</script>
