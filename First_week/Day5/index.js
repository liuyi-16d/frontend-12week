      
import {VIP_RATE,vipDiscount,afterFullReduction} from "./utils/promo.js";    //vip优惠额度折扣//vip优惠额度计算//满减价格
import {money,quality_money } from "./utils/format.js";  //更好的保留2位数的四舍五入
import { cart } from "./data/cart.js";


const original_p = cart.reduce((s,v)=>s+v.price*v.qty,0)

function compute(isVip){
    const man_jian = afterFullReduction(original_p)//满减后价格
    const dis_c_p = vipDiscount(man_jian,isVip)
    const after_you_hui = man_jian - dis_c_p
    const shipping = after_you_hui >= 199 ? 0 : 8 
    const total_p = after_you_hui +shipping

    return {man_jian,dis_c_p,after_you_hui,shipping,total_p}


}




for(const isVip of [false,true]){
    const cus = compute(isVip)
    console.log(`${isVip ? "是vip":"非vip"},小计:${quality_money(original_p)},满减:${quality_money(cus.man_jian)},折扣额: ${quality_money(cus.dis_c_p)},优惠价:${quality_money(cus.after_you_hui)},
        运费:${quality_money(cus.shipping)},最终价格:${quality_money(cus.total_p)}`);
    
}


document.querySelector('#btn').onclick = async ()=> {
    const {buildReport}  = await import  ('./utils/report.js') 
    buildReport(cart)
}