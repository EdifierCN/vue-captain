<template>

  <div>

    <divider> SwipeCalendar </divider>
    <swipe-calendar></swipe-calendar>

    <br>
    <br>

    <divider> InlineCalendar </divider>
    <inline-calendar
      ref="calendar"
      @on-change="onChange"
      @on-view-change="onViewChange"
      class="inline-calendar-demo"
      :show.sync="show"
      v-model="value"
      start-date="2016-04-01"
      end-date="2018-05-30"
      :range="range"
      :show-last-month="showLastMonth"
      :show-next-month="showNextMonth"
      :highlight-weekend="highlightWeekend"
      :return-six-rows="return6Rows"
      :hide-header="hideHeader"
      :hide-week-list="hideWeekList"
      :replace-text-list="replaceTextList"
      :weeks-list="weeksList"
      :render-function="buildSlotFn"
      :disable-past="disablePast"
      :disable-future="disableFuture"
      :disable-weekend="disableWeekend"
      :disable-date-function="disableDateFunction">
    </inline-calendar>

    <cell-group>
      <cell :title="'Current value'" :value="value"></cell>
      <cell :title="'Start date'" value="2016-04-01"></cell>
      <cell :title="'End date'" value="2018-05-30"></cell>
    </cell-group>

    <div style="margin: 15px;">
      <button-cell type="primary" @click.native="$refs.calendar.switchViewToToday()">switchViewToToday</button-cell>
      <button-cell type="primary" @click.native="$refs.calendar.switchViewToMonth(2017, 12)">switchViewToMonth(2017, 12)</button-cell>
      <button-cell type="primary" @click.native="$refs.calendar.switchViewToMonth(2018, 10)">switchViewToMonth(2018, 10)</button-cell>
      <button-cell type="primary" @click.native="$refs.calendar.switchViewToCurrentValue()">switchViewToCurrentValue</button-cell>
    </div>

    <cell-group :title="'Control days'" style="margin-top: 30px;">
      <switch-cell v-model="disablePast" :title="'Disable past'"></switch-cell>
      <switch-cell v-model="disableFuture" :title="'Disable future'"></switch-cell>
      <switch-cell v-model="disableWeekend" :title="'Disable weekend'"></switch-cell>
      <switch-cell v-model="showLastMonth" :title="'Show last month'"></switch-cell>
      <switch-cell v-model="showNextMonth" :title="'Show next month'"></switch-cell>
      <switch-cell v-model="return6Rows" :inline-desc="'If not, the height of calendar would change'" :title="'Always show 6 rows'"></switch-cell>
      <switch-cell v-model="highlightWeekend" :title="'Highlight weekend'"></switch-cell>
      <cell :title="'Current value'" :value="value"></cell>
    </cell-group>
    <cell-group :title="'Control navs'">
      <switch-cell v-model="hideHeader" :title="'Hide header'"></switch-cell>
      <switch-cell v-model="hideWeekList" :title="'Hide week list'"></switch-cell>
      <switch-cell v-model="changeWeeksList" :title="'Change week list'"></switch-cell>
    </cell-group>
    <cell-group :title="'Replace text'">
      <switch-cell v-model="replace" :title="'Replace date text'"></switch-cell>
    </cell-group>
    <br>
    <div style="margin: 15px;">
      <button-cell type="primary" @click.native="value='2020-11-11'"> {{ 'Set time to' }} 2020-11-11</button-cell>
      <button-cell type="primary" @click.native="value='2020-11-22'"> {{ 'Set time to' }} 2020-11-22</button-cell>
      <button-cell type="primary" @click.native="value='2016-08-09'"> {{ 'Set time to' }} 2016-08-09</button-cell>
      <button-cell type="primary" @click.native="value='TODAY'"> {{ 'Set time to' }} today</button-cell>
      <button-cell type="primary" @click.native="value='2016-06-05'"> {{ 'Set time to' }} 2016-06-05</button-cell>
    </div>
    <br>
    <cell-group :title="'Custom every day cell'">
      <switch-cell v-model="useCustomFn" :inline-desc="'Add red dot for dates with number 8'" :title="'Add custom contents in day cell'"></switch-cell>
    </cell-group>

    <divider> {{ 'We can render a list of calendars order by month' }}</divider>
    <cell-group>
      <cell :title="'Current value'" :value="listValue"></cell>
    </cell-group>

    <br>
    <br>

    <divider> Calendar </divider>
    <cell-group>
      <calendar :readonly="readonly" v-model="demo1" :title="'Basic Usage'" disable-past placeholder="placeholder" @on-show="log('show')" @on-hide="log('hide')"></calendar>
    </cell-group>

    <div style="padding:15px;">
      <button-cell type="primary" @click.native="readonly = !readonly">{{ 'Toggle readonly' }}</button-cell>
    </div>

    <cell-group>
      <calendar v-model="demo2" :title="'Set value as TODAY'" disable-past></calendar>
    </cell-group>

    <cell-group>
      <calendar @on-change="onChange" v-model="demo3" :title="'Disable future'" disable-future></calendar>
    </cell-group>

    <cell-group>
      <calendar @on-change="onChange" v-model="demo4" :title="'Show popup header'" show-popup-header :popup-header-title="'Please select'" disable-future></calendar>
    </cell-group>

    <cell-group>
      <calendar placeholder="placeholder" @on-change="onChange" v-model="demo5" :title="'Multiple dates'" :popup-header-title="'Please select'" disable-future></calendar>
    </cell-group>

    <cell-group>
      <calendar disable-weekend :display-format="displayFormat" :placeholder="'Please select'" @on-change="onChange" v-model="demo6" :title="'Format multiple dates'" :popup-header-title="'please select'"></calendar>
      <cell-box align-items="flex-start">
        <span class="selected-days">value:</span>
        <div>
          <badge v-for="day in demo6" :key="day" style="margin-right:10px;">{{ day }}</badge>
        </div>
      </cell-box>
    </cell-group>
    <div style="padding:15px;">
      <button-cell type="primary" @click.native="demo6 = []">{{ 'Empty value' }}</button-cell>
    </div>

  </div>

