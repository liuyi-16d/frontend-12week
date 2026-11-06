const item = { id: 1, name: '机械键盘', price: 399, qty: 1 }

// ① 对象解构
const { name, price } = item
console.log(name, price)                       // 机械键盘 399

// ② 重命名 + 默认值（qty 不存在时给 1）
const { price: unitPrice, stock = 0 } = item
console.log(unitPrice, stock)                  // 399 0

// ③ 数组解构 + 跳过 + 剩余
const [first, second, third, ...rest] = [10, 20, 30, 40, 50]
console.log(first,second,third, rest)                // 10 20 30 [40, 50]

// ④ 函数参数解构（Element Plus 的表格列定义天天用）
const render = ({ name, price }) => `${name}:${price} 元`
console.log(render(item))

// ⑤ 展开：浅拷贝 + 合并（不改原对象）
const updated = { ...item, qty: 3 }
console.log(updated.qty, item.qty)             // 3 1  ← 原对象没变

// ⑥ ?. 和 ??（两个不是一回事）
const user = { profile: null }
console.log(user.profile?.name)                // undefined，不报错   ?. 如果左边的值是 null 或 undefined，立刻停止往后读，直接返回 undefined
console.log(0 ?? 100, 0 || 100)                // 0 100  ← ?? 只对 null/undefined 兜底    
                                               // || 的意思是：只要左边是假值（Falsy），就返回右边。在 JS 里，0、''（空字符串）、false、null、undefined 都是假值。
                                               //?? 的绝杀：它的意思是：只有左边是 null 或 undefined 时，才返回右边。

const rend = ({id,qty}) => `${id}:${qty}`
console.log(rend(item));
