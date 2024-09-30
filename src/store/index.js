import Vue from 'vue';
import Vuex from 'vuex';
import { getAllTournois } from '@/services/tournoisService';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tournois: [],
    },
    mutations: {
        SET_TOURNOIS(state, tournois) {
            state.tournois = tournois;
        }
    },
    actions: {
        async getAllTournois({ commit }) {
            try {
                const response = await getAllTournois();
                console.log('Tournois récupérés :', response.data);
                if (response.error === 0) {
                    commit('SET_TOURNOIS', response.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des tournois :", error);
            }
        }
    },
    getters: {
        tournois: state => state.tournois,
    }
});
