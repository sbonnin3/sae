<template>
  <div id="app">
    <NavBar :links="navLinks" />
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
  data() {
    return {
      navLinks: [
        { name: "Accueil", path: "/Accueil" },
        { name: "Activités", path: "/Activites" },
        { name: "Prestataires", path: "/Prestataires" },
        { name: "Connexion", path: "/Connexion" }
      ]
    };
  },
  methods: {
    ...mapActions(['getAllTournois']),
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
  background-color: #ffffff;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
  background-color: #ffffff;
  min-height: 100vh;
  padding-bottom: 20px;
}

body {
  width: 100vw;
  overflow-x: hidden;
}
</style>
