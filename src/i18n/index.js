import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

import zh_CN from './lang/zh-cn'
import zh_HK from './lang/zh-hk'
import en_US from './lang/en-us'

// import zh_CN2 from 'ant-design-vue/lib/locale-provider/zh_CN';
// import zh_TW2 from 'ant-design-vue/lib/locale-provider/zh_TW';
// import en_US2 from 'ant-design-vue/lib/locale-provider/default';

const i18n = new VueI18n({
    locale: 'cn',             // The locale of project localization
    fallbackLocale: 'cn',     // The fallback locale of project localization
    // fallbackRoot: './lang',     // The directory where store localization messages of project
    // enableInSFC: true,
    silentFallbackWarn: true,
    messages: {
        cn: {
            ...zh_CN,
            // ...zh_CN2
        },
        hk: {
            ...zh_HK,
            // ...zh_TW2
        },
        en: {
            ...en_US,
            // ...en_US2
        },
    }
})

export default i18n