<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
console.log(import.meta.env.VITE_API_BASE)
console.log(import.meta.env.VITE_APP_TITLE);
fetch('/api/get')
  .then((r)=>r.json())
  .then((d)=>console.log('代理成功',d))
  .catch((e)=>console.log('代理失败',e))

</script>

<template>
  <HelloWorld />
</template>
