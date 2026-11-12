<template>
    <ul>
        <li v-for="item in props.items" :key="item.id">
            {{ item.name }}*{{ item.qty }} = {{ item.price*item.qty }}元
            <button  
            class="bt"
            @click="handleRemove(item.id)"
            :class="{removed:removedIds.includes(item.id)}"
            :disabled="removedIds.includes(item.id)"         
            
            >删除</button>
        </li>
    </ul>

    <!-- :disabled=""    为true则disabled(灰色禁止)  -->
</template>


<script setup lang="ts">
    import type { CartItem } from '@/practice/types';
    import {ref} from 'vue'
    const props = defineProps<{items:CartItem[]}>()

    const emit = defineEmits<{remove:[id:number]}>()

    const removedIds = ref<number[]>([])
    function handleRemove(id:number){
        removedIds.value.push(id)
        emit('remove',id)
    }

    // const emit = defineEmits<{
    //         (e: 'change', id: number):void,
    //         (e: 'update', value:string):void
    // }>()//调用签名

    // const emit1 = defineEmits<{
    //     change:[id:number,name:string],
    //     update:[x:number,y:string]
    // }>()//元组
    // emit('change',1)
    // emit1('update',3,'k') //声明组件会 emit 哪些事件、每个事件携带什么参数。

    
    
</script>


<style scoped>
    .removed{
        opacity: 0.3;
       
    }
    /* .removed删除后效果体现不出来（我就了解一下用法而已） */
    .bt{
        color: #7723e6;
        border-color: aqua;
        background-color: #48e88b;
    }
</style>

