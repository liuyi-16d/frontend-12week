<template>
  <div class="layout">
    <aside>
      <RouterLink to="/dashboard">仪表盘</RouterLink>
      <RouterLink to="/user">用户列表</RouterLink>
      <RouterLink to="/demo">购物车 Demo</RouterLink>
    </aside>
    <main>
      <RouterView/>
    </main>
  </div>
</template>


<script setup lang="ts">

</script>


<style scoped>
.layout { display: flex; min-height: 100vh; }
aside { width: 180px; padding: 16px; border-right: 1px solid #eee; }
aside a { display: block; padding: 8px 0; }
main { flex: 1; padding: 16px; }

</style>