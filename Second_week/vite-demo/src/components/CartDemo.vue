<template>
    <cart-list :items="cart" @remove="removeItem"/>
    <p>合计:{{ total }}元</p>
</template>


<script setup lang="ts">
    import {ref,computed} from 'vue'
    import type{ CartItem } from '@/practice/types';
    
    import CartList from './CartList.vue';

    const cart = ref<CartItem[]>([
        { id: 1, name: '机械键盘', price: 399, qty: 1, category: 'peripheral' },
        { id: 2, name: '鼠标垫', price: 39, qty: 2, category: 'peripheral' },
        { id: 3, name: '显示器', price: 1299, qty: 1, category: 'display' },
    ])

    const total = computed(()=>cart.value.reduce((s,v)=>s+v.qty*v.price,0)) 

    function removeItem(id:number){
        cart.value = cart.value.filter((v)=>v.id !== id)
    }


</script>

