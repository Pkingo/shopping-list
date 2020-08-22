<script lang="ts">
  import Modal from './Modal.svelte';
  import { selectedCollection } from '../stores/collection';
  import { updateCollectionName } from '../utils/db/collection'

  let modal;
  let name: string;

  const onOpen = () => {
    name = $selectedCollection.name || '';
    modal.open();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    updateCollectionName(name, $selectedCollection.id);
    selectedCollection.select({
      name,
      id: $selectedCollection.id,
    })
    modal.close();
  }
</script>

<p on:click={onOpen} class="text-white cursor-pointer">Indstillinger</p>

<Modal bind:this={modal}>
  <form class="flex flex-col" on:submit={onSubmit}>
    <label for="husstand">
      Husstand:
    </label>
    <input id="husstand" class="px-2 border-2 rounded mt-2 mb-4" bind:value={name} />
    <div class="flex justify-end">
      <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white px-4 border border-green-500 hover:border-transparent rounded" type='submit'>Omdøb</button>
    </div>
  </form>

</Modal>