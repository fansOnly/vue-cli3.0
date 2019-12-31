const funcRoutes = [
    {
        path: '/admin/func',
        name: 'func',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'func',
            icon: 'tool',
            // breadcrumbName: '功能测试',
            breadcrumbName: 'MENU.MENU9',
            depth: 1,
        },
        children: [
            {
                path: '/admin/func/process',
                name: 'process',
                component: () => import('@/views/func/process.vue'),
                meta: {
                    key: 'func.process',
                    icon: 'paper-clip',
                    // breadcrumbName: '流程操作',
                    breadcrumbName: 'MENU.MENU9_1',
                    depth: 2,
                },
            },
            {
                path: '/admin/func/countdown',
                name: 'countdown',
                component: () => import('@/views/func/countdown.vue'),
                meta: {
                    key: 'func.countdown',
                    icon: 'clock-circle',
                    // breadcrumbName: '倒计时',
                    breadcrumbName: 'MENU.MENU9_2',
                    depth: 2,
                },
            },
            {
                path: '/admin/func/calendar',
                name: 'calendar',
                component: () => import('@/views/func/calendar.vue'),
                meta: {
                    key: 'func.calendar',
                    icon: 'calendar',
                    // breadcrumbName: '日历',
                    breadcrumbName: 'MENU.MENU9_3',
                    depth: 2,
                },
            },
            {
                path: '/admin/func/tabs',
                name: 'tabs',
                component: () => import('@/views/func/tabs.vue'),
                meta: {
                    key: 'func.tabs',
                    icon: 'inbox',
                    // breadcrumbName: '标签页',
                    breadcrumbName: 'MENU.MENU9_4',
                    depth: 2,
                },
            },
        ]
    },
]

export default funcRoutes;