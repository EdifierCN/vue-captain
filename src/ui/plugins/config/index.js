export default {
  install (Vue, config = {}) {
    if (!Vue.zmui) {
      Vue.zmui = {
        config
      }
    } else {
      Vue.zmui.config = config
    }

    if (typeof window !== 'undefined') {
      window.ZMUI_CONFIG = config
    }

    Vue.mixin({
      created: function () {
        if (this.$zmui) {
          this.$zmui.config = config
        } else {
          this.$zmui = {
            config
          }
        }
      }
    })
  }
}
