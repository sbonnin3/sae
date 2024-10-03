import { boissons } from "../datasource/data.js";

export function getAllBoissons() {
    return { error: 0, data: boissons };
}