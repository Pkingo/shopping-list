<script lang="ts">
  import Button from "./Button.svelte";
  import { addBatch } from "../utils/db/shopping";
  import { getContext } from "svelte";
  import { selectedCollection } from "../stores/collection";

  const { close } = getContext("simple-modal");
  let url = "";
  let ingredients = [
    "250 g ris, kogt og afkølede fx jasmin eller basmati ris",
    "1 kyllingebryst, skåret i tern",
    "3 spsk olivenolie",
    "1 rødløg, finthakket",
    "2 fed hvidløg, finthakket",
    "1 spsk soja",
    "1 spsk kokossukker",
    "4 spsk fishsauce",
    "2 forårsløg, finthakket",
    "2 gulerod, skrællede og skåret i tynde strimler",
    "1 tomat, skåret i tynde både",
    "1 rød peberfrugt, skåret i strimler",
    "1 lime",
    "1 håndfuld cashewnødder",
    "1 håndfuld frisk koriander",
    "0,50 rød chili, finthakket",
  ];
  let selectedIngredients = [
    "250 g ris, kogt og afkølede fx jasmin eller basmati ris",
    "1 kyllingebryst, skåret i tern",
    "3 spsk olivenolie",
    "1 rødløg, finthakket",
    "2 fed hvidløg, finthakket",
    "1 spsk soja",
    "1 spsk kokossukker",
    "4 spsk fishsauce",
    "2 forårsløg, finthakket",
    "2 gulerod, skrællede og skåret i tynde strimler",
    "1 tomat, skåret i tynde både",
    "1 rød peberfrugt, skåret i strimler",
    "1 lime",
    "1 håndfuld cashewnødder",
    "1 håndfuld frisk koriander",
    "0,50 rød chili, finthakket",
  ];
  let state = "success";

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
    <div class="w-full">
      {#each ingredients as ingredient}
        <label class="inline-flex items-center mt-1 w-full">
          <input
            bind:group={selectedIngredients}
            value={ingredient}
            type="checkbox"
            class="form-checkbox h-3 w-auto text-orange-600" /><span
            class="ml-2 text-gray-700 truncate">{ingredient}</span>
        </label>
      {/each}
    </div>
    <div class="mt-4 flex w-full justify-end">
      <Button variant="negative" on:click={onCancel}>Annuller</Button>
      <Button classes="ml-2" on:click={onAdd}>Tilføj</Button>
    </div>
  </form>
{/if}
