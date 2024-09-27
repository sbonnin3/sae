<template>
    <nav class="navbar">
        <div class="nav-container">
            <ul class="nav-list">
                <li class="nav-item">
                    <a href="@/view/Accueil.vue" class="nav-link">Accueil</a>
                </li>
                <li class="nav-item">
                    <a href="/Activites" class="nav-link">Activités</a>
                </li>
                <li class="nav-item">
                    <a href="/Prestataires" class="nav-link">Prestataires</a>
                </li>
                <li class="nav-item">
                    <a href="/Connexion" class="nav-link">Connexion</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
};
</script>

<style scoped>
body,
html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}

.navbar {
  width: 100vw;
  background-color: #333;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  left: 0;
  height: 60px; /* Fixing the height */
  z-index: 1000;
  background-color: #c92926; /* Couleur de fond de la navbar */
    padding: 15px;
    justify-content: center;
}


.nav-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0;
}

.nav-list {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.nav-item {
    margin-right: 20px;
}

.nav-item:last-child {
    margin-right: 0;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 15px 20px;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 5px;
    color: white;
    text-decoration: none;
    font-size: 1.2em;
}

.nav-link:hover {
    background-color: #000000;
    color: #fff;
}

.nav-link.active {
    background-color: #666;
    color: #fff;
}  
</style>