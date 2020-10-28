import { writable } from "svelte/store";
import type { ICollection } from "../types/Collection";
import { getSelectedCollection, storeSelectedCollection } from "../utils/store";

const initialCollection = getSelectedCollection();

function createSelectedCollection() {
  const { subscribe, set } = writable<ICollection>(
    initialCollection || { id: "", name: "" },
  );

  return {
    subscribe,
    select: (collection: ICollection) => {
      storeSelectedCollection(collection);
      set(collection);
    },
    validate: (collections: ICollection[]) => {
      const { id } = getSelectedCollection();
      if (id) {
        set(
          collections.find(collection => collection.id === id) || {
            id: "",
            name: "",
          },
        );
      }
    },
  };
}

export const selectedCollection = createSelectedCollection();
