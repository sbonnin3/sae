<template>
    <div class="accueilpage">
        <div class="introduction-container">
            <h1>Festival de parthenay</h1>
        </div>
        <div class="up-container">
            <div class="leftuptextcontainer" :class="{ 'fade-in': fadeText }">
                <h1>{{ currentSlide.title }}</h1>
                <h3>{{ currentSlide.subtitle }}</h3>
                <h5>{{ currentSlide.description }}</h5>
                <button type="submit" class="login-button">En savoir plus</button>
            </div>
            <img class="festivalimages" :class="{ 'slide-in': fadeImage }" :src="currentSlide.image"
                alt="imagefestival">
        </div>
        <div class="carousel-indicators">
            <span v-for="(slide, index) in slides" :key="index" :class="{ active: currentIndex === index }"
                class="indicator"></span>
        </div>
        <div class="mid-container">
            <h1>N'attendez plus tout est gratuit !</h1>
            <div class="firstimagecontainer">
                <img class="firstimagecontainerone" src="../assets/images/eventicon.png" width="105px" height="100px">
                <img class="firstimagecontainerone" src="../assets/images/priceicon.png" width="105px" height="100px">
                <img class="firstimagecontainerone" src="../assets/images/foodicon.png" width="105px" height="100px">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PageAccueil",
    data() {
        return {
            currentIndex: 0,
            fadeImage: true,
            fadeText: true,
            slides: [
                {
                    title: "Festival des Jeux de Parthenay - FLIP",
                    subtitle: "Le plus grand festival de jeux gratuit",
                    description: "Présent depuis 1986",
                    image: require("../assets/images/imagefestival_1.png"),
                },
                {
                    title: "Plus de 350 animateurs jeux",
                    subtitle: "4 000 jeux et jouets",
                    description: "4 000 places assises",
                    image: require("../assets/images/imagefestival_2.png"),
                },
                {
                    title: "Présent tous les ans sans exception",
                    subtitle: "Du 9 au 20 juillet 2025",
                    description: "Le tout gratuit",
                    image: require("../assets/images/imagefestival_3.png"),
                },
            ],
        };
    },
    mounted() {
        this.startCarousel();
    },
    methods: {
        startCarousel() {
            setInterval(() => {
                this.fadeImage = false;
                this.fadeText = false;

                // Attendre un court instant pour permettre la sortie des animations
                setTimeout(() => {
                    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
                    this.fadeImage = true;
                    this.fadeText = true;
                }, 1000); // Temps d'animation de 1 seconde
            }, 4000); // Changer toutes les 4 secondes
        },
    },
    computed: {
        currentSlide() {
            return this.slides[this.currentIndex];
        },
    },
    watch: {
        currentIndex() {
            this.fadeImage = false;
            this.fadeText = false;
            this.$nextTick(() => {
                this.fadeImage = true;
                this.fadeText = true;
            });
        },
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.introduction-container {
    display: flex;
    padding-top: 150px;
    width: 100%;
    background-image: url("../assets/images/backgroundaccueil.jpg");
    background-size: cover;

}

.introduction-container>h1 {
    color: white;
    font-weight: bold;
    margin-left: 70px;
    margin-bottom: 400px;
    padding-bottom: 100px;
    font-family: "Poppins", sans-serif;
    font-size: 50px;
    text-shadow: black 2px 2px 2px;
}

.accueilpage {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.up-container {
    background-color: #fcfcfc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.leftuptextcontainer {
    text-align: left;
    padding-left: 100px;
    opacity: 0;
    /* Commence invisible */
    transition: opacity 1s ease-in-out;
    /* Animation de transition pour le texte */
}

.leftuptextcontainer.fade-in {
    opacity: 1;
    /* Devient visible */
}

.festivalimages {
    margin-right: 80px;
    height: 450px;
    width: 480px;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
    transform: translateX(100%);
    /* Commence à droite hors de l'écran */
    opacity: 1;
    /* Reste visible */
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;
    /* Transition plus lente */
}

.festivalimages.slide-in {
    transform: translateX(0);
    /* Remonte à sa position d'origine */
    /* Pas besoin de changer l'opacité ici, car elle reste constante */
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.indicator {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: #ddd;
    /* Couleur grise pour les indicateurs inactifs */
}

.indicator.active {
    background-color: #007bff;
    /* Couleur bleue pour l'indicateur actif */
}

.leftuptextcontainer h1 {
    margin-bottom: 20px;
}

button {
    width: 150px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
    /* Changement de couleur au survol */
}

.mid-container {
    padding-top: 50px;
}

.mid-container>h1 {
    color: black;
    border-bottom: red solid 4px;
    padding: 15px;
    display: inline-block;
}

.firstimagecontainer {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.firstimagecontainerone,
.firstimagecontainertwo,
.firstimagecontainerthree {}

.firstimagecontainerone,
.firstimagecontainerthree {
    margin-right: 200px;
    margin-left: 200px;
}
</style>
