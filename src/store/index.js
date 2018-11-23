/**
  配置 store 的配置文件
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import createLogger from 'vuex/dist/logger'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'


import page from './modules/page'
import cart from './modules/cart'

const debug = process.env.MODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {   // 显示注册模块，不可动态卸载
    page,
    cart
  },
  actions: actions,
  getters: getters,
  mutations,
  strict: debug,  // 设置运行模式
  plugin: debug ? [createLogger()] : [] // 调试模式加入日志插件
})


// State
// 方式一： this.$store.state 获取
// 方式二： import { mapState } from 'vuex'
// export default {
//   // ...
//   computed:
// ...mapState({
//     // 箭头函数可使代码更简练
//     count: state => state.count,
//
//     // 传字符串参数 'count' 等同于 `state => state.count`
//     countAlias: 'count',
//
//     // 为了能够使用 `this` 获取局部状态，必须使用常规函数
//     countPlusLocalState (state) {
//       return state.count + this.localCount
//     }
//   })
// }

// Getter （相当于计算属性）可接受两个参数：state, getters
// 方式一：通过属性访问
// getters: {
//   doneTodos: state => {
//     return state.todos.filter(todo => todo.done)
//   }
// }
// 方式二：通过方法访问，让 getter 返回一个函数，来实现给 getter 传参。
// getters: {
//   // ...
//   getTodoById: (state) => (id) => {
//     return state.todos.find(todo => todo.id === id)
//   }
// }
// store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
// 方式三：mapGetters 辅助函数 import { mapGetters } from 'vuex'
// export default {
//   // ...
//   computed: {
//     // 使用对象展开运算符将 getter 混入 computed 对象中
//     ...mapGetters([
//       'doneTodosCount',
//       'anotherGetter',
//       // ...
//     ])
      // 以对象形式更名
      // mapGetters({
      //   // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
      //   doneCount: 'doneTodosCount'
      // })
//   }
// }

// Mutation ( 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler))
// state 作为第一个参数， payload 作为第二个参数
//const store = new Vuex.Store({
// state: {
//   count: 1
// },
// mutations: {
//   increment (state) {
//     // 变更状态
//     state.count++
//   }
// }
// })
// 方式一：store.commit('increment') 、store.commit('increment', {amount: 10})
// 方式二：对象风格提交
// store.commit({
//   type: 'increment',
//   amount: 10
// })
// 方式三：在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）。
// methods: {
// ...mapMutations([
//     'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
//
//     // `mapMutations` 也支持载荷：
//     'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
//   ]),
// ...mapMutations({
//     add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
//   })
// }

// PS:
// 1、遵守vue响应原则
// 最好提前在你的 store 中初始化好所有所需属性。
// 当需要在对象上添加新属性时，你应该
// 使用 Vue.set(obj, 'newProp', 123), 或者
// 以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：
// state.obj = { ...state.obj, newProp: 123 }

// 2、使用常量替代 Mutation 事件类型
// mutation-types.js
// export const SOME_MUTATION = 'SOME_MUTATION'
// // store.js
// import Vuex from 'vuex'
// import { SOME_MUTATION } from './mutation-types'
//
// const store = new Vuex.Store({
//   state: { ... },
//   mutations: {
//     // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
//     [SOME_MUTATION] (state) {
//       // mutate state
//     }
//   }
// })
// 3、Mutation 必须是同步函数，任何队状态的变更都应该放在mutation里

// Action
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作。
// Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
// 因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   },
//   actions: {
//     increment (context) {
//       context.commit('increment')
//     }
//   }
// })

// 用到 ES2015 的 参数解构 来简化代码
// actions: {
//   increment ({ commit }) {
//     commit('increment')
//   }
// }

// Action 通过 store.dispatch 方法触发：
// store.dispatch('increment')
// 以载荷形式分发
// store.dispatch('incrementAsync', {
//   amount: 10
// })
//
// // 以对象形式分发
// store.dispatch({
//   type: 'incrementAsync',
//   amount: 10
// })

// 方式一：在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
// import { mapActions } from 'vuex'
//
// export default {
//   // ...
//   methods: {
//     使用数组
//     ...mapActions([
//       'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`
//
//       // `mapActions` 也支持载荷：
//       'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
//     ]),
//     使用对象进行更名
//     ...mapActions({
//       add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
//     })
//   }
// }

// 方式二：让action 返回promsie, 可以action相互调用
// actions: {
//   actionA ({ commit }) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         commit('someMutation')
//         resolve()
//       }, 1000)
//     })
//   }
// }
// store.dispatch('actionA').then(() => {
//   // ...
// })

// Module
// 一：对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
// const moduleA = {
//   state: { count: 0 },
//   mutations: {
//     increment (state) {
//       // 这里的 `state` 对象是模块的局部状态
//       state.count++
//     }
//   },
//
//   getters: {
//     doubleCount (state) {
//       return state.count * 2
//     }
//   }
// }
// 二：对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：
// const moduleA = {
//   // ...
//   actions: {
//     incrementIfOddOnRootSum ({ state, commit, rootState }) {
//       if ((state.count + rootState.count) % 2 === 1) {
//         commit('increment')
//       }
//     }
//   }
// }
// 三：对于模块内部的 getter，根节点状态会作为第三个参数暴露出来
// const moduleA = {
//   // ...
//   getters: {
//     sumWithRootCount (state, getters, rootState) {
//       return state.count + rootState.count
//     }
//   }
// }

//  PS: 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的
// ——这样使得多个模块能够对同一 mutation 或 action 作出响应。
// 你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块
// 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

// 使用一：在模块中继续嵌套模块，会继承父模块的命名空间
// state 已是嵌套，不受影响
// getters['account/isAdmin']
// commit('account/login')
// dispatch('account/login')

// 使用二：在带命名空间的模块内访问全局内容（Global Assets）
// 1、如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。
// getters: {
//   // 在这个模块的 getter 中，`getters` 被局部化了
//   // 你可以使用 getter 的第四个参数来调用 `rootGetters`
//   someGetter (state, getters, rootState, rootGetters) {
//     getters.someOtherGetter // -> 'foo/someOtherGetter'
//     rootGetters.someOtherGetter // -> 'someOtherGetter'
//   },
//   someOtherGetter: state => { ... }
// }

// 2、若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。
// actions: {
//   // 在这个模块中， dispatch 和 commit 也被局部化了
//   // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
//   someAction ({ dispatch, commit, getters, rootGetters }) {
//     getters.someGetter // -> 'foo/someGetter'
//     rootGetters.someGetter // -> 'someGetter'
//
//     dispatch('someOtherAction') // -> 'foo/someOtherAction'
//     dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'
//
//     commit('someMutation') // -> 'foo/someMutation'
//     commit('someMutation', null, { root: true }) // -> 'someMutation'
//   },
//   someOtherAction (ctx, payload) { ... }
// }

// 使用三：在带命名空间的模块注册全局 action
// actions: {
//   someAction: {
//     root: true,
//       handler (namespacedContext, payload) { ... } // -> 'someAction'
//   }
// }

// 使用四：带命名空间的绑定函数
// 1、使用 mapState, mapGetters, mapActions 和 mapMutations
// computed: {
// ...mapState('some/nested/module', {
//     a: state => state.a,
//     b: state => state.b
//   })
// },
// methods: {
// ...mapActions('some/nested/module', [
//     'foo',
//     'bar'
//   ])
// }

// 2、使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
// const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
// ...mapActions([
//   'foo',
//   'bar'
// ])


// Plugin
// 在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化
// Vuex 的 store 接受 plugins 选项，这个选项暴露出每次 mutation 的钩子。Vuex 插件就是一个函数，它接收 store 作为唯一参数
// const myPlugin = store => {
//   // 当 store 初始化后调用
//   store.subscribe((mutation, state) => {
//     // 每次 mutation 之后调用
//     // mutation 的格式为 { type, payload }
//   })
// }

// export default function createWebSocketPlugin (socket) {
//   return store => {
//     socket.on('data', data => {
//       store.commit('receiveData', data)
//     })
//     store.subscribe(mutation => {
//       if (mutation.type === 'UPDATE_DATA') {
//         socket.emit('update', mutation.payload)
//       }
//     })
//   }
// }
// const plugin = createWebSocketPlugin(socket)
//
// const store = new Vuex.Store({
//   state,
//   mutations,
//   plugins: [plugin]
// })
