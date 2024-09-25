// Assure-toi que le service est bien défini
import { tournois } from '../datasource/data.js'; 

export function getAllTournois() {
  return { error: 0, data: tournois };
}
