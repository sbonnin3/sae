<template>
    <div class="navbar">
        <button v-for="(title, index) in titles" :key="index" class="nav-button"
            @click="emitMenuClicked(index)">
            {{ title.text }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    props: {
        titles: {
            type: Array,
            required: true,
        },
    },
    methods: {
        emitMenuClicked(index) {
            this.$emit('menu-clicked', index);
        },
    },
};
</script>

<style scoped>
.navbar {
    display: flex; /* Affiche les éléments de la navbar sur une ligne */
    justify-content: space-around; /* Espace uniformément les boutons */
    align-items: center; /* Aligne verticalement les éléments */
    background-color: #000000; /* Fond de la navbar */
    padding: 10px; /* Espace intérieur de la navbar */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Légère ombre pour la navbar */
}

.nav-button {
    color: #fff; /* Couleur du texte */
    padding: 10px 20px; /* Espace intérieur du bouton */
    margin: 5px; /* Espace extérieur entre les boutons */
    border: none; /* Retire les bordures */
    border-radius: 20px; /* Coins arrondis */
    cursor: pointer; /* Curseur pointeur */
    transition: background-color 0.3s ease, transform 0.3s ease; /* Transition douce pour le hover */
    background-color:#000000; /* Fond de la navbar */
}

.nav-button:hover {
    background-color: #d22328; /* Changement de couleur au survol */
    transform: translateY(-3px); /* Légère remontée du bouton au survol */
}

.nav-button:active {
    transform: translateY(0); /* Remet le bouton à sa position initiale lors du clic */
}
</style>
