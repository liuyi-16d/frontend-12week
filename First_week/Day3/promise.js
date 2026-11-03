// const { log } = require("async")

 const p1 =new Promise((resolve,reject)=>{
    // resolve('任务1')
    reject('失败信息')

 })

p1.then(data=>{
    console.log(data)
    return new Promise((resolve,reject)=>{
    resolve('任务2')
    })
    
},err=>{console.log('任务1失败')}).then(data =>console.log(data),err=>{console.log('任务2失败')})//.catch(err =>(console.log(err)))





console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')

//1 4 3 2 先打印区域栈后微任务（micotask）最后宏任务(macotask)


//1.pending 等待 fulfilled 成功resole  rejected失败reject
//2. .then返回一个新的Promise回调return当前result作为下游的参数
//3.错误穿透：then 里 throw 或返回 rejected 的 Promise，会被最近的 catch 接住（有点不清楚）
//4.finally不影响结果，常用于关 loading(没怎么了解)
//5.四个静态方法
// promise.all 一个error则停止返回该error，无error则全返回对应的值
//promise.allsettled 任意一个error则quanerror返回所有promise的result
//promise.race 返回最先完成的promise的值无论对错
//promise.any  返回任意先成功的值
//6.async 函数总是返回 Promise：return 值 → resolve，throw → reject(隐式Promise)
//7.await 会“暂停”函数，但不阻塞主线程——--底层就是 then，所以它进的是微任务(知道会暂停)
//8.三个坑：忘记 return（链条断裂）、forEach 里 await 不生效、在 then 里又套一层 Promise 多余的包裹


function myAll(promises) {
  // 1. 返回 new Promise((resolve, reject) => {...})
  // 2. 结果数组按索引存，保证顺序
  // 3. 计数器收满才 resolve
  // 4. 空数组立刻 resolve([])
    return new Promise((resolve, reject)=>{
        let list = [...promises]
        if(list.length === 0) return resolve([])

        let count = 0
        let results = new Array[list.length]
        list.forEach((p,i) => {
            Promise.resolve(p)
            .then(
                (v)=>{
                    results[i]=v
                if(++count===list.length){
                resolve()
                }
             }
            )
            .reject

        })
        
     })

     
     
    }


myAll([Promise.resolve(1), Promise.resolve(2)])        // [1, 2]
myAll([Promise.resolve(1), Promise.reject('boom')])    // reject 'boom'
myAll([])                                              // []
myAll([1, 2, 3])      //(这题我不太懂)                                 // [1, 2, 3]（非 Promise 也能包）




//写 3 个 Promise（一个 100ms 成功、一个 200ms 成功、一个 150ms 失败），分别喂给 all / allSettled / race / any，打印结果，对照上表验证。
const delay = function(ms,value){
    return new promise((r)=>setTimeout(()=>r(value),ms))
} 

function Samples(){
    return{
        a:delay(100,yes),
        b:delay(200,yes),
        c:delay(150).then(()=>{throw new Error('no')})
    }
}

Promise.all(Object.values(Samples))
    .then(()=>console.log('都成功'))
    .catch((e)=>console.log("都失败",e.message))

Promise.allSettled(Object.values(Samples))
    .then((all)=>console.log(allSettled,all.map((r)=> r.status) ))

Promise.race(Object.values(Samples))
    .then((v)=>console.log('race',v))

Promise.any(Object.values(Samples))
    .then((v)=>console.log("any",v))





//块 5 · 快答 + 提交

// Promise 有哪三种状态？能回退吗？//1.Fullfilled,resolve,reject不能回退
// then 里 return 一个 Promise 会怎样？//会新建一个新Promise由下一个.then触发
// 为什么 then 里的 throw 会被后面的 catch 抓到？//不知道
// all 和 allSettled 的区别？//all是其中一个错误后直接reject其它的都不看返回jeject值，allSettled即使错了也会继续看其它的值并最终返回正确与错误信息
// race 和 any 的区别？//相同点都只发送一个结果，不同点race只发送第一个完成的结果，any只发送第一个成功的结果
// 为什么 forEach 里写 await 不生效