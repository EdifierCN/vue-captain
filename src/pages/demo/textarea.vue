<template>
<div>
  <cell-group>
    <textarea-cell :max="20" :placeholder="'placeholder'" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></textarea-cell>
  </cell-group>
  <cell-group :title="'used with input'">
    <input-cell :placeholder="'title'"></input-cell>
    <textarea-cell :max="200" name="description" :placeholder="'placeholder'"></textarea-cell>
  </cell-group>
  <cell-group :title="'hide counter'">
    <textarea-cell :max="200" name="detail" :placeholder="'placeholder'" :show-counter="false"></textarea-cell>
  </cell-group>
  <cell-group :title="'autosize'">
    <textarea-cell :placeholder="'Type something'" :show-counter="false" :rows="1" autosize></textarea-cell>
    <textarea-cell :title="'title'" :placeholder="'Type something'" :show-counter="false" :rows="1" autosize></textarea-cell>
  </cell-group>
  <cell-group :title="'set height=200'">
    <textarea-cell :title="'title'" :max="200" :placeholder="'placeholder'" :show-counter="false" :height="200" :rows="8" :cols="30"></textarea-cell>
  </cell-group>
</div>
</template>

<script>
  import { CellGroup } from '../../ui/components/cell'
  import { InputCell } from '../../ui/components/input'
  import { TextareaCell } from '../../ui/components/textarea'

  export default {
    components: {
      TextareaCell,
      CellGroup,
      InputCell
    },
    methods: {
      onEvent (event) {
        console.log('on', event)
      }
    }
  }
</script>

<style>
</style>
