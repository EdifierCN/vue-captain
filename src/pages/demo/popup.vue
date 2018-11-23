<template>
    <div>

      <divider> popup </divider>
      <cell-group>
        <switch-cell title="Default popup" v-model="show"></switch-cell>
        <switch-cell title="Full popup" v-model="show_1"></switch-cell>
        <switch-cell title="Multi popup (first)" v-model="show3"></switch-cell>
        <switch-cell title="Mask disable" v-model="show5"></switch-cell>
        <switch-cell title="Popup address" v-model="show6"></switch-cell>
        <switch-cell title="default max-height=100%" v-model="show12"></switch-cell>
        <switch-cell title="set max-height=50%" v-model="show13"></switch-cell>
      </cell-group>

      <div v-transfer-dom>
        <popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
          <div class="popup0">
            <cell-group>
              <switch-cell title="Another XSwitcher" v-model="show"></switch-cell>
              <switch-cell title="Show Toast" v-model="showToast"></switch-cell>
            </cell-group>
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show_1" height="100%">
          <div class="popup1">
            <cell-group>
              <switch-cell title="Another XSwitcher" v-model="show_1"></switch-cell>
            </cell-group>
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show3">
          <div class="popup2">
            <cell-group>
              <switch-cell title="Multi Popup (first)" v-model="show3"></switch-cell>
              <switch-cell title="Multi Popup (second)" v-model="show4"></switch-cell>
            </cell-group>
            this is the first popup
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show4">
          <div class="popup2">
            <cell-group>
              <switch-cell title="Multi Popup (second)" v-model="show4"></switch-cell>
            </cell-group>
            this is the second popup
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show5" :hide-on-blur=false>
          <div class="popup2">
            <cell-group>
              <switch-cell title="Mask disable" v-model="show5"></switch-cell>
            </cell-group>
            The mask cannot be clicked!
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show6">
          <div class="popup1">
            <cell-group>
              <switch-cell title="Popup address" v-model="show6"></switch-cell>
            </cell-group>
            <cell-group>
              <address-picker :title="title6" v-model="value6" :list="addressData" placeholder="请选择地址" inline-desc="可以设置placeholder" :popup-style="{zIndex: 502}"></address-picker>
            </cell-group>
          </div>
        </popup>
      </div>

      <cell-group>
        <switch-cell title="transparent background" v-model="show7"></switch-cell>
      </cell-group>

      <div v-transfer-dom>
        <popup v-model="show7" height="270px" is-transparent>
          <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
            <cell-group>
              <cell title="Product" value="Donate"></cell>
              <cell title="Total" value="$10.24"></cell>
            </cell-group>
            <div style="padding:20px 15px;">
              <button-cell type="primary">Pay</button-cell>
              <button-cell @click.native="show7 = false">Cancel</button-cell>
            </div>
          </div>
        </popup>
      </div>

      <cell-group title="set position">
        <switch-cell title="left(100% width)" v-model="show8"></switch-cell>
        <switch-cell title="right" v-model="show9"></switch-cell>
        <switch-cell title="top(no mask)" v-model="show_10"></switch-cell>
        <switch-cell title="bottom" v-model="show11"></switch-cell>
      </cell-group>

      <div v-transfer-dom>
        <popup v-model="show8" position="left" width="100%">
          <div class="position-horizontal-demo">
            <span class="zmui-close" @click="show8 = false">关闭</span>
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show9" position="right">
          <div style="width:200px;">
            <span class="zmui-close" @click="show9 = false">关闭</span>
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show_10" position="top" :show-mask="false">
          <div class="position-vertical-demo">
            I'm on top. Hide in 1s.
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show11" position="bottom">
          <div class="position-vertical-demo">
            I'm on bottom.
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show12" position="bottom">
          <cell-group>
            <cell v-for="i in 20" :key="i" :title="i"></cell>
          </cell-group>
          <div style="padding: 15px;">
            <button-cell @click.native="show12 = false" plain type="primary"> Close Me </button-cell>
          </div>
        </popup>
      </div>

      <div v-transfer-dom>
        <popup v-model="show13" position="bottom" height="70%">
          <popup-header slot="header" @on-click-left="show13 = false"  @on-click-right="show13 = false">
          </popup-header>
          <cell-group>
            <cell v-for="i in 20" :key="i" :title="i"></cell>
          </cell-group>
          <div style="padding: 15px;" slot="footer">
            <button-cell @click.native="show13 = false" plain type="primary"> Close Me </button-cell>
          </div>
        </popup>
      </div>

      <br>
      <br>

      <divider> popup-radio </divider>
      <cell-group>
        <popup-radio title="options" :options="options1" v-model="option1"></popup-radio>
      </cell-group>

      <cell-group>
        <popup-radio title="options" :options="options2" v-model="option2" placeholder="placeholder"></popup-radio>
      </cell-group>

      <cell-group>
        <popup-radio title="options" :options="options3" v-model="option3">
          <p slot="popup-header" class="zmui-1px-b demo3-slot">Please select</p>
        </popup-radio>
      </cell-group>

      <cell-group>
        <popup-radio title="readonly" readonly :options="options3" v-model="option4">
          <p slot="popup-header" class="zmui-1px-b demo3-slot">Please select</p>
        </popup-radio>
      </cell-group>

      <cell-group>
        <popup-radio title="slot:each-item" :options="options3" v-model="option5">
          <template slot-scope="props" slot="each-item"><!-- use scope="props" when vue < 2.5.0 -->
            <p>
              custom item <img src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" class="vux-radio-icon"> {{ props.label }}
              <br>
              <span style="color:#666;">{{ props.index + 1 }} another line</span>
            </p>
          </template>
        </popup-radio>
      </cell-group>

      <br>
      <br>

      <divider> popup-picker </divider>
      <cell-group title="默认，不设置默认值时选中第一个">
        <popup-picker title="选择" :data='years' v-model='year1' @on-change='change'></popup-picker>
      </cell-group>

      <cell-group title="异步加载及动态改变数据">
        <popup-picker title="选择" :data='years001' v-model='year001' @on-change='change'></popup-picker>
        <cell title="上面的value值" :value="year001"></cell>
      </cell-group>
      <br>
      <p style="padding: 0 15px;">
        <button-cell type="primary" @click.native="changeValue([['1','3','5','7','9','11'],['2','3','4','5'],['a','b','c']])"> 设置数值1 </button-cell>
        <button-cell type="primary" @click.native="changeValue([['1','3','5','7','9','11'],['2','3','4','5']])">设置数值2 </button-cell>
        <button-cell type="primary" @click.native="changeValue([['2','4','6','8','10','11']])">设置数值3</button-cell>
      </p>

      <cell-group title="设置默认值时">
        <popup-picker title="选择" :data='years' v-model='year2' @on-change='change'></popup-picker>
      </cell-group>

      <cell-group title="双向绑定">
        <popup-picker title="选择" :data='years' v-model='year3' @on-change='change3'></popup-picker>
      </cell-group>
      <select v-model='year5'>
        <option v-for='one in years[0]' :value='one.value'>{{one.name}}</option>
      </select>

      <cell-group title="非联动多列">
        <popup-picker title="选择" :data='years1' v-model='year4' @on-change='change'></popup-picker>
      </cell-group>

      <cell-group title="五列">
        <popup-picker title="选择" :data='year6' v-model='year6Value' @on-change='change'></popup-picker>
      </cell-group>

      <cell-group :title="`地区联动: ${year7Value} <br> 选中值所对应的文字: ${$refs.picker1&&$refs.picker1.getNameValues()}`">
        <popup-picker title="选择" :data='year7' :columns=3 v-model='year7Value' @on-change='change' ref="picker1"></popup-picker>
      </cell-group>
      <br>
      <p style="padding: 0 15px;">
        <button-cell @click.native="setData1" type="primary"> ["USA", "usa002", "0005"]</button-cell>
        <button-cell @click.native="setData2" type="primary"> ["china", "china002", "gz"]</button-cell>
        <button-cell @click.native="setList" type="primary">Set List</button-cell>
      </p>

      <cell-group title="3列的数据，只显示两列">
        <popup-picker title="选择" :data='year7' :fixed-columns="2" :columns=3 v-model='year8Value' @on-change='change'></popup-picker>
      </cell-group>
    </div>

