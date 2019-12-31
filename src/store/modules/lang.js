import { message } from 'ant-design-vue'

import i18n from '@/i18n'

import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import zh_TW from 'ant-design-vue/lib/locale-provider/zh_TW';
import en_US from 'ant-design-vue/lib/locale-provider/default';

const ANTD_LOCALES = {
    'cn': zh_CN,
    'hk': zh_TW,
    'en': en_US,
};

const LANGS = {
    'cn': '简体中文',
    'hk': '繁体中文',
    'en': '英文',
}

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import 'moment/locale/en-gb';

const ORIGINAL_LOCALE = 'cn';  // 默认语言

const state = {
    locale: '',
    LAN: {},
}

const getters = {
    locale: () => {
        const CURRENT_LOCALE = localStorage.getItem('locale') || ORIGINAL_LOCALE
        i18n.locale = CURRENT_LOCALE;
        return CURRENT_LOCALE
    },
    LAN: () => {
        const CURRENT_LOCALE = localStorage.getItem('locale') || ORIGINAL_LOCALE
        return ANTD_LOCALES[CURRENT_LOCALE]
    },
}

const actions = {
    switchLocale({ commit }, payload) {
        message.success(`已切换成${LANGS[payload]}`);
        commit('SWITCH_LOCAL', payload)
    }
}

const mutations = {
    SWITCH_LOCAL(state, locale) {
        localStorage.setItem('locale', locale);
        state.locale = locale;
        i18n.locale = locale;
        state.LAN = ANTD_LOCALES[locale];
        updateLAN(locale);
    }
}

const updateLAN = locale => {
    switch (locale) {
        case 'cn':
            moment.locale('zh-cn');
            break;
        case 'hk':
            moment.locale('zh-tw');
            break;
        case 'en':
            moment.locale('en-gb');
            break;
        default:
            state.LAN = ANTD_LOCALES['cn'];
            moment.locale('zh-cn');
            i18n.locale = 'cn';
            break;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}