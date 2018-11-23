<template>
  <div>
    <loadmore tip="default" :show-loading="false" background-color="#fbf9fe"></loadmore>
    <div style="padding:0 15px;">
      <table-cell>
        <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Apple</td>
          <td>$1.25</td>
        </tr>
        <tr>
          <td>Banana</td>
          <td>$1.20</td>
        </tr>
        </tbody>
      </table-cell>
    </div>
    <div>
      <loadmore tip="cell-bordered=false" :show-loading="false" background-color="#fbf9fe"></loadmore>
      <table-cell :cell-bordered="false" style="background-color:#fff;">
        <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Apple</td>
          <td>$1.25</td>
          <td> x 1</td>
        </tr>
        <tr>
          <td>Banana</td>
          <td>$1.20</td>
          <td> x 2</td>
        </tr>
        </tbody>
      </table-cell>

      <loadmore tip="content-bordered=false" :show-loading="false" background-color="#fbf9fe"></loadmore>

      <table-cell :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Apple</td>
          <td>$1.25</td>
          <td> x 1</td>
        </tr>
        <tr>
          <td>Banana</td>
          <td>$1.20</td>
          <td> x 2</td>
        </tr>
        </tbody>
      </table-cell>
    </div>
    <div style="padding:15px;">
      <loadmore tip="full-bordered" :show-loading="false" background-color="#fbf9fe"></loadmore>
      <table-cell full-bordered style="background-color:#fff;">
        <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Apple</td>
          <td colspan="2">$1.25 x 10</td>
        </tr>
        <tr>
          <td>Banana</td>
          <td>$1.20</td>
          <td>x 08</td>
        </tr>
        </tbody>
      </table-cell>
    </div>
  </div>
</template>

<script>
  import { TableCell } from '../../ui/components/table'
  import { Loadmore } from '../../ui/components/loadmore'

  export default {
    components: {
      TableCell,
      Loadmore
    }
  }
</script>

<style>
</style>
