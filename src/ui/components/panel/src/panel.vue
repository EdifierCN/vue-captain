<template>
  <div class="zmui-panel zmui-panel_access">
    <div class="zmui-panel__hd" v-if="header" @click="onClickHeader" v-html="header">
      <slot name="header"></slot>
    </div>
    <div class="zmui-panel__bd">
      <slot name="body">
        <!--type==='1'-->
        <template v-if="type === '1'">
          <a :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)" class="zmui-media-box zmui-media-box_appmsg">
            <div class="zmui-media-box__hd" v-if="item.src">
              <img class="zmui-media-box__thumb" :src="item.src" @error="onImgError(item, $event)" alt="">
            </div>
            <div class="zmui-media-box__bd">
              <h4 class="zmui-media-box__title" v-html="item.title"></h4>
              <p class="zmui-media-box__desc" v-html="item.desc"></p>
            </div>
          </a>
        </template>
        <!--type==='2'-->
        <template v-if="type === '2'">
          <div class="zmui-media-box zmui-media-box_text" v-for="item in list" @click.prevent="onItemClick(item)">
            <h4 class="zmui-media-box__title" v-html="item.title"></h4>
            <p class="zmui-media-box__desc" v-html="item.desc"></p>
          </div>
        </template>
        <!--type==='3'-->
        <template v-if="type === '3'">
          <div class="zmui-media-box zmui-media-box_small-appmsg">
            <div class="zmui-cells">
              <a class="zmui-cell zmui-cell_access" :href="getUrl(item.url)" v-for="item in list" @click.prevent="onItemClick(item)">
                <div class="zmui-cell__hd">
                  <img :src="item.src" alt="" @error="onImgError(item, $event)" style="width:20px;margin-right:5px;display:block">
                </div>
                <div class="zmui-cell__bd">
                  <p v-html="item.title"></p>
                </div>
                <span class="zmui-cell__ft"></span>
              </a>
            </div>
          </div>
        </template>
        <!--type==='4'-->
        <template v-if="type === '4'">
          <div class="zmui-media-box zmui-media-box_text" v-for="item in list" @click.prevent="onItemClick(item)">
            <h4 class="zmui-media-box__title" v-html="item.title"></h4>
            <p class="zmui-media-box__desc" v-html="item.desc"></p>
            <ul class="zmui-media-box__info" v-if="item.meta">
              <li class="zmui-media-box__info__meta" v-html="item.meta.source"></li>
              <li class="zmui-media-box__info__meta" v-html="item.meta.date"></li>
              <li class="zmui-media-box__info__meta zmui-media-box__info__meta_extra" v-html="item.meta.other"></li>
            </ul>
          </div>
        </template>
        <!--type==='5'-->
        <template v-if="type === '5'">
          <div class="zmui-media-box zmui-media-box_text" v-for="item in list" @click.prevent="onItemClick(item)">
            <div class="zmui-media-box_appmsg">
              <div class="zmui-media-box__hd" v-if="item.src">
                <img class="zmui-media-box__thumb" @error="onImgError(item, $event)" :src="item.src" alt="">
              </div>
              <div class="zmui-media-box__bd">
                <h4 class="zmui-media-box__title" v-html="item.title"></h4>
                <p class="zmui-media-box__desc" v-html="item.desc"></p>
              </div>
            </div>
            <ul class="zmui-media-box__info" v-if="item.meta">
              <li class="zmui-media-box__info__meta" v-html="item.meta.source"></li>
              <li class="zmui-media-box__info__meta" v-html="item.meta.date"></li>
              <li class="zmui-media-box__info__meta zmui-media-box__info__meta_extra" v-html="item.meta.other"></li>
            </ul>
          </div>
        </template>
      </slot>
    </div>
    <div class="zmui-panel__ft">
      <a
        class="zmui-cell zmui-cell_access zmui-cell_link"
        :href="getUrl(footer.url)"
        v-if="footer && footer.title && type !== '3'"
        @click.prevent="onClickFooter">
        <div class="zmui-cell__bd" v-html="footer.title"></div>
      </a>
    </div>
  </div>
</template>

<script>
  import { go, getUrl } from '../../../libs/router'

  export default {
    name: 'panel',
    props: {
      header: String,
      footer: Object,
      list: Array,
      type: {
        type: String,
        default: '1'
      }
    },
    methods: {
      onImgError (item, $event) {
        this.$emit('on-img-error', JSON.parse(JSON.stringify(item)), $event);
        if (item.fallbackSrc) {
          $event.target.src = item.fallbackSrc
        }
      },
      getUrl (url) {
        return getUrl(url, this.$router)
      },
      onClickFooter () {
        this.$emit('on-click-footer');
        go(this.footer.url, this.$router)
      },
      onClickHeader () {
        this.$emit('on-click-header')
      },
      onItemClick (item) {
        this.$emit('on-click-item', item);
        go(item.url, this.$router)
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/widget/cell/global';
  @import '../../../styles/widget/cell/access';
  @import '../../../styles/widget/panel/index';
  @import '../../../styles/widget/mediabox/index';
</style>
