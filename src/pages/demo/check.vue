<template>
  <div>
    <divider> checkicon </divider>
    <cell-group>
      <checkicon :value.sync="ckeckicon">廉颇老矣，尚能饭否？</checkicon>
    </cell-group>

    <divider> checkbox-group </divider>
    <cell-group>
    <checkbox-group v-model="checkbox">
      <checkbox val="1" shape="circle">选项一</checkbox>
      <checkbox val="2" shape="circle">选项二</checkbox>
      <checkbox val="3" shape="circle">选项三</checkbox>
    </checkbox-group>
    </cell-group>

    <divider @click.native="labelPosition = (labelPosition === 'left' ? '' : 'left')"> checkbox-list </divider>
    <cell-group>
      <checkbox-list title="测试" :label-position="labelPosition" required :options="commonList" v-model="checklist"></checkbox-list>
    </cell-group>

    <divider> radio </divider>
    <cell-group>
      <radio>廉颇老矣，尚能饭否？</radio>
    </cell-group>

    <divider> radio-group </divider>
    <cell-group>
    <radio-group v-model="radio">
      <radio val="1">北京</radio>
      <radio val="2">北京</radio>
      <radio val="3">北京</radio>
    </radio-group>
    </cell-group>

    <divider> radio-list </divider>
    <cell-group>
      <radio-list :options="radiolist"></radio-list>
    </cell-group>

    <divider> switch-inline </divider>
    <switch-inline></switch-inline>

    <divider> switch-cell </divider>
    <cell-group>
    <switch-cell title="测试"></switch-cell>
    </cell-group>

    <divider> checker </divider>
      <checker v-model="checker" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
      <checker-item value="1">测试1</checker-item>
      <checker-item value="2">测试2</checker-item>
      <checker-item value="3">测试3</checker-item>
    </checker>

  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Cell, CellGroup } from '../../ui/components/cell'
  import { CheckboxGroup, Checkbox, CheckboxList, Checkicon } from '../../ui/components/checkbox'
  import { Radio, RadioGroup, RadioList } from '../../ui/components/radio'
  import { SwitchInline, SwitchCell } from '../../ui/components/switch'
  import { Checker, CheckerItem } from '../../ui/components/checker'

  export default{
    components:{
      Divider,
      Cell,CellGroup,
      CheckboxGroup, Checkbox, CheckboxList, Checkicon,
      Radio, RadioGroup, RadioList,
      SwitchInline, SwitchCell,
      Checker, CheckerItem
    },
    data(){
      return {
        checkbox: ["1"],
        labelPosition: '',
        commonList: [ 'China', 'Japan', 'America' ],
        checklist: [],
        ckeckicon: false,
        radio: '1',
        radiolist: [ 'China', 'Japan' ],
        checker: '1'
      }
    },
    created(){

    }
  }
</script>

<style>
  .demo1-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
    margin-bottom: 5px;
  }
  .demo1-item-selected {
    background: #ffffff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAMAAACecocUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTZDOEJBQ0E3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTZDOEJBQ0I3NkIxMTFFNEE3MzJFOUJCMEU5QUM0QkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBNkM4QkFDODc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBNkM4QkFDOTc2QjExMUU0QTczMkU5QkIwRTlBQzRCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnMGp3kAAAAJUExURf9KAP///////4Jqdw0AAAADdFJOU///ANfKDUEAAAAuSURBVHjaTMpBDgAABAPB5f+PlhLUpZMWuQcYMWLEyDN4ymqa5KS4+3G+KAEGACQmAGlKzr56AAAAAElFTkSuQmCC) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
