<template>
  <div>

    <badge class="badge1">
      <span>555</span>
      <badge class="badge2">
        <span>6666</span>
      </badge>
    </badge>

    <div>
      <divider> 默认 </divider>
      <box gap="10px 10px">
        <badge></badge>
        <badge type="primary">5</badge>
        <badge type="success">55</badge>
        <badge type="warning">555</badge>
        <badge type="danger">5555</badge>
        <badge type="royal">55555</badge>
      </box>
    </div>

    <div>
      <divider> 结合cell使用 </divider>
      <cell-group title="Used in a Cell">
        <cell title="测试" is-link>
          <div style="display: flex; align-items: center">
            <span> 测试 &nbsp;</span>
            <badge type="danger"></badge>
          </div>
        </cell>
        <cell title="测试" is-link>
          <div style="display: flex; align-items: center">
            <span> 测试 &nbsp;</span>
            <badge type="danger">88888</badge>
          </div>
        </cell>
      </cell-group>
    </div>

  </div>
</template>

<script>
  import { Badge } from '../../ui/components/badge'
  import { Box } from '../../ui/components/box'
  import { Divider } from '../../ui/components/divider'

  import { Cell, CellGroup } from '../../ui/components/cell'

  export default{
    components:{
      Badge,
      Box,
      Divider,
      Cell, CellGroup
    }
  }
</script>

<style>
  .badge1 >>> span{
    color: greenyellow;
  }
  .badge2 >>> span{
    color: red;
  }
</style>
