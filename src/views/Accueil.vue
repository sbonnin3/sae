<template>
  <div class="accueilpage">
    <!-- Conteneur de la vidéo -->
    <div class="video-section">
      <video autoplay loop muted playsinline class="video-element">
        <source src="../assets/videos/video_flip.mp4" type="video/mp4" />
        Votre navigateur ne prend pas en charge les vidéos HTML5.
      </video>
    </div>

    <!-- Conteneur de texte au-dessus de la vidéo -->
    <div class="introduction-container">
      <h1>Festival International de Parthenay</h1>
      <h3>FLIP</h3>
    </div>

    <!-- Conteneur suivant la vidéo et la section d'introduction -->
    <div class="up-container">
      <div class="leftuptextcontainer" :class="{ 'fade-in': fadeText }">
        <h1>{{ currentSlide.title }}</h1>
        <h3>{{ currentSlide.subtitle }}</h3>
        <h5>{{ currentSlide.description }}</h5>
        <button type="submit" class="login-button">En savoir plus</button>
      </div>
      <img class="festivalimages" :class="{ 'slide-in': fadeImage }" :src="currentSlide.image" alt="imagefestival" />
    </div>

    <!-- Indicateurs de carrousel -->
    <div class="carousel-indicators">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: currentIndex === index }"
        class="indicator"
      ></span>
    </div>

    <!-- Section de contenu supplémentaire -->
    <div class="mid-container">
      <h1>N'attendez plus tout est gratuit !</h1>
      <div class="firstimagecontainer">
        <img class="firstimagecontainerone" src="../assets/images/eventicon.png" width="105px" height="100px" />
        <img class="firstimagecontainerone" src="../assets/images/priceicon.png" width="105px" height="100px" />
        <img class="firstimagecontainerone" src="../assets/images/foodicon.png" width="105px" height="100px" />
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

        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.slides.length;
          this.fadeImage = true;
          this.fadeText = true;
        }, 1000);
      }, 4000);
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
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Conteneur pour la vidéo */
.video-section {
  width: 100%;
  height: 10%; /* Hauteur spécifique pour le conteneur de la vidéo */
  position: relative;
  overflow: hidden;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Conteneur de l'introduction */
.introduction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute; /* Se superpose à la vidéo */
  top: 350px; /* Ajuster pour positionner le texte */
  left: 0;
  right: 0;
  z-index: 1; /* Assure que le texte est devant la vidéo */
  color: white;
}

.introduction-container h1,
.introduction-container h3 {
  font-family: "Poppins", sans-serif;
  text-shadow: black 2px 2px 2px;
}

.introduction-container h1 {
  font-size: 50px;
}

.introduction-container h3 {
  font-size: 40px;
}

/* Conteneur de la page */
.accueilpage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Conteneur suivant la vidéo */
.up-container {
  background-color: #fcfcfc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
}

/* Texte et image du carrousel */
.leftuptextcontainer {
  text-align: left;
  padding-left: 100px;
  opacity: 0; /* Commence invisible */
  transition: opacity 1s ease-in-out; /* Animation de transition pour le texte */
}

.leftuptextcontainer.fade-in {
  opacity: 1; /* Devient visible */
}

.festivalimages {
  margin-right: 80px;
  height: 450px;
  width: 480px;
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.3);
  transform: translateX(100%); /* Commence à droite hors de l'écran */
  opacity: 1; /* Reste visible */
  transition: transform 1s ease-in-out, opacity 1s ease-in-out; /* Transition plus lente */
}

.festivalimages.slide-in {
  transform: translateX(0); /* Remonte à sa position d'origine */
}

/* Indicateurs de carrousel */
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
}

.indicator.active {
  background-color: #007bff;
}

/* Conteneur central */
.mid-container {
  padding-top: 50px;
}

.mid-container h1 {
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
.firstimagecontainerthree {
  margin-right: 200px;
  margin-left: 200px;
}
</style>
