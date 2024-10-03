<template>
  <div class="map-container">
    <h1 class="page-title">Carte de Parthenay</h1>
    <!-- Selecteur de catégorie -->
    <select v-model="selectedCategory" @change="filterPoints">
      <option value="">Toutes les catégories</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <!-- Carte -->
    <l-map :zoom="zoom" :center="center" style="height: 700px; width: 100%;">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        :attribution="''"
      ></l-tile-layer>

      <!-- Affichage des marqueurs avec icône personnalisée -->
      <l-marker
        v-for="(point, index) in filteredPoints"
        :key="index"
        :lat-lng="point.coordinates"
        :icon="getIconForCategory(point.category)"
      >
        <l-popup>{{ point.name }}</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { points } from "@/datasource/data.js";

// Import des icônes pour chaque catégorie
import toiletIcon from "@/assets/icons/toilet-icon.png";
import parkingIcon from "@/assets/icons/parking-icon.png";
import tournamentIcon from "@/assets/icons/tournament-icon.png";
import standIcon from "@/assets/icons/stand-icon.png";
import restaurationIcon from "@/assets/icons/restauration-icon.png";

export default {
  name: "PageCarte",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      zoom: 14,
      center: [46.6513, -0.2494], // Centre de Parthenay
      selectedCategory: "", // Catégorie sélectionnée
      points, // Points importés depuis data.js
      // Définir les icônes pour chaque catégorie
      icons: {
        'Toilettes': L.icon({
          iconUrl: toiletIcon,
          iconSize: [30, 30], // Taille de l'icône
          iconAnchor: [15, 30], // Position de l'ancrage
          popupAnchor: [0, -30], // Position de la popup par rapport à l'icône
        }),
        'Parking': L.icon({
          iconUrl: parkingIcon,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
        'Tournois': L.icon({
          iconUrl: tournamentIcon,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
        "Stand de jeux": L.icon({
          iconUrl: standIcon,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
        'Restauration': L.icon({
          iconUrl: restaurationIcon,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        }),
      },
    };
  },
  computed: {
    // Filtrer les points en fonction de la catégorie sélectionnée
    filteredPoints() {
      if (this.selectedCategory === "") {
        return this.points;
      }
      return this.points.filter(point => point.category === this.selectedCategory);
    },
    // Extraire les catégories uniques pour le filtre
    categories() {
      return [...new Set(this.points.map(point => point.category))];
    },
  },
  methods: {
    // Retourne l'icône correspondant à la catégorie
    getIconForCategory(category) {
      return this.icons[category] || this.defaultIcon();
    },
    // Définir une icône par défaut si la catégorie n'est pas trouvée
    defaultIcon() {
      return L.icon({
        iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png", // Icône par défaut
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });
    },
  },
};
</script>

<style scoped>
.map-container {
  padding-top: 100px;
  max-width: 95%;
  margin: auto;
}

.leaflet-container {
  width: auto;
  border: 5px solid #000000;
  border-radius: 10px;
}

select {
  margin-bottom: 10px;
}
</style>
