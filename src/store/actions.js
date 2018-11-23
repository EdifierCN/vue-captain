/**
  公共根 store 的 actions
 */

// 异步 使用 dispatch 进行分发
const acFun = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('test')
    },1000)
  })
};

export {
  acFun
}
