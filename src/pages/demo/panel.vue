<template>
  <div>
    <cell-group :title="'Switch the type'">
      <radio-list title="type" v-model="type" :options="['1', '2', '3', '4', '5']"></radio-list>
    </cell-group>
    <panel :header="'List of content with image'" :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<script>
  import { Panel } from '../../ui/components/panel'
  import { CellGroup } from '../../ui/components/cell'
  import { RadioList } from '../../ui/components/radio'

  export default{
    components: {
      Panel,
      CellGroup,
      RadioList
    },
    methods: {
      onImgError (item, $event) {
        console.log(item, $event)
      }
    },
    data () {
      return {
        type: '1',
        list: [{
          src: 'http://somedomain.somdomain/x.jpg',
          fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }, {
          src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          },
          meta: {
            source: '来源信息',
            date: '时间',
            other: '其他信息'
          }
        }],
        footer: {
          title: 'more',
          url: 'http://vux.li'
        }
      }
    }
  }
</script>

<style>
</style>
