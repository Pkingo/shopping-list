import type { ICollection } from "../types/Collection";

const COLLECTION_KEY = "COLLECTION_KET";

export function storeSelectedCollection(collection: ICollection) {
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

export function getSelectedCollection(): ICollection {
  return JSON.parse(localStorage.getItem(COLLECTION_KEY));
}
