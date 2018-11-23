export default {
  install (Vue) {
    const bus = new Vue({});
    if (!Vue.$zmui) {
      Vue.$zmui = {
        bus
      }
    } else {
      Vue.$zmui.bus = bus
    }

    Vue.mixin({
      created: function () {
        if (this.$zmui) {
          this.$zmui.bus = bus
        } else {
          this.$zmui = {
            bus
          }
        }
      }
    })
  }
}
