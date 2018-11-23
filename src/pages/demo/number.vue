<template>
  <div>
    <br>
    <div style="text-align:center;">
      <number-inline width="50px"></number-inline>
    </div>
    <br>
    <div style="text-align:center;">
      <number-inline width="50px" button-style="round"></number-inline>
    </div>
    <cell-group>
      <cell :title="'Used within cell'">
        <number-inline style="display:block;" :min="0" width="50px" button-style="round"></number-inline>
      </cell>
    </cell-group>

    <br>

    <cell-group :title="'Default'">
      <number-cell :name="'Quantity'" :title="'Quantity'"></number-cell>
    </cell-group>

    <cell-group :title="'listen'">
      <number-cell :title="'Quantity'" :value="0" :min="0" @on-change="change"></number-cell>
    </cell-group>

    <cell-group :title="'set width=100px'">
      <number-cell :title="'Quantity'" width="100px"></number-cell>
    </cell-group>

    <cell-group :title="'round style'">
      <number-cell :title="'Quantity'" v-model="roundValue" button-style="round" :min="0" :max="5"></number-cell>
    </cell-group>

    <cell-group :title="'set step=0.5'">
      <number-cell :title="'Quantity'" :step="0.5"></number-cell>
    </cell-group>

    <cell-group :title="'set value=1, min=-5 and max=8'">
      <number-cell :title="'Quantity'" :min="-5" :max="8" :value="1"></number-cell>
    </cell-group>

    <cell-group :title="'fillable = true'">
      <number-cell :value="10" :title="'Quantity'" fillable></number-cell>
    </cell-group>

    <br>
    <number-roller :number="numberR" :width="6"></number-roller>
  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { SwitchInline, SwitchCell } from '../../ui/components/switch'
  import { NumberInline, NumberCell, NumberRoller } from '../../ui/components/number'

  export default{
    components: {
      NumberInline, NumberCell, NumberRoller,
      SwitchInline, SwitchCell,
      CellGroup, Cell,
      Divider
    },
    data () {
      return {
        roundValue: 0,
        numberR: 0,
      }
    },
    mounted(){
      setInterval(() => {
        this.numberR = 100000 + Math.round(Math.random() * 899999)
      }, 3000);
    },
    methods: {
      change (val) {
        console.log('change', val)
      }
    }
  }
</script>

<style>
</style>
