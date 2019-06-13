import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        gAlgorithmIndex: 3,
        gRandomness: true
    },
    getters: {
        RAND: state => state.gRandomness,
        INDEX: state => state.gAlgorithmIndex,
        SAME_ALLOWED: (state, getters) => getters.INDEX < 2 ? false : true,
        DIGITS: (state, getters) => getters.INDEX < 2 ? 10 : 6
    },

    mutations: {
        SET_RAND (state, gRandomness) {
            state.gRandomness = gRandomness;
        }, 
        SET_INDEX (state, gAlgorithmIndex) {
            state.gAlgorithmIndex = gAlgorithmIndex;
        }, 
    },
    
    actions: {}
});