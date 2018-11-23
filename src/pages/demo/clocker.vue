<template>
  <div>
    <cell-group title="普通调用" class="demo-small-pitch">
      <cell>
        <span slot="title">默认模板：</span>
        <clocker slot="value" time="2018/06/06 06:06:06"></clocker>
      </cell>
      <cell>
        <span slot="title">自定义参数模板：</span>
        <clocker slot="value" time="2018/06/06 06:06:06" format="{%s}秒】{%m}分】{%h}时】{%d}天】"></clocker>
      </cell>
      <cell>
        <span slot="title">传入时间为（秒）：</span>
        <clocker slot="value" :time="666666" timetype="second"></clocker>
      </cell>
    </cell-group>

    <cell-group title="通过Slot自定义HTML模板">
      <cell>
        <span slot="title">个位十位一体：</span>
        <clocker slot="value" time="2018/08/08 08:08:08" class="demo-clocker">
          <span style="color:red;">{%d}<i>天</i></span>
          <span style="color:gray;">{%h}<i>时</i></span>
          <span style="color:blue;">{%m}<i>分</i></span>
          <span style="color:orange;">{%s}<i>秒</i></span>
        </clocker>
      </cell>
      <cell>
        <span slot="title">个位十位分开：</span>
        <clocker slot="value" time="2018/09/08 00:00:00" class="demo-clocker">
          <em>{%d0}</em><em>{%d1}</em><em>{%d2}</em>天
          <em>{%h1}</em><em>{%h2}</em>小时
          <em>{%m1}</em><em>{%m2}</em>时
          <em>{%s1}</em><em>{%s2}</em>秒
        </clocker>
      </cell>
    </cell-group>
  </div>
</template>

<script>
  import { Clocker } from '../../ui/components/clocker'
  import { CellGroup, Cell } from '../../ui/components/cell'

  export default{
    components:{
      Clocker,
      CellGroup, Cell
    }
  }
</script>

<style>
</style>
