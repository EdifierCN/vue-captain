<template>
  <div class="zmui-editbox">
    <div class="zmui-editbox-wrap">
      <div ref="content" class="zmui-editbox-content" @click="setFocus">

        <textarea class="zmui-editbox-textarea" v-if="model=== 'textarea'" @focus="focusHandler" @blur="blurHandler" v-model="content" :placeholder="placeholder"></textarea>

        <div class="zmui-editbox-div" v-if="model=== 'div'" @focus="focusHandler" @blur="blurHandler" contenteditable="true" v-html="content" @input="inputHandler" :placeholder="placeholder"></div>

        <div class="zmui-editbox-counter">
          <span>{{count}}</span>/{{max}}
        </div>

      </div>
    </div>

    <div class="zmui-editbox-actions">
      <div class="zmui-editbox-actions__left">
        <a class="action-item action-emotion" href="javascript:void(0)" @click="actionHandler('emotion')">
          <icon-ivu type="happy-outline" size="25" :color="action ==='emotion' ? '#ff6700' : '#999999'"></icon-ivu>
        </a>
        <a class="action-item action-img" href="javascript:void(0)" @click="actionHandler('image')">
          <icon-ivu type="image" size="25" :color="action ==='image' ? '#ff6700' : '#999999'"></icon-ivu>
        </a>
      </div>
      <div class="zmui-editbox-actions__right">
        <a class="action-btn action-post" href="javascript:void(0)" @click="sendHandler">发送</a>
      </div>
    </div>

    <div class="zmui-editbox-acconts">
      <div class="acconts-item accont-emotion" v-show="action === 'emotion'" :style="{'height':accontHeight + 'px'}">

        <aw-swiper :options="{spaceBetween : 20,pagination:{el: '.swiper-pagination',bulletActiveClass: 'emotion-bullet-active'}}" class="zmui-qq-faces">
          <aw-swiper-slide v-for="i in 5" :class="['face-panel', `face-panel-${i}`]" :key="i">
            <span class="emotion" v-for="j in 20" :index="parseInt(20*(i-1)+(j))" :alt="'[em_'+ parseInt(20*(i-1)+(j)) +']'" @click="emotionHandler(parseInt(20*(i-1)+(j)))"></span>
            <span class="emotion" :index="-1" alt="" @click="emotionHandler(-1)"></span>
          </aw-swiper-slide>
          <div class="swiper-pagination emotion-pagination" slot="pagination"></div>
        </aw-swiper>

      </div>
      <div class="acconts-item accont-image" v-show="action === 'image'" :style="{'height':accontHeight + 'px'}">
        <zuploader-list :fileList="uploadList" :header="false" orientation="horizontal">
          <zuploader ref="upload" v-show="uploadList.length < 9"></zuploader>
        </zuploader-list>
        <div class="accont-image-count">{{ uploadList.length }}/9</div>
      </div>
    </div>

  </div>
</template>

<script>
  import Autosize from 'autosize'
  import { AwSwiper,AwSwiperSlide } from '../../swiper'
  import { Zuploader, ZuploaderList } from '../../uploader'
  import { IconIvu } from '../../icon';

