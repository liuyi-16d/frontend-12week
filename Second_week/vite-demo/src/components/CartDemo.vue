<template>
    <cart-list :items="cart" @remove="removeItem" @change-qty="changeQty"/>
    <p>共 {{ bill.count }} 件 / 小计 {{ bill.subtotal }} / 优惠 {{ bill.discount }} / 运费 {{ bill.shipping }} / 应付 {{ bill.payable }}</p>
</template>


<script setup lang="ts">
    import {ref,computed} from 'vue'
    import type{ CartItem,Coupon } from '@/practice/types';
    import {calcBill}from '@/practice/promo';
    import CartList from './CartList.vue';
   
    

    const cart = ref<CartItem[]>([
        { id: 1, name: '机械键盘', price: 399, qty: 1, category: 'peripheral' },
        { id: 2, name: '鼠标垫', price: 39, qty: 2, category: 'peripheral' },
        { id: 3, name: '显示器', price: 1299, qty: 1, category: 'display' },
    ])

    const coupon = ref<Coupon>(null)
    const bill = computed(() => calcBill(cart.value, coupon.value))

    function removeItem(id:number){
        cart.value = cart.value.filter((v)=>v.id !== id)
    }
    function changeQty(id:number,delta:number){
        const item = cart.value.find((v)=>v.id === id)
        if(!item) return
        item.qty = Math.max(1,item.qty +delta)
    }
// 为什么 changeQty 里可以直接改 item.qty，不需要 cart.value = [...]？
// computed 和普通函数在“更新时机”上有什么区别？
// discount 为什么定义成“优惠了多少钱”而不是“折后价”？
// 1.口诀：改属性走元素代理（item.qty = 3），换整体走 ref 的 value（cart.value = 新数组），两条路 Vue 都盯着。 
// const cart = ref<CartItem[]>深层响应式元素/数组都被proxy包含，元素变化时使用不同的钩子（set,get,deleteproperty,has）

// 2.一句口诀：computed 记结果，函数每次都算。跟新无关数据时computed有缓存不变化（更改相关数据时才计算），普通函数无缓存会变化
// 3.折后价已经有afterDiscount来表示了，discount这样定义方便查错



</script>

