import { UPDATE_CURRENTPATH } from '../mutations'

const state = {
    currentPath: '',
}

const getters = {
    currentPath: () => {
        return sessionStorage.getItem('currentPath') || ''
    }
}

const actions = {
    updateCurrentPath ({ commit }, path) {
        commit('UPDATE_CURRENTPATH', path);
    },
}

const mutations = {
    [UPDATE_CURRENTPATH] (state, path) {
        state.currentPath = path
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}