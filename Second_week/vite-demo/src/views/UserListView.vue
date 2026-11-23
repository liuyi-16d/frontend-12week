<template>
  <h2>用户列表</h2>

  <!-- ① 搜索区 -->
  <el-form :inline="true" @submit.prevent>
    <el-form-item label="姓名">
      <el-input v-model="keyword" placeholder="输入姓名搜索" clearable style="width: 200px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="page = 1">搜索</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>

  <!-- ② 表格：一个就够，喂的是 pageList（切片后的），不是 mockUsers -->
  <el-table :data="pageList" row-key="id" border stripe>
    <el-table-column prop="id" label="ID" width="70" />
    <el-table-column prop="name" label="姓名" width="120" />
    <el-table-column prop="role" label="角色" width="100" />
    <el-table-column prop="email" label="邮箱" min-width="200" />
    <el-table-column prop="status" label="状态" width="100" />

    <!-- ③ 操作列必须写在 el-table 内部 -->
     <!-- @vue-generic {User} -->
    <el-table-column label="操作" width="160" fixed="right">
      <template #default="{ row }">
        <el-button size="small" @click="onEdit(row)">编辑</el-button>
        <el-button size="small" type="danger" @click="onDelete(row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- ④ 无数据提示 -->
  <el-empty v-if="pageList.length === 0" description="没有匹配的用户" />

  <!-- ⑤ 分页 -->
  <el-pagination
    v-model:current-page="page"
    v-model:page-size="size"
    :page-sizes="[10, 20, 50]"
    :total="total"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { mockUsers, type User } from '@/practice/mockUsers'

const keyword = ref('')
const page = ref(1)
const size = ref(10)

// ① 过滤
const filtered = computed(() =>
  mockUsers.filter((u) => !keyword.value || u.name.includes(keyword.value))
)

// ② 总数
const total = computed(() => filtered.value.length)

// ③ 切片
const pageList = computed(() => {
  const start = (page.value - 1) * size.value
  return filtered.value.slice(start, start + size.value)
})

// ④ 筛选条件或每页条数变了，都回到第 1 页
watch([keyword, size], () => {
  page.value = 1
})

function onReset() {
  keyword.value = ''
  page.value = 1
}

function onEdit(row: User) {
  console.log('编辑', row.id, row.name)
}
function onDelete(row: User) {
  console.log('删除', row.id, row.name)
}
</script>