</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { ButtonCell } from '../../ui/components/button'
  import { SwitchCell } from '../../ui/components/switch'
  import { Badge } from '../../ui/components/badge'
  import { Cell, CellGroup, CellBox } from '../../ui/components/cell'

  import { Calendar, InlineCalendar, SwipeCalendar } from '../../ui/components/calendar'

  export default{
    components:{
      Divider,
      ButtonCell,
      SwitchCell,
      Badge,
      Cell, CellGroup, CellBox,
      Calendar,InlineCalendar, SwipeCalendar
    },
    data () {
      return {
        // inline-calendar
        show: true,
        value: '',
        listValue: '',
        range: false,
        showLastMonth: true,
        showNextMonth: true,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: false,
        hideWeekList: false,
        replaceTextList: {},
        replace: false,
        changeWeeksList: false,
        weeksList: [],
        useCustomFn: false,
        buildSlotFn: () => '',
        disablePast: false,
        disableFuture: false,
        disableWeekend: false,
        disableDateFunction (date) {
          if (date.formatedDate === '2017-10-16') {
            return true
          }
        },

        // calendar
        readonly: false,
        demo1: '',
        demo2: 'TODAY',
        demo3: 'TODAY',
        demo4: 'TODAY',
        demo5: [],
        demo6: [],
        displayFormat (value, type) {
          if (type === 'string') {
            return value
          } else {
            return value.length ? (value.length + ' days') : ''
          }
        }
      }
    },

    methods: {
      // calendar
      log (str) {
        console.log(str)
      },
      onChange (val) {
        console.log('on change', val)
      },
      onViewChange (val, count) {
        console.log('on view change', val, count)
      }
    },

    watch: {
      replace (val) {
        this.replaceTextList = val ? {
          'TODAY': '今'
        } : {}
      },
      useCustomFn (val) {
        this.buildSlotFn = val ? (line, index, data) => {
          return /8/.test(data.date) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : '<div style="height:19px;">售空</div>'
        } : () => ''
      },
      changeWeeksList (val) {
        this.weeksList = val ? ['日', '一', '二', '三', '四', '五', '六 '] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
      }
    },
  }
</script>

<style>
</style>
