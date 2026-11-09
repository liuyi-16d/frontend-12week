## 12 题得分：6.5 / 12

未达标项（W2 每天抽 1 个口述，共 4 天补完）：
- 闭包的定义（要含"引用外层变量"）与 3 个真实用途
- `call` / `apply` / `bind` 三者区别
- `sort` 会改原数组 + 默认按字符串排序
- `git reflog` 恢复 `reset --hard`
- `reduce` 不传初始值时，首元素被当初始值、空数组抛 TypeError


12 题自测（19:00 那一格用，闭卷）
- 1- 闭包的产生条件？举一个真实用途
- 2- var 和 let 在 for 循环里为什么结果不同？
- 3- 箭头函数能用 new 吗？为什么？
- 4- call/apply/bind 的区别
- 5- 原型链查找的终止条件？p.constructor === Person 为什么是 true？
- 6- 宏任务和微任务各有哪些？执行顺序？
- 7- Promise.all 一个失败会怎样？allSettled 呢？
- 8- await 后面的代码属于宏任务还是微任务？
- 9- reduce 不传初始值有什么坑？
- 10- sort 会改原数组吗？[1,10,2] 默认排出来是什么？
- 11- git reset --hard 丢掉的提交还能找回吗？用什么命令？
- 12- 两个人改了同一文件的不同行，会冲突吗？同一行呢？



 1. 闭包的产生条件？三个真实用途
    定义：闭包 = 函数 + 它引用的外层词法环境。函数被带出外层作用域后，仍能访问那些变量。

    三个条件（缺一不可）

    存在函数嵌套（内层函数）
    内层引用了外层作用域的变量
    内层函数在外层作用域之外被调用（返回出去、作为回调传入）
    js


    function createCounter() {
    let count = 0                 // ② 被内层引用
    return function () {          // ① 内层函数
        return ++count              // ③ 在外部被调用，count 依然活着
    }
    }
    const c = createCounter()
    c(); c()                        // count 变成 2，没被销毁
    三个真实用途

    用途	例子
    私有变量	计数器、模块内部状态，外部拿不到
    防抖 / 节流	用闭包存 timer、lastTime（第 11 周手写题）
    缓存 / 记忆化	memo(fn) 用 Map 存结果
    易错点

    ❌ "闭包就是函数里的函数" —— 少了引用外层变量这个核心
    ⚠️ 被闭包引用的变量不会被回收（这也是"内存泄漏"说法的来源）；现代引擎能回收不再被引用的，但长期持有大对象仍需手动清理


2. 	                    var	                let
    作用域	            函数级	            块级
    循环中	            全循环共用一个 i	每次迭代创建新绑定（规范里的 per-iteration environment）
    回调捕获	        捕获的是同一个变量	 捕获的是上一次迭代的变量

    例子：
        for (var i = 0; i < 3; i++) setTimeout(() => console.log(i))   // 3 3 3
        for (let i = 0; i < 3; i++) setTimeout(() => console.log(i))   // 0 1 2


3. 三个原因（面试答前两个就够）：

    箭头函数没有 prototype 属性，new 无法设置新对象的原型
    箭头函数没有 [[Construct]] 内部方法，理论上就不是构造函数
    箭头函数没有自己的 this（也没有 arguments、super），而 new 的核心动作之一就是把 this 指向新对象
    箭头函数的 this 在定义时确定（继承外层），call/apply/bind 改不了它，只能传参
    所以箭头函数适合做回调，不适合做对象方法（obj.fn = () => this 里 this 不是 obj）

4. 




5. 查找链：p → Person.prototype → Object.prototype → null

    终止条件：null（找不到就返回 undefined）

    为什么 p.constructor === Person 是 true p 上没有 constructor 这个自有属性 → 沿链往上找 → 在 Person.prototype 上找到 constructor，它 === Person。 

6. 宏任务	整体 script、setTimeout、setInterval、MessageChannel、I/O、UI 事件、setImmediate(Node)
   微任务	Promise.then/catch/finally、queueMicrotask、MutationObserver、await 之后的代码

    执行顺序（记这四步）

    1 执行同步代码（调用栈清空）
    2 清空微任务队列（期间新产生的微任务也在本轮跑完）
    3 取一个宏任务执行
    4 回到第 2 步

7. 	                有一个失败	                                    返回
    all	立即        reject，不等其他	            成功时：结果数组（按输入顺序）
    allSettled	    不 reject，等全部结束	    [{status:'fulfilled',value} / {status:'rejected',reason}]


8. await 本质是 .then() 的语法糖：把它后面的代码挂到微任务队列。

9. [1, 2, 3].reduce((s, v) => s + v)    // 6，第一项 1 被当成初始值


10. sort 会改原数组吗？[1,10,2] 默认排出来是什么
    会改原数组；[1, 10, 2] 默认排出来还是 [1, 10, 2]。
    const a = [1, 10, 2]
    a.sort()                          // 默认转字符串按 UTF-16 码元比 → [1, 10, 2]
    console.log(a)                    // 原数组已被修改

    [...a].sort((x, y) => x - y)      // [1, 2, 10]  复制后排序
    a.toSorted((x, y) => x - y)       // ES2023，不改原数组
    写法	结果
    sort()	[1, 10, 2]（字符串序）
    sort((a,b) => a-b)	[1, 2, 10] 升序
    sort((a,b) => b-a)	[10, 2, 1] 降序
    补充：ES2019 起规定 sort 稳定排序；比较函数返回 NaN 会导致结果不可预测。


11. git reset --hard 丢掉的提交找回
    git reflog  找移动记录日志
    git reset --hard <hash>          # 回到那个提交
    # 或者更安全：开一个新分支救回来
    git switch -c rescue <hash>


12. 两个分支改同一文件的不同行会冲突吗？同一行呢
情况	结果
改不同文件	✅ 自动合并，永不冲突
同文件，改动相距 3 行以上	✅ 自动合并
同文件，同一行或相邻 3 行内	⚠️ 冲突（content）
一边删除、一边修改同一段	⚠️ 冲突（modify/delete）
两边各建同名文件	⚠️ 冲突（add/add）
解决流程

powershell


# 编辑文件，删掉 <<<<<<< ======= >>>>>>> 标记，留下正确内容
git add <file>
git commit            # 写清"为什么这么解"
# 想放弃这次合并：
git merge --abort



一页速记（考前扫这个）
#	一句话
1	闭包 = 函数 + 引用的外层变量，外层结束后仍存活
2	var 共用一个，let 每次迭代新建
3	箭头函数无 prototype、无自己的 this → 不能 new
4	call 逐个 / apply 数组 / bind 返回函数
5	查找链到 null 结束；constructor 是"借来的"
6	同步 → 微任务清空 → 一个宏任务
7	all 短路失败，allSettled 全等全收
8	await 后面进微任务
9	reduce 不传初始值：首元素当初始值、空数组报错
10	sort 改原数组、默认字符串序
11	reflog 能救 reset --hard
12	同一区域才冲突，不同文件永不冲突