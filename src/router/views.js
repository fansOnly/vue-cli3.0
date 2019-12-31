import funcRoutes from './func'

/**
 * 路由菜单配置
 * @param {path}
 *          路由地址
 * @param {name}
 *          路由名称
 * @param {component}
 *          路由渲染组件
 * @param {alias}
 *          路由别称
 * @param {redirect}
 *          路由重定向地址
 * @param {meta}
 *          路由元信息
 * @param {meta.key}
 *          左侧菜单标识，回显左侧菜单当前选择项
 * @param {meta.icon}
 *          左侧菜单图标
 * @param {meta.breadcrumbName}
 *          面包屑名称，为空则不显示在面包屑导航
 * @param {meta.depth}
 *          路由层级，回显面包屑导航返回按钮
 * @param {meta.hidden}
 *          左侧菜单显示开关，为 true 则不显示
 * @param {meta.hiddenChildren}
 *          左侧菜单下拉开关，为 true 则显示为正常的点击菜单，为 false 则显示为带下拉的父级菜单
 */
const viewRoutes = [
    {
        path: '/admin/index',
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue'),
        alias: '/admin',
        meta: {
            key: 'index',
            icon: 'home',
            // breadcrumbName: '首页',
            breadcrumbName: 'MENU.MENU1',
            depth: 1,
        }
    },
    {
        path: '/admin/siteinfo',
        name: 'siteinfo',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'siteinfo',
            icon: 'setting',
            // breadcrumbName: '站点设置',
            breadcrumbName: 'MENU.MENU2',
            depth: 1,
        },
        children: [
            {
                path: '/admin/siteinfo/site',
                name: 'site',
                component: () => import('@/views/siteInfo/site.vue'),
                meta: {
                    key: 'siteinfo.site',
                    // breadcrumbName: '基本设置',
                    breadcrumbName: 'MENU.MENU2_1',
                    depth: 2,
                },
            },
            {
                path: '/admin/siteinfo/banner/class',
                name: 'bannerClass',
                component: () => import('@/views/siteInfo/banner/class/index.vue'),
                meta: {
                    key: 'siteinfo.bannerclass',
                    // breadcrumbName: '幻灯片分类',
                    breadcrumbName: 'MENU.MENU2_2',
                    depth: 2,
                },
            },
            {
                path: '/admin/siteinfo/banner/list',
                name: 'bannerList',
                component: () => import('@/views/siteInfo/banner/index.vue'),
                meta: {
                    key: 'siteinfo.bannerlist',
                    // breadcrumbName: '幻灯片列表',
                    breadcrumbName: 'MENU.MENU2_3',
                    depth: 2
                },
            },
            {
                path: '/admin/siteinfo/upload',
                name: 'upload',
                component: () => import('@/views/siteInfo/upload.vue'),
                meta: {
                    key: 'siteinfo.upload',
                    // breadcrumbName: '上传设置',
                    breadcrumbName: 'MENU.MENU2_4',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/member',
        name: 'member',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'member',
            icon: 'user',
            // breadcrumbName: '会员中心',
            breadcrumbName: 'MENU.MENU3',
            depth: 1,
        },
        children: [
            {
                path: '/admin/member/list',
                name: 'memberList',
                component: () => import('@/views/member/index.vue'),
                meta: {
                    key: 'member.list',
                    // breadcrumbName: '会员列表',
                    breadcrumbName: 'MENU.MENU3_1',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/info',
        name: 'info',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'info',
            icon: 'table',
            // breadcrumbName: '文章中心',
            breadcrumbName: 'MENU.MENU4',
            depth: 1,
        },
        children: [
            {
                path: '/admin/info/class',
                name: 'infoClass',
                component: () => import('@/views/info/class/index.vue'),
                meta: {
                    key: 'info.class',
                    // breadcrumbName: '文章分类',
                    breadcrumbName: 'MENU.MENU4_1',
                    depth: 2,
                },
            },
            {
                path: '/admin/info/index',
                name: 'infoIndex',
                component: () => import('@/views/siteInfo/index.vue'),
                redirect: '/admin/info/list',
                meta: {
                    key: 'info.index',
                    // breadcrumbName: '文章列表',
                    breadcrumbName: 'MENU.MENU4_2',
                    depth: 2,
                    hiddenChildren: true
                },
                children: [
                    {
                        path: '/admin/info/list',
                        name: 'infoList',
                        component: () => import('@/views/info/index.vue'),
                        meta: {
                            key: 'info.index',
                            breadcrumbName: '',
                            depth: 2,
                            hidden: true
                        },
                    },
                    {
                        path: '/admin/info/edit/:id',
                        name: 'infoEdit',
                        component: () => import('@/views/info/view.vue'),
                        meta: {
                            key: 'info.index',
                            // breadcrumbName: '编辑文章',
                            breadcrumbName: 'MENU.MENU4_3',
                            depth: 3,
                            hidden: true
                        },
                    },
                    {
                        path: '/admin/info/add',
                        name: 'infoAdd',
                        component: () => import('@/views/info/view.vue'),
                        meta: {
                            key: 'info.index',
                            // breadcrumbName: '新增文章',
                            breadcrumbName: 'MENU.MENU4_4',
                            depth: 3,
                            hidden: true
                        },
                    },
                ]
            },
            {
                path: '/admin/info/recycle',
                name: 'infoRecycle',
                component: () => import('@/views/info/recycle/index.vue'),
                meta: {
                    key: 'info.recycle',
                    // breadcrumbName: '回收站',
                    breadcrumbName: 'MENU.MENU4_5',
                    depth: 3,
                },
            },
        ]
    },
    {
        path: '/admin/message',
        name: 'message',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'message',
            icon: 'contacts',
            // breadcrumbName: '消息中心',
            breadcrumbName: 'MENU.MENU5',
            depth: 1,
        },
        children: [
            {
                path: '/admin/message/index',
                name: 'messageIndex',
                component: () => import('@/views/siteInfo/index.vue'),
                redirect: '/admin/message/list',
                meta: {
                    key: 'message.list',
                    // breadcrumbName: '留言列表',
                    breadcrumbName: 'MENU.MENU5_1',
                    depth: 2,
                    hiddenChildren: true
                },
                children: [
                    {
                        path: '/admin/message/list',
                        name: 'messageList',
                        component: () => import('@/views/message/index.vue'),
                        meta: {
                            key: 'message.list',
                            breadcrumbName: '',
                            depth: 2,
                            hidden: true
                        },
                    },
                    {
                        path: '/admin/message/view/:id',
                        name: 'MessageView',
                        component: () => import('@/views/message/view.vue'),
                        meta: {
                            key: 'message.list',
                            // breadcrumbName: '留言详情',
                            breadcrumbName: 'MENU.MENU5_2',
                            depth: 3,
                            hidden: true
                        },
                    },
                ]
            },
        ]
    },
    {
        path: '/admin/resources',
        name: 'resources',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'resources',
            icon: 'file-search',
            // breadcrumbName: '资源中心',
            breadcrumbName: 'MENU.MENU6',
            depth: 1,
        },
        children: [
            {
                path: '/admin/resources/list',
                name: 'resourcesList',
                component: () => import('@/views/resources/index.vue'),
                meta: {
                    key: 'resources.list',
                    // breadcrumbName: '系统资源',
                    breadcrumbName: 'MENU.MENU6_1',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/account',
        name: 'account',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'account',
            icon: 'team',
            // breadcrumbName: '账号中心',
            breadcrumbName: 'MENU.MENU7',
            depth: 1,
        },
        children: [
            {
                path: '/admin/resources/list',
                name: 'accountList',
                component: () => import('@/views/account/index.vue'),
                meta: {
                    key: 'account.list',
                    // breadcrumbName: '管理员列表',
                    breadcrumbName: 'MENU.MENU7_1',
                    depth: 2,
                },
            },
            {
                path: '/admin/resources/class',
                name: 'accountClass',
                component: () => import('@/views/account/class/index.vue'),
                meta: {
                    key: 'account.class',
                    // breadcrumbName: '管理员分类',
                    breadcrumbName: 'MENU.MENU7_2',
                    depth: 2,
                },
            },
            {
                path: '/admin/resources/permission',
                name: 'permission',
                component: () => import('@/views/account/permission/index.vue'),
                meta: {
                    key: 'account.permission',
                    // breadcrumbName: '管理员权限',
                    breadcrumbName: 'MENU.MENU7_3',
                    depth: 2,
                },
            },
        ]
    },
    {
        path: '/admin/user',
        name: 'userinfo',
        component: () => import('@/views/siteInfo/index.vue'),
        meta: {
            key: 'user',
            icon: 'export',
            // breadcrumbName: '个人设置',
            breadcrumbName: 'MENU.MENU8',
            depth: 1,
        },
        children: [
            {
                path: '/admin/user/userinfo',
                name: 'editUserInfo',
                component: () => import('@/views/user/userInfo.vue'),
                meta: {
                    key: 'user.editinfo',
                    // breadcrumbName: '修改资料',
                    breadcrumbName: 'MENU.MENU8_1',
                    depth: 2,
                },
            },
            {
                path: '/admin/user/changepass',
                name: 'changepass',
                component: () => import('@/views/user/changePass.vue'),
                meta: {
                    key: 'user.changepass',
                    // breadcrumbName: '修改密码',
                    breadcrumbName: 'MENU.MENU8_2',
                    depth: 2,
                },
            },
            {
                path: '/admin/user/logout',
                name: 'logout',
                meta: {
                    key: 'user.logout',
                    // breadcrumbName: '退出登录',
                    breadcrumbName: 'MENU.MENU8_3',
                    depth: 2,
                },
            },
        ]
    },
    ...funcRoutes
];

export default viewRoutes;