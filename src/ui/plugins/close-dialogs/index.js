 // Vue.use(CloseDialogsPlugin, router)

export default {
  install (Vue, router) {
    router.beforeEach((to, from, next) => {
      const list = ['alert', 'confirm', 'toast', 'loading', 'datetime', 'actionsheet'];
      list.forEach(one => {
        if (Vue.$zmui[one]) {
          Vue.$zmui[one].hide && Vue.$zmui[one].hide()
        }
      });
      next()
    })
  }
}
