<script lang="ts">
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-awesome";
  import { check, trash, times } from "svelte-awesome/icons";
  import { removeItem, updateName, updateStatus } from "../utils/db/shopping";
  import type { IShoppingItem } from "../types/ShoppingItem";

  export let item: IShoppingItem;
  let editedText = item.name;
  let isEditing = false;

  const remove = () => removeItem(item.id);
  const onSubmit = event => {
    event.preventDefault();
    updateName(editedText, item.id);
    isEditing = false;
  };
  const toggleStatus = () => updateStatus(!item.isBought, item.id);
  const handleKeydown = event => {
    if (event.key === "Escape") isEditing = false;
  };
</script>

<tr class="flex justify-end font-bold" in:fade out:fade>
  {#if isEditing}
    <td class="mr-auto">
      <form on:submit={e => onSubmit(e)}>
        <input type="text" bind:value={editedText} on:keydown={handleKeydown} />
      </form>
    </td>
  {:else}
    <td
      class={`mr-auto cursor-pointer text-left ${item.isBought ? 'line-through text-green-700' : ''}`}
      on:click={() => (isEditing = true)}>
      {item.name}
    </td>
    <td class="px-4" on:click={toggleStatus}>
      {#if item.isBought}
        <Icon data={times} />
      {:else}
        <Icon data={check} />
      {/if}
    </td>
  {/if}
  <td class="px-4" on:click={remove}>
    <Icon data={trash} />
  </td>
</tr>
