<template>
  <div id="app">
    <NavBar :titles="navTitles" @menu-clicked="handleMenuClick" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  data: () => ({
    navTitles: [
      { text: "Accueil" },
      { text: "Activités" },
      { text: "Carte" },
      { text: "Prestataires" },
      { text: "Connexion" }
    ],
  }),
  computed: {
    ...mapGetters(["userSession"]), // Récupère l'état de la session utilisateur depuis le store
  },
  watch: {
    // Surveiller les changements de l'utilisateur connecté pour mettre à jour le nom du bouton Connexion
    userSession(newSession) {
      this.updateNavTitles(newSession);
    },
  },
  methods: {
    ...mapActions(["getAllTournois"]),

    handleMenuClick(index) {
      // Définir les chemins associés à chaque bouton
      let route = "";
      if (index === 0) {
        route = "/Accueil";
      } else if (index === 1) {
        route = "/Activites";
      } else if (index === 2) {
        route = "/Carte";
      } else if (index === 3) {
        route = "/Prestataires";
      } else if (index === 4) {
        route = this.userSession ? "/MonCompte" : "/Connexion"; // Redirection conditionnelle en fonction de la session
      }

      // Vérifier si la route actuelle est différente de la route cible
      if (this.$route.path !== route) {
        this.$router.push(route);
      }
    },

    // Méthode pour mettre à jour dynamiquement le nom du bouton "Connexion" en fonction de la session utilisateur
    updateNavTitles(session) {
      if (session) {
        this.navTitles[4].text = "Mon Compte";
      } else {
        this.navTitles[4].text = "Connexion";
      }
    },
  },
  mounted() {
    this.getAllTournois();
    // Mettre à jour les titres au montage si l'utilisateur est déjà connecté
    this.updateNavTitles(this.userSession);
  },
};
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
