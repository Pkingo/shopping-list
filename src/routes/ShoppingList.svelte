<script lang="ts">
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import Icon from "svelte-awesome";
  import { spinner } from "svelte-awesome/icons";
  import type { Observable } from "rxjs";

  import ShoppingItem from "../components/ShoppingItem.svelte";
  import RecipeScraperContent from "../components/RecipeScraperContent.svelte";
  import Button from "../components/Button.svelte";
  import { addItem, getItems } from "../utils/db/shopping";
  import { selectedCollection } from "../stores/collection";
  import type { IShoppingItem } from "../types/ShoppingItem";
  import Jokes from "../components/Jokes.svelte";

  const { open } = getContext("simple-modal");
  let shoppingItems: Observable<IShoppingItem[]>;
  let text = "";

  $: shoppingItems = getItems($selectedCollection.id || "");

  function handleSubmit(event) {
    event.preventDefault();
    if (!text) return;
    addItem(text, $selectedCollection.id || "");
    text = "";
  }
  const showRecipeScraper = () => {
    open(RecipeScraperContent);
  };
</script>

{#if !$shoppingItems}
  <div in:fade out:fade class="icon-wrapper">
    <Icon data={spinner} pulse scale="2" />
  </div>
{:else}
  <table class="md:mx-20 block">
    {#each $shoppingItems as shoppingItem}
      <ShoppingItem item={shoppingItem} />
    {/each}
  </table>
  <form
    class="flex gap-4 md:mx-20 border-red-900 border-t-2 mt-4 pt-4 flex-wrap justify-between"
    on:submit={handleSubmit}>
    <input
      class="px-2 rounded w-4/6 md:w-auto"
      placeholder="Tilføj indkøb"
      bind:value={text} />
    <Button classes="w-1/5 md:w-auto" type="submit">Tilføj</Button>
    <Button classes="ml-auto w-full md:w-auto" on:click={showRecipeScraper}>
      Tilføj fra opskrift
    </Button>
  </form>
{/if}
<Jokes />
