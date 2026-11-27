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

git push -u origin main
本地 main  →  追踪  →  origin/main
以后只需：git push        # 自动推到 origin/main
        git pull        # 自动从 origin/main 拉
        git status      # 能显示 "ahead of 'origin/main' by N commits"
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







stripe 可以创建带斑马纹的表格 ，Table 组件是不具有竖直方向的边框的，如果需要，可以使用 border 属性。  show-overflow-tooltip 是布尔属性，开启后：当单元格内容超出列宽时，自动省略（显示 ...），并在鼠标悬浮时弹出 tooltip 显示完整内容。  当数据行总高度（height = "250"）超过 250px 时，表体区域会出现纵向滚动条，表头固定不动，只有数据区域滚动。fixed（不写值或写 fixed="left"）：该列固定在表格左侧 ，fixed="right"：该列固定在表格右侧。    自定义插槽: <el-table-column fixed="right" label="Operations" min-width="120">
  <template #default>
    <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
    <el-button link type="primary" size="small">Edit</el-button>
  </template>
</el-table-column>                                                                                                         <el-table-column label="Date" width="120">
  <template #default="scope">{{ scope.row.date }}</template>
</el-table-column>



link 是 el-button 的布尔属性，让按钮渲染成文字链接样式：没有背景色、没有边框，只显示文字。 .prevent 是 Vue 的事件修饰符，等价于在事件处理函数里调用 event.preventDefault()，阻止浏览器默认行为。

这里按钮在 <el-button> 内部，.prevent 主要起"保险"作用，防止在表单等场景下按钮触发默认提交/跳转。对普通按钮影响不大，但加上更稳妥。     dayjs(now).format('YYYY-MM-DD')
      dayjs(now)：用 dayjs 把 Date 对象包装成 dayjs 实例。   const now = new Date() 当前系统时间







设置layout，表示需要显示的内容，用逗号分隔，布局元素会依次显示。分页元素包括：prev（跳转到上一页的按钮）、next（跳转到下一页的按钮）、pager（页码列表）、jumper（跳转输入框）、total（总条目数）、sizes（用于设置每页条数的选择器）以及 ->（该符号之后的所有元素将被靠右对齐）。







 <el-pagination layout="prev, pager, next" :total="50" />     total 是数据总条数（不是页数）。分页组件根据 total 和 page-size 计算出总页数page-size 默认是 10。
/* ① 相邻兄弟选择器 */
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}

/* ② 后代选择器 */
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}                                                                                                                      当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过 pager-count 属性可以设置最大页码按钮数。                         设置background属性可以为分页按钮添加背景色。
也有size.                                                                                                :hide-on-single-page="value"           <el-switch v-model="value" />开关






    <el-radio-group v-model="size" class="mr-4">
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>