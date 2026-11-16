<template>
    <h2>仪表盘</h2>

    <div class="cards">
    <div class="card"><span>用户总数</span><strong>1,286</strong></div>
    <div class="card"><span>今日订单</span><strong>86</strong></div>
    <div class="card"><span>本月营收</span><strong>¥ 32,400</strong></div>
  </div>

    <p><RouterLink :to="{path:'/user'}">用 link 去用户列表</RouterLink></p>
    <button @click="goUserList">用代码跳转</button>
    <button @click="goUserPage2">带 query 跳转</button>
    <RouterLink :to="{path: '/user', query: { page: 3, keyword: 'zhang' }}">纯query 跳转</RouterLink>
    <RouterLink :to="'/user?page=2&keyword=zhang'">纯query 跳转</RouterLink>
</template>


<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
    
    


    const router = useRouter()

    function goUserList() {
        router.push('/user')
    }
    function goUserPage2() {
    router.push({ path: '/user', query: { page: 2, keyword: 'zhang' } })
    }
    
</script>