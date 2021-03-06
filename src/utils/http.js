/*eslint-env node*/
import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
import { message } from 'ant-design-vue'
import baseUrl from '@/config/baseUrl'

const codeMessage = {
	200: '服务器成功返回请求的数据。',
	201: '新建或修改数据成功。',
	202: '一个请求已经进入后台排队（异步任务）。',
	204: '删除数据成功。',
	400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
	401: '用户没有权限（令牌、用户名、密码错误）。',
	403: '用户得到授权，但是访问是被禁止的。',
	404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
	406: '请求的格式不可得。',
	410: '请求的资源被永久删除，且不会再得到的。',
	422: '当创建一个对象时，发生一个验证错误。',
	500: '服务器发生错误，请检查服务器。',
	502: '网关错误。',
	503: '服务不可用，服务器暂时过载或维护。',
	504: '网关超时。',
};

// 挡板数据开关
const useMock = true;

// 设置请求url
axios.defaults.baseURL = baseUrl[process.env.NODE_ENV].apiUrl;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.timeout = 10000;

// 添加请求拦截器
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers['Token'] = token;
	}
	return config;
}, error => {
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
	const responseCode = response.status;
	switch (responseCode) {
		case 200:
			break;
		// 401: 未登录            
		case 401:
			router.replace({
				path: '/login',
				query: {
					redirect: router.currentRoute.fullPath
				}
			});
			break;
		// 403 token过期
		case 403:
			localStorage.removeItem('token');
			// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
			setTimeout(() => {
				router.replace({
					path: '/login',
					query: {
						redirect: router.currentRoute.fullPath
					}
				});
			}, 1000);
			break;
		case 404:
			handleStatus(responseCode);
			break;
		default:
			handleStatus(responseCode);
			break;
	}
	return Promise.resolve(response);

}, error => {
	message.error('请求错误。', 1);
	return Promise.reject(error);
});

function handleStatus(status) {
	message.error(codeMessage[status]);
	throw new Error(codeMessage[status]);
}

const get = (url, params) => {
	if (typeof params !== 'undefined') {
		url += '?' + qs.stringify(params)
	}
	return axios.get(url)
	.then(res => {
		return res.data;
	})
}

const post = (url, params, options = {}) => {
	return axios.post(url, params, {...options})
	.then(res => {
		return res.data;
	})
}

const upload = ({url, params, options = {}}) => {
	return axios.post(url, params, {...options, headers: {'Content-Type': 'multipart/form-data'}})
	.then(res => {
		return res.data;
	})
}

export {
	useMock,
	get,
	post,
	upload
}
