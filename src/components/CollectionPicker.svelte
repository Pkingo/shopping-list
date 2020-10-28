<script lang="ts">
  import { getContext } from "svelte";
  import { selectedCollection } from "../stores/collection";
  import { getCollections, addCollection } from "../utils/db/collection";

  const { close } = getContext("simple-modal");
  let newCollectionName;

  const onSubmit = e => {
    e.preventDefault();
    addCollection(newCollectionName)
      .then(() =>
        $observableCollections.find(
          collection => collection.name === newCollectionName,
        ),
      )
      .then(selectedCollection.select)
      .then(close);
  };
  const observableCollections = getCollections();

  const onSelect = collection => {
    selectedCollection.select(collection);
    close();
  };
</script>

<p class="text-3xl p-2">Vælg husstand</p>
{#if !$observableCollections}
  loading...
{:else}
  {#each $observableCollections as collection}
    <p
      class="cursor-pointer hover:bg-gray-500 p-2 rounded"
      on:click={() => onSelect(collection)}>
      {collection.name}
    </p>
  {/each}
  <form
    class="flex flex-col border-red-900 border-t-2 pt-4 mt-4"
    on:submit={onSubmit}>
    <label for="husstand"> Ny husstand: </label>
    <input
      placeholder="Husstand..."
      id="husstand"
      class="px-2 border-2 rounded mt-2 mb-4"
      bind:value={newCollectionName} />
    <div class="flex justify-end">
      <button
        class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white px-4 border border-green-500 hover:border-transparent rounded"
        type="submit">Opret</button>
    </div>
  </form>
{/if}
