// 1.createCounter() → 返回 { inc, dec, get }，外部无法直接读写内部 count
// 2.once(fn) → 返回一个新函数，无论调用多少次，fn 只真正执行一次
// 3.memo(fn) → 缓存计算结果，同样的参数第二次调用时不再执行 fn





//1.
function createCounter(){
    let count = 0;
    const inc = ()=>{count++};
    const dec = ()=>{count--};
    const get = ()=>{return count};
    return{
        inc:inc,
        dec,
        get

    }


}
const c = createCounter()
c.inc();
c.inc();
c.dec();
c.get();

console.log(c.get());
//2.

function once(fn){
    let repeat = false;
    let result;

    return function(){
        if(!repeat){
            repeat = true;
            result = fn();
            
        }
        return result
    }




}


let z = 1
const funconce = once(()=>{z++})
funconce();funconce();funconce()
console.log(z);

//3.

let calls = 0;
function memo(fn){
    
    let cache = new Map();
  

    return function(m) {
        if(cache.has(m))
        {
            return cache.get(m)
        }
        calls++;
        const result = fn(m);
        cache.set(m,result);
        return result

    }



}

const doublen = memo((n)=>{return n*=2}) 

console.log(doublen(1),doublen(1),doublen(2));
console.log(calls);




