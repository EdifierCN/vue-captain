<template>
<div>

  <divider> tab 结合 swiper 横向滚动</divider>

  <tab v-model="index" customBarWidth="20px">
    <tab-item v-for="(item, index) in list2" :key="index">{{item}}</tab-item>
  </tab>
  <swiper :nav-model="true" v-model="index" height="150px" :show-dots="false" style="background: #fff; line-height: 150px; text-align: center">
    <swiper-item v-for="(item, index) in list2" :key="index">
      <div>{{item}}</div>
    </swiper-item>
  </swiper>

  <br><br>

  <divider> tabnav（亮点：css3 位移，衔接） </divider>
  <tabnav horizontal-scroll>
    <tabnav-panel label="选项一" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡一</tabnav-panel>
    <tabnav-panel label="选项二" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡二</tabnav-panel>
    <tabnav-panel label="选项三" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡三</tabnav-panel>
    <tabnav-panel label="选项四" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡四</tabnav-panel>
    <tabnav-panel label="选项五" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡五</tabnav-panel>
    <tabnav-panel label="选项六" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡六</tabnav-panel>
    <tabnav-panel label="选项七" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡七</tabnav-panel>
    <tabnav-panel label="选项八" style="height: 150px; display: flex; align-items: center; justify-content: center">选项卡八</tabnav-panel>
  </tabnav>

  <br><br>

  <divider> swiperpanel（亮点：滑动，不限高，id 必须） </divider>
  <swipepanel v-model="curIndex" swipeable>
    <swipepanel-item :id="1" style="height: 200px; line-height: 200px; text-align: center; background: #FFFFFF">选项卡一</swipepanel-item>
    <swipepanel-item :id="2" style="height: 150px; line-height: 150px; text-align: center; background: #FFFFFF">选项卡二</swipepanel-item>
    <swipepanel-item :id="3" style="height: 100px; line-height: 100px; text-align: center; background: #FFFFFF">选项卡三</swipepanel-item>
  </swipepanel>

  <br><br>

  <divider> scrolltab multi（通过 absolute 定位） </divider>
  <div style="position: relative; height: 300px;">
    <scrolltab @on-change="change" style="top: 0px;">
      <scrolltab-panel v-for="item in list3" :label="item.label" :key="item.label">
        <div style="height: 400px; display: flex; justify-content: center; align-items: center" :style="{backgroundColor: '#fff'}">{{ item.label }}</div>
      </scrolltab-panel>
    </scrolltab>
  </div>

  <br><br>

  <divider> scrolltab single（通过 absolute 定位） </divider>
  <div style="position: relative; height: 300px;">
  <scrolltab @on-change="change" style="top: 0px;" :nav="list3">
    <scrolltab-panel>
      <div style="height: 400px; display: flex; justify-content: center; align-items: center" :style="{backgroundColor: '#fff'}">
        内容区
      </div>
    </scrolltab-panel>
  </scrolltab>
  </div>

  <br><br>

  <divider> scrollnav multi（通过 absolute 定位） </divider>
  <div style="position: relative; height: 300px;">
  <scrollnav style="top: 0px;">
    <scrollnav-panel :label="item.label" v-for="item, key in list4" :key="key">
      <divider>{{ item.label }}</divider>
      <list :theme="1">
        <list-item v-for="i in 10" :key="i">
          <img slot="img" src="http://static.shikee.com/common/img/blank.gif" style="background-color:#e6e6e6;">
          <span slot="title"><span style="color:#909090;">{{item.label}} - {{item.label}}</span></span>
        </list-item>
      </list>
    </scrollnav-panel>
  </scrollnav>
  </div>

  <br><br>

  <divider> scrollnav single（通过 absolute 定位） </divider>
  <div style="position: relative; height: 300px;">
  <scrollnav style="top: 0px;" :nav="list4">
    <scrollnav-panel>
      <list :theme="1">
        <list-item v-for="i in 10" :key="i">
          <img slot="img" src="http://static.shikee.com/common/img/blank.gif" style="background-color:#e6e6e6;">
          <span slot="title"><span style="color:#909090;">价格</span></span>
        </list-item>
      </list>
    </scrollnav-panel>
  </scrollnav>
  </div>

</div>
</template>

<script>
  const list = () => ['空调', '冰箱', '洗衣机', '热水器', '外卖','厨房家电', '美食', '电影', '生活家电', '风扇', '电影', '酒店', '空调'];

  import { Tab, TabItem } from '../../ui/components/tab'
  import { Swiper, SwiperItem } from '../../ui/components/swiper'
  import { Divider } from '../../ui/components/divider'
  import { List,ListItem } from '../../ui/components/list'
  import { Tabnav,TabnavPanel, Scrolltab,ScrolltabPanel, Scrollnav,ScrollnavPanel, Swipepanel,SwipepanelItem } from '../../ui/components/tabnav'


  export default{
    components:{
      List,ListItem,
      Divider,
      Tab, TabItem,
      Swiper, SwiperItem,
      Swipepanel,SwipepanelItem,
      Tabnav,TabnavPanel,
      Scrolltab,ScrolltabPanel,
      Scrollnav,ScrollnavPanel,
    },
    data(){
      return {
        curIndex: 1,
        index: 0,
        list2: list(),
        list3: [
          {label: '选项卡一', color: 'white'},
          {label: '选项卡二', color: 'white'},
          {label: '选项卡三', color: 'white'},
          {label: '选项卡四', color: 'white'},
          {label: '选项卡五', color: 'white'},
          {label: '选项卡六', color: 'white'},
          {label: '选项卡七', color: 'white'},
          {label: '选项卡八', color: 'white'},
          {label: '选项卡九', color: 'white'},
          {label: '选项卡十', color: 'white'},
          {label: '选项卡十一', color: 'white'},
          {label: '选项卡十二', color: 'white'},
          {label: '选项卡十三', color: 'white'},
          {label: '选项卡十四', color: 'white'},
        ],
        list4: [
          {label: '选项卡一'},
          {label: '选项卡二'},
          {label: '选项卡三'},
          {label: '选项卡四'},
          {label: '选项卡五'},
          {label: '选项卡六'},
          {label: '选项卡七'},
          {label: '选项卡八'},
          {label: '选项卡九'},
          {label: '选项卡十'}
        ]
      }
    },
    methods: {
      change(index) {
        console.log('ScrollTab：---> index：' + index);
      }
    }
  }
</script>

<style>
</style>
