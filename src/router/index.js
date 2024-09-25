import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Activites from '../views/Activites.vue';
import Prestataires from '../views/Prestataires.vue';
import Connexion from '../views/Connexion.vue';

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

export default router;