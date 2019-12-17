import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import zh_CN from './lang/zh-cn/index'
import zh_HK from './lang/zh-hk/index'
import en_US from './lang/en-us/index'

const i18n = new VueI18n({
    locale: 'cn',             // The locale of project localization
    fallbackLocale: 'cn',     // The fallback locale of project localization
    // fallbackRoot: './lang',     // The directory where store localization messages of project
    // enableInSFC: true,
    silentFallbackWarn: true,
    messages: {
        cn: zh_CN,
        hk: zh_HK,
        en: en_US,
    }
})

export default i18n