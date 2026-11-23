export interface User {
    id:number
    name:string
    role:string
    email:string
    status:'在职'|'离职'

}

const NAMES = ['张三', '张伟', '李四', '王五', '赵六', '钱七', '孙八']
const ROLES = ['管理员', '编辑', '访客']

export const mockUsers: User[] = Array.from({length:30},(_,i)=>({
    id: i + 1,
    name: `${NAMES[i % NAMES.length]}${i + 1}`,
    role: ROLES[i % ROLES.length],
    email: `user${i + 1}@demo.com`,
  status: i % 4 === 0 ? '离职' : '在职',
}))


