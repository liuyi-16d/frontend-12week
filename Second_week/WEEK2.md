# 第 2 周复盘（11/09 - 11/15）

## 学会了（3 条）
1. Vite 三件套配置：alias / env / proxy（proxy 能让浏览器"无跨域"）
2. TS 类型能约束组件边界：defineProps<{items: CartItem[]}>() 写错立刻报错
3. ref 深层响应式：改 item.qty 就能更新，因为元素是 proxy

## 卡在哪（2 条，写具体）
1.proxy跨域传输的原理，env的配置，alias（别名）的写法
[“配 alias 时只改了 vite.config.ts，VSCode 一直报找不到模块，后来才知道 tsconfig.app.json 的 paths 也要配”]
2.ts类型约束的写法与应用
[ref<CartItem[]>([]) 一开始忘写泛型，push('abc') 不报错，排查了半小时”]

## 本周最大的一个认知变化
（提示：候选是"computed 记结果，函数每次都算" / "类型不是负担，是编辑器在替你检查"）

## 未达标项
-上述学习的代码容易忘记当时部署的操作
[Vite 三件套配置背不出来，需要回看视频才能复现]