import { writable } from "svelte/store";
import type { ICollection } from "../types/Collection";
import { getSelectedCollection, storeSelectedCollection } from "../utils/store";

const initialCollection = getSelectedCollection();

function createSelectedCollection() {
  const { subscribe, set } = writable<ICollection>(
    initialCollection || ({} as ICollection)
  );

  return {
    subscribe,
    select: (collection: ICollection) => {
      storeSelectedCollection(collection);
      set(collection);
    },
  };
}

export const selectedCollection = createSelectedCollection();
