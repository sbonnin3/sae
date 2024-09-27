<template>
    <div class="tournois-container">
        <h1 class="page-title">Page d'activités</h1>
        <div class="cards-container" v-if="tournois.length">
            <!-- Affichage des tournois sous forme de cartes -->
            <div v-for="tournoi in tournois" :key="tournoi._id" class="card">
                <img :src="getImage(tournoi)" alt="Image du tournoi" class="card-image" />
                <div class="card-content">
                    <h2 class="card-title">{{ tournoi.nom }}</h2>
                    <p class="card-location">{{ tournoi.lieu }}</p>
                    <p class="card-date">{{ formatDate(tournoi.dates) }}</p>
                    <p class="card-price">Prix: {{ tournoi.prix }}€</p>
                </div>
            </div>
        </div>
        <p v-else>Aucun tournoi disponible.</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "PageActivites",
    computed: {
        ...mapState(['tournois']),
    },
    methods: {
        formatDate(dates) {
            // Liste des mois en français
            const mois = [
                "janvier", "février", "mars", "avril", "mai", "juin", 
                "juillet", "août", "septembre", "octobre", "novembre", "décembre"
            ];
            const day = dates.jour.toString().padStart(2, '0'); // Formater le jour avec deux chiffres
            const monthName = mois[dates.mois - 1]; // Obtenir le nom du mois correspondant
            return `${day} ${monthName} à ${dates.heures}h${dates.min.toString().padStart(2, '0')}`;
        },
        getImage(tournoi) {
            // Retourne l'image définie dans les données du tournoi, ou une image par défaut si aucune n'est définie
            return tournoi.image ? tournoi.image : 'https://via.placeholder.com/300x200.png?text=Tournoi';
        },
    }
}
</script>

<style scoped>
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
    flex-wrap: wrap; /* Permet le retour à la ligne si nécessaire */
    justify-content: center; /* Centre les cartes horizontalement */
    gap: 20px; /* Espace entre les cartes */
}

.card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px; /* Largeur fixe des cartes */
    overflow: hidden;
    text-align: center;
    transition: transform 0.3s ease;
    background-color: #fce012;
}

.card:hover {
    transform: scale(1.05);
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
.card-price {
    font-size: 1em;
    color: #555;
    margin: 5px 0;
}
</style>
