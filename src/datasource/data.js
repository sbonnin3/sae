export const tournois = [
  {
    _id: "000001",
    nom: "Molkky",
    prix: 5,
    lieu: "Domaine des loges",
    dates: {
      mois: 7,
      jour: 10,
      heures: 19,
      min: 0,
    },
    description: "Participez à un tournoi de Molkky, le célèbre jeu de quilles finlandaises. Venez tester votre adresse dans une ambiance conviviale.",
    placesLimite: 20,
    image: "https://woopy.fr/wp-content/uploads/2016/05/soiree-molkky-woopy-2015-jeu-quilles-finlandais.jpg"
  },
  {
    _id: "000002",
    nom: "Corn Hole",
    prix: 5,
    lieu: "Domaine des loges",
    dates: {
      mois: 7,
      jour: 11,
      heures: 19,
      min: 0,
    },
    description: "Affrontez d'autres participants dans un tournoi de Corn Hole. Le jeu consiste à lancer des sacs de maïs dans un trou pour marquer des points.",
    placesLimite: 15,
    image: "https://woopy.fr/wp-content/gallery/nocturne-woopy-cornhole-flip-2019/MG_1609.jpg"
  },
  {
    _id: "000003",
    nom: "Paintball",
    prix: 20,
    lieu: "Château de Parthenay",
    dates: {
      mois: 7,
      jour: 12,
      heures: 14,
      min: 45,
    },
    description: "Une bataille de paintball en équipe dans un cadre unique. Réservez vite vos places pour ce moment de fun et de stratégie.",
    placesLimite: 10,
    image: "https://www.bawtrypaintballfields.co.uk/images/Fold1-Slider-Image.jpg"
  },
  {
    _id: "000004",
    nom: "Rocket League",
    prix: 5,
    lieu: "Palais des congrès",
    dates: {
      mois: 7,
      jour: 13,
      heures: 15,
      min: 0,
    },
    description: "Un tournoi e-sport de Rocket League pour les passionnés de jeux vidéo. Montrez vos compétences et devenez le champion de cette édition.",
    placesLimite: 30,
    image: "https://www.cc-parthenay-gatine.fr/fileadmin/_processed_/8/c/csm_FLIP_2023__15__93fbf24558.png"
  },
  {
    _id: "000005",
    nom: "Escape Game",
    prix: 17,
    lieu: "Tour de la poudrière",
    dates: {
      mois: 7,
      jour: 14,
      heures: 14,
      min: 0,
    },
    description: "Mettez-vous au défi dans cet escape game spécialement conçu pour le festival. Résolvez les énigmes et échappez-vous avant le temps imparti.",
    placesLimite: 12,
    image: "https://dev.jeux-festival.com/wp-content/uploads/2023/01/tresor-a-double-tour.png"
  },
  {
    _id: "000006",
    nom: "Basketball",
    prix: 3,
    lieu: "Place du drapeau",
    dates: {
      mois: 7,
      jour: 15,
      heures: 16,
      min: 0,
    },
    description: "Un tournoi de basketball 3 contre 3. Formez votre équipe et venez affronter les autres dans une ambiance sportive et festive.",
    placesLimite: 25,
    image: "https://www.cc-parthenay-gatine.fr/fileadmin/_processed_/e/3/csm_FLIP_2023__16__7a935f6734.png"
  },
  {
    _id: "000007",
    nom: "Gobbit",
    prix: 5,
    lieu: "Place du drapeau",
    dates: {
      mois: 7,
      jour: 16,
      heures: 18,
      min: 0,
    },
    description: "Un tournoi du jeu de société Gobbit, où réflexes et observation sont de mise. Que le meilleur gagne !",
    placesLimite: 20,
    image: "https://m.media-amazon.com/images/I/910dojcTJIL._AC_UF1000,1000_QL80_.jpg"
  }
];

export const reservations = [
  {
    tournoiId: "000001",
    userId: "user123",
    places: 2,
  },
  {
    tournoiId: "000002",
    userId: "user123",
    places: 1,
  }
];

export const points = [
  {
    category: 'Toilettes',
    name: 'Toilettes Publiques',
    coordinates: [46.647, -0.25235],
  },
  {
    category: 'Toilettes',
    name: 'Toilettes Publiques',
    coordinates: [46.649, -0.2523],
  },
  {
    category: 'Toilettes',
    name: 'Toilettes Publiques',
    coordinates: [46.64904, -0.25074],
  },
  {
    category: 'Toilettes',
    name: 'Toilettes Publiques',
    coordinates: [46.646255, -0.24848],
  },
  {
    category: 'Toilettes',
    name: 'Toilettes Publiques',
    coordinates: [46.6502, -0.2473],
  },
  {
    category: 'Toilettes',
    name: 'Toilettes Publiques',
    coordinates: [46.64585, -0.25125],
  },
  {
    category: 'Parking',
    name: 'Parking',
    coordinates: [46.645455, -0.25183],
  },
  {
    category: 'Tournois',
    name: 'Tournoi de Gobbit',
    coordinates: [46.647861, -0.247102],
  },
  {
    category: 'Tournois',
    name: 'Tournoi de Basketball',
    coordinates: [46.651968, -0.252591],
  },
  {
    category: 'Stand de jeux',
    name: 'Black Rock',
    coordinates: [46.647235, -0.24759],
  },
  {
    category: 'Restauration',
    name: 'Mie Caline',
    coordinates: [46.647987, -0.247901],
  },
];
