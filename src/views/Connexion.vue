<template>
    <div class="page-connexion">
        <!-- Choix de connexion ou création de compte -->
        <div v-if="!afficherFormulaireConnexion && !afficherFormulaireCreation">
            <h1>Bienvenue sur notre site</h1>
            <div class="button-container">
                <button @click="afficherFormulaire('connexion')">Me connecter</button>
                <button @click="afficherFormulaire('creation')">Créer un compte</button>
            </div>
        </div>

        <!-- Formulaire de connexion -->
        <div v-if="afficherFormulaireConnexion" class="form-container">
            <h2>Connexion</h2>
            <form @submit.prevent="seConnecter">
                <label for="identifiant">Identifiant :</label>
                <input type="text" id="identifiant" v-model="identifiant" required />

                <label for="motDePasse">Mot de passe :</label>
                <input type="password" id="motDePasse" v-model="motDePasse" required />

                <button type="submit" class="login-button">Se connecter</button>
                <p v-if="messageErreurConnexion" class="error">{{ messageErreurConnexion }}</p>
                <button @click="retourAccueil">Retour</button>
            </form>
        </div>

        <!-- Formulaire de création de compte -->
        <div v-if="afficherFormulaireCreation" class="form-container">
            <h2>Créer un compte</h2>
            <form @submit.prevent="creerCompte">
                <label for="nom">Nom :</label>
                <input type="text" id="nom" v-model="nom" required />

                <label for="prenom">Prénom :</label>
                <input type="text" id="prenom" v-model="prenom" required />

                <label for="identifiant">Identifiant :</label>
                <input type="text" id="identifiant" v-model="identifiant" required />

                <label for="motDePasse">Mot de passe :</label>
                <input type="password" id="motDePasse" v-model="motDePasse" required />

                <label for="telephone">Téléphone :</label>
                <input type="tel" id="telephone" v-model="telephone" required />

                <label for="email">Email :</label>
                <input type="email" id="email" v-model="email" required />

                <label for="role">Rôle :</label>
                <select v-model="role" @change="gererChangementRole" required>
                    <option value="utilisateur">Festivalier</option>
                    <option value="restaurateur">Restaurateur</option>
                    <option value="createur">Éditeur</option>
                    <option value="organisateur">Organisateur</option>
                    <option value="vendeur">Vendeur</option>
                    <option value="administrateur">Administrateur</option>
                </select>

                <!-- Champ de code affiché uniquement si le rôle n'est pas "Festivalier" -->
                <div v-if="role !== 'utilisateur'">
                    <label for="code">Code d'inscription (obligatoire pour les prestataires et administrateurs)
                        :</label>
                    <input type="text" id="code" v-model="code" :required="role !== 'utilisateur'" />
                    <p v-if="messageErreurCode" class="error">{{ messageErreurCode }}</p>
                </div>

                <button type="submit" class="create-account-button">Créer un compte</button>
                <button @click="retourAccueil">Retour</button>
                <p v-if="messageErreurCreation" class="error">{{ messageErreurCreation }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import { comptes } from "@/datasource/comptes"; // Importation des comptes existants

export default {
    name: "PageConnexion",
    data() {
        return {
            // Champs pour la connexion
            identifiant: "",
            motDePasse: "",

            // Champs pour la création de compte
            nom: "",
            prenom: "",
            telephone: "",
            email: "",
            role: "utilisateur", // Rôle par défaut : Festivalier
            code: "",

            // Gestion des formulaires
            afficherFormulaireConnexion: false,
            afficherFormulaireCreation: false,

            // Messages d'erreur
            messageErreurConnexion: "",
            messageErreurCreation: "",
            messageErreurCode: "", // Message d'erreur pour le code d'inscription
        };
    },
    methods: {
        // Afficher le formulaire sélectionné
        afficherFormulaire(type) {
            if (type === "connexion") {
                this.afficherFormulaireConnexion = true;
                this.afficherFormulaireCreation = false;
            } else if (type === "creation") {
                this.afficherFormulaireConnexion = false;
                this.afficherFormulaireCreation = true;
            }
        },

        // Revenir à la page initiale
        retourAccueil() {
            this.afficherFormulaireConnexion = false;
            this.afficherFormulaireCreation = false;
            this.messageErreurCode = "";
        },

        // Fonction de connexion
        seConnecter() {
            const utilisateur = comptes.find(
                (compte) =>
                    compte.identifiant === this.identifiant &&
                    compte.motDePasse === this.motDePasse
            );

            if (utilisateur) {
                // Connexion réussie
                alert(`Bienvenue ${utilisateur.prenom} ${utilisateur.nom} !`);
                this.$router.push("/home");
            } else {
                // Identifiant ou mot de passe incorrect
                this.messageErreurConnexion = "Identifiant ou mot de passe incorrect.";
            }
        },

        // Fonction de création de compte
        creerCompte() {
            // Vérifier si l'identifiant est déjà pris
            const identifiantExistant = comptes.find(
                (compte) => compte.identifiant === this.identifiant
            );

            if (identifiantExistant) {
                this.messageErreurCreation = "Cet identifiant est déjà utilisé.";
                return;
            }

            // Valider le code d'inscription si un autre rôle que "utilisateur" est sélectionné
            if (this.role !== "utilisateur") {
                const codesValides = {
                    administrateur: "administrateur000",
                    restaurateur: "restaurateur000",
                    createur: "createur000",
                    organisateur: "organisateur000",
                    vendeur: "vendeur000",
                };

                if (this.code !== codesValides[this.role]) {
                    this.messageErreurCode = "Code incorrect pour le rôle sélectionné.";
                    return;
                }
            }

            // Créer le nouveau compte
            const nouveauCompte = {
                id: Date.now(), // Utiliser l'heure actuelle pour générer un ID unique
                role: this.role,
                identifiant: this.identifiant,
                motDePasse: this.motDePasse,
                nom: this.nom,
                prenom: this.prenom,
                telephone: this.telephone,
                email: this.email,
                photoProfil:
                    "https://d1jj76g3lut4fe.cloudfront.net/processed/thumb/S1Yc7F14OY0nt2uB50.png", // Par défaut
            };

            comptes.push(nouveauCompte); // Ajouter le compte à la liste
            alert(`Compte créé avec succès pour ${nouveauCompte.prenom} ${nouveauCompte.nom} !`);
            this.retourAccueil();
        },

        // Gérer le changement de rôle
        gererChangementRole() {
            this.code = ""; // Réinitialiser le code à chaque changement de rôle
            this.messageErreurCode = ""; // Réinitialiser le message d'erreur
        },
    },
};
</script>

<style scoped>
.page-connexion {
    text-align: center;
    padding-top: 100px;
}

.button-container {
    display: flex;
    justify-content: center;
    gap: 20px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
}

button:hover {
    background-color: #0056b3;
}

.form-container {
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

input,
select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.create-account-button {
    background-color: #28a745;
}

.create-account-button:hover {
    background-color: #218838;
}

.error {
    color: red;
    font-size: 0.9em;
}
</style>