<template>
    <div class="tournois-container">
        <h1 class="page-title">Page d'activités</h1>

        <!-- Onglets pour basculer entre Jeux et Tournois -->
        <div class="tab-container">
            <button @click="selectTab('Jeux')" :class="{ active: selectedTab === 'Jeux' }">Jeux</button>
            <button @click="selectTab('Tournois')" :class="{ active: selectedTab === 'Tournois' }">Tournois</button>
        </div>

        <!-- Section Jeux -->
        <div v-show="selectedTab === 'Jeux'">
            <!-- Recherche et filtres pour les jeux avec mise en forme -->
            <div class="search-container">
                <!-- Ligne 1 : Nom de jeu -->
                <div class="search-row">
                    <label for="searchName" class="search-label">Nom de jeu :</label>
                    <input id="searchName" type="text" v-model="searchName" placeholder="Rechercher par nom de jeu" class="search-input" />
                </div>

                <!-- Ligne 2 : Types de jeux (Checkbox) -->
                <div class="search-row">
                    <label class="search-label">Type de jeu :</label>
                    <div class="checkbox-container">
                        <label v-for="type in jeuTypes" :key="type" class="checkbox-label">
                            <input type="checkbox" v-model="selectedTypes" :value="type" /> {{ type }}
                        </label>
                    </div>
                </div>

                <!-- Ligne 3 : Nombre de joueurs, âge minimum, durée maximum -->
                <div class="search-row">
                    <label for="searchPlayers" class="search-label">Nombre de joueurs :</label>
                    <input id="searchPlayers" type="number" v-model="searchPlayers" min="1" placeholder="Nombre de joueurs" class="search-input" />

                    <label for="searchAge" class="search-label">Âge minimum :</label>
                    <input id="searchAge" type="number" v-model="searchAge" min="1" placeholder="Âge minimum" class="search-input" />

                    <label for="searchDuration" class="search-label">Durée max (min) :</label>
                    <input id="searchDuration" type="number" v-model="searchDuration" min="1" placeholder="Durée max (minutes)" class="search-input" />
                </div>

                <!-- Ligne 4 : Nom de stand et Réinitialisation -->
                <div class="search-row">
                    <label for="searchEditeur" class="search-label">Nom de l'éditeur :</label>
                    <input id="searchEditeur" type="text" v-model="searchEditeur" placeholder="Rechercher par nom d'éditeur" class="search-input" />
                    <label for="searchStand" class="search-label">Nom de stand :</label>
                    <input id="searchStand" type="text" v-model="searchStand" placeholder="Rechercher par nom de stand" class="search-input" />
                </div>

                <button @click="resetFilters" class="reset-button">Réinitialiser les filtres</button>
            </div>

            <!-- Affichage des jeux filtrés sous forme de cartes -->
            <div class="cards-container" v-if="filteredJeux.length">
                <div v-for="jeu in filteredJeux" :key="jeu.name" class="card" @click="openJeuModal(jeu)">
                    <img :src="jeu.image" alt="Image du jeu" class="card-image" />
                    <div class="card-content">
                        <h2 class="card-title">{{ jeu.name }}</h2>
                        <p class="card-type">Type : {{ jeu.type }}</p>
                        <p class="card-players">Nombre de joueurs : {{ jeu.nombre_de_joueurs.join(', ') }}</p>
                        <p class="card-age">Âge minimum : {{ jeu.age_minimum }} ans</p>
                        <p class="card-duration">Durée : {{ jeu.duree }} min</p>
                        <p class="card-stand">Nom du stand : {{ jeu.nom_stand }}</p>
                    </div>
                </div>
            </div>
            <p v-else>Aucun jeu disponible.</p>
        </div>

        <!-- Section Tournois -->
        <div v-show="selectedTab === 'Tournois'">
            <div class="cards-container" v-if="tournois.length">
                <div v-for="tournoi in tournois" :key="tournoi._id" class="card" @click="openModal(tournoi)">
                    <img :src="tournoi.image" alt="Image du tournoi" class="card-image" />
                    <div class="card-content">
                        <h2 class="card-title">{{ tournoi.nom }}</h2>
                        <p class="card-location">{{ tournoi.lieu }}</p>
                        <p class="card-date">{{ formatDate(tournoi.dates) }}</p>
                        <p class="card-price">Prix: {{ tournoi.prix }}€</p>
                        <p class="card-places">Places restantes: {{ getPlacesRestantes(tournoi._id, tournoi.placesLimite) }}</p>
                    </div>
                </div>
            </div>
            <p v-else>Aucun tournoi disponible.</p>
        </div>

        <!-- Fenêtre modale pour les détails des jeux -->
        <div v-if="selectedJeu" class="modal">
            <div class="modal-content">
                <span class="close-button" @click="closeJeuModal">&times;</span>
                <h2>{{ selectedJeu.name }}</h2>
                <img :src="selectedJeu.image" alt="Image du jeu" class="modal-image" />
                <p><strong>Type :</strong> {{ selectedJeu.type }}</p>
                <p><strong>Nombre de joueurs :</strong> {{ selectedJeu.nombre_de_joueurs.join(', ') }}</p>
                <p><strong>Âge minimum :</strong> {{ selectedJeu.age_minimum }} ans</p>
                <p><strong>Durée :</strong> {{ selectedJeu.duree }} minutes</p>
                <p><strong>Éditeur :</strong> {{ selectedJeu.editeur }}</p>
                <p><strong>Nom du stand :</strong> {{ selectedJeu.nom_stand }}</p>
            </div>
        </div>

        <!-- Fenêtre modale pour les détails des tournois -->
        <div v-if="selectedTournoi" class="modal">
            <div class="modal-content">
                <span class="close-button" @click="closeModal">&times;</span>
                <h2>{{ selectedTournoi.nom }}</h2>
                <img :src="selectedTournoi.image" alt="Image du tournoi" class="modal-image" />
                <p><strong>Lieu :</strong> {{ selectedTournoi.lieu }}</p>
                <p><strong>Date :</strong> {{ formatDate(selectedTournoi.dates) }}</p>
                <p><strong>Description :</strong> {{ selectedTournoi.description }}</p>
                <p><strong>Prix :</strong> {{ selectedTournoi.prix }}€</p>
                <p><strong>Nombre de places réservées :</strong> {{ getReservationCount(selectedTournoi._id) }}</p>
                <p><strong>Places restantes :</strong> {{ getPlacesRestantes(selectedTournoi._id, selectedTournoi.placesLimite) }}</p>
                <button class="reserve-button" @click="openReservationForm">Réserver</button>
            </div>
        </div>

        <!-- Fenêtre du formulaire de réservation -->
        <div v-if="showReservationForm" class="reservation-modal">
            <div class="modal-content">
                <span class="close-button" @click="closeReservationForm">&times;</span>
                <h2>Formulaire de Réservation</h2>
                <form @submit.prevent="submitReservation">
                    <label for="lastName">Nom:</label>
                    <input type="text" v-model="reservationForm.lastName" required />

                    <label for="firstName">Prénom:</label>
                    <input type="text" v-model="reservationForm.firstName" required />

                    <label for="pseudo">Pseudo (facultatif) :</label>
                    <input type="text" v-model="reservationForm.pseudo" placeholder="Si vide, sera remplacé par le prénom" />

                    <label for="email">Adresse Email:</label>
                    <input type="email" v-model="reservationForm.email" required />

                    <label for="phone">Numéro de téléphone:</label>
                    <input type="tel" v-model="reservationForm.phone" required />

                    <label for="payment">Informations de Paiement:</label>
                    <input type="text" v-model="reservationForm.payment" required />

                    <button type="submit" class="reserve-button">Confirmer la réservation</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reservations, tournois, jeux } from '@/datasource/data';

