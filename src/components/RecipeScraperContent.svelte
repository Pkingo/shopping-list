<script lang="ts">
  import Button from "./Button.svelte";
  import { addBatch } from "../utils/db/shopping";
  import { getContext } from "svelte";
  import { selectedCollection } from "../stores/collection";

  const { close } = getContext("simple-modal");
  let url = "";
  let ingredients = [];
  let selectedIngredients = [];
  let state = "idle";

  const handleScraperSubmit = event => {
    event.preventDefault();
    state = "loading";
    fetch("/.netlify/functions/scraper", {
      method: "POST",
      body: JSON.stringify({ url }),
    })
      .then(async resp => {
        const data = await resp.json();
        ingredients = data.ingredients;
        selectedIngredients = ingredients;
        state = "success";
      })
      .catch(() => (state = "error"));
  };
  const handleSelectionSubmit = event => {
    event.preventDefault();
    console.log({ selectedIngredients });
  };
  const onCancel = () => {
    state = "idle";
    ingredients = [];
  };
  const onAdd = () => {
    state = "idle";
    close();
    url = "";
    addBatch(selectedIngredients, $selectedCollection.id || "");
  };
</script>

<h2 class="text-indigo font-thin text-xl border-red-900 border-b-2 mb-2">
  Valdemarsro.dk
</h2>

{#if state !== 'success'}
  <form class="flex justify-start" on:submit={handleScraperSubmit}>
    <input
      class="mr-4 px-2 rounded w-full"
      placeholder="Tilføj indkøb"
      bind:value={url} />
    <Button loading={state === 'loading'} type="submit">Tilføj</Button>
  </form>
  {#if state === 'error'}
    <p>Fejl. Prøv igen</p>
  {/if}
{:else}
  <form on:submit={handleSelectionSubmit} class="flex flex-col items-start">
    {#each ingredients as ingredient}
      <label class="inline-flex items-center mt-1">
        <input
          bind:group={selectedIngredients}
          value={ingredient}
          type="checkbox"
          class="form-checkbox h-3 w-3 text-orange-600" /><span
          class="ml-2 text-gray-700">{ingredient}</span>
      </label>
    {/each}
    <div class="mt-4 flex w-full justify-end">
      <Button variant="negative" on:click={onCancel}>Annuller</Button>
      <Button classes="ml-2" on:click={onAdd}>Tilføj</Button>
    </div>
  </form>
{/if}
