/**
  模块定义
 */

import * as types from '../mutation-types'

import services from '../../services'

const state = {
  cart: []
};

const mutations = {
  // [types.SET_CART_ITEMS] (state, cart){
  //   state.cart = cart.items
  // }
  [types.TR] (state){
    console.info('tr')
  }
};

const actions = {
  // getItems(context, id){
  //     services.cart.getAllitems.then(res => {
  //     context.commit(types.SET_CART_ITEMS, res.body.data)
  //    })
  // }
};

export default {
  state,
  mutations,
  actions
}
