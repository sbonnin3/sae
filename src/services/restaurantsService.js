import { restaurants } from "../datasource/data.js";

export function getAllRestaurant() {
    return { error: 0, data: restaurants };
}