export default {
    name: 'PageActivites',
    data() {
        return {
            selectedTab: 'Jeux', // Onglet par défaut
            selectedJeu: null,
            selectedTournoi: null,
            showReservationForm: false,
            userId: 'user123',
            reservations,
            tournois,
            jeux,
            searchName: '', // Recherche par nom de jeu
            searchPlayers: '', // Recherche par nombre de joueurs
            searchAge: '', // Recherche par âge minimum
            searchDuration: '', // Recherche par durée maximum
            searchEditeur: '', // Recherche par éditeur
            searchStand: '', // Recherche par nom de stand
            selectedTypes: [], // Types de jeux sélectionnés
            jeuTypes: [...new Set(jeux.map(jeu => jeu.type))], // Types de jeux disponibles (extraits des jeux)
        };
    },
    computed: {
        filteredJeux() {
            return this.jeux.filter(jeu => {
                // Filtre par nom de jeu
                const nameMatch = jeu.name.toLowerCase().includes(this.searchName.toLowerCase());
                // Filtre par type de jeu
                const typeMatch = this.selectedTypes.length ? this.selectedTypes.includes(jeu.type) : true;
                // Filtre par nombre de joueurs
                const playersMatch = this.searchPlayers ? jeu.nombre_de_joueurs.includes(Number(this.searchPlayers)) : true;
                // Filtre par âge minimum
                const ageMatch = this.searchAge ? jeu.age_minimum <= Number(this.searchAge) : true;
                // Filtre par durée maximum
                const durationMatch = this.searchDuration ? jeu.duree <= Number(this.searchDuration) : true;
                // Filtre par éditeur
                const editeurMatch = jeu.editeur.toLowerCase().includes(this.searchEditeur.toLowerCase());
                // Filtre par nom de stand
                const standMatch = jeu.nom_stand.toLowerCase().includes(this.searchStand.toLowerCase());

                return nameMatch && typeMatch && playersMatch && ageMatch && durationMatch && editeurMatch && standMatch;
            });
        },
    },
    methods: {
        selectTab(tab) {
            this.selectedTab = tab;
        },
        resetFilters() {
            this.searchName = '';
            this.searchPlayers = '';
            this.searchAge = '';
            this.searchDuration = '';
            this.searchEditeur = '';
            this.searchStand = '';
            this.selectedTypes = [];
        },
        openJeuModal(jeu) {
            this.selectedJeu = jeu;
        },
        closeJeuModal() {
            this.selectedJeu = null;
        },
        openModal(tournoi) {
            this.selectedTournoi = tournoi;
        },
        closeModal() {
            this.selectedTournoi = null;
        },
        openReservationForm() {
            this.showReservationForm = true;
        },
        closeReservationForm() {
            this.showReservationForm = false;
            this.resetReservationForm();
        },
        submitReservation() {
            // Vérification et enregistrement des réservations (à compléter)
        },
        getReservationCount(tournoiId) {
            const reservation = this.reservations.filter(reservation => reservation.tournoiId === tournoiId);
            return reservation ? reservation.length : 0;
        },
        getPlacesRestantes(tournoiId, placesLimite) {
            const totalReserved = this.reservations
                .filter(reservation => reservation.tournoiId === tournoiId)
                .reduce((total, reservation) => total + reservation.places, 0);
            return placesLimite - totalReserved;
        },
        resetReservationForm() {
            this.reservationForm = {
                lastName: '',
                firstName: '',
                pseudo: '',
                email: '',
                phone: '',
                payment: '',
            };
        },
        formatDate(dates) {
            const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
            const day = dates.jour.toString().padStart(2, '0');
            const monthName = mois[dates.mois - 1];
            return `${day} ${monthName} à ${dates.heures}h${dates.min.toString().padStart(2, '0')}`;
        },
    },
};
</script>

