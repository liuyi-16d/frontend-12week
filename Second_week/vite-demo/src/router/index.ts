import { createWebHistory, createRouter} from 'vue-router'

const routes = [
    {path: '/login', name: 'login', component: () => import('@/views/LoginView.vue')},
    {
        path:'/',
        
        component: () => import('@/layouts/BasicLayout.vue'),
        redirect:'/dashboard',      
        children:[ 
        { path: 'dashboard', name: 'dashboard', component: () => import('@/views/DashboardView.vue') },
        { path: 'user', name: 'user', component: () => import('@/views/UserListView.vue') },
        { path: 'user/:id', name: 'userDetail', component: () => import('@/views/UserDetailView.vue') },
        { path: 'demo', name: 'demo', component: () => import('@/views/DemoView.vue') },
        ]  
        
    },
    { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('@/views/NotFoundView.vue') },


]

const router = createRouter({
    history:createWebHistory(),
    routes,
    
})

export default router