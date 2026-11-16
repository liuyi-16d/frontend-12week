

<template>
  <h2>用户列表</h2>
    <ul>
    <li v-for="u in users" :key="u.id">
      {{ u.name }} {{ u.role }}— <RouterLink :to="`/user/${u.id}`">详情（params?）</RouterLink>
    </li>
  </ul>
</template>



<script setup lang="ts">
    interface User{
        id:number,
        name:string,
        role:string
    }
    const users: User[] = [
    { id: 1, name: '张三', role: '管理员' },
    { id: 2, name: '李四', role: '编辑' },
    { id: 3, name: '王五', role: '访客' },
    ]

</script>