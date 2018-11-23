<template>
  <div style="width: 95%;margin: 0 auto;">
    <br>
    <div>
      <step v-model="step1" background-color='#efeff4'>
        <step-item :title="'step 1'" description="step 1"></step-item>
        <step-item :title="'step 2'" description="step 2"></step-item>
        <step-item :title="'step 3'" description="step 3"></step-item>
      </step>
    </div>
    <br>
    <div>
      <step v-model="step2" background-color='#efeff4' gutter="20px">
        <step-item :title="'done'"></step-item>
        <step-item :title="'processing'"></step-item>
        <step-item :title="'end'"></step-item>
      </step>
      <div class="btn_wrap">
        <button-cell type="primary" @click.native="nextStep">{{ 'next step' }}</button-cell>
      </div>
    </div>
  </div>
</template>

<script>
  import { ButtonCell } from '../../ui/components/button'
  import { Step, StepItem } from '../../ui/components/step'

  export default{
    components:{
      ButtonCell,
      Step, StepItem
    },
    data () {
      return {
        step1: 1,
        step2: 0
      }
    },
    methods: {
      nextStep () {
        this.step2 ++
      }
    }
  }
</script>

<style>
  .btn_wrap {
    padding: 0 1rem;
    margin-top: 2rem;
  }
</style>
