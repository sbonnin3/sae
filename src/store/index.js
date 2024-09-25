import Vue from 'vue';
import Vuex from 'vuex';
import { getAllTournois } from '@/services/tournoisService'; // Assure-toi que c'est bien importé

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tournois: [], // Initialement un tableau vide
    },
    mutations: {
        SET_TOURNOIS(state, tournois) {
            state.tournois = tournois; // Mets à jour l'état avec les tournois
        }
    },
    actions: {
        async getAllTournois({ commit }) {
            try {
                const response = await getAllTournois();
                console.log('Tournois récupérés :', response.data); // Ajoute un log ici
                if (response.error === 0) {
                    commit('SET_TOURNOIS', response.data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des tournois :", error);
            }
        }
    },
    getters: {
        tournois: state => state.tournois, // Getter pour accéder aux tournois depuis les composants
    }
});
