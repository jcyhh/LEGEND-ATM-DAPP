/**
 * keepAlive: true —— 跳转别的页面后，本页面不销毁
 */
import Start from '@/views/index.vue'
import Layout from '@/layout/index.vue'

export default [
    {
        path:'/', // 启动
        component: Start
    },
    {
        path:'/home',
        component: Layout,
        redirect: '/home/index',
        children:[{
            path:'index',
            component: () => import('@/views/home.vue')
        }]
    },
    {
        path:'/public',
        component: Layout,
        redirect: '/public/index',
        children:[{
            path:'index',
            component: () => import('@/views/public.vue')
        }]
    },
    {
        path:'/ref/:ref([a-zA-Z0-9]+)', // 接收邀请码，需配置在常规路由的下方
        component: Start
    }
]