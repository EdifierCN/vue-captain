<template>
  <table class="zmui-table" :class="{'zmui-table-bordered': fullBordered, 'zmui-table-no-cell-bordered': !cellBordered, 'zmui-table-no-content-bordered': !contentBordered}">
    <slot></slot>
  </table>
</template>

<script>
  export default {
    name: 'x-table',
    props: {
      fullBordered: Boolean,
      cellBordered: {
        type: Boolean,
        default: true
      },
      contentBordered: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="less">
  @import '../../../styles/utils/1px.less';

  .zmui-table {
    line-height: 40px;
    position: relative;
    width: 100%;
    border-collapse: collapse;

    &:after {
      .setTopLine();
    }
    th {
      font-weight: 500
    }
  }

  .zmui-table.zmui-table-bordered {
    &:before {
      .setLeftLine();
    }
  }

  .zmui-table td, .zmui-table th {
    border-bottom: 1px solid #e0e0e0;
    border-right: 1px solid #e0e0e0;
    text-align: center;
  }

  .zmui-table td, .zmui-table th {
    position:relative;
    border-right: 0;
    border-bottom: 0;
  }

  .zmui-table td, .zmui-table th {
    &:before {
      .setBottomLine();
    }
  }

  .zmui-table.zmui-table-no-content-bordered td {
    &:before {
      border-bottom-width: 0;
    }
  }

  .zmui-table.zmui-table-no-content-bordered tr:last-child td {
    &:before {
      border-bottom-width: 1px;
    }
  }

  .zmui-table td, .zmui-table th {
    &:after {
      .setRightLine();
    }
  }

  .zmui-table.zmui-table-no-cell-bordered td, .zmui-table.zmui-table-no-cell-bordered th {
    &:after {
      border-right-width: 0;
    }
  }

  .zmui-table tr td:last-child, .zmui-table tr th:last-child {
    &:after {
      border-right-width: 0;
    }
  }

  .zmui-table.zmui-table-bordered tr td:last-child, .zmui-table.zmui-table-bordered tr th:last-child {
    &:after {
      border-right-width: 1px;
    }
  }
</style>
