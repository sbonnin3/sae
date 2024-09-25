import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from '../views/Accueil.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/Accueil",
    name: "Accueil",
    component: Accueil,
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