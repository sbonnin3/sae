<template>
    <nav class="navbar">
      <div class="nav-container">
        <ul class="nav-list">
          <li class="nav-item">
            <a href="/Accueil" class="nav-link">Accueil</a>
          </li>
          <li class="nav-item">
            <a href="/Accueil" class="nav-link">Activités</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Prestataires</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Connexion</a>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
  };
  </script>
  
  <style scoped>
  /* Reset margin and padding */
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  
  /* Container styles */
  .navbar {
    width: 100vw; /* Full viewport width */
    background-color: #333;
    padding: 0; /* Remove padding to ensure full width coverage */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: fixed; /* Keep navbar at the top */
    top: 0;
    left: 0;
    z-index: 1000; /* Ensure it's on top of other content */
  }
  
  /* Make sure navbar covers the full width */
  .nav-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    padding: 0;
  }
  
  /* List and items */
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
  
  /* Links */
  .nav-link {
    color: white;
    text-decoration: none;
    padding: 15px 20px;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 5px;
  }
  
  /* Hover effects */
  .nav-link:hover {
    background-color: #555;
    color: #fff;
  }
  
  /* Active link style */
  .nav-link.active {
    background-color: #666;
    color: #fff;
  }
  </style>
  