/*eslint-env node*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

import createLogger from '@/utils/storeLogger'

const devMode = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules,
    // strict: devMode,
    plugins: devMode ? [createLogger()] : []
});

export default store;