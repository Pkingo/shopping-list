import { writable } from "svelte/store";
import type { ICollection } from "../types/Collection";
import { getCollection, storeCollection } from "../utils/store";

const initialCollection = getCollection();

function createSelectedCollection() {
  const { subscribe, set } = writable<ICollection | undefined>(
    initialCollection || undefined
  );

  return {
    subscribe,
    select: (collection: ICollection) => {
      storeCollection(collection);
      set(collection);
    },
  };
}

export const selectedCollection = createSelectedCollection();