<style scoped>
/* Container principal pour les tournois et les jeux */
.tournois-container {
    padding: 20px;
    text-align: center;
}

/* Titre de la page */
.page-title {
    font-size: 2em;
    margin-bottom: 20px;
}

.tab-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-container button {
  padding: 10px 20px;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  background: none;
  font-size: 1em;
  margin: 0 10px;
  transition: color 0.3s ease, border-bottom-color 0.3s ease;
}

.tab-container button:hover,
.tab-container button.active {
  color: #d22328;
  border-bottom-color: #d22328;
}

/* Conteneur pour l'affichage des cartes de jeux et tournois */
.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

/* Style des cartes de jeux et tournois */
.card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease;
    cursor: pointer;
}

.card:hover {
    transform: scale(1.05);
    background-color: #fce012;
}

/* Image dans chaque carte */
.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

/* Contenu de chaque carte */
.card-content {
    padding: 15px;
}

.card-title {
    font-size: 1.5em;
    margin: 10px 0;
}

/* Informations détaillées dans chaque carte */
.card-type,
.card-players,
.card-age,
.card-duration,
.card-stand,
.card-location,
.card-date,
.card-price,
.card-places {
    font-size: 1em;
    color: #555;
    margin: 5px 0;
}

/* Style des fenêtres modales */
.modal,
.reservation-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: left;
    position: relative;
}

.modal-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 20px;
}

/* Bouton pour fermer la fenêtre modale */
.close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

/* Bouton de réservation */
.reserve-button {
    background-color: #f04e23;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.reserve-button:hover {
    background-color: #d83d1a;
}

/* Style des formulaires de réservation */
form {
    display: flex;
    flex-direction: column;
}

form label {
    margin: 10px 0 5px;
}

form input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

form button {
    align-self: flex-start;
}

/* Style des inputs de recherche */
.search-input {
    padding: 10px;
    margin: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 180px;
}

/* Conteneur des cases à cocher pour les filtres de type de jeu */
.checkbox-container {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px 0;
}

/* Style de chaque label de checkbox */
.checkbox-label {
    margin-right: 15px;
}

/* Style du bouton de réinitialisation */
.reset-button {
    background-color: #f04e23;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: auto;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.reset-button:hover {
    background-color: #d83d1a;
}

/* Conteneur global de la recherche */
.search-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
}

/* Style de chaque ligne de recherche */
.search-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

/* Style des labels de recherche */
.search-label {
    font-weight: bold;
    margin-right: 10px;
}
</style>