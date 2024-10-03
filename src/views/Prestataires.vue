<template>
  <div class="prestataire-container">
    <h1 class="page-title">Page prestataires</h1>

    <!-- Onglets pour basculer entre les différents prestataire -->
    <div class="tab-container">
      <button @click="selectTab('Restauration')" :class="{ active: selectedTab === 'Restauration' }">Restauration</button>
      <button @click="selectTab('Boutique')" :class="{ active: selectedTab === 'Boutique' }">Boutique</button>
      <button @click="selectTab('Créateurs de jeux')" :class="{ active: selectedTab === 'Créateur de jeux' }">Créateur de jeux</button>
      <button @click="selectTab('Organisateurs')" :class="{ active: selectedTab === 'Organisateurs' }">Organisateurs</button>
    </div>

    <!-- Section Restauration -->
    <div v-if="selectedTab === 'Restauration'">
      <div class="cards-container" v-if="restaurants.length">
        <!-- Affichage des restaurants sous forme de cartes -->
        <div v-for="restaurant in restaurants" :key="restaurant._id" class="card" @click="openModalRestau(restaurant)">
          <img :src="restaurant.image" alt="Image du restaurant" class="card-image" />
          <div class="card-content">
            <h2 class="card-title">{{ restaurant.nom }}</h2>
          </div>
        </div>
      </div>
      <p v-else>Aucun restaurants disponible.</p>
    </div>

    <!-- Fenêtre modale restauration -->
    <div v-if="selectedModalRestau" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModalRestau">&times;</span>
        <h2>{{ selectedModalRestau.name }}</h2>
        <img :src="selectedModalRestau.image" alt="Image du restaurant" class="modal-image" />
        <p><strong>Articles :</strong> {{ }}</p>
        <p><strong>Boissons :</strong> {{ }}</p>
        <p><strong>Emplacement :</strong> {{ selectedModalRestau.emplacement }}</p>
      </div>
    </div>

    <!-- Section Boutique -->
    <div v-if="selectedTab === 'Boutique'">
      <h2 class="page-other_title">JEUX</h2>
      <div class="cards-container" v-if="jeux.length">
        <!-- Affichage de la boutique sous forme de cartes -->
        <div v-for="jeu in jeux" :key="jeu._id" class="card" @click="openModalJeu(jeu)">
          <img :src="jeu.image" alt="Image du jeu" class="card-image" />
          <div class="card-content">
            <h2 class="card-title">{{ jeu.name }}</h2>
            <p class="card-price"><strong>Prix :</strong> {{ jeu.prix }}€</p>
          </div>
        </div>
      </div>

      <p v-else>Aucun jeux disponible.</p>

      <h2 class="page-other_title">SOUVENIRS</h2>
      <div class="cards-container" v-if="souvenirs.length">
        <!-- Affichage des tournois sous forme de cartes -->
        <div v-for="souvenir in souvenirs" :key="souvenir._id" class="card">
          <img :src="souvenir.image" alt="Image du souvenir" class="card-image" />
          <div class="card-content">
            <h2 class="card-title">{{ souvenir.nom }}</h2>
            <p class="card-price"><strong>Prix : </strong> {{ souvenir.prix }}€</p>
          </div>
        </div>
      </div>
      <p v-else>Aucun souvenirs disponible.</p>
    </div>

    <!-- Fenêtre modale jeux -->
    <div v-if="selectedJeu" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModalJeu">&times;</span>
        <h2>{{ selectedJeu.name }}</h2>
        <img :src="selectedJeu.image" alt="Image du jeu" class="modal-image" />
        <p><strong>Type :</strong> {{ selectedJeu.type }}</p>
        <p><strong>Joueurs :</strong> {{ selectedJeu.nombre_de_joueurs }}</p>
        <p><strong>Âge minimum : </strong> À partir de {{ selectedJeu.age_minimum }} ans</p>
        <p><strong>Durée : </strong> {{ selectedJeu.duree }} min</p>
        <p><strong>Éditeur :</strong> {{ selectedJeu.editeur }}</p>
      </div>
    </div>

    <!-- Section Créateurs de jeux -->
    <div v-if="selectedTab === 'Créateurs de jeux'">
      <!-- Contenu de la section Créateurs de jeux (inchangé) -->
    </div>

    <!-- Section organisateur -->
    <div v-if="selectedTab === 'Organisateurs'">
      <!-- Contenu de la section organisateur (inchangé) -->
    </div>
  </div>
</template>

<script>

import { jeux, restaurants, souvenirs} from '@/datasource/data';

export default {
name: "PagePrestataires",
data() {
  return {
    selectedTab: null, // Onglet par défaut
    selectedModalJeu: null,
    selectedModalRestau: null,
    jeux,
    souvenirs,
    restaurants,
  };
},
methods: {
  selectTab(tab) {
    this.selectedTab = tab;
  },
  openModalJeu(jeu) {
    this.selectedModalJeu = jeu;
  },
  closeModalJeu() {
    this.selectedModalJeu = null;
  },
  openModalRestau(restaurant) {
    this.selectedModalRestau = restaurant;
  },
  closeModalRestau() {
    this.selectedModalRestau = null;
  },
},
};
</script>

<style scoped>
/* Ajout de styles inchangés et styles spécifiques aux fenêtres modales */
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
/* Styles mis à jour pour les onglets et les cartes */
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

/* Styles mis à jour pour les onglets et les cartes */
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

.prestataire-container {
padding: 100px;
text-align: center;
}

.page-title {
font-size: 2em;
margin-bottom: 20px;
}

.page-other_title{
font-size: 1.5em;
margin-bottom: 30px;
margin-top: 30px;
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
height: 300px;
object-fit: cover;
}

.card-content {
padding: 15px;
}

.card-title {
font-size: 1.5em;
margin: 10px 0;
}

.card-type,
.card-price,
.card-player {
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