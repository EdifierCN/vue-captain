<template>
<div>
  <divider> address picker </divider>
  <cell-group>
    <address-picker @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" @on-shadow-change="onShadowChange" placeholder="请选择地址" inline-desc="可以设置placeholder" :show.sync="showAddress"></address-picker>
    <cell title="上面value值" :value="value"></cell>
  </cell-group>

  <div style="padding: 15px;">
    <address-picker style="display:none;" popup-title="selecte address" :title="title" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></address-picker>
    <button-cell type="primary" @click.native="doShowAddress">单独控制显示(2s后关闭)</button-cell>
  </div>

  <cell-group>
    <address-picker :title="title" @on-hide="logHide" v-model="value_0_1" :list="addressData" placeholder="请选择地址">
      <template slot="title" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
        <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
          <span style="vertical-align:middle;">地址</span>
        </span>
      </template>
    </address-picker>
  </cell-group>

  <br>
  <cell-group label-width="5em" label-align="left">
    <address-picker :title="title2" v-model="value2" raw-value :list="addressData" value-text-align="left"></address-picker>
  </cell-group>
  <br/>
  <div style="padding: 0 15px;">
    <button-cell type="primary" @click.native="changeData">改变数据（通过 id）</button-cell>
    <button-cell type="primary" @click.native="changeDataByLabels">改变数据（通过文字值）</button-cell>
    <button-cell type="primary" @click.native="changeDataByLabels2">改变数据（两级，通过文字值）</button-cell>
  </div>
  <br/>

  <cell-group>
    <address-picker title="二级省市" v-model="value3" raw-value :list="addressData"></address-picker>
  </cell-group>
  <cell-group>
    <address-picker title="只显示省市" v-model="value4" raw-value :list="addressData" hide-district></address-picker>
    <cell title="value值" :value="value4"></cell>
    <cell title="转换成文字值" :value="getName(value4)"></cell>
  </cell-group>

  <br/>
  <cell-group title="错误的地址将不能正确渲染到相应位置">
    <address-picker title="错误的值" v-model="value5" raw-value :list="addressData" inline-desc="广东省, 深圳 市, 南山区"></address-picker>
  </cell-group>

  <br>
  <br>

  <divider> address select </divider>
  <cell-group title="默认调用">
    <cell is-link title="所在地区" @click.native="show1 = true" v-model="model1">
    </cell>
  </cell-group>

  <cell-group title="设置默认值">
    <cell is-link title="所在地区" @click.native="show2 = true" v-model="model2">
    </cell>
  </cell-group>

  <address-select v-model="show1" :callback="result1" :items="district"></address-select>
  <address-select v-model="show2" :callback="result2" :items="district" province="新疆" city="乌鲁木齐市" area="天山区"></address-select>
</div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { ButtonCell } from '../../ui/components/button'
  import { AddressPicker, AddressSelect } from '../../ui/components/address'

  // popup 未引入 cell 的 css，需和 cell-cell-group 结合使用
  import ChinaAddressV4Data from '../../ui/datas/china_address.json'
  import District from '../../ui/datas/jd_address'
  import value2name from '../../ui/filters/value2name'

  export default{
    components:{
      Divider,
      CellGroup, Cell,
      ButtonCell,
      AddressPicker, AddressSelect
    },
    data(){
      return {
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

    methods: {
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

<style>
</style>
