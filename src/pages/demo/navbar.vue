<template>
  <div>
    <br>
    <navbar>This is the page title.</navbar>
    <br>
    <navbar title="use prop:title"></navbar>
    <br>
    <navbar :left-options="{showBack: false}">do not show Back</navbar>
    <br>
    <navbar :left-options="{backText: ''}">set empty back text</navbar>
    <br>
    <navbar :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</navbar>
    <br>
    <navbar>with right link<a slot="right">Feedback</a></navbar>
    <br>
    <navbar>long long long long long long long text<a slot="right">Feedback</a></navbar>
    <br>
    <navbar>with left slot<a slot="left">Close</a></navbar>
    <br>
    <navbar>
      <span>overwrite-left</span>
      <icon slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></icon>
    </navbar>
    <br>
    <navbar style="background-color:#000;">custom background color</navbar>
    <br>
    <navbar title="slot:overwrite-title">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <button-tab :animate="true">
          <button-tab-item selected label="A">A</button-tab-item>
          <button-tab-item label="B">B</button-tab-item>
          <!--<button-tab-item label="C">C</button-tab-item>-->
        </button-tab>
      </div>
    </navbar>
  </div>
</template>

<script>
  import { Navbar } from '../../ui/components/navbar'
  import { Icon } from '../../ui/components/icon'
  import { ButtonTab, ButtonTabItem } from '../../ui/components/tab'

  export default {
    components: {
      Navbar,
      Icon,
      ButtonTab,
      ButtonTabItem
    }
  }
</script>

<style>
  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
