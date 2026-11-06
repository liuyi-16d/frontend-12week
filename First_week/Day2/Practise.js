// const obj = {
//   name: 'obj',
//   fn() { console.log(this.name) }
// }

// // ① 
// obj.fn()
// // ② 
// const f = obj.fn; f()
// // ③ 
// setTimeout(obj.fn, 0)
// // ④ 
// setTimeout(() => obj.fn(), 0)
// // ⑤ 
// obj.fn.call({ name: 'other' })
// // ⑥ 
// const o2 = { name: 'o2', fn: obj.fn, child: { name: 'c', fn: obj.fn } }
// o2.child.fn()



//1.'obj'
//2.'obj'           //   " "
//3.undefind        //   " "
//4.'obj'
//5.'other'
//6.'c'





for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i))
}

//3 3 3
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i))
}

for (var i = 0; i < 3; i++) {
  (function(j)
    {setTimeout(() => console.log(j))

    })(i)
  
}




//mybind



// Function.prototype.myBind = function(ctx,...preset){
//   const fn = this;
//   return function(...later){
//     return fn.call(ctx,...preset,...later)
//   }

// }                                                                                                                                                             

// function greet(greeting,punct){
//   return greeting + ',' +this.name + punct
// } 



// const obj = {name:'obj'}
// const bound = greet.myBind(obj,'Hello')

// console.log(bound('!'))//Hello,obj!


Function.prototype.mybind = function(ctx,...preset){
  const fn = this
  return function(...later){
    return fn.call(ctx,...preset,...later)
  }

}

function whatsyouname(xing,ming){
   return(xing + ' ' + ming + this.name)

}
const qu_xing = '刘'
const cuohao ={name:":滑头"};
const qu_ming = whatsyouname.mybind(cuohao,qu_xing);

console.log(qu_ming('红'));
console.log(qu_ming('燕'));




