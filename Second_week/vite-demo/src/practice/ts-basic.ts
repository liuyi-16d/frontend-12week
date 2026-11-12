let username:string ='liuyi'
let age: number = 20
// let age: number = twenty   试错
let isStudent:boolean =true
console.log(username,age,isStudent);

const tags:string [] = ['vue','ts']

const profile:{name:string; age:number} = {
    name: 'liuyi',
    age: 20
}
// tags.push(3)  试错

console.log(tags,profile);

function add(a:number,b:number){
    return a+b
}
// console.log(add(1,'2')); 试错
console.log(add(1,2));

interface CartItem{
    id:number
    name:string
    price:number
    qty:number
    category?:string
}
//category?:string    表示对象内元素是否包含category都可以但包含时必须要是sting类型

const cart:CartItem[] = [
    { id: 1, name: '机械键盘', price: 399, qty: 1, category: 'peripheral' },
    { id: 2, name: '鼠标垫', price: 39, qty: 2 },   // 没有 category 也合法
]


function totalQty(items:CartItem[]):number{
    return items.reduce((sum,v)=>sum+v.qty,0)
}

console.log(totalQty(cart));


type Coupon = 'Vip10'|null;

function getDiscount(amount: number):number{
    if(amount>1000) return 150
    if(amount>300) return 30
    return 0
}

console.log(getDiscount(totalQty(cart)));

function VipDiscount(amount:number,coupon:Coupon,rate:number){

    coupon==='Vip10'? rate = 0.1 : 0   
    return  amount * rate
}
console.log(VipDiscount);

// type Coupon = 'VIP10' | null

// function getDiscount(amount: number, coupon: Coupon): number {
//   const fullReduction = amount >= 1000 ? 150 : amount >= 300 ? 50 : 0
//   const afterReduce = amount - fullReduction
//   const couponDiscount = coupon === 'VIP10' ? afterReduce * 0.1 : 0
//   return Number((fullReduction + couponDiscount).toFixed(2))
// }

// console.log(getDiscount(1776, null))    // 150      ← 和 Day4/Day5 一致
// console.log(getDiscount(1776, 'VIP10')) // 312.6    ← 和 Day5 会员优惠一致

// 总结interface CartItem{}
// 可以约束数组内必须包含的内容





// 	                                           interface	                 type
// 能否声明合并（同名自动合并）	                 ✅ 能	                     ❌ 不能
// 能否表达联合/交叉等类型运算	                 ❌ 只能描述对象	              ✅ 能（type A = B | C）
// 适用场景	                                   对象形状、组件 props、接口返回  联合类型、别名、工具类型

//相同点-----------------
//都可以定义约束对象类型
type Pa = {
    a:string,
    b:string
} 
let obj1:Pa = {
    a:'33',
    b:'44'
}
console.log(obj1);


// interface Pb{}


// 都可以继承

type Ia = {a:number}
type Ib = Ia &{b:string}

let obj:Ib ={
    a:1,
    b:'2'
}
console.log(obj);


interface Oa{
    z:number
}

interface Ob extends Oa{
    c:string
}
let obj3:Ob ={
    z:67,
    c:'sha'

}
console.log(obj3);
//不同点（主要）联合类型--------------
type m = string|number;
let s:m = 123
let d:m = '123'
console.log(s,d);



// interface 和 type 各适合什么场景？（各说一条）//nterface 适合：描述对象/类的结构（对象构造类型），并且需要继承（extends）或同名声明合并的场景。比如组件 props、接口返回类型。
//                                              type 适合：需要联合类型（type A = string | number）、交叉类型、工具类型（Pick/Omit/Partial 等），或给任意类型起别名的场景。
// 可选属性 ? 和 | undefined 是不是一回事？      //是否可省略（对象中的该属性是否可省略前者可以后者不行）let a = {name?:sting,age:number}可以不含name
// any 和 unknown 的区别？                     //any:放弃类型检查怎么用都行（危险）unknow:暂时搁置用的时候再收窄范围if (typeof u === 'string') {u.toUpperCase()// ✅ 收窄后才能用}
// 为什么函数的参数类型不能省，而返回值类型可以省？


// 参数不能省：参数是外部传进来的，TS 无法从函数体推断"调用者会传什么"，必须由你声明契约。不写就是隐式 any（开 noImplicitAny 会报错）。

// 返回值可以省：返回值是函数体内部产生的，TS 能根据 return 语句自动推断出类型。所以可以省略。

// typescript
// function add(a: number, b: number) {   // 参数必须标类型
//   return a + b                          // 返回值自动推断为 number
// }