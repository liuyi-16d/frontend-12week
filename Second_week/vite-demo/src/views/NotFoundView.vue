<template>
  <h2>404</h2>
  <p>页面不存在：{{ $route.fullPath }}</p>
  <RouterLink to="/dashboard">回仪表盘</RouterLink>
</template>


<script setup lang="ts">
//{{ $route.fullPath }}直接显示当前网址的完整路径

</script>