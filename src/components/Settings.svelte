<script lang="ts">
  import { getContext } from "svelte";

  import Accordion from "./Accordion.svelte";

  import { selectedCollection } from "../stores/collection";
  import {
    updateCollectionName,
    deleteCollection,
  } from "../utils/db/collection";

  let name: string;
  let isRenameOpen = false;
  let isDeleteOpen = false;
  const { close } = getContext("simple-modal");
  $: name = $selectedCollection.name;

  const onClose = () => {
    close();
    isDeleteOpen = false;
    isRenameOpen = false;
  };

  const onNewNameSubmit = e => {
    e.preventDefault();
    onClose();
    if (name === $selectedCollection.name) return;
    updateCollectionName(name, $selectedCollection.id);
    selectedCollection.select({
      name,
      id: $selectedCollection.id,
    });
  };
  const onDeleteSubmit = e => {
    e.preventDefault();
    deleteCollection($selectedCollection.id);
  };
  const onRenameToggle = () => {
    isDeleteOpen = false;
    isRenameOpen = !isRenameOpen;
  };
  const onDeleteToggle = () => {
    isRenameOpen = false;
    isDeleteOpen = !isDeleteOpen;
  };
</script>

<Accordion
  isOpen={isRenameOpen}
  on:toggle={onRenameToggle}
  title="Husstandsnavn">
  <form class="flex flex-col" on:submit={onNewNameSubmit}>
    <label for="husstand"> Husstand: </label>
    <input
      id="husstand"
      class="px-2 border-2 rounded mt-2 mb-4"
      bind:value={name} />
    <div class="flex justify-end">
      <button
        class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white px-4 border border-green-500 hover:border-transparent rounded"
        type="submit">Omdøb</button>
    </div>
  </form>
</Accordion>
<Accordion
  isOpen={isDeleteOpen}
  on:toggle={onDeleteToggle}
  title="Slet husstand">
  <form class="flex flex-col" on:submit={onDeleteSubmit}>
    <div class="flex justify-end">
      <button
        class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white px-4 border border-red-500 hover:border-transparent rounded"
        type="submit">Slet</button>
    </div>
  </form>
</Accordion>
