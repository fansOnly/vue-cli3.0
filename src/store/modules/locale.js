import { message } from 'ant-design-vue'

import i18n from '@/i18n'
import menuLan from '@/i18n/lang/menu'

import { SWITCH_LOCAL } from '../mutations'

import zh_CN from '../../../node_modules/ant-design-vue/lib/locale-provider/zh_CN';
import zh_TW from '../../../node_modules/ant-design-vue/lib/locale-provider/zh_TW';
import en_US from '../../../node_modules/ant-design-vue/lib/locale-provider/default';

const ANTD_LOCALE = {
    'cn': zh_CN,
    'hk': zh_TW,
    'en': en_US,
};

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-tw';
import 'moment/locale/en-gb';

const ORIGINAL_LOCALE = 'cn';  // 默认语言

const state = {
    locale: '',
    LAN: {},
    menus: [],
}

const getters = {
    locale: () => {
        const CURRENT_LOCALE = localStorage.getItem('locale') || ORIGINAL_LOCALE
        i18n.locale = CURRENT_LOCALE;
        return CURRENT_LOCALE
    },
    LAN: () => {
        const CURRENT_LOCALE = localStorage.getItem('locale') || ORIGINAL_LOCALE
        return ANTD_LOCALE[CURRENT_LOCALE]
    },
    menus: state => {
        const CURRENT_LOCALE = state.locale || localStorage.getItem('locale') || ORIGINAL_LOCALE
        return createMenu(CURRENT_LOCALE) || []
    }
}

const actions = {
    switchLocale({ commit }, payload) {
        message.loading('正在初始化语言...', 1, () => {
            commit(`${SWITCH_LOCAL}`, payload)
        });
    }
}

const mutations = {
    [SWITCH_LOCAL](state, locale) {
        localStorage.setItem('locale', locale);
        state.locale = locale;
        state.menus = createMenu(locale);
        i18n.locale = locale;
        state.LAN = ANTD_LOCALE[locale];
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
            state.LAN = ANTD_LOCALE['cn'];
            moment.locale('zh-cn');
            i18n.locale = 'cn';
            break;
    }
}

const createMenu = locale => {
    return [
        {
            key: 'index',
            name: menuLan.MENU1[locale],
            icon: 'home',
            path: '/admin/index',
        },
        {
            key: 'siteinfo',
            name: menuLan.MENU2[locale],
            icon: 'setting',
            path: '',
            subs: [
                {
                    key: 'siteinfo.site',
                    name: menuLan.MENU2_1[locale],
                    icon: '',
                    path: '/admin/siteinfo/site'
                },
                {
                    key: 'siteinfo.banner',
                    name: menuLan.MENU2_2[locale],
                    icon: '',
                    path: '/admin/siteinfo/banner/class'
                },
                {
                    key: 'siteinfo.upload',
                    name: menuLan.MENU2_3[locale],
                    icon: '',
                    path: '/admin/siteinfo/upload'
                },
            ],
        },
        {
            key: 'member',
            name: menuLan.MENU3[locale],
            icon: 'user',
            path: '',
            subs: [
                {
                    key: 'member.index',
                    name: menuLan.MENU3_1[locale],
                    icon: '',
                    path: '/admin/member/index'
                },
            ]
        },
        {
            key: 'info',
            name: menuLan.MENU4[locale],
            icon: 'table',
            path: '',
            subs: [
                {
                    key: 'info.index',
                    name: menuLan.MENU4_1[locale],
                    icon: '',
                    path: '/admin/info/index'
                },
                {
                    key: 'info.class',
                    name: menuLan.MENU4_2[locale],
                    icon: '',
                    path: '/admin/info/class'
                },
                {
                    key: 'info.recycle',
                    name: menuLan.MENU4_3[locale],
                    icon: '',
                    path: '/admin/info/recycle'
                },
            ]
        },
        {
            key: 'message',
            name: menuLan.MENU5[locale],
            icon: 'contacts',
            path: '',
            subs: [
                {
                    key: 'message.index',
                    name: menuLan.MENU5_1[locale],
                    icon: '',
                    path: '/admin/message/index'
                },
            ]
        },
        {
            key: 'resources',
            name: menuLan.MENU6[locale],
            icon: 'file-search',
            path: '/admin/resources/index',
        },
        {
            key: 'account',
            name: menuLan.MENU7[locale],
            icon: 'team',
            path: '',
            subs: [
                {
                    key: 'account.index',
                    name: menuLan.MENU7_1[locale],
                    icon: '',
                    path: '/admin/account/index'
                },
                {
                    key: 'account.class',
                    name: menuLan.MENU7_2[locale],
                    icon: '',
                    path: '/admin/account/class'
                },
                {
                    key: 'account.permisson',
                    name: menuLan.MENU7_3[locale],
                    icon: '',
                    path: '/admin/account/permission'
                },
            ]
        },
        {
            key: 'user',
            name: menuLan.MENU8[locale],
            icon: 'export',
            path: '',
            subs: [
                {
                    key: 'user.userinfo',
                    name: menuLan.MENU8_1[locale],
                    icon: '',
                    path: '/admin/user/userinfo'
                },
                {
                    key: 'user.changepass',
                    name: menuLan.MENU8_2[locale],
                    icon: '',
                    path: '/admin/user/changepass'
                },
                {
                    key: 'user.logout',
                    name: menuLan.MENU8_3[locale],
                    icon: '',
                    path: ''
                },
            ]
        },
        {
            key: 'test',
            name: menuLan.MENU9[locale],
            icon: 'tool',
            path: '',
            subs: [
                {
                    key: 'test.process',
                    name: menuLan.MENU9_1[locale],
                    icon: 'paper-clip',
                    path: '/admin/test/process'
                },
                {
                    key: 'test.countdown',
                    name: menuLan.MENU9_2[locale],
                    icon: 'clock-circle',
                    path: '/admin/test/countdown'
                },
                {
                    key: 'test.calendar',
                    name: menuLan.MENU9_3[locale],
                    icon: 'calendar',
                    path: '/admin/test/calendar'
                },
                {
                    key: 'test.tabs',
                    name: menuLan.MENU9_4[locale],
                    icon: 'inbox',
                    path: '/admin/test/tabs'
                },
            ]
        },
    ];
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}