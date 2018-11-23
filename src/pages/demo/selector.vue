<template>
  <div>

    <cell-group :title="'no placeholder, the current value is : ' + defaultValue">
      <selector ref="defaultValueRef" title="省份" :options="list" v-model="defaultValue"></selector>
      <selector ref="defaultValueRef" title="省份" direction="rtl" :options="list" v-model="defaultValue"></selector>
    </cell-group>

    <div style="padding:15px;">
      <button-cell type="primary" @click.native="getValue('defaultValueRef')">get full value</button-cell>
    </div>

    <cell-group title="with placeholder">
      <selector placeholder="请选择省份" v-model="demo01" title="省份" name="district" :options="list" @on-change="onChange"></selector>
    </cell-group>

    <cell-group title="without title">
      <selector placeholder="请选择省份" v-model="demo02" :options="list"></selector>
    </cell-group>

    <cell-group title="set value=广西">
      <selector v-model="value1" title="省份" :options="plainList" @on-change="onChange"></selector>
    </cell-group>

    <cell-group title="readonly, displays just like a cell">
      <selector value="gd" readonly title="省份" :options="list"></selector>
    </cell-group>

    <cell-group title="use plain options">
      <selector ref="plainValueRef" value="C" title="Selector" :options="list1" @on-change="onChange"></selector>
    </cell-group>

    <div style="padding:15px;">
      <button-cell type="primary" @click.native="getValue('plainValueRef')">get full value</button-cell>
    </div>

    <cell-group :title="'boolean selector: ' + value3">
      <selector v-model="value3" title="Vux Is Cool" :options="list2"></selector>
    </cell-group>

    <cell-group :title="'set valueMap for directly using API data'" label-width="5em">
      <selector ref="valueMapRef" v-model="valueMapValue" :value-map="['idValue', 'idLabel']" title="Selector" :options="valueMapList" @on-change="onChange"></selector>
      <cell-box align-items="flex-start"><pre>{{ valueMapList }}</pre></cell-box>
      <cell title="value" :value="valueMapValue"></cell>
    </cell-group>

    <div style="padding:15px;">
      <button-cell type="primary" @click.native="getValue('valueMapRef')">get full value</button-cell>
    </div>

  </div>
</template>

<script>
  import { Selector } from '../../ui/components/selector'
  import { ButtonCell } from '../../ui/components/button'
  import { Cell, CellGroup, CellBox } from '../../ui/components/cell'

  export default{
    components:{
      Selector,
      Cell,CellGroup,CellBox,
      ButtonCell
    },
    data(){
      return {
        demo01: null,
        demo02: '',
        defaultValue: 'gd',
        plainList: ['广东', '广西'],
        list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
        list2: [{key: true, value: '是'}, {key: false, value: '否'}],
        value1: '广西',
        value3: true,
        list1: ['A', 'B', 'C'],
        valueMapValue: 'key01',
        valueMapList: [{
          idValue: 'key01',
          idLabel: 'value01',
          otherProp: 'prop01'
        }, {
          idValue: 'key02',
          idLabel: 'value02',
          otherProp: 'prop02'
        }]
      }
    },
    methods:{
      onChange (val) {
        console.log(val)
      },
      getValue (ref) {

      }
    }
  }
</script>

<style>
</style>
