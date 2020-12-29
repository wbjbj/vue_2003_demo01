import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        cnModel: false
    },
    mutations: {
        putToken(state, token) {
            state.token = token
        },
        removeToken(state, token) {
            state.token = token
        },
        changecnModel(state) {
            state.cnModel = !state.cnModel
        }
    },
    actions: {},
    modules: {}
})