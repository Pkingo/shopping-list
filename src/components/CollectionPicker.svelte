<script lang="ts">
  import Modal from './Modal.svelte';
  import { selectedCollection } from '../stores/collection';
  import { user } from '../stores/user';
  import type { ICollection } from '../types/Collection';
  import { collectionData } from "rxfire/firestore";
  import { db } from '../config/firebase';
  import { getCollections } from '../utils/db/collection';

  let modal;

  const observableCollections = getCollections();
  $: $user, selectedCollection, $user && !$selectedCollection.name && modal.open();
</script>

<button on:click={modal.open} class="border-transparent">
  <span  class="font-semibold text-xl tracking-tight">
    {$user && $selectedCollection.name || 'Brætspilsministeriet'}
  </span>
</button>

<Modal bind:this={modal}>
  <p class="text-3xl p-2">Vælg husstand</p>
  {#if !$observableCollections}
    loading...
  {:else}
    {#each $observableCollections as collection}
      <p
        class="cursor-pointer hover:bg-gray-500 p-2 rounded"
        on:click={() => {
          selectedCollection.select(collection);
          modal.close();
        }}
      >{collection.name}</p>
    {/each}
  {/if}
  </Modal>