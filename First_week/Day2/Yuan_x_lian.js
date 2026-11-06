function Person(name) { this.name = name }
Person.prototype.say = function () { return 'I am ' + this.name }

const p = new Person('小明')

console.log(p.say())    //I am '小明'
console.log(p.__proto__ === Person.prototype)   //true
console.log(Person.prototype.__proto__ === Object.prototype) //true
console.log(Object.prototype.__proto__)        // null 
console.log(p.constructor === Person)          //true p.__proto__.constructor ===Person===person.prototype.constructor
console.log(p.hasOwnProperty('say'))           // false
//用 m in cache 判断缓存，in 会连原型链一起查，所以拿它判断缓存命中是危险的——hasOwnProperty 或 Map.has 才是正确的。

//有对象就有对象原型:__proto__指向上一级的原型对象:prototype object以上为null
//只要是原型对象里面就有constructor指向创造自己的构造函数
//prototype:函数  //__proto__:对象



3.//基本都不太清除
// prototype 属于函数，__proto__ 属于所有对象（函数也是对象，所以两者都有）
// new 四步：建空对象 → 把它的 __proto__ 指向 Fn.prototype → 以它为 this 执行构造函数 → 返回这个对象
// 查找路径：p → Person.prototype（这里有 say）→ Object.prototype → null
// [] instanceof Object 为 true：Array.prototype.__proto__ === Object.prototype，链上确实有它。instanceof 是沿链找，不是查“谁 new 出来的”
// class 里的方法挂在 prototype 上，且不可枚举（所以 for...in 遍历实例不会遍历到方法）


//问
// prototype 和 __proto__ 分别属于谁？
// new 到底做了哪四步？
// p.say() 的查找路径是什么？
// 为什么 [] instanceof Object 也是 true？
// class 里定义的方法，实际存放在哪里