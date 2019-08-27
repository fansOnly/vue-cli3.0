// 基础页面加载
const Login = () => import('@/views/login/index.vue');
const Admin = () => import('@/views/admin/index.vue');
const NotFound = () => import('@/components/notFound/404.vue');

// 通用页面加载
const Welcome = () => import('@/views/welcome/index.vue');

const UserInfo = () => import('@/views/user/userInfo.vue');
const ChangePass = () => import('@/views/user/changePass.vue');

const SiteSetting = () => import('@/views/siteInfo/site.vue');
const UploadSetting = () => import('@/views/siteInfo/upload.vue');
const BannerClass = () => import('@/views/siteInfo/banner/class.vue');
const BannerList = () => import('@/views/siteInfo/banner/list.vue');

const Member = () => import('@/views/member/index.vue');

const Account = () => import('@/views/account/index.vue');
const AccountClass = () => import('@/views/account/class/index.vue');
const Permission = () => import('@/views/account/permission/index.vue');

const Assets = () => import('@/views/assets/index.vue');

// pages页面加载
const ListPage = () => import('@/views/pages/listPage/index.vue');
const ListEditPage = () => import('@/views/pages/listPage/edit.vue');
const PicListPage = () => import('@/views/pages/picListPage/index.vue');

const routes = [
	{
		path: '/',
		name: 'Index',
		beforeEnter: (to, from ,next) => {
			if (!localStorage.getItem('token')) {
				next({
					path: '/login'
				})
			} else {
				next({
					path: '/admin'
				})
			}
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			breadcrumbName: '登陆',
			depth: 1,
		},
		beforeEnter: (to, from ,next) => {
			next(!localStorage.getItem('token'));
		}
	},
	{
		path: '/admin',
		name: 'admin',
		component: Admin,
		children: [
			{
				path: '/admin/index',
				name: 'welcome',
				component: Welcome,
				meta: {
					requireAuth: true,
					depth: 2,
				}
			},
			{
				path: '/admin/user/userinfo',
				name: 'userinfo',
				component: UserInfo,
				meta: {
					requireAuth: true,
					breadcrumbName: '修改资料',
					depth: 2,
				},
			},
			{
				path: '/admin/user/changepass',
				name: 'changepass',
				component: ChangePass,
				meta: {
					requireAuth: true,
					breadcrumbName: '修改密码',
					depth: 2,
				},
			},
			{
				path: '/admin/siteinfo/site',
				name: 'site',
				component: SiteSetting,
				meta: {
					requireAuth: true,
					breadcrumbName: '基本设置',
					depth: 2,
				},
			},
			{
				path: '/admin/siteinfo/upload',
				name: 'upload',
				component: UploadSetting,
				meta: {
					requireAuth: true,
					breadcrumbName: '上传设置',
					depth: 2,
				},
			},
			{
				path: '/admin/siteinfo/banner',
				name: 'bannerClass',
				component: BannerClass,
				meta: {
					requireAuth: true,
					breadcrumbName: '幻灯片分类管理',
					depth: 2,
				},
			},
			{
				path: '/admin/siteinfo/banner/:classid/list',
				name: 'bannerList',
				component: BannerList,
				meta: {
					requireAuth: true,
					breadcrumbName: '幻灯片列表',
					depth: 3,
				},
			},
			{
				path: '/admin/member/index',
				name: 'member',
				component: Member,
				meta: {
					requireAuth: true,
					breadcrumbName: '会员管理',
					depth: 2,
				},
			},
			{
				path: '/admin/account/index',
				name: 'account',
				component: Account,
				meta: {
					requireAuth: true,
					breadcrumbName: '管理员列表',
					depth: 2,
				},
			},
			{
				path: '/admin/account/class',
				name: 'accountClass',
				component: AccountClass,
				meta: {
					requireAuth: true,
					breadcrumbName: '管理员分类',
					depth: 2,
				},
			},
			{
				path: '/admin/account/permission',
				name: 'permission',
				component: Permission,
				meta: {
					requireAuth: true,
					breadcrumbName: '管理员权限',
					depth: 2,
				},
			},
			{
				path: '/admin/assets/index',
				name: 'assets',
				component: Assets,
				meta: {
					requireAuth: true,
					breadcrumbName: '系统资源',
					depth: 2,
				},
			},
			{
				path: '/admin/list/:classid',
				name: 'listPage',
				component: ListPage,
				meta: {
					requireAuth: true,
					breadcrumbName: '列表页面',
					depth: 2,
				},
			},
			{
				path: '/admin/piclist/:classid',
				name: 'PicListPage',
				component: PicListPage,
				meta: {
					requireAuth: true,
					breadcrumbName: '图片列表',
					depth: 2,
				},
			},
			{
				path: '/admin/list/:classid/edit/:id',
				name: 'listEditPage',
				component: ListEditPage,
				meta: {
					requireAuth: true,
					breadcrumbName: '列表详情页',
					depth: 3,
				},
			},
		],
		meta: {
			requireAuth: true,
			breadcrumbName: '后台管理',
			depth: 1,
		}
	},
	{
		path: '*',
		name: 'NotFound',
		component: NotFound,
		meta: {
			breadcrumbName: '404',
			depth: 1,
		}
	}
]

export default routes;
