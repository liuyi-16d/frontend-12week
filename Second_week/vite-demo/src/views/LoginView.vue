

<template>
    <div class="login-page">
        <el-card class="login-card">
            <h2>后端管理系统</h2>
                    
            <el-form ref="formRef" :model="form" :rules="rules" label-width="70px">
                <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名" clearable />
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input 
                    v-model="form.password"
                    type="password" 
                    show-password 
                    placeholder="请输入密码"/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="onSubmit">登录</el-button>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>

        </el-card>

    </div>

</template>



<script setup lang="ts">
import {reactive, ref} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'   // type 保留，它是纯类型
interface LoginForm{
    username:string
    password:string
}

const formRef = ref<FormInstance>()
const form = reactive<LoginForm>({ username: '', password: '' })    
const rules: FormRules<LoginForm> = {
    username:[
        {required:true,message:'请输入用户名',trigger:'blur'},
        {min:3,max:12,message:'用户名3-12个字符',trigger:'blur'}
    ],
    password:[
        {required:true,message:'请输入密码',trigger:'blur'},
        {min:6,max:12,message:'密码为6-12位',trigger:'blur'}
    ]
}

const loading = ref(false)

async function onSubmit(){
    if(!formRef.value) return

    try{
        await formRef.value.validate()
    }
    catch{return}

    loading.value = true
    try{
        await new Promise((r)=> setTimeout(r,800))
        ElMessage.success(`登录成功:${form.username}`)
    } finally{
        loading.value = false
    }
}


function onReset(){
    formRef.value?.resetFields()
}

//placeholder它是在输入框为空时，显示在输入框里面的一段浅灰色提示文字。

</script>

<style scoped>
    .login-page{
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

    }

    .login-card{
        width: 380px;
    }
    .login-card h2{
        text-align: center;
        margin-bottom: 20px;

    }

</style>