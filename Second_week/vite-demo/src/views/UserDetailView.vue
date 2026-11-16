<template>

<h2>用户详情</h2>
<p>id = {{ id }}（类型：{{ typeof rawId }}）</p>
<RouterLink to="/user">返回列表</RouterLink>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()
const rawId = route.params.id
const id = Number(rawId)

</script>