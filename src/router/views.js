import testRoutes from './test'

const viewRoutes = [
    {
        path: '/admin/index',
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue'),
        alias: '/admin',
        meta: {
            breadcrumbName: '首页',
            depth: 1,
        }
    },
    {
        path: '/admin/siteinfo',
        name: 'siteinfo',
        meta: {
            breadcrumbName: '站点设置',
            depth: 1,
        }
    },
    {
        path: '/admin/siteinfo/site',
        name: 'site',
        component: () => import('@/views/siteInfo/site.vue'),
        meta: {
            breadcrumbName: '基本设置',
            depth: 2,
        },
    },
    {
        path: '/admin/siteinfo/upload',
        name: 'upload',
        component: () => import('@/views/siteInfo/upload.vue'),
        meta: {
            breadcrumbName: '上传设置',
            depth: 2,
        },
    },
    {
        path: '/admin/siteinfo/banner/class',
        name: 'bannerClass',
        component: () => import('@/views/siteInfo/banner/class/index.vue'),
        meta: {
            breadcrumbName: '幻灯片分类管理',
            depth: 2,
        },
    },
    {
        path: '/admin/siteinfo/banner/:classid/list',
        name: 'bannerList',
        component: () => import('@/views/siteInfo/banner/index.vue'),
        meta: {
            breadcrumbName: '幻灯片列表',
            depth: 3,
        },
    },
    {
        path: '/admin/member',
        name: 'member',
        meta: {
            breadcrumbName: '会员中心',
            depth: 1,
        },
    },
    {
        path: '/admin/member/index',
        name: 'memberList',
        component: () => import('@/views/member/index.vue'),
        meta: {
            breadcrumbName: '会员管理',
            depth: 2,
        },
    },
    {
        path: '/admin/info',
        name: 'info',
        meta: {
            breadcrumbName: '文章中心',
            depth: 1,
        },
    },
    {
        path: '/admin/info/class',
        name: 'infoClass',
        component: () => import('@/views/info/class/index.vue'),
        meta: {
            breadcrumbName: '文章分类',
            depth: 2,
        },
    },
    {
        path: '/admin/info/index',
        name: 'infoList',
        component: () => import('@/views/info/index.vue'),
        meta: {
            breadcrumbName: '文章列表',
            depth: 2,
        },
    },
    {
        path: '/admin/info/edit/:id',
        name: 'infoEdit',
        component: () => import('@/views/info/view.vue'),
        meta: {
            breadcrumbName: '编辑文章',
            depth: 3,
        },
    },
    {
        path: '/admin/info/add',
        name: 'infoAdd',
        component: () => import('@/views/info/view.vue'),
        meta: {
            breadcrumbName: '新增文章',
            depth: 3,
        },
    },
    {
        path: '/admin/info/recycle',
        name: 'infoRecycle',
        component: () => import('@/views/info/recycle/index.vue'),
        meta: {
            breadcrumbName: '回收站',
            depth: 3,
        },
    },
    {
        path: '/admin/message',
        name: 'message',
        meta: {
            breadcrumbName: '消息中心',
            depth: 1,
        },
    },
    {
        path: '/admin/message/index',
        name: 'messageList',
        component: () => import('@/views/message/index.vue'),
        meta: {
            breadcrumbName: '留言管理',
            depth: 2,
        },
    },
    {
        path: '/admin/message/:action/:id',
        name: 'MessageView',
        component: () => import('@/views/message/view.vue'),
        meta: {
            breadcrumbName: '留言详情',
            depth: 3,
        },
    },
    {
        path: '/admin/resources',
        name: 'resources',
        meta: {
            breadcrumbName: '资源中心',
            depth: 1,
        },
    },
    {
        path: '/admin/resources/index',
        name: 'resourcesList',
        component: () => import('@/views/resources/index.vue'),
        meta: {
            breadcrumbName: '系统资源',
            depth: 2,
        },
    },
    {
        path: '/admin/account',
        name: 'account',
        meta: {
            breadcrumbName: '账号中心',
            depth: 1,
        },
    },
    {
        path: '/admin/account/index',
        name: 'accountList',
        component: () => import('@/views/account/index.vue'),
        meta: {
            breadcrumbName: '管理员列表',
            depth: 2,
        },
    },
    {
        path: '/admin/account/class',
        name: 'accountClass',
        component: () => import('@/views/account/class/index.vue'),
        meta: {
            breadcrumbName: '管理员分类',
            depth: 2,
        },
    },
    {
        path: '/admin/account/permission',
        name: 'permission',
        component: () => import('@/views/account/permission/index.vue'),
        meta: {
            breadcrumbName: '管理员权限',
            depth: 2,
        },
    },
    {
        path: '/admin/user',
        name: 'userinfo',
        meta: {
            breadcrumbName: '个人设置',
            depth: 1,
        },
    },
    {
        path: '/admin/user/userinfo',
        name: 'editUserInfo',
        component: () => import('@/views/user/userInfo.vue'),
        meta: {
            breadcrumbName: '修改资料',
            depth: 2,
        },
    },
    {
        path: '/admin/user/changepass',
        name: 'changepass',
        component: () => import('@/views/user/changePass.vue'),
        meta: {
            breadcrumbName: '修改密码',
            depth: 2,
        },
    },
    {
        path: '/admin/user/logout',
        name: 'logout',
        meta: {
            breadcrumbName: '退出登录',
            depth: 2,
        },
    },
    ...testRoutes
];

export default viewRoutes;