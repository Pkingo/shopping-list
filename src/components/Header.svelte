<script lang="ts">
  import { getContext, onMount } from "svelte";

  import Login from "./Login.svelte";
  import Settings from "./Settings.svelte";
  import CollectionPicker from "./CollectionPicker.svelte";

  import { user } from "../stores/user";
  import { selectedCollection } from "../stores/collection";

  const { open } = getContext("simple-modal");
  let isExpanded = false;
  $: $user && !$selectedCollection.name && openCollectionPicker();

  const toggleExpand = () => (isExpanded = !isExpanded);
  const openCollectionPicker = () => open(CollectionPicker);
  const openSettings = () => open(Settings);
</script>

<nav class="flex items-center justify-between flex-wrap bg-red-900 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <button on:click={openCollectionPicker} class="border-transparent">
      <span class="font-semibold text-xl tracking-tight">
        {($user && $selectedCollection.name) || 'Brætspilsministeriet'}
      </span>
    </button>
  </div>
  <div class="block md:hidden">
    <button
      on:click={toggleExpand}
      class="flex items-center px-3 py-2 border rounded text-white-500 border-white-700 hover:text-white hover:border-white">
      <svg
        class="fill-current h-3 w-3 text-white"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
    </button>
  </div>
  <div
    class="pt-4 md:pt-0 w-full block flex-grow md:flex md:items-center md:w-auto md:justify-end {isExpanded ? '' : 'hidden'}">
    {#if $user}
      <div class="pb-2 md:pb-0 text-sm md:flex md:mx-2">
        <p on:click={openSettings} class="text-white cursor-pointer">
          Indstillinger
        </p>
      </div>
    {/if}
    <div class="text-sm md:flex md:mx-2">
      <Login />
    </div>
  </div>
</nav>
