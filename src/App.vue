<template>
  <div id="app">
    <NavBar :titles="navTitles" @menu-clicked="handleMenuClick" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: () => ({
    navTitles: [
      { text: 'Accueil' },
      { text: 'Activités' },
      { text: 'Carte' },
      { text: 'Prestataires' },
      { text: 'Connexion' }
    ],
  }),
  methods: {
    ...mapActions(['getAllTournois']),

    handleMenuClick(index) {
      // Définir les chemins associés à chaque bouton
      let route = '';
      if (index === 0) {
        route = '/Accueil';
      } else if (index === 1) {
        route = '/Activites';
      } else if (index === 2) {
        route = '/Carte';
      } else if (index === 3) {
        route = '/Prestataires';
      } else if (index === 4) {
        route = '/Connexion';
      }

      // Vérifier si la route actuelle est différente de la route cible
      if (this.$route.path !== route) {
        this.$router.push(route);
      }
    },
  },
  mounted() {
    this.getAllTournois();
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 20px;
}

body {
  width: 100vw;
  overflow-x: hidden;
}
</style>
