// 块 3 · 事件循环（35 分钟）
// 必掌握 6 点
// 调用栈执行同步代码；栈空了才看队列
// 宏任务：setTimeout / setInterval / MessageChannel / I/O / UI 事件
// 微任务：Promise.then/catch/finally、queueMicrotask、MutationObserver、await 后面的代码
// 规则：每执行完一个宏任务，就把微任务队列清空，再取下一个宏任务
// async 函数：同步执行到第一个 await，之后的部分进微任务
// 渲染时机：微任务清空之后、下一个宏任务之前
//《这块基本都熟悉了》



setTimeout(() => console.log('A'), 0)
Promise.resolve().then(() => console.log('B'))
;(async () => {
  console.log('C')
  await null
  console.log('D')
})()
console.log('E')
//C E B D A

async function a() {
  console.log(1)
  await b()
  console.log(2)
}
async function b() {
  console.log(3)
}

console.log(4)
a()
console.log(5)
//4 1 3 5 2        //2打印后才暂停

setTimeout(() => console.log('T1'), 0)
Promise.resolve().then(() => {
  console.log('P1')
  Promise.resolve().then(() => console.log('P2'))
})
setTimeout(() => console.log('T2'), 0)
//P1 P2 T1 T2