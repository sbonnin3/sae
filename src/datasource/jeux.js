export const jeux = [
    {
        _id: '01',
        type: 'Rapidité',
        name: 'Gobbit',
        image: require('@/assets/images/jeu_gobbit.png'),
        nombre_de_joueurs: [3, 4, 5, 6, 7, 8],
        age_minimum: 8,
        duree: 15,
        editeur: "Black Rock",
        nom_stand: "Stand1",
        prix: "15",
    },
    {
        _id: '02',
        type: 'Stratégie',
        name: 'Voldétour',
        image: require('@/assets/images/jeu_voldetour.png'),
        nombre_de_joueurs: [2, 4],
        age_minimum: 7,
        duree: 30,
        editeur: "Black Rock",
        nom_stand: "Stand2",
        prix: "30",
    },
    {
        _id: '03',
        type: 'Réflexion',
        name: 'Oyez Oyez',
        image: require('@/assets/images/jeu_oyezoyez.png'),
        nombre_de_joueurs: [2, 3, 4, 5, 6, 7, 8],
        age_minimum: 7,
        duree: 10,
        editeur: "Subverti",
        nom_stand: "Stand3",
        prix: "10",
    },
];