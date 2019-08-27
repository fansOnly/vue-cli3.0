/*eslint-env node*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import locale from './modules/locale'
import setting from './modules/setting'
import breadcrumb from './modules/breadcrumb'
import page from './modules/page'

import createLogger from '@/utils/storeLogger'

const devMode = process.env.NODE_ENV !== 'production'

const modules = {
    locale,
    setting,
    breadcrumb,
    page,
}

const store = new Vuex.Store({
    modules,
    // strict: devMode,
    plugins: devMode ? [createLogger()] : []
});

export default store;