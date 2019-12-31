import Vue from 'vue'
import VueRouter from 'vue-router'
import { Modal } from 'ant-design-vue'
import NProgress from 'nprogress'

import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)
Vue.use(Modal)

const router = new VueRouter({
    // mode: 'history',
    // base: __dirname,
    routes,
})

// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

router.beforeEach((to, from, next) => {
    // console.log('beforeEach global', to, from);

    if (/^\/admin\/\S+/.test(to.path)) {
        routeAuth();
    }

    if (to.path !== from.path) {
        NProgress.start();
    }
    
    next();
})

router.afterEach(() => {
    NProgress.done();
    document.documentElement.scrollTop = 0;
})

const routeAuth = () => {
    if (!sessionStorage.getItem('token')) {
        let secondsToGo = 5;
        const modal = Modal.warning({
            title: '会话过期，请重新登陆',
            content: `当前窗口 ${secondsToGo} 秒后自动关闭`,
            okText: '确定',
            onOk () {
                router.push('/login');
            }
        });
        const interval = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `当前窗口 ${secondsToGo} 秒后自动关闭`,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(interval);
            modal.destroy();
            if (secondsToGo == 0) {
                router.push('/login');
            }	
        }, secondsToGo * 1000);
        return;
    }
}

export default router;