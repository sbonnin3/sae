import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Activites from '../views/Activites.vue';
import Carte from '../views/Carte.vue';
import Prestataires from '../views/Prestataires.vue';
import Connexion from '../views/Connexion.vue';
import store from '../store/index.js'; // Importer le store pour vérifier la session utilisateur

Vue.use(VueRouter);

const routes = [
  {
    path: "/Accueil",
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/Activites",
    name: "Activites",
    component: Activites,
  },
  {
    path: "/Carte",
    name: "Carte",
    component: Carte,
  },
  {
    path: "/Prestataires",
    name: "Prestataires",
    component: Prestataires,
  },
  {
    path: "/Connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/",
    redirect: "/Accueil",
  },
  {
    path: "*",
    redirect: "/Accueil",
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Navigation guard pour vérifier l'authentification avant d'accéder aux routes protégées
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si la route nécessite une authentification et que l'utilisateur n'est pas connecté
    if (!store.getters.userSession) {
      next({
        path: '/Connexion',
        query: { redirect: to.fullPath } // Redirige vers la page de connexion
      });
    } else {
      next(); // L'utilisateur est connecté, il peut accéder à la route
    }
  } else {
    next(); // La route ne nécessite pas d'authentification
  }
});

export default router;
