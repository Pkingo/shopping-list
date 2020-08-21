<script lang="ts">
  import { onMount } from 'svelte';
  import Modal from './Modal.svelte';
  import { selectedCollection } from '../stores/collection';
  import type { ICollection } from '../types/Collection';
  import { collectionData } from "rxfire/firestore";
  import { db } from '../config/firebase';

  let modal;
  const query = db.collection("collection");
  const observableCollections = collectionData<ICollection>(query, "id");

  onMount(() => {
    if (!$selectedCollection) {
      modal.open()
    }
  });
</script>

<button on:click={modal.open} class="bg-white rounded w-32 border-transparent">
  {$selectedCollection?.name || ''}
</button>
<Modal bind:this={modal}>
  <p class="text-3xl p-2">Vælg et hus</p>
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