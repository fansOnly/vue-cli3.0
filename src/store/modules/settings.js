import variables from '@/assets/styles/theme.less'

const ORIGINAL_THEME = "#1890ff"; // default color

const state = {
    theme: localStorage.getItem('theme') || ORIGINAL_THEME,
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}