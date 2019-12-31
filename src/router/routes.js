// 基础页面加载
const Login = () => import('@/views/login/index.vue');
const Admin = () => import('@/views/index/index.vue');
const NotFound = () => import('@/components/exception/404.vue');

import viewRoutes from './views'

const routes = [
	{
		path: '/',
		name: 'index',
		beforeEnter: (to, from ,next) => {
			if (!sessionStorage.getItem('token')) {
				next({
					path: '/login'
				})
			} else {
				next({
					path: '/admin/index'
				})
			}
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			breadcrumbName: '登陆',
			depth: 1,
		},
		beforeEnter: (to, from ,next) => {
			next(!sessionStorage.getItem('token'));
		}
	},
	{
		path: '/admin/index',
		name: 'admin',
		component: Admin,
		meta: {
			// breadcrumbName: '首页',
			breadcrumbName: 'MENU.MENU1',
			depth: 0,
		},
		children: [...viewRoutes],
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
