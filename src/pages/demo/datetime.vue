<template>
<div>
  <divider> Datetime </divider>

  <div style="padding:15px;">
    <button-cell type="primary" plain @click.native="showPlugin">{{ 'Used as a plugin' }}</button-cell>
  </div>

  <cell-group :title="'Default format: YYYY-MM-DD'">
    <datetime
      v-model="value1"
      @on-change="change"
      :title="'Birthday'"
      @on-cancel="log('cancel')"
      @on-confirm="log('confirm')"
      @on-hide="log('hide', $event)"></datetime>
  </cell-group>

  <cell-group :title="'Custom minute list: every 15 minutes'">
    <datetime v-model="minuteListValue" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="'Birthday'"></datetime>
  </cell-group>

  <cell-group :title="'Custom hour list'">
    <datetime v-model="hourListValue" format="YYYY-MM-DD HH:mm" :hour-list="['09', '10', '11', '12', '13', '14', '15', '16']" :minute-list="['00', '15', '30', '45']" @on-change="change" :title="'Birthday'"></datetime>
  </cell-group>

  <cell-group title="Readonly">
    <datetime v-model="valueReadonly" :readonly="readonly" @on-change="change" :title="'Birthday'"></datetime>
  </cell-group>
  <div style="padding:15px">
    <button-cell type="primary" plain @click.native="readonly = !readonly"> {{ 'Toggle readonly' }} </button-cell>
  </div>

  <cell-group :title="'Format display value'">
    <datetime v-model="formatValue" :display-format="formatValueFunction" @on-change="change" :title="'Birthday'"></datetime>
  </cell-group>

  <div style="padding:15px;">
    <button-cell type="primary" @click.native="formatValue = '2017-11-11'">{{ 'Set value: 2017-11-11' }}</button-cell>
  </div>

  <cell-group :title="'Define range of hours'">
    <datetime v-model="limitHourValue" format="YYYY-MM-DD HH:mm" :min-hour=9 :max-hour=18 @on-change="change" :title="'Define range of hours'" :inline-desc="'Working hours: 09-18'"></datetime>
  </cell-group>

  <cell-group :title="'Set start-date and end-date' + ' 2015-11-11 ~ 2017-10-11'">
    <datetime v-model="limitHourValue" :start-date="startDate" :end-date="endDate" format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Start time'"></datetime>
  </cell-group>

  <cell-group :title="'Set end-date only' + ' 2017-10-11'">
    <datetime v-model="onlySetEndDateValue" :end-date="onlySetEndDate" format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Start time'"></datetime>
  </cell-group>

  <cell-group :title="'Format' + ': ' + format">
    <datetime v-model="value2" :format="format" @on-change="change" :title="'Start time'"></datetime>
  </cell-group>

  <div style="padding:15px;">
    <button-cell type="primary" @click.native="toggleFormat">{{ 'Toggle format' }}</button-cell>
  </div>

  <cell-group :title="'Placeholder'">
    <datetime v-model="value3" default-selected-value="2017-06-18 13" format="YYYY-MM-DD HH" :placeholder="'Please select'" @on-change="change" :title="'Start time'"></datetime>
  </cell-group>

  <cell-group :title="'Set default-selected-value to 2017-11-11'">
    <datetime v-model="value3_1" default-selected-value="2017-11-11" format="YYYY-MM-DD" :placeholder="'Please select'" @on-change="change" :title="'Start time'" :inline-desc=" 'Current value' + `: ${value3_1}`"></datetime>
  </cell-group>

  <cell-group :title="'Set min-year and max-year'">
    <datetime v-model="value4" :placeholder="'Please select'" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Years after 2000'"></datetime>
  </cell-group>

  <cell-group :title="'Prop: compute-hours-function'">
    <datetime format="YYYY-MM-DD HH" v-model="computeHoursValue" :compute-hours-function="computeHoursFunction" :title="'Birthday'" @on-change="change"></datetime>
  </cell-group>

  <cell-group :title="'Prop: compute-days-function'">
    <datetime format="YYYY-MM-DD HH" v-model="computeDaysValue" :compute-days-function="computeDaysFunction" :title="'Birthday'" @on-change="change"></datetime>
  </cell-group>

  <cell-group :title="'Specified template text in Chinese'">
    <datetime v-model="value5" :placeholder="'Please select'" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" :title="'Chinese'" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
  </cell-group>

  <cell-group :title="'Show center button and clear the value'">
    <datetime v-model="value6" @on-change="change" :title="'Birthday'" clear-text="clear" @on-clear="clearValue"></datetime>
  </cell-group>

  <cell-group :title="'Show center button to set date to today'">
    <datetime v-model="value7" @on-change="change" :title="'Birthday'" clear-text="today" @on-clear="setToday"></datetime>
  </cell-group>

  <cell-group :title="'Custom trigger slot'">
    <datetime v-model="value7" @on-change="change" :title="'Birthday'" clear-text="today" @on-clear="setToday">
      <button-cell>{{'Click me'}}</button-cell>
    </datetime>
  </cell-group>

  <cell-group :title="'Required'">
    <datetime v-model="value8" :title="'Required'" clear-text="clear" @on-clear="clearValue8" :required="true"></datetime>
  </cell-group>

  <cell-group :title="'Use prop: show.sync (vue^2.3) to control visibility'">
    <datetime v-model="value9" @on-change="change" :title="'Birthday'" :show.sync="visibility"></datetime>
  </cell-group>

  <div style="padding:15px;">
    <button-cell type="primary" plain @click.native="visibility = true">显示</button-cell>
  </div>

  <br>
  <br>

  <divider> DatatimeRange </divider>
  <cell-group :title="value[0] + ' ' + value[1] + ':' + value[2]">
    <datetime-range :title="'Choose'" start-date="2017-01-01" end-date="2017-02-02" :format="'daterange-format'" v-model="value" @on-change="onChange"></datetime-range>
  </cell-group>

  <br>
  <br>

  <divider> DatatimeView </divider>
  <datetime-view v-model="value1" ref="datetime" :format="format"></datetime-view>
  <p class="info">{{ 'Current value' }}: {{ value1 }}</p>
  <div style="padding:15px;">
    <button-cell @click.native="changeValue('2017-11-11')" :disabled="format !== 'YYYY-MM-DD'" type="primary"> {{ 'Set 2017-11-11' }} </button-cell>
    <button-cell @click.native="changeValue('2016-08-08')" :disabled="format !== 'YYYY-MM-DD'" type="primary"> {{ 'Set 2016-08-08' }} </button-cell>
    <button-cell @click.native="toggleFormat" type="primary"> {{ 'Toggle format' }} </button-cell>
    <button-cell @click.native="showPopup = true" type="primary"> {{ 'Show popup with datetime-view' }} </button-cell>
  </div>
  <div v-transfer-dom>
    <popup v-model="showPopup">
      <datetime-view v-model="value2"></datetime-view>
    </popup>
  </div>

