import type { ICollection } from "../types/Collection";

const COLLECTION_KEY = "COLLECTION_KET";

export function storeCollection(collection: ICollection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

export function getCollection(): ICollection {
  return JSON.parse(localStorage.getItem(COLLECTION_KEY));
}
