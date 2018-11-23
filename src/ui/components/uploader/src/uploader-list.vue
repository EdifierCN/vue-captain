<template>
  <ul :class="[prefixCls + '-list']">
    <li
      v-for="file in files"
      :class="fileCls(file)"
      @click="handleClick(file)">
            <span @click="handlePreview(file)">
                <icon-ivu :type="format(file)"></icon-ivu>
              {{ file.name }}
            </span>
      <icon-ivu
        type="ios-close-empty"
        :class="[prefixCls + '-list-remove']"
        v-show="file.status === 'finished'"
        @click.native="handleRemove(file)"></icon-ivu>
      <transition name="fade">
        <progress-bar
          v-if="file.showProgress"
          :stroke-width="2"
          :percent="parsePercentage(file.percentage)"
          :status="file.status === 'finished' && file.showProgress ? 'success' : 'normal'"></progress-bar>
      </transition>
    </li>
  </ul>
</template>

<script>
  import { IconIvu } from '../../icon';
  import { ProgressBar } from '../../progress';
  const prefixCls = 'zmui-uploader';

  export default {
    name: 'uploader-list',
    components: {
      IconIvu,
      ProgressBar
    },
    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data () {
      return {
        prefixCls: prefixCls
      };
    },
    methods: {
      fileCls (file) {
        return [
          `${prefixCls}-list-file`,
          {
            [`${prefixCls}-list-file-finish`]: file.status === 'finished'
          }
        ];
      },
      handleClick (file) {
        this.$emit('on-file-click', file);
      },
      handlePreview (file) {
        this.$emit('on-file-preview', file);
      },
      handleRemove (file) {
        this.$emit('on-file-remove', file);
      },
      format (file) {
        const format = file.name.split('.').pop().toLocaleLowerCase() || '';
        let type = 'document';
        if (['gif','jpg','jpeg','png','bmp','webp'].indexOf(format) > -1) {
          type = 'image';
        }
        if (['mp4','m3u8','rmvb','avi','swf','3gp','mkv','flv'].indexOf(format) > -1) {
          type = 'ios-film';
        }
        if (['mp3','wav','wma','ogg','aac','flac'].indexOf(format) > -1) {
          type = 'ios-musical-notes';
        }
        if (['doc','txt','docx','pages','epub','pdf'].indexOf(format) > -1) {
          type = 'document-text';
        }
        if (['numbers','csv','xls','xlsx'].indexOf(format) > -1) {
          type = 'stats-bars';
        }
        if (['keynote','ppt','pptx'].indexOf(format) > -1) {
          type = 'ios-videocam';
        }
        return type;
      },
      parsePercentage (val) {
        return parseInt(val, 10);
      }
    }
  };
</script>

<style lang="less" scoped="scoped">

  .zmui-uploader-list{
    margin-top: 8px;
    &-file{
      padding: 4px;
      color: #495060;
      border-radius: 4px;
      transition: background-color .2s ease-in-out;
      overflow: hidden;
      position: relative;

      & > span{
        cursor: pointer;
        transition: color .2s ease-in-out;
        i{
          display: inline-block;
          width: 12px;
          height: 12px;
          color: #495060;
          text-align: center;
        }
      }

      &:hover{
        background: #f3f3f3;
        & > span{
          color: #09BB07;
          i{
            color: #495060;
          }
        }
        .zmui-uploader-list-remove{
          opacity: 1;
        }
      }
    }
    &-remove{
      opacity: 0;
      font-size: 18px;
      cursor: pointer;
      float: right;
      margin-right: 4px;
      color: #999;
      transition: all .2s ease;
      &:hover{
        color: #444;
      }
    }
  }

</style>
