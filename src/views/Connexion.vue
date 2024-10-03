<template>
    <div class="page-login">
        <div class="login-container">
            <h1>Connexion</h1>
            <form @submit.prevent="handleLogin">
                <label for="identifiant">Identifiant :</label>
                <input type="text" id="identifiant" v-model="identifiant" required />

                <label for="motDePasse">Mot de passe :</label>
                <input type="password" id="motDePasse" v-model="motDePasse" required />

                <button type="submit" class="login-button">Se connecter</button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </form>

            <!-- Si l'utilisateur est connecté, afficher le bouton de déconnexion -->
            <div v-if="userSession" class="user-info">
                <p>Bienvenue {{ userSession.prenom }} {{ userSession.nom }} !</p>
                <button @click="handleLogout" class="logout-button">Se déconnecter</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    name: "PageConnexion",
    data() {
        return {
            identifiant: "",
            motDePasse: "",
            errorMessage: "", // Message d'erreur pour la connexion
        };
    },
    computed: {
        ...mapState(["comptes", "userSession"]), // Récupère les comptes et la session utilisateur depuis le store Vuex
    },
    methods: {
        ...mapMutations(["SET_USER_SESSION", "CLEAR_USER_SESSION"]), // Mutations pour mettre à jour la session utilisateur

        handleLogin() {
            // Vérifier les identifiants et le mot de passe dans les comptes
            const user = this.comptes.find(
                (compte) =>
                    compte.identifiant === this.identifiant &&
                    compte.mot_de_passe === this.motDePasse
            );

            if (user) {
                this.errorMessage = "";
                this.SET_USER_SESSION(user); // Stocke la session utilisateur dans le store Vuex
                alert(`Bienvenue ${user.prenom} ${user.nom}, vous êtes connecté !`);
                this.$router.push("/home"); // Redirige vers la page d'accueil (ou une autre page)
            } else {
                this.errorMessage = "Identifiant ou mot de passe incorrect";
            }
        },

        handleLogout() {
            this.CLEAR_USER_SESSION(); // Déconnecte l'utilisateur
            alert("Vous êtes déconnecté !");
        },
    },
};
</script>

<style scoped>
.page-login {
    padding-top: 150px;
}

.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
}

label {
    display: block;
    margin: 10px 0 5px;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    font-size: 0.9em;
}

.user-info {
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid #ddd;
    text-align: center;
}

.logout-button {
    background-color: #f04e23;
}

.logout-button:hover {
    background-color: #d83d1a;
}
</style>