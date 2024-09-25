import { tournois } from './data';

function getAllTournois() {
    return { error: 0, data: tournois }
}

export default {
    getAllTournois,
}