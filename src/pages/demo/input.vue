<template>
  <div>
    <divider> input-cell </divider>
    <cell-group title="禁用内置验证及显示成功或者错误样式">
      <input-cell title="禁用验证" placeholder="I'm placeholder" novalidate :icon-type="iconType" :show-clear="false" @on-blur="onBlur" placeholder-align="right"></input-cell>
    </cell-group>
    <div style="padding:15px;">
      <button-cell @click.native="iconType = 'success'" type="primary"> set success</button-cell>
      <button-cell @click.native="iconType = 'error'" type="primary"> set error</button-cell>
      <button-cell @click.native="iconType = ''" type="primary"> set empty</button-cell>
    </div>

    <cell-group title="is-type传入function">
      <input-cell title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder"></input-cell>
    </cell-group>

    <cell-group title="mask">
      <input-cell title="手机号码格式化" mask="999 9999 9999" v-model="maskValue" :max="13" is-type="china-mobile"></input-cell>
      <cell title="value" :value="maskValue"></cell>
      <input-cell title="(99) 9-99" mask="(99) 9-99" v-model="maskValue2" :max="9"></input-cell>
    </cell-group>

    <cell-group title="使用icon代替title">
      <input-cell title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder">
        <img slot="label" style="padding-right:10px;display:block;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
      </input-cell>
    </cell-group>

    <cell-group title="max is alias to maxlength">
      <input-cell title='max=5' :max="5" @on-change="change" v-model="maxValue"></input-cell>
    </cell-group>

    <cell-group title="debounce = 1000">
      <input-cell title='debounce' :debounce="500" @on-change="change" v-model="debounceValue"></input-cell>
    </cell-group>

    <cell-group title="disabled">
      <input-cell title='value' disabled v-model="disabledValue"></input-cell>
    </cell-group>

    <cell-group title="set type = tel">
      <input-cell title='value' type="tel"></input-cell>
    </cell-group>

    <cell-group title="html title">
      <input-cell label-width="4em" :title='`<span style="${style}">hello</span>`' placeholder="I'm placeholder"></input-cell>
    </cell-group>
    <div style="padding:15px;">
      <button-cell @click.native="style = 'color:red;'" type="primary">set red</button-cell>
      <button-cell @click.native="style = 'color:green'" type="primary">set green</button-cell>
      <button-cell @click.native="style = 'color:#000'" type="primary">set default</button-cell>
    </div>

    <cell-group title="Default">
      <input-cell title="message" placeholder="I'm placeholder"></input-cell>
    </cell-group>

    <cell-group title="不显示清除按钮">
      <input-cell title="message" required placeholder="I'm placeholder" :show-clear="false" autocapitalize="characters"></input-cell>
    </cell-group>

    <cell-group title="focus事件">
      <input-cell title="focus-handler" placeholder="focus me!" :show-clear="true" @on-focus="onFocus"></input-cell>
    </cell-group>

    <cell-group title="set is-type=china-name">
      <input-cell title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></input-cell>
    </cell-group>

    <cell-group title="set keyboard=number and is-type=china-mobile">
      <input-cell title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></input-cell>
    </cell-group>

    <cell-group title="set is-type=email">
      <input-cell title="邮箱" name="email" placeholder="请输入邮箱地址" is-type="email"></input-cell>
    </cell-group>

    <cell-group title="set min=2 and max=5">
      <input-cell title="2-5个字符" placeholder="" :min="2" :max="5"></input-cell>
    </cell-group>

    <cell-group title="确认输入">
      <input-cell title="请输入6位数字" type="text" placeholder="" v-model="password" :min="6" :max="6" @on-change="change"></input-cell>
      <input-cell title="请确认6位数字" v-model="password2" type="text" placeholder="" :equal-with="password"></input-cell>
    </cell-group>

    <cell-group title="enter事件">
      <input-cell title="输入完成后回车" type="text" placeholder="" v-model="enterText"
                  @on-enter="onEnter"></input-cell>
    </cell-group>

    <cell-group title="验证码" class="weui-cells_form">
      <input-cell title="验证码" class="weui-cell_vcode">
        <img slot="right" class="weui-vcode-img" src="https://i.loli.net/2017/09/18/59bf7f32425d5.jpg">
      </input-cell>
      <input-cell title="发送验证码" class="weui-vcode">
        <button-cell slot="right" type="primary" mini>发送验证码</button-cell>
      </input-cell>
    </cell-group>

    <cell-group title="check if value is valid when required===true">
      <input-cell title="message" placeholder="I'm placeholder" ref="input01" required></input-cell>
      <cell title="click to get valid value" :value="'$valid value:' + valid1" @click.native="getValid1"></cell>
    </cell-group>

    <cell-group title="check if value is valid when required===false">
      <input-cell title="message" placeholder="I'm placeholder" :required="false" ref="input02" @click.native="getValid2"></input-cell>
      <cell title="click to get valid value" :value="'$valid value:' + valid2" @click.native="getValid2"></cell>
    </cell-group>

    <br>
    <br>

    <divider> input-cell 和 textarea-cell 常用搭配 </divider>
    <cell-group>
      <input-cell placeholder="标题"></input-cell>
      <textarea-cell :max="200" name="description" placeholder="内容" autosize></textarea-cell>
    </cell-group>
  </div>
</template>

<script>
  import { Divider } from '../../ui/components/divider'
  import { CellGroup, Cell } from '../../ui/components/cell'
  import { ButtonCell } from '../../ui/components/button'
  import { InputCell } from '../../ui/components/input'
  import { TextareaCell } from '../../ui/components/textarea'

  export default {
    components: {
      Divider,
      ButtonCell,
      CellGroup,
      Cell,
      InputCell,
      TextareaCell
    },
    data () {
      return {
        password: '123465',
        password2: '',
        enterText: '',
        valid1: false,
        valid2: false,
        iconType: '',
        be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          }
        },
        style: '',
        disabledValue: 'hello',
        debounceValue: '',
        maxValue: '',
        maskValue: '13545678910',
        maskValue2: ''
      }
    },
    methods: {
      getValid1 () {
        this.valid1 = this.$refs.input01.valid
      },
      getValid2 () {
        this.valid2 = this.$refs.input02.valid
      },
      change (val) {
        console.log('on change', val)
      },
      onBlur (val) {
        console.log('on blur', val)
      },
      onFocus (val, $event) {
        console.log('on focus', val, $event)
      },
      onEnter (val) {
        console.log('click enter!', val)
      }
    }
  }
</script>

<style>
</style>
