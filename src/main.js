import Vue from 'vue'

import Antd from 'ant-design-vue'
import echarts from 'echarts'

import App from './App.vue'

import router from './router'
import store from './store'
import i18n from './i18n'
import * as filters from './filters'

import 'ant-design-vue/dist/antd.css'
import './assets/styles/index.scss'
import './app.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$echarts = echarts

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')