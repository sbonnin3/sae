import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store' // Assure-toi que le store est importé

Vue.config.productionTip = false

new Vue({
  router,
  store, // Ajoute le store ici
  render: h => h(App),
}).$mount('#app')
