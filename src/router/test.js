const testRoutes = [
    {
        path: '/admin/test',
        name: 'test',
        meta: {
            breadcrumbName: '功能测试',
            depth: 1,
        },
    },
    {
        path: '/admin/test/process',
        name: 'process',
        component: () => import('@/views/test/process.vue'),
        meta: {
            breadcrumbName: '流程操作',
            depth: 2,
        },
    },
    {
        path: '/admin/test/countdown',
        name: 'countdown',
        component: () => import('@/views/test/countdown.vue'),
        meta: {
            breadcrumbName: '倒计时',
            depth: 2,
        },
    },
    {
        path: '/admin/test/calendar',
        name: 'calendar',
        component: () => import('@/views/test/calendar.vue'),
        meta: {
            breadcrumbName: '日历',
            depth: 2,
        },
    },
    {
        path: '/admin/test/tabs',
        name: 'tabs',
        component: () => import('@/views/test/tabs.vue'),
        meta: {
            breadcrumbName: '标签页',
            depth: 2,
        },
    },
]

export default testRoutes;