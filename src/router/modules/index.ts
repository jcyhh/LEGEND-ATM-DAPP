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
        path:'/agreement',
        component: Layout,
        redirect: '/agreement/index',
        children:[{
            path:'index',
            component: () => import('@/views/agreement.vue')
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
        path:'/node',
        component: Layout,
        redirect: '/node/index',
        children:[{
            path:'index',
            component: () => import('@/views/node.vue')
        }]
    },
    {
        path:'/rank',
        component: Layout,
        redirect: '/rank/index',
        children:[{
            path:'index',
            component: () => import('@/views/rank.vue')
        }]
    },
    {
        path:'/weight',
        component: Layout,
        redirect: '/weight/index',
        children:[{
            path:'index',
            component: () => import('@/views/weight.vue')
        }]
    },
    {
        path:'/pool',
        component: () => import('@/views/ball/pool.vue')
    },
    {
        path:'/door',
        component: () => import('@/views/ball/door.vue')
    },
    {
        path:'/game',
        component: () => import('@/views/ball.vue')
    },
    {
        path:'/record',
        component: () => import('@/views/ball/record.vue')
    },
    {
        path:'/rank/:type',
        component: () => import('@/views/ball/rank.vue')
    },
    {
        path:'/award',
        component: () => import('@/views/ball/award.vue')
    },
    {
        path:'/asset/:ccy',
        component: () => import('@/views/ball/asset.vue')
    },
    {
        path:'/notices',
        component: () => import('@/views/notice/index.vue')
    },
    {
        path:'/withdrawRecoard',
        component: () => import('@/views/ball/withdrawRecoard.vue')
    },
    {
        path:'/rechargeRecord',
        component: () => import('@/views/ball/rechargeRecord.vue')
    },
    {
        path:'/notices/:id',
        component: () => import('@/views/notice/detail.vue')
    },
    {
        path:'/ref/:ref([a-zA-Z0-9]+)', // 接收邀请码，需配置在常规路由的下方
        component: Start
    }
]