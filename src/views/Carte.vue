<template>
    <div class="map-container">
      <p>Carte de Parthenay</p>
      <l-map :zoom="zoom" :center="center" :options="mapOptions" style="height: 500px; width: 100%;">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          :attribution="''"
        ></l-tile-layer>
      </l-map>
    </div>
  </template>
  
  <script>
  import { LMap, LTileLayer } from "vue2-leaflet";
  import "leaflet/dist/leaflet.css";
  
  export default {
    // eslint-disable-next-line
    name: "Carte",
    components: {
      LMap,
      LTileLayer,
    },
    data() {
      return {
        zoom: 14, // Zoom par défaut pour une vue de la ville
        center: [46.6513, -0.2494], // Coordonnées pour centrer sur le centre-ville de Parthenay
        mapOptions: {
          attributionControl: false, // Désactive l'attribution par défaut
        },
      };
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    max-width: 90%; /* Limite la largeur de la carte à 90% de la page */
    margin: 20px auto; /* Ajoute une marge en haut/bas et centre la carte horizontalement */
  }
  
  .leaflet-container {
    height: 500px; /* Hauteur de la carte */
    width: 100%; /* Utilise toute la largeur de .map-container */
    border: 1px solid #ddd; /* Bordure optionnelle pour délimiter la carte */
    border-radius: 8px; /* Coins arrondis pour un style plus doux */
  }
  </style>
  