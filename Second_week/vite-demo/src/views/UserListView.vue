<template>
  <h2>用户列表</h2>
  <el-button type="primary" @click="openCreate">新增用户</el-button>
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
        <!-- <el-button size = "small" @click="">新增</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <el-dialog v-model="dialogVisible" :title="editingId ? '编辑用户' : '新增用户'" width="480px">
  <el-form ref="formRef" :model="form" :rules="rules" label-width="70px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="角色" prop="role">
      <el-select v-model="form.role" style="width: 100%">
        <el-option label="管理员" value="管理员" />
        <el-option label="编辑" value="编辑" />
        <el-option label="访客" value="访客" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="name@demo.com" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio value="在职">在职</el-radio>
        <el-radio value="离职">离职</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>

  <template #footer>
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" :loading="saving" @click="onSave">保存</el-button>
  </template>
</el-dialog>

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
import { ref, computed, watch,reactive } from 'vue'
import { mockUsers as seed, type User } from '@/practice/mockUsers'//seed别名?
import { type FormInstance,type FormRules } from 'element-plus'

const users = ref<User[]>([...seed])
const keyword = ref('')
const page = ref(1)
const size = ref(10)

// ① 过滤
const filtered = computed(() =>
  users.value.filter((u) => !keyword.value || u.name.includes(keyword.value))
)

// ② 总数
const total = computed(() => filtered.value.length)

// ③ 切片
const pageList = computed(() => {
  const start = (page.value - 1) * size.value
  return filtered.value.slice(start, start + size.value)
})




const dialogVisible = ref(false)
const editingId = ref<number | null>(null)
const saving = ref(false)

// 表单数据：Omit<User,'id'> 表示"除了 id 之外的所有字段"
const form = reactive<Omit<User,'id'>>({
  name:'',
  role:'访客',
  email:'',
  status:'在职',
})

const formRef = ref<FormInstance>()

const rules:FormRules<Omit<User,'id'>> = {
  name:[
    {required:true,message:'请输入姓名',trigger:'blur'},
    {min:2,max:10,message:'姓名2-10个字符',trigger:'blur'},
  ],
  email:[
    {required :true,message:'请输入邮箱地址',trigger:'blur'},
    {type:'email',message:'邮箱格式不正确',trigger:'blur'},
  ],
  role:[
    {required:true,message:'请选择角色',trigger:'change'}
  ],
}  

// ④ 筛选条件或每页条数变了，都回到第 1 页
watch([keyword, size], () => {
  page.value = 1
})

function onReset() {
  keyword.value = ''
  page.value = 1
}

function openCreate(){
  editingId.value = null
  Object.assign(form,{name:'',role:'访客',email:'',status:'在职'})
  dialogVisible.value = true
  formRef.value?.clearValidate()
}


function onEdit(row: User) {
  editingId.value = row.id
  Object.assign(form,{name:row.name,role:row.role,email:row.email,status:row.status})
  dialogVisible.value = true
  formRef.value?.clearValidate()

}

async function onSave() {
  try{
    await formRef.value?.validate()
  }
  catch{
    return
  }

  saving.value = true
  try{
    if(editingId.value !== null){
      const idx = users.value.findIndex((u)=>u.id ===editingId.value)
      if(idx > -1) users.value[idx] = {...users.value[idx],...form}
      ElMessage.success('已保存')
    }else{
      const maxId = Math.max(0,...users.value.map((u)=>u.id))
      users.value.unshift({id:maxId + 1,...form})
      keyword.value = ''
      page.value = 1      
      ElMessage.success('已新增')

    }
    dialogVisible.value = false
  }
  
  finally{
    saving.value = false
  }
}


async function onDelete(row: User) {
 try{
  await ElMessageBox.confirm(`确定删除「${row.name}」吗？`, '提示', { type: 'warning' })
 }
 catch{
  return
 }
 users.value = users.value.filter((u)=>u.id !== row.id)
 ElMessage.success('已删除')
}


</script>