//  const requireContext = require.context("./face",false, /^\.\/.*\.png$/);
//  const faces = requireContext.keys().map(requireContext);
//  console.info(faces);

  // Q：使用本地图片问题（大量），少量可以直接 require（失败）
  // A：方案一：使用 $compile 编译， R：报错，无法使用，可能因为 vue 版本（失败）
  // A：方案二：使用 require.context()， R：无法保证读取到的文件顺序（失败）
  // A：方案三： url-loader exclude, R：dev 报错，非法字符，可能因为名字是数字（失败）
  // A：方案四：放在服务器上（推荐）
  // A：方案五：通过创建 vue 实例实现

  // Q:：在图片中插入文字后，再删除，当文字删完后，会从内容最后位置开始删
  // Q：div模式，移动端点击输入框无法获得焦点，textarea模式点击后，无法在点击处获得焦点
  // Q：移动端　div获得焦点很慢
  // 补充：@功能的实现，需要末尾加空格，以隔断生成的标签，否则输入时，将在生成的标签内

  // const REG= /<img.*?alt="(.*?)".*?>/ig;// 获取alt

  import createEmotion from './emotion'

  export default{
    name: 'editbox',
    components:{
      AwSwiper,
      AwSwiperSlide,
      Zuploader,
      ZuploaderList,
      IconIvu
    },
    props:{
      model: {
        type: String,
        default: 'div'
      },
      max: {
       type: Number,
        default: 300
      },
      defaultVal: {
        type: String
      },
      placeholder:{
        type: String,
        default: '说点什么吧~'
      }
    },
    data(){
      return {
        action: '',  // action name
        selection:{
          start: 0,
          end: 0
        },
        content: '',    // 内容
        parseContent: '',
        uploadList: [],   // 上传图片
        accontHeight: 150,
        count: 0,
        prevContent: ''
      }
    },
    created(){
      this.adjustFaceSize();
      window.addEventListener('resize', () => {
        this.adjustFaceSize();
      })
    },
    mounted(){
      this.uploadList = this.$refs.upload.fileList;

      this.selection.el = this.$refs.content.children[0];
      const range = document.createRange();
      range.setStart(this.selection.el, 0);
      range.setEnd(this.selection.el, 0);
      this.selection.range = range;

      this.defaultVal && (this.content = this.defaultVal);
      this.$nextTick(() => {
        this.bindAutosize(this.selection.el);
      });
    },
    watch:{
      content(newVal){
        if(this.model === 'textarea'){
          this.parseContent = this.parseEmotion(newVal);
          Autosize.update(this.selection.el);
        }
      }
    },
    methods:{
      sendHandler(){
        const el = this.selection.el;
        const sendData = {
          content: this.model === 'div' ? el.innerHTML : el.value,
          image: this.uploadList
        };
        this.$emit('send', sendData)
      },
      parseEmotion(str){
        str = str.replace(/\[em_([0-9]*)\]/g,  (word) => {
          let index = parseInt(word.replace(/[^0-9]/ig,""));
          let emotion = createEmotion(index);
          let code = emotion.$el.outerHTML;
          emotion = null;
          return code;
        });
        return str;
      },
      adjustFaceSize(){
        const winW = document.documentElement.clientWidth || document.body.clientWidth;
        this.accontHeight = parseInt(winW * 234/624 + 30);
      },
      setFocus(){
        const el =  this.selection.el;
        if(document.selection){
          const range = document.selection.createRange();
          this.last = range;
          range.moveToElementText(el);
          range.select();
          document.selection.empty(); //取消选中
        }else{
          const range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(false);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      },
      updateCount(){
        const el = this.selection.el;
        let count = 0;
        let content, img, txt;

        // 图片算两个
        if(this.model === 'div'){
          const REG = /<img.+?>/g;
          content = el.innerHTML;
          img = content.match(REG) || [];
          txt = content.replace(REG, '');

          count = img.length * 2 + txt.length;
        }else{
          const REG = /\[em_([0-9]*)\]/g;
          content = el.value;
          img = content.match(REG) || [];
          txt = content.replace(REG, '');

          count = img.length * 2 + txt.length;
        }

        if(count > this.max){
          this.content = this.prevContent;
        }else{
          this.count = count;
          this.prevContent = content;
        }

        this.$emit('input', this.content);
        this.$emit('on-change', this.content);
      },
      inputHandler(e){
        this.updateCount();
      },
      focusHandler(){
        this.action = '';
        this.$emit('on-focus');
      },
      blurHandler(){
        const selection = this.selection;

        if(this.model === 'div'){
          const sel = window.getSelection && window.getSelection();
          const range = sel.getRangeAt(0);

          selection.range = range;
          selection.start = range.startOffset;
          selection.end = range.endOffset;
        }else{
          selection.start = selection.el.selectionStart;
          selection.end = selection.el.selectionEnd;
        }
        this.$emit('on-blur')
      },
      actionHandler(name){
        if(name !== '' && this.action === name){
          this.action = ''
        }else{
          this.action = name;
        }
      },
      emotionHandler(index){
        if(index === -1){
          this.delEmotionCode();
        }else{
          this.addEmotionCode('[em_'+ index +']');
        }
      },
      delEmotionCode(){
        const selection = this.selection;

        if(this.model === 'div'){
          const range = selection.range;
          // 由于图片前后的内容，属于不同的范围，range的offset是从当前开始
          let startEl = range.startContainer;

//          console.info('类型：',startEl.nodeType === 1 ? '元素节点': '文本节点');

          if(startEl.nodeType === 1){
            // 光标前为表情,此时是按整个文本来计算位置，一段文本只占一位
            if(range.startOffset -1 < 0){

            }else{
              range.setStart(startEl, range.startOffset -1);
              range.deleteContents();

              // 进入文本节点
              if(selection.el.lastChild && selection.el.lastChild.previousSibling){
                const prevNode = selection.el.lastChild.previousSibling;
                if(prevNode.nodeType === 3){
                  range.selectNodeContents(prevNode);
                  range.collapse(false)
                }
              }

            }
          }else{
            // 光标前为文本
            if(range.startOffset -1 <= 0){
              startEl.parentNode.removeChild(startEl)
            }else{
              range.setStart(startEl, range.startOffset -1);
              range.deleteContents();
            }
          }

        }else{
          const CODE_REG = /\[em_([0-9]*)\]$/g;
          let text = this.content;
          let beforeText =  text.substr(0, selection.start); // substr 和 subtring，前者第二个参数表示长度，后者第二个参数表示下标，不包括最后一个
          let len = beforeText.length;
          if(CODE_REG.test(beforeText)){
            beforeText = beforeText.replace(CODE_REG, '');
          }else{
            beforeText = beforeText.substring(0, len-1)
          }
          this.content = beforeText + text.substr(selection.end, text.length);
          selection.start = selection.end = selection.end - (len - beforeText.length);
        }

        this.updateCount();
      },
      addEmotionCode(val){
        const selection = this.selection;

        if(this.model === 'div'){
          const range = selection.range;
          const el = document.createElement('div');
          el.innerHTML = this.parseEmotion(val);
          range.insertNode(el.children[0]);
          range.collapse(false);
        }else{
          let startPos = selection.start;
          let endPos = selection.end;
          let text = this.content;
          this.content = text.substring(0, startPos) + val + text.substring(endPos, text.length);
          selection.start = selection.end = startPos + val.length;
        }

        this.updateCount();
        this.setScrollTop(val);
      },
      escapeChars(){
        str = str.replace(/&/g, '&amp;');
        str = str.replace(/</g, '&lt;');
        str = str.replace(/>/g, '&gt;');
        str = str.replace(/'/g, '&acute;');
        str = str.replace(/"/g, '&quot;');
        str = str.replace(/\|/g, '&brvbar;');
        return str;
      },
      setScrollTop(val){
        const selection = this.selection;
        let text = this.content;
        let startPos = selection.start;
        let clone = selection.el.cloneNode(true);
        clone.value = text.substring(0, startPos) + val;
        clone.style.display="block";
        clone.style.position="absolute";
        clone.style.top= '-10000px';
        selection.el.parentNode.appendChild(clone);
        let scrollTop = clone.scrollHeight - clone.offsetHeight/2;
        selection.el.parentNode.removeChild(clone);
        selection.el.scrollTop = scrollTop;
      },
      bindAutosize (dom) {
        Autosize(dom)
      },
      unbindAutosize (dom) {
        Autosize.destroy(dom)
      }
    },
    beforeDestroy () {
      this.unbindAutosize(this.selection.el)
    }
  }
</script>

<style lang="less">

  .zmui-editbox{
    width: 100%;
    border: 1px #ccc solid;
  }

  .zmui-editbox-wrap{
    padding: 5px 10px;
  }

  .zmui-editbox-content{
    box-sizing: border-box;
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    border: 1px #eeeeee solid;
    background-color: #FFFFFF;

    .zmui-editbox-textarea{
      box-sizing: border-box;
      width: 100%;
      max-height: 100px;
      outline: none;
      resize: none;
      border: none;
      display: block;
      border: 0;
      color: inherit;
      font-size: 1.2em;
      line-height: inherit;
    }

    .zmui-editbox-div{
      outline: none;
      border: none;
      max-height: 100px;
      overflow-y: scroll;
      overflow-x: hidden;
      color: inherit;
      font-size: 1.2em;
      word-break: break-all;
    }
  }

  .zmui-editbox-counter {
    color: #B2B2B2;
    text-align: right;
  }

  .zmui-editbox-actions{
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .action-item{
      padding: 5px;
    }
    .action-btn{
      color: #FFFFFF;
      background-color: #ff6700;
      padding: 0 10px;
      line-height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
    }
  }

  .zmui-editbox-actions__left{
    .action-item{
      margin-right: 6px;
    }
  }
  .zmui-editbox-actions__right{
    .action-item{
      margin-left: 6px;
    }
  }

  .zmui-editbox-acconts{
    background-color: #FFFFFF;
    position: relative;
    .acconts-item{
      box-sizing: border-box;
      padding-top: 10px;
      &:before{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: #CCCCCC;
      }
    }
    .accont-image{
      padding-top: 20px;
    }
    .accont-image-count{
      float: right;
      padding: 5px 15px;
    }
  }

  .zmui-qq-faces{
    margin: auto;
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 140px;
    box-sizing: border-box;
    padding-bottom: 20px!important;
    overflow: hidden;
  }
  .zmui-qq-faces .emotion-pagination{
    bottom: 5px!important;
  }
  .zmui-qq-faces .emotion-bullet-active{
    opacity: 0.5!important;
  }
  .zmui-qq-faces .face-panel{
    background-size: cover;
    box-sizing: border-box;
    .emotion{
      width: 14.2%;
      min-width: 45px;
      height: 33%;
      float: left;
      box-sizing: border-box;
      user-select: none;
    }
  }
  .zmui-qq-faces .face-panel-1 {
    background-image: url(http://7ximdq.com1.z0.glb.clouddn.com/1431445636499);
  }
  .zmui-qq-faces .face-panel-2 {
    background-image: url(http://7ximdq.com1.z0.glb.clouddn.com/1431445637189);
  }
  .zmui-qq-faces .face-panel-3 {
    background-image: url(http://7ximdq.com1.z0.glb.clouddn.com/1431445637328);
  }
  .zmui-qq-faces .face-panel-4 {
    background-image: url(http://7ximdq.com1.z0.glb.clouddn.com/1431445637897);
  }
  .zmui-qq-faces .face-panel-5 {
    background-image: url(http://7ximdq.com1.z0.glb.clouddn.com/1431445638189);
  }

</style>
