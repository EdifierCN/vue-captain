<template>
  <div>
    <divider>{{ 'Simple card with header and content' }}</divider>
    <card :header="{title: 'My wallet'}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="zmui-1px-r">
          <span>1130</span>
          <br/>
          {{ 'Point' }}
        </div>
        <div class="zmui-1px-r">
          <span>15</span>
          <br/>
          {{ 'Coupon' }}
        </div>
        <div class="zmui-1px-r">
          <span>0</span>
          <br/>
          {{ 'Gift card' }}
        </div>
        <div>
          <span>88</span>
          <br/>
          {{ 'Cash' }}
        </div>
      </div>
    </card>

    <br>
    <divider>{{ 'With footer' }}</divider>
    <card :header="{title: 'Product details' }" :footer="{title: 'More',link:'/component/panel'}">
      <p slot="content" class="card-padding">{{ 'Custom content' }}</p>
    </card>

    <br>
    <divider>{{ 'Use header slot and content slot' }}</divider>
    <card>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
        <p style="font-size:14px;line-height:1.2;">Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit..</p>
      </div>
    </card>
  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { Card } from '../../ui/components/card'

  export default{
    components: {
      Card,
      Divider
    }
  }
</script>

<style scoped lang="less">
  @import '../../ui/styles/utils/1px.less';

  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-padding {
    padding: 15px;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
</style>
