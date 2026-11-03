//块4并发实战(基本不会)

const { reject } = require("async")

//1.串行和并发
const delay = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms))

async function serial() {
  const t = Date.now()
  await delay(300, 'a')
  await delay(300, 'b')
  return Date.now() - t
}

async function parallel() {
  const t = Date.now()
  await Promise.all([delay(300, 'a'), delay(300, 'b')])
  return Date.now() - t
}//验收：serial ≈ 600ms，parallel ≈ 300ms。

console.log(serial,parallel)

//2.任务 2：allSettled 容错
//三个请求，一个必失败，要求拿到成功的两个结果 + 失败的报错信息，程序不崩。
//Error对象打印用.message







//3.超时控制
function withTimeout(promise, ms) {
  // 提示：Promise.race([promise, 一个 ms 后 reject 的 Promise])
  let timer 
  const time_out = new promise((_,reject)=>{
  timer = setTimeout(()=>reject(new Error("'超时'+':'+${ms}")),ms)
  })
  Promise.race([promise,time_out]).finally(() => clearTimeout(timer))
}
// let timer	                        把定时器 id 存到外层	后面要能清掉它
// new Promise((_, reject) => ...)	  造一个“炸弹”	第一个参数用 _ 占位，因为这里永远不 resolve，只需要 reject
// setTimeout(() => reject(...), ms)	ms 后自爆	注意：是 reject，不是 resolve
// Promise.race([...])	              请求和炸弹赛跑	谁先到算谁
// .finally(() => clearTimeout(timer))请求赢了就拆掉炸弹	否则定时器还挂着，进程多活 ms，Node 里会“卡住不退出”
