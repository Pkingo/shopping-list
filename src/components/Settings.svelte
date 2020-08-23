<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Modal from './Modal.svelte';
  import Accordion from './Accordion.svelte';
  import { selectedCollection } from '../stores/collection';
  import { updateCollectionName, deleteCollection } from '../utils/db/collection'

  let modal;
  let name: string;
  let isRenameOpen = false;
  let isDeleteOpen = false;
  const dispatch = createEventDispatcher();

  const onOpen = () => {
    name = $selectedCollection.name || '';
    modal.open();
  }

  const onClose = () => {
    modal.close();
    isDeleteOpen = false;
    isRenameOpen = false;
    dispatch('close');
  }

  const onNewNameSubmit = (e) => {
    e.preventDefault();
    updateCollectionName(name, $selectedCollection.id);
    selectedCollection.select({
      name,
      id: $selectedCollection.id,
    })
    onClose();
  }
  const onDeleteSubmit = (e) => {
    e.preventDefault();
    deleteCollection($selectedCollection.id);
    onClose();
  }
  const onRenameToggle = () => {
    isDeleteOpen = false;
    isRenameOpen = !isRenameOpen;
  }
  const onDeleteToggle = () => {
    isRenameOpen = false;
    isDeleteOpen = !isDeleteOpen;
  }
</script>

<p on:click={onOpen} class="text-white cursor-pointer">Indstillinger</p>

<Modal bind:this={modal} on:close={onClose}>
  <Accordion isOpen={isRenameOpen} on:toggle={onRenameToggle} title="Husstandsnavn">
    <form class="flex flex-col" on:submit={onNewNameSubmit}>
      <label for="husstand">
        Husstand:
      </label>
      <input id="husstand" class="px-2 border-2 rounded mt-2 mb-4" bind:value={name} />
      <div class="flex justify-end">
        <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white px-4 border border-green-500 hover:border-transparent rounded" type='submit'>Omdøb</button>
      </div>
    </form>
  </Accordion>
  <Accordion isOpen={isDeleteOpen} on:toggle={onDeleteToggle} title="Slet husstand">
    <form class="flex flex-col" on:submit={onDeleteSubmit}>
      <div class="flex justify-end">
        <button class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded" type='submit'>Slet</button>
      </div>
    </form>
  </Accordion>

</Modal>