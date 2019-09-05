import Vue from 'vue';
import VueRouter from 'vue-router';
import { Modal } from 'ant-design-vue';

import routes from './routes';
import store from '@/store';

Vue.use(VueRouter);
Vue.use(Modal);

const router = new VueRouter({
    // mode: 'history',
    // base: __dirname,
    routes,
})

router.beforeEach((to, from, next) => {
    // console.log('beforeEach global', to, from);

    if (to.meta.requireAuth) {
        if (!localStorage.getItem('token')) {
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

    if (to.meta.breadcrumbName) {
        if (from.name == to.name) {
            updateRoutes(to);
        } else {
            if (to.meta.depth == 2) {
                resetRoutes(to);
            }
            if (to.meta.depth == 3) {
                addRoutes(to);
            }
        }
    }
    
    next();
})

const resetRoutes = to => {
	store.dispatch('breadcrumb/resetRoutes', {path: to.path, name: to.name, breadcrumbName: to.meta.breadcrumbName})
}

const addRoutes = to => {
	store.dispatch('breadcrumb/addRoutes', {path: to.path, name: to.name, breadcrumbName: to.meta.breadcrumbName})
}

const updateRoutes = to => {
    const routes = store.state.breadcrumb.routes;
    let repeatIndex = 0;
    routes.map((route, index) => {
        if (to.name == route.name) {
            repeatIndex = index;
        }
    })
	store.dispatch('breadcrumb/updateRoutes', { index: repeatIndex, route: {path: to.path, name: to.name, breadcrumbName: to.meta.breadcrumbName}})
}

export default router;