</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { CellGroup, CellBox, Cell } from '../../ui/components/cell'
  import { ButtonCell } from '../../ui/components/button'
  import { SwitchCell } from '../../ui/components/switch'

  import {  Popup,
            PopupHeader,
            PopupPicker,
            PopupRadio,
  } from '../../ui/components/popup'

  import { AddressPicker, AddressSelect  } from '../../ui/components/address'
  // popup 未引入 cell 的 css，需和 cell-cell-group 结合使用
  import ChinaAddressV4Data from '../../ui/datas/china_address.json'
  import District from '../../ui/datas/jd_address'
  import value2name from '../../ui/filters/value2name'

  let years = [];
  for (let i = 2000; i <= 2030; i++) {
    years.push({
      name: i + '年',
      value: i + ''
    })
  }

  import  TransferDom from '../../ui/directives/transfer-dom'

  export default{
    components:{
      Divider,
      ButtonCell,
      SwitchCell,
      Cell, CellGroup, CellBox,
      Popup,
      PopupHeader,
      PopupPicker,
      PopupRadio,
      AddressPicker, AddressSelect
    },
    directives: {
      TransferDom
    },
    data(){
      return {
        // popup
        show: false,
        show_1: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        title6: '默认空的',
        value6: [],
        show7: false,
        showToast: false,
        show8: false,
        show9: false,
        show_10: false,
        show11: false,
        show12: false,
        show13: false,

        // radio
        option1: 'A',
        options1: ['A', 'B', 'C'],
        option2: '',
        options2: [{
          key: 'A',
          value: 'label A'
        }, {
          key: 'B',
          value: 'label B'
        }],
        option3: 'C',
        options3: ['A', 'B', 'C'],
        option4: 'B',
        option5: 'B',

        // picker
        years: [years],
        years001: [],
        year001: [],
        years1: [years, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
        year1: [''],
        year2: ['2002'],
        year3: ['2005'],
        year4: ['2002', '4'],
        year5: '2005',
        year6: [
          ['你', '我', '他'],
          ['you', 'I', 'him'],
          ['ni', 'wo', 'ta'],
          [1, 2, 3, 4, 5],
          [5, 4, 3, 2, 1]
        ],
        year6Value: ['我', 'him', 'ni', '1', '2'],
        year7: [{
          name: '中国',
          value: 'china',
          parent: 0
        }, {
          name: '美国',
          value: 'USA',
          parent: 0
        }, {
          name: '广东',
          value: 'china001',
          parent: 'china'
        }, {
          name: '广西',
          value: 'china002',
          parent: 'china'
        }, {
          name: '美国001',
          value: 'usa001',
          parent: 'USA'
        }, {
          name: '美国002',
          value: 'usa002',
          parent: 'USA'
        }, {
          name: '广州',
          value: 'gz',
          parent: 'china001'
        }, {
          name: '深圳',
          value: 'sz',
          parent: 'china001'
        }, {
          name: '广西001',
          value: 'gz',
          parent: 'china002'
        }, {
          name: '广西002',
          value: 'sz',
          parent: 'china002'
        }, {
          name: '美国001_001',
          value: '0003',
          parent: 'usa001'
        }, {
          name: '美国001_002',
          value: '0004',
          parent: 'usa001'
        }, {
          name: '美国002_001',
          value: '0005',
          parent: 'usa002'
        }, {
          name: '美国002_002',
          value: '0006',
          parent: 'usa002'
        }],
        year7Value: [],
        year8Value: [],

        //  address picker
        title: '默认为空',
        value_0_1: [],
        value: [],
        title2: '设置值',
        value2: ['天津市', '市辖区', '和平区'],
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV4Data,
        value4: [],
        value5: ['广东省', '深圳市', '南山区'],
        showAddress: false,

        //  address select
        show1: false,
        show2: false,
        model1: '请选择地区',
        model2: '新疆 乌鲁木齐市 天山区',
        district: District,
      }
    },
    watch:{
      show_10 (val) {
        if (val) {
          setTimeout(() => {
            this.show_10 = false
          }, 1000)
        }
      },
      year5: {
        handler (val) {
          this.year3[0] = val;
          // this.year3.$set(0, val)
          this.$set(this.year3, 0, val)
        },
        deep: true
      },
      change3 (value) {
        this.year5 = value[0]
      }
    },
    methods:{
      log (str) {
        console.log(str)
      },
      changeValue (value) {
        this.years001 = value
      },
      change (value) {
        console.log('new Value', value)
      },
      change3 (value) {
        this.year5 = value[0]
      },
      setData1 () {
        this.year7Value = ['USA', 'usa002', '0005']
      },
      setData2 () {
        this.year7Value = ['china', 'china002', 'gz']
      },
      setList () {
        this.year7.push({
          name: '美国002_003',
          value: '0007',
          parent: 'usa002'
        })
      },


      doShowAddress () {
        this.showAddress = true;
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange (ids, names) {
        console.log(ids, names)
      },
      changeData () {
        this.value2 = ['430000', '430400', '430407']
      },
      changeDataByLabels () {
        this.value2 = ['广东省', '广州市', '天河区']
      },
      changeDataByLabels2 () {
        this.value2 = ['广东省', '中山市', '--']
      },
      getName (value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide (str) {
        console.log('on-hide', str)
      },
      logShow (str) {
        console.log('on-show')
      },

      result1(ret) {
        console.log(ret);
        this.model1 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },
      result2(ret) {
        console.log(ret);
        this.model2 = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },

    }
  }
</script>

<style lang="less">
  .popup0 {
    padding-bottom:15px;
    height:200px;
  }
  .popup1 {
    width:100%;
    height:100%;
  }
  .popup2 {
    padding-bottom:15px;
    height:400px;
  }
  .position-vertical-demo {
    background-color: #ffe26d;
    color: #000;
    text-align: center;
    padding: 15px;
  }
  .position-horizontal-demo {
    position: relative;
    height: 100%;
  .vux-close {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%) scale(4);
    color: #000;
  }
  }
  .demo3-slot {
    text-align: center;
    padding: 8px 0;
    color: #888;
  }
</style>
