<template>
  <div>
    <div style="height: 100px;"></div>
    <search
      @result-click="resultClick"
      @on-change="getResult"
      :results="results"
      v-model="value"
      position="absolute"
      auto-scroll-to-top top="46px"
      @on-focus="onFocus"
      @on-cancel="onCancel"
      @on-submit="onSubmit"
      ref="search"></search>
    <cell-group>
      <cell title="keyword">{{value}}</cell>
    </cell-group>

    <div style="padding:15px;">
      <button-cell @click.native="setFocus" type="primary">set focus</button-cell>
    </div>
  </div>
</template>

<script>
  import { Search } from '../../ui/components/search'
  import { Cell, CellGroup } from '../../ui/components/cell'
  import { ButtonCell } from '../../ui/components/button'


  export default {
    components: {
      Search,
      CellGroup,
      Cell,
      ButtonCell
    },
    methods: {
      setFocus () {
        this.$refs.search.setFocus()
      },
      resultClick (item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult (val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit () {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus () {
        console.log('on focus')
      },
      onCancel () {
        console.log('on cancel')
      }
    },
    data () {
      return {
        results: [],
        value: 'test'
      }
    }
  }

  function getResult (val) {
    let rs = [];
    for (let i = 0; i < 20; i++) {
      rs.push({
        title: `${val} result: ${i + 1} `,
        other: i
      })
    }
    return rs
  }
</script>
