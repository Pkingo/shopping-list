<script lang="ts">
  import { user } from '../stores/user';
  import { collectionData } from "rxfire/firestore";
  import { fade } from "svelte/transition";
  import Icon from "svelte-awesome";
  import { spinner } from "svelte-awesome/icons";
  import { db } from '../config/firebase';
  import type { IShoppingItem } from '../types/ShoppingItem';
  import ShoppingItem from '../components/ShoppingItem.svelte';
  import { addItem, getItems } from '../utils/db/shopping';
  import { selectedCollection } from '../stores/collection';
  import type { Observable } from 'rxjs';
  
  let shoppingItems: Observable<IShoppingItem[]>;
  $: shoppingItems = getItems($selectedCollection.name || '');

  let text = "";

  function handleSubmit(event) {
    event.preventDefault();
    addItem(text, $selectedCollection.name || '');
    text = "";
  }
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
  <form class="flex justify-start md:mx-20 border-red-900 border-t-2 pt-4 mt-4" on:submit={handleSubmit}>
    <input class="mr-4 px-2 rounded" placeholder="Tilføj indkøb" bind:value={text} />
    <button class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white px-4 border border-green-500 hover:border-transparent rounded" type="submit">Tilføj</button>
  </form>
{/if}

