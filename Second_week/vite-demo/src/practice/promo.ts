import type { CartItem,Coupon,Bill } from "./types";
// import {cart,Coupon} from "./ts-basic"


export function getSubtotal(items:CartItem[]):number{
    return items.reduce((s,v)=>s+v.price*v.qty,0)
}
export function getFullDiscount(amount:number):number{
    if(amount>=1000) return 150
    if(amount>=300) return 50
    return 0
}
export function getCouponDiscount(amount:number,coupon:Coupon):number{
    return coupon === 'VIP10'? Number((amount * 0.1 ).toFixed(2)) : 0
}
export function getShipping(afterDiscountAmount:number):number{
    return afterDiscountAmount>=199? 0:8
}

export function calcBill(items:CartItem[],coupon:Coupon = null): Bill{
    const count = items.reduce((s, v) => s + v.qty, 0)
    const subtotal = getSubtotal(items)
    const fullReduction = getFullDiscount(subtotal)
    const afterReduce = subtotal - fullReduction
    const couponDiscount = getCouponDiscount(afterReduce,coupon)
    const shipping = getShipping(afterReduce - couponDiscount)
    const payable = Number((afterReduce + shipping -couponDiscount ).toFixed(2))
    
    return{
        count,
        subtotal,
        discount: Number((fullReduction + couponDiscount).toFixed(2)),
        shipping,
        payable
    }
}