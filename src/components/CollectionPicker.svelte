<script lang="ts">
  import Modal from './Modal.svelte';
  import { selectedCollection } from '../stores/collection';
  import { user } from '../stores/user';
  import type { ICollection } from '../types/Collection';
  import { getCollections, addCollection } from '../utils/db/collection';

  let modal;
  let newCollectionName

  const onSubmit = (e) => {
    e.preventDefault();
    addCollection(newCollectionName)
      .then(() => $observableCollections.find(collection => collection.name === newCollectionName))
      .then(selectedCollection.select)
      .then(modal.close);
  }
  const observableCollections = getCollections();
  const openModal = () => {
    newCollectionName = '';
    modal.open();
  }
  $: $user, selectedCollection, $user && !$selectedCollection.name && openModal();
</script>

<button on:click={openModal} class="border-transparent">
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
    <form class="flex flex-col border-red-900 border-t-2 pt-4 mt-4" on:submit={onSubmit}>
      <label for="husstand">
        Ny husstand:
      </label>
      <input placeholder="Husstand..." id="husstand" class="px-2 border-2 rounded mt-2 mb-4" bind:value={newCollectionName} />
      <div class="flex justify-end">
        <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white px-4 border border-green-500 hover:border-transparent rounded" type='submit'>Opret</button>
      </div>
    </form>
  {/if}
  </Modal>