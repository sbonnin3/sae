<template>
    <div class="tournois-container">
        <h1 class="page-title">Page d'activités</h1>
        <div class="cards-container" v-if="tournois.length">
            <!-- Affichage des tournois sous forme de cartes -->
            <div v-for="tournoi in tournois" :key="tournoi._id" class="card" @click="openModal(tournoi)">
                <img :src="getImage(tournoi)" alt="Image du tournoi" class="card-image" />
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

        <!-- Fenêtre modale -->
        <div v-if="selectedTournoi" class="modal">
            <div class="modal-content">
                <span class="close-button" @click="closeModal">&times;</span>
                <h2>{{ selectedTournoi.nom }}</h2>
                <img :src="getImage(selectedTournoi)" alt="Image du tournoi" class="modal-image" />
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
import { reservations, tournois } from '@/datasource/data';

export default {
    name: "PageActivites",
    data() {
        return {
            selectedTournoi: null,
            showReservationForm: false, // Gérer l'affichage du formulaire de réservation
            userId: "user123",
            reservations,
            tournois,
            reservationForm: {
                lastName: "",
                firstName: "",
                pseudo: "",
                email: "",
                phone: "",
                payment: ""
            },
        };
    },
    methods: {
        formatDate(dates) {
            const mois = [
                "janvier", "février", "mars", "avril", "mai", "juin", 
                "juillet", "août", "septembre", "octobre", "novembre", "décembre"
            ];
            const day = dates.jour.toString().padStart(2, '0');
            const monthName = mois[dates.mois - 1];
            return `${day} ${monthName} à ${dates.heures}h${dates.min.toString().padStart(2, '0')}`;
        },
        getImage(tournoi) {
            return tournoi.image ? tournoi.image : 'https://via.placeholder.com/300x200.png?text=Tournoi';
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
            this.resetReservationForm(); // Réinitialise le formulaire lors de la fermeture
        },
        submitReservation() {
            // Validation basique des données de formulaire
            if (this.reservationForm.payment === "") {
                alert("Veuillez entrer des informations de paiement valides.");
                return;
            }

            // Vérifier les places restantes
            const placesRestantes = this.getPlacesRestantes(this.selectedTournoi._id, this.selectedTournoi.placesLimite);
            if (placesRestantes <= 0) {
                alert("Désolé, il n'y a plus de places disponibles pour cet événement.");
                return;
            }

            // Ajouter la réservation
            this.reservations.push({
                tournoiId: this.selectedTournoi._id,
                userId: this.userId,
                places: 1,
                participant: {
                    lastName: this.reservationForm.lastName,
                    firstName: this.reservationForm.firstName,
                    pseudo: this.reservationForm.pseudo || this.reservationForm.firstName,
                    email: this.reservationForm.email,
                    phone: this.reservationForm.phone,
                    payment: this.reservationForm.payment,
                },
            });

            // Simuler l'envoi d'un email (dans une vraie application, il faudrait une API)
            this.sendConfirmationEmail();

            alert("Réservation réussie ! Un email de confirmation a été envoyé.");
            this.closeReservationForm(); // Fermer le formulaire après la réservation
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
                lastName: "",
                firstName: "",
                pseudo: "",
                email: "",
                phone: "",
                payment: ""
            };
        },
        sendConfirmationEmail() {
            // Cette fonction simule l'envoi d'un email (en réalité, cette fonctionnalité devrait être implémentée côté serveur)
            console.log(`Email de confirmation envoyé à : ${this.reservationForm.email}`);
            console.log(`Détails de la réservation :`, this.reservationForm);
        }
    },
};
</script>

<style scoped>
/* Styles de la page principale */
.tournois-container {
    padding: 20px;
    text-align: center;
}

.page-title {
    font-size: 2em;
    margin-bottom: 20px;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

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

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 15px;
}

.card-title {
    font-size: 1.5em;
    margin: 10px 0;
}

.card-location,
.card-date,
.card-price,
.card-places {
    font-size: 1em;
    color: #555;
    margin: 5px 0;
}

/* Styles de la fenêtre modale */
.modal, .reservation-modal {
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
    width: 100%; /* Largeur de l'image dans la modale */
    height: 300px; /* Hauteur fixe de l'image */
    object-fit: cover; /* Recouvre l'espace disponible tout en gardant le ratio */
    margin-bottom: 20px; /* Espacement en bas de l'image */
}

.close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
}

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
</style>
