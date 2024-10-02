import Vue from 'vue';
import Vuex from 'vuex';
import { getAllTournois } from '@/services/tournoisService';
import { comptes } from '@/datasource/comptes'; // Importer les comptes depuis le fichier `comptes.js`
import { getAllSouvenirs } from "@/services/souvenirsService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tournois: [], // Liste des tournois
    comptes: comptes, // Liste des comptes utilisateurs
    userSession: null, // Stocker l'utilisateur connecté (null si déconnecté)
    souvenirs: [], // Liste des souvenirs
  },
  mutations: {
    // Mutation pour définir la liste des tournois
    SET_TOURNOIS(state, tournois) {
      state.tournois = tournois;
    },
    // Mutation pour définir la session utilisateur
    SET_USER_SESSION(state, user) {
      state.userSession = user;
    },
    // Mutation pour déconnecter l'utilisateur
    CLEAR_USER_SESSION(state) {
      state.userSession = null;
    },
    // Mutation pour ajouter un nouveau compte
    ADD_COMPTE(state, nouveauCompte) {
      state.comptes.push(nouveauCompte);
    },
    // Mutatation pour définir tout les souvenirs
    SET_SOUVENIR(state, souvenirs){
      state.boutique = souvenirs;
    }
  },
  actions: {
    // Action pour récupérer tous les tournois
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
    },
    // Action pour définir la session utilisateur lors de la connexion
    setUserSession({ commit }, user) {
      commit('SET_USER_SESSION', user);
    },
    // Action pour déconnecter l'utilisateur
    clearUserSession({ commit }) {
      commit('CLEAR_USER_SESSION');
    },
    // Action pour ajouter un compte utilisateur ou prestataire
    addCompte({ commit }, compte) {
      commit('ADD_COMPTE', compte);
    },
    // Action pour récupérer tout les souvenirs
    async getAllSouvenirs({ commit }) {
      try {
        const response = await getAllSouvenirs();
        console.log('Souvenir récupérés :', response.data);
        if (response.error === 0) {
          commit('SET_SOUVENIR', response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des souvenirs :", error);
      }
    },
  },
  getters: {
    // Getter pour récupérer tous les tournois
    tournois: state => state.tournois,
    // Getter pour récupérer tous les comptes
    comptes: state => state.comptes,
    // Getter pour récupérer la session utilisateur
    userSession: state => state.userSession,
    // Getter pour récupérer tout les souvenirs
    souvenirs: state => state.souvenirs,
  },
});
