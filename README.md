# frontend-12week
study
//git常用
1. 核心的 3 个命令（最好记住，面试会问）
这三个命令构成了前端开发最基础的“工作流”，面试时如果被问到“你平时怎么用 Git”，你要能答出来：

git add .：把修改过的代码放进“暂存区”（相当于装进快递盒）。

git commit -m "说明"：把快递盒封上，写个备注（相当于打包）。

git push：把包裹寄到 GitHub 上（相当于发货）。

（你平时在 VS Code 界面里，填字、点提交、点同步，后台跑的就是这三个命令。）

2. 配置和救命命令（不用记，知道去哪查就行）
git init：在本地建仓库（你刚才用过，以后用 Vite 建项目基本会自动带，或者你点 VS Code 的“初始化”）。

git remote add origin ...：绑定远程仓库地址。

git pull：把线上的代码拉下来（防止冲突）。

git config --global ...：配置你的用户名和邮箱（弄一次就行了）。

git config --global init.defaultBranch main 改名防master

3.小命令
git remote -v 显示的是你自己的仓库
git log --oneline 显示历史记录每行一条



---------------------------------------------------------------------------------------------------------
一.闭包
1.  function 工厂名(配置) {          ← 外层：存状态、只执行一次
    状态...
    return function (...) {       ← 内层：被反复调用，读写状态
        ...
    }
    }

例子：记忆化
1.Map方法
function memoMap(fn) {
    // 1. 用 new Map() 创建一个哈希表
    const cache = new Map();

    return function (key) {
        // 2. 判断有没有。用 has() 方法，不需要像对象那样转成字符串
        if (cache.has(key)) {
            console.log(`[Map] 命中了缓存: ${key}`);
            return cache.get(key);
        }

        // 3. 没命中，执行计算
        console.log(`[Map] 开始计算: ${key}`);
        const result = fn(key);
        
        // 4. 存进 Map 里
        cache.set(key, result);
        
        return result;
    }
}

// 测试
const slowMap = memoMap((x) => x * 2);
console.log(slowMap(2), slowMap(2), slowMap(3));


2.{}方法：会将参数转为字符串格式
function memoObj(fn) {
    // 1. 用一个空对象作为缓存表
    const cache = {}; 

    return function (key) {
        // 2. 判断缓存里有没有这个 key
        // 注意：用 in 操作符或者 hasOwnProperty 最严谨
        if (key in cache) {
            console.log(`[对象] 命中了缓存: ${key}`);
            return cache[key]; 
        }

        // 3. 没命中，执行计算
        console.log(`[对象] 开始计算: ${key}`);
        const result = fn(key);
        
        // 4. 存进对象里
        cache[key] = result;
        
        return result;
    }
}

// 测试
const slowObj = memoObj((x) => x * 2);
console.log(slowObj(2), slowObj(2), slowObj(3));