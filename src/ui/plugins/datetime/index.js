import Datetime from '../../components/datetime/src/datetimepicker'
import ObjectAssign from 'object-assign'
import Vue from 'vue'

const libs = {
  show: function (options = {}) {
    options = ObjectAssign({
      destroyOnHide: true,
      isOneInstance: true
    }, options);
    const datetime = libs.datetime = new Datetime(options);
    datetime.show()
  },
  hide: function () {
    libs.datetime && libs.datetime.hide()
  }
};

const plugin = {
  install (Vue) {
    if (!Vue.$datetime) {
      Vue.$datetime = libs
    }

    Vue.mixin({
      created: function () {
        this.$datetime = Vue.$datetime
      }
    })
  }
};

if(!Vue.$isServer){
  Vue.use(plugin);
}

export default plugin

