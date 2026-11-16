

<template>
    <div class="login">
        <h2>后台管理系统</h2>
        <input type="text" v-model="username" placeholder="用户名"/>
        <input type="password" v-model="password" placeholder="密码"/>
        <button @click="onSubmit">登录</button>
    </div>

</template>



<script setup lang="ts">
import {ref} from 'vue'
    const username = ref('')
    const password = ref('')

function onSubmit(){
    console.log('登录', username.value, password.value);
    
}    
//placeholder它是在输入框为空时，显示在输入框里面的一段浅灰色提示文字。

</script>