</div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { ButtonCell } from '../../ui/components/button'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { Popup } from '../../ui/components/popup'
  import { Datetime, DatetimeRange, DatetimeView } from '../../ui/components/datetime'

  import TransferDom from '../../ui/directives/transfer-dom'

  export default{
    directives:{
      TransferDom
    },
    components:{
      Popup,
      Divider,
      ButtonCell,
      CellGroup, Cell,
      Datetime, DatetimeRange, DatetimeView
    },
    data () {
      return {
        readonly: true,
        minuteListValue: '2017-06-12 09:00',
        hourListValue: '2017-06-12 09:00',
        format: 'YYYY-MM-DD HH:mm',
        value1: '2015-11-12',
        valueReadonly: '2015-11-12',
        value2: '',
        value3: '',
        value3_1: '',
        value4: '',
        value5: '',
        value6: '2016-08-18',
        value7: '',
        value8: '',
        limitHourValue: '',
        startDate: '2015-11-11',
        endDate: '2017-10-11',
        formatValue: '2017-10-11',
        formatValueFunction (val) {
          return val.replace(/-/g, '$')
        },
        value9: '',
        visibility: false,
        computeHoursValue: '',
        computeDaysValue: '',
        computeHoursFunction (date, isToday, generateRange) {
          if (isToday) {
            return generateRange(new Date().getHours(), 23)
          } else {
            return generateRange(0, 23)
          }
        },
        computeDaysFunction (options, generateRange) {
          return [options.month] // if current month is n, days are [n]
        },
        onlySetEndDate: '2017-10-11',
        onlySetEndDateValue: '',

        value: ['2017-01-15', '03', '05'],

        value10: '2017-10-11',
        value11: '2017-10-24',
        showPopup: false,
        format11: 'YYYY-MM-DD'
      }
    },
    methods: {
      log (str1, str2 = '') {
        console.log(str1, str2)
      },
      showPlugin () {

      },
      toggleFormat () {
        this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
      },
      change (value) {
        console.log('change', value)
      },
      clearValue (value) {
        this.value6 = ''
      },
      clearValue8 (value) {
        this.value8 = ''
      },
      setToday (value) {
        let now = new Date()
        let cmonth = now.getMonth() + 1
        let day = now.getDate()
        if (cmonth < 10) cmonth = '0' + cmonth
        if (day < 10) day = '0' + day
        this.value7 = now.getFullYear() + '-' + cmonth + '-' + day
        console.log('set today ok')
      },

      onChange (val) {
        console.log('change', val)
      },

      toggleFormat () {
        if (this.format === 'YYYY-MM-DD') {
          this.format = 'YYYY-MM-DD HH:mm'
        } else {
          this.format = 'YYYY-MM-DD'
        }
      },
      changeValue (val) {
        this.value1 = val
        this.$refs.datetime.render()
      },
    }
  }
</script>

<style>
</style>
