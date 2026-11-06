
const cart = [
  { id: 1, name: '机械键盘', price: 399, qty: 1, category: 'peripheral' },
  { id: 2, name: '鼠标垫',   price: 39,  qty: 2, category: 'peripheral' },
  { id: 3, name: '显示器',   price: 1299, qty: 1, category: 'display' },
]

const obj_quantity = cart.reduce((sum,v) => sum+v.qty ,0)
console.log(obj_quantity);

const little_cost = cart.reduce((sum,v) => sum + v.price * v.qty , 0)
console.log(little_cost);

const fild_cust = function(){

    if (little_cost >= 1000) return little_cost - 150;
    if (little_cost >= 300) return little_cost - 50;
    return little_cost;

} 
console.log(fild_cust())

const discount_price = function(isvip){
    let discount = 0.9
    
    return isvip  ? Number((fild_cust() * (1 - discount)).toFixed(2)) : 0
}


const transmit_price = function (isvip) {
    return fild_cust() - discount_price(isvip) >= 199 ? 0 : 8
}
console.log(transmit_price());

const total_price = function(isvip){
    return  fild_cust() + transmit_price(isvip) - discount_price(isvip)
}
console.log('非会员最终支付',total_price(false));
console.log('会员最终支付:', total_price(true));

