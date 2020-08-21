import { writable } from "svelte/store";
import type { User } from "firebase";

function createUserStore() {
  const { subscribe, set } = writable<User | undefined>(null);

  return {
    subscribe,
    login: (user: User) => set(user),
    logout: () => set(null),
  };
}

export const user = createUserStore();
