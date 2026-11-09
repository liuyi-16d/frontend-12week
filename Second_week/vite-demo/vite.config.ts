import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port:5173,
    proxy:{
      '/api': {
        target: 'https://httpbin.org',
        changeOrigin:true,
        rewrite:(path) =>path.replace(/^\/api/,'')
      }
    }
  },

  plugins: [vue()],
  resolve:{
    alias:{
      '@':fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
})
// 【Vite Proxy 代理的本质】
// 1. 背景：浏览器有同源策略（跨域限制），但 Node.js（Vite的底层）作为服务器端，没有跨域限制。
// 2. 前端发请求：浏览器向本地服务器（Vite）发送 fetch('/api/get')，因为是本地请求，属于同源，浏览器放行。
// 3. Vite 拦截：Vite 发现请求路径匹配到了 '/api'，触发 proxy 代理规则。
// 4. 偷梁换柱：Vite 在 Node 层面将请求重新组装——用 rewrite 去掉 '/api'，用 changeOrigin 修改请求头里的 Host（伪装成目标域名），然后向目标服务器（target + '/get'）发起真实请求。
// 5. 原路返回：目标服务器把数据返回给 Vite，Vite 再以本地服务器的身份，把数据塞给浏览器。
// 结论：Vite 就是个“双向传话”的中间人，完美骗过了浏览器的同源策略。