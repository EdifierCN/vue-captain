<template>
  <li class="zmui-indexsection">
      <cell-group :title="index">
        <cell @click.native="handleCheck(item)" v-for="(item, index ) in list" :title="item.title" :key="index" v-show="item.isShow">
          <checkicon v-if="model === 'select'" slot="icon" class="zmui-indexsection-checkbox" :value.sync="item.isCheck"></checkicon>
        </cell>
      </cell-group>
  </li>
</template>

<script type="text/babel">

  import { Cell, CellGroup } from '../../cell'
  import { Checkicon } from '../../checkbox'
  import { oneOf } from '../../../libs/assist'
  export default {
    name: 'index-section',

    components: {
      Cell,CellGroup,
      Checkicon
    },

    props: {
      model: {
        validator(val){
          return oneOf(val, ['default', 'select'])
        },
        default: 'default'
      },
      index: {
        type: String,
        required: true
      },
      cells: {
        type: [Array, Object],
        required: true
      }
    },

    data(){
      return {
        list: []
      }
    },

    created(){
      this.cells.forEach((item) => {
        let obj;
        if(item !== null && typeof item === 'object'){
          obj = {
            ...item,
            isCheck: false,
            isShow: false
          };
        }else{
          obj = {
            title: item,
            isCheck: false,
            isShow: true
          };
        }
        this.list.push(obj)
      });
    },

    mounted() {
      this.$parent.sections.push(this);
    },

    methods:{
      handleCheck(item){
        item.isCheck = !item.isCheck;
        this.$emit('on-section-click', item);
        console.info(this.$parent.selected);
      }
    },

    beforeDestroy() {
      let index = this.$parent.sections.indexOf(this);
      if (index > -1) {
        this.$parent.sections.splice(index, 1);
      }
    }
  };
</script>

<style lang="less">

    .zmui-indexsection {
      padding: 0;
      margin: 0;

      &-index {
        margin: 0;
        padding: 0 10px;
        background-color: #fafafa;

      & + ul {
            padding: 0;
          }
      }

      &-checkbox{
        padding-right: 0.35rem;
      }
    }

</style>
