<template>
  <div class="zmui-editbox">

    <p>策划策划策划策划策划策划策划策划策划</p>

    <!-- input -->
    <input class="zmui-editbox-content zmui-editbox-input" type="text" />

    <!-- textarea -->
    <!--<textarea class="zmui-editbox-content zmui-editbox-textarea" name="" id="" cols="30" rows="10"></textarea>-->

    <!-- div -->
    <!--<div class="zmui-editbox-content zmui-editbox-div"></div>-->

    <button @click="range">插入文本</button>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    },
    methods:{
      test(){
        const input = this.$el.querySelector('.zmui-editbox-content');
        let str = '插入文本';
        this.insertAtCursor(input, str)
      },
      insertAtCursor(dom, val){

//        IE9以下支持：document.selection
//        IE9、Firefox、Safari、Chrome和Opera支持：window.getSelection() 使用.getRangeAt(0)出错 通过if (sel && sel.rangeCount > 0)预防
//        ie6\7\8不支持；Chrome、Firefox、Opera、Safari都支持：document.activeElement（它返回当前获得焦点的元素，如果不存在则返回“body”）。

//        dom.focus();    // window.getSelection() 必须先focus才能获得range，PC端可以考虑使用，移动端由于focus会唤起键盘，该方案否决
//        const selection = window.getSelection();
//        if (selection && selection.rangeCount > 0) {
//          let range = selection.getRangeAt(0);
//          console.info(range);
//          console.info(range.toString()); // 可以直接获取p标签中选中内容，但是无法直接获取input中的内容，可用于可编辑div，未测试，
//          无法操作，该方案否决
//        }

        // QS：编辑器失去选择范围情况：如：多选列表选择内容后，点击按钮插入，此时使用focus也无效
        // AS：document.addEventListener("selectionchange", HandleSelectionChange, false); 监听变化
//        function HandleSelectionChange() {
//          var sel = window.getSelection && window.getSelection();
//          if (sel && sel.rangeCount > 0) {
//            savedRange = sel.getRangeAt(0);
//          }
//        }
        // 在点击时恢复
//        function doInsert(text) {
//          var sel = window.getSelection && window.getSelection();
//          if (sel && sel.rangeCount == 0 && savedRange != null) {
//            sel.addRange(savedRange);
//          }
//          if (sel && sel.rangeCount > 0) {
//            var range = sel.getRangeAt(0);
//            var node = document.createTextNode(text);
//            range.deleteContents();
//            range.insertNode(node);
//          }
//        }


        // 插入必须为字符串，否则第一次插入生效，光标会回到首部

        //IE9以下，使用document.selection
        if (document.selection) {
          dom.focus();
          sel = document.selection.createRange(); // TextRange 对象，或根据控件选择返回ControlRange 对象
          sel.text = val;
          sel.select();
        }

        //FireFox、Chrome等，元素含有相关属性和方法
        else if (dom.selectionStart || dom.selectionStart === 0) {
          // 存在初始内容

          let startPos = dom.selectionStart;
          let endPos = dom.selectionEnd;
          let restoreTop = dom.scrollTop;

          dom.value = dom.value.substring(0, startPos) + val + dom.value.substring(endPos, dom.value.length);

          // 重置 scroll
          if (restoreTop > 0) {
            dom.scrollTop = restoreTop;
          }

          // 重置 range
          dom.selectionStart = startPos + val.length;
          dom.selectionEnd = startPos + val.length;
        }

        // 如果都不支持，直接放弃，在末尾追加
        else {
          dom.value += val;
        }

        dom.focus();

      }
    },

    getUserSelection(){
      // 获得用户选择区域
      // W3C：用户选择区域是Selection对象
      // IE：用户选择区域是TextRange对象
      if(window.getSelection){
        return window.getSelection();
      }else if(document.selection){
        return document.selection.createRange();
      }
    },
    getUerSelectText(){
      // 获得用户选择的内容
      const userSelection = this.getUserSelection();
      return userSelection.text || userSelection.toString();
    },
    getRange(selection){
      // IE调用getUserSelection()方法获得的就是一个TextRange对象，所以不需要再创建Range对象了
      if(selection.getRangeAt){
        return selection.getRangeAt(0);
      }else{//不支持getRangeAt的情况
        let range = document.createRange();
        range.setStart(selection.anchorNode, selection.anchorOffset);
        range.setEnd(selection.focusNode, selection.focusOffset);
        return range;
      }
    },
    createNewRange(){
      // 通过编程的方式创建Range对象
      const range = document.createRange();
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
    },
    another(){
      // 一：IE6/7/8
      // IE6/7/8 只有 TextRange，在指定的对象上创建一个 TextRange 需要使用 'object.createTextRange()'。
      // 注意不是任何类型的对象都可以创建 TextRange，只有 body 对象、button 对象、textarea 对象和 type='text' 的 input 对象才可以。
      // 还可以通过 'document.selection.createRange()' 从当前的文本 selection 中得到一个 TextRange。

      // 二：W3C
      // 在标准浏览器中有两种方式创建Range对象
      // 1. 使用 'window.getSelection().getRangeAt(index)' 获得一组 Range 中指定的 Range
      // 2. var range = document.createRange()，然后设置range的开始位置（setStart()）和结束位置（setEnd()）
    }
  }
</script>

<style lang="less">
  .zmui-editbox{
    width: 100%;
    height: 300px;
    border: 1px #ccc solid;
  }

  .zmui-editbox-input{
    width: 80%;
    height: 30px;
    padding: 5px 10px;
    margin: 0 auto;
  }
</style>
