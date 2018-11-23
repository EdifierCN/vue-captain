<template>
  <div>
    <cell-group>
      <cell v-for="(type, index) in types" :title="type" :key="type" :inline-desc="index === 3 ? 'size=40px' : ''">
        <spinner :type="type" :size="index === 3 ? '40px' : ''"></spinner>
      </cell>
    </cell-group>
  </div>
</template>

<script>
  import { Spinner } from '../../ui/components/spinner'
  import { Cell, CellGroup } from '../../ui/components/cell'

  export default{
    components: {
      Spinner,
      Cell, CellGroup
    },
    data () {
      return {
        types: ['android', 'ios', 'ios-small', 'bubbles', 'circles', 'crescent', 'dots', 'lines', 'ripple', 'spiral']
      }
    }
  }
</script>

<style>
</style>
