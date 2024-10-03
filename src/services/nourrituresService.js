import { nourritures } from "../datasource/data.js";

export function getAllNourritures() {
    return { error: 0, data: nourritures };
}