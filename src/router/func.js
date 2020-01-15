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
            {
                path: '/admin/func/others',
                name: 'others',
                component: () => import('@/views/func/others.vue'),
                meta: {
                    key: 'func.others',
                    icon: 'thunderbolt',
                    // breadcrumbName: '网红大杂烩',
                    breadcrumbName: 'MENU.MENU9_5',
                    depth: 2,
                },
            },
            {
                path: '/admin/func/editor',
                name: 'editor',
                component: () => import('@/views/func/editor.vue'),
                meta: {
                    key: 'func.editor',
                    icon: 'block',
                    // breadcrumbName: '劣质编辑器',
                    breadcrumbName: 'MENU.MENU9_6',
                    depth: 2,
                },
            },
            {
                path: '/admin/func/colorpicker',
                name: 'colorpicker',
                component: () => import('@/views/func/colors.vue'),
                meta: {
                    key: 'func.colorpicker',
                    icon: 'bg-colors',
                    // breadcrumbName: '颜色选择器',
                    breadcrumbName: 'MENU.MENU9_7',
                    depth: 2,
                },
            },
        ]
    },
]

export default funcRoutes;