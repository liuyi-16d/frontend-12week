## Element Plus 按需引入（vite.config.ts）
适用：Vite + Vue3 项目首次接入 EP
命令：npm i element-plus && npm i -D unplugin-vue-components unplugin-auto-import
<!-- ...<el-button/><el-table/>类似上述的组件无需导入import -->
配套：.env.development 写 VITE_API_BASE=/api 客户端才会显示

## Vue Router 初始化
npm i vue-router

// createRouter + createWebHistory + routes    (index.ts)内
// createApp(App).use(router).mount('#app')    (main.ts)内