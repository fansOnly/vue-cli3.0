import Vue from 'vue'

import Antd from 'ant-design-vue'
import echarts from 'echarts'
import VueI18n from 'vue-i18n'

import App from './App.vue'

import router from './router'
import store from './store'

// import i18n from '../i18n'

// import messages from './lang/en'

import CN from './lang/cn'
import HK from './lang/hk'
import EN from './lang/en'
import JA from './lang/ja'

import 'ant-design-vue/dist/antd.css'
import './assets/style/reset.css'
import './app.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.prototype.$echarts = echarts
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'en',             // The locale of project localization
    fallbackLocale: 'cn',     // The fallback locale of project localization
    // fallbackRoot: './lang',     // The directory where store localization messages of project
    // enableInSFC: true,
    silentFallbackWarn: true,
    messages: {
        cn: CN,
        hk: HK,
        en: EN,
        ja: JA,
    }
})

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')