<template>
  <div>
    <grid :cols="3">
      <grid-item v-for="(item,index) in list" :label="item.label" :link="item.link" :key="index">
        <icon-ivu slot="icon" type="cube" size="28" color="#04be02"></icon-ivu>
      </grid-item>
    </grid>
  </div>
</template>

<script>

  import { Grid, GridItem } from '../ui/components/grid'
  import { IconIvu } from '../ui/components/icon'

	export default{
    components: {
      Grid, GridItem,
      IconIvu
    },
    data(){
      return {
        list1:[{
          name:1
        },{
          name:2
        },{
          name:3
        }],
        list: [{
          label: 'button',
          link: {
            name: 'Button'
          }
        },{
          label: 'badge',
          link: {
            name: 'Badge'
          }
        },{
          label: 'C&R',
          link: {
            name: 'Check'
          }
        },{
          label: 'cell',
          link:{
            name: 'Cell'
          }
        },{
          label: 'flexbox',
          link:{
            name: 'Flexbox'
          }
        },{
          label: 'grid',
          link:{
            name: 'Grid'
          }
        },{
          label: 'counter',
          link:{
            name: 'Counter'
          }
        },{
          label: 'clocker',
          link:{
            name: 'Clocker'
          }
        },{
          label: 'flow',
          link:{
            name: 'Flow'
          }
        },{
          label: 'step',
          link:{
            name: 'Step'
          }
        },{
          label: 'timeline',
          link:{
            name: 'Timeline'
          }
        },{
          label: 'formPreview',
          link:{
            name: 'FormPreview'
          }
        },{
          label: 'marquee',
          link:{
            name: 'Marquee'
          }
        },{
          label: 'rater',
          link:{
            name: 'Rater'
          }
        },{
          label: 'range',
          link:{
            name: 'Range'
          }
        },{
          label: 'number',
          link:{
            name: 'Number'
          }
        },{
          label: 'swipeout',
          link:{
            name: 'Swipeout'
          }
        },{
          label: 'card',
          link:{
            name: 'Card'
          }
        },{
          label: 'panel',
          link:{
            name: 'Panel'
          }
        },{
          label: 'msg',
          link:{
            name: 'Msg'
          }
        },{
          label: 'list',
          link:{
            name: 'List'
          }
        },{
          label: 'masker',
          link:{
            name: 'Masker'
          }
        },{
          label: 'navbar',
          link:{
            name: 'Navbar'
          }
        },{
          label: 'spinner',
          link:{
            name: 'Spinner'
          }
        },{
          label: 'accordion',
          link:{
            name: 'Accordion'
          }
        },{
          label: 'shake',
          link:{
            name: 'Shake'
          }
        },{
          label: 'sticky',
          link:{
            name: 'Sticky'
          }
        },{
          label: 'sendcode',
          link:{
            name: 'Sendcode'
          }
        },{
          label: 'progress',
          link:{
            name: 'Progress'
          }
        },{
          label: 'lazyimg',
          link:{
            name: 'Lazyimg'
          }
        },{
          label: 'qrcode',
          link:{
            name: 'Qrcode'
          }
        },{
          label: 'loading',
          link:{
            name: 'Loading'
          }
        },{
          label: 'loadmore',
          link:{
            name: 'LoadMore'
          }
        },{
          label: 'swiper',
          link:{
            name: 'Swiper'
          }
        },{
          label: 'scroller',
          link:{
            name: 'Scroller'
          }
        },{
          label: 'search',
          link:{
            name: 'Search'
          }
        },{
          label: 'view',
          link:{
            name: 'View'
          }
        },{
          label: 'tabnav',
          link:{
            name: 'Tabnav'
          }
        },{
          label: 'drawer',
          link:{
            name: 'Drawer'
          }
        },{
          label: 'indexlist',
          link:{
            name: 'IndexList'
          }
        },{
          label: 'selector',
          link:{
            name: 'Selector'
          }
        },
          {
            label: 'uploader',
            link:{
              name: 'Uploader'
            }
          },
          {
            label: 'editbox',
            link:{
              name: 'Editbox'
            }
          },
          {
            label: 'picker',
            link:{
              name: 'Picker'
            }
          },
          {
            label: 'popover',
            link:{
              name: 'Popover'
            }
          },
          {
            label: 'popup',
            link:{
              name: 'Popup'
            }
          },
          {
            label: 'datetime',
            link:{
              name: 'Datetime'
            }
          },
          {
            label: 'address',
            link:{
              name: 'Address'
            }
          },
          {
            label: 'calendar',
            link:{
              name: 'Calendar'
            }
          },
          {
            label: 'input',
            link:{
              name: 'Input'
            }
          },
          {
            label: 'textarea',
            link:{
              name: 'Textarea'
            }
          },
          {
            label: 'table',
            link:{
              name: 'Table'
            }
          },
          {
            label: 'dialog',
            link:{
              name: 'Dialog'
            }
          },
          {
            label: 'toast',
            link:{
              name: 'Toast'
            }
          },
          {
            label: 'actionsheet',
            link:{
              name: 'Actionsheet'
            }
          },
          {
            label: 'backtop',
            link:{
              name: 'Backtop'
            }
          },
          {
            label: 'zoom',
            link:{
              name: 'Zoom'
            }
          },
          {
            label: 'video',
            link:{
              name: 'Video'
            }
          },

        ]
      }
    }
  }
</script>

<style lang="less">

</style>
