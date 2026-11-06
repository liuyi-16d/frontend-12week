

var array =[1,2,3,4,5]

//{
    // array.shift\unshift(在前端删除和增加元素)
    // array.pop\pussh(在末端删除和增加元素)
    //{ array.join(转字符串)\String.split(转数组)
    //或Array.prototype.slice.call(string)
    //}


//}
//array.reverse （反转数组）     会改原数组\\最好[...array].reverse这个是复制后修改
//array.slice   （截取）         -1从右往左1
//array.splice  （截取/增加值）  会改原数组//左闭右开[ ，）(0,0,1)在索引为0的位置添加1元素
//array.concat  （添加）\[...array1,...array2]
//array.sort    （排序）\\Fisher-Yates洗牌算法
array.sort((a,b) => b-a)//大到小
array.sort((a,b) => Math.random()-0.5)//随机排列不完美版
//array.filter   (筛选数组)
array.filter(function(item,index,array){
    return item != undefined       //去除null和undefind
    // return Number.isInteger(item)//去除非整数
})
//array.some    （类filter数组中有一个满足条件则true）
//array.every   （数组中全部满足条件则true） 
//array.reduce   (累加，排同，遍历)   

array.reduce((sum,value) => sum + value ,0)
array.reduce((acc,value) =>value in acc ? acc : [...acc,value],[] )
array.reduce((acc,value) =>acc.includes(value) ? acc : [...acc,value],[] )
// // ③ 分组（最常用）
// const groups = list.reduce((acc, item) => {
//   ;(acc[item.type] ||= []).push(item)
//   return acc
// }, {})

// // ④ 链式归约：对象数组求和
// const sum = cart.reduce((s, i) => s + i.price * i.qty, 0)


// //map   (映射)
// //foreach 




array.forEach(function(item,index,array){

    
})//无返回值
    console.log()

array.map(function(item,index,array){

    return item*2
})//有返回值
    console.log(array)

console.log(array.find(n => n === 2));//搜索对象
console.log(array.findIndex(n => n === 2));//搜索对象的索引


    
    



