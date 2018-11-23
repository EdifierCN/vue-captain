<template>
  <div class="zmui-card">

    <div class="zmui-card-header" v-if="header && header.title" v-html="header.title" @click="onClickHeader">
    </div>

    <div class="zmui-card-header" :class="{'zmui-card-media': media}" v-else-if="hasHeaderSlot" @click="onClickHeader">
      <slot name="header"></slot>
    </div>

    <div class="zmui-card-content">
      <div :class="{'zmui-card-content-inner': inner}">
        <slot name="content"></slot>
      </div>
    </div>

    <div class="zmui-card-footer" v-if="footer && footer.title" v-html="footer.title" @click="onClickFooter">
    </div>

    <div class="zmui-card-footer" v-else-if="actions">
      <a class="zmui-card-link" v-for="action in actions" @click="onClickAction(action)">{{action.title}}</a>
    </div>

    <div class="zmui-card-footer" v-else-if="hasFooterSlot" @click="onClickFooter">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
  import { go } from '../../../libs/router'

  export default {
    name: 'card',
    props: {
      header: Object,
      footer: Object,
      actions: [Object, Array],
      inner: {
        type: Boolean,
        default: true
      },
      media: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return{
        hasHeaderSlot: false,
        hasFooterSlot: false,
      }
    },
    mounted(){
      this.hasHeaderSlot = !!this.$slots.header;
      this.hasFooterSlot = !!this.$slots.footer;
    },
    methods: {
      onClickHeader(){
        this.$emit('on-click-header')
      },
      onClickFooter(){
//        this.footer.link && go(this.footer.link, this.$router);
        this.$emit('on-click-footer')
      },
      onClickAction(a){
        console.info(a);
        this.$emit('on-click-action')
      }
    }
  }
</script>

<style lang="less">

  .zmui-card {
    // margin: 0 15px;
    margin:10px;
    overflow: hidden;
    background-color: #fff;
    background-clip:padding-box;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    position: relative;
    font-size: 14px;
  }

  .zmui-content > .zmui-card:first-child{
    margin-top: 15px;
  }
  //Cards with input-group
  .zmui-card .zmui-input-group{
    &:before,&:after{
      height:0;
    }
    .zmui-input-row:last-child{
      &:before,&:after{
        height:0;
      }
    }

  }
  // Cards with table-views
  // --------------------------------------------------
  .zmui-card .zmui-table-view {
    margin-bottom: 0;
    border-top: 0;
    border-bottom: 0;
    border-radius: 6px;
    // Rounding first divider on carded lists and remove border on the top
    //fix Android 4.1.x/4.2.x 圆角列表四角不圆的bug
    .zmui-table-view-divider:first-child,.zmui-table-view-cell:first-child {
      top: 0;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    // Rounding last divider on carded table views
    .zmui-table-view-divider:last-child,.zmui-table-view-cell:last-child {
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
    }
    &:before,&:after{
      height:0;
    }
  }


  // Remove the bottom border from last table cell
  .zmui-card > .zmui-table-view {
    >.zmui-table-view-cell:last-child{
      &:before,&:after{
        height:0;
      }
    }
  }


  .zmui-card-header,
  .zmui-card-footer {
    min-height: 44px;
    position: relative;
    padding: 10px 15px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;

    .zmui-card-link {
      line-height: 44px;
      height: 44px;
      text-decoration: none;
      position: relative;
      margin-top: -10px;
      margin-bottom: -10px;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: start;
      -webkit-justify-content: flex-start;
      justify-content: flex-start;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      -webkit-transition-duration: .3s;
      transition-duration: .3s;
    }

  }

  .zmui-card-header:after,
  .zmui-card-footer:before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #c8c7cc;
    content: '';
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .zmui-card-header {
    border-radius: 2px 2px 0 0;
    font-size: 17px;
    &:after {
      top: auto;
      bottom: 0;
    }

  }

  .zmui-card-footer {
    border-radius: 0 0 2px 2px;
    color: #6d6d72;
  }

  .zmui-card-content {
    position: relative;
    font-size: 14px;
  }

  .zmui-card-content-inner {
    padding: 15px;
    position: relative;
  }

  .zmui-card-media {
    color: #fff;
    background-size: cover;
    background-position: center;
    vertical-align: bottom;
  }

  .zmui-card-header.zmui-card-media {
    display: block;
    padding: 10px;

    .zmui-media-body{
      margin-bottom: 0;
      margin-left: 44px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      line-height: 17px;
      >img:first-child{
        font-size: 0;
        line-height: 0;
        width: 34px;
        height: 34px;
        float: left;
      }
      p {
        font-size: 13px;
        margin-bottom: 0;
      }
    }
  }

</style>
