const p = {
    name:'p'
}
function hi(a,b){
    return `${this.name}-${a}-${b}`
}

console.log(hi.call(p,1,2));         //p-1-2
console.log(hi.apply(p,[3,4]));      //p-3-4
console.log(hi.bind(p,5)(6));        //p-5-6


const a = [1,10,2]
const sortedCopy = [...a].sort((x,y)=>x-y)   //小到大
console.log(a,sortedCopy);
a.sort()
console.log(a);
//比较函数[...a]原数组不变||a.sort会变


//git部分   
//制造提交 → git reset --hard HEAD~1 → git reflog 找到 hash → git reset --hard <hash>