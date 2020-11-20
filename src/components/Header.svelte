<script lang="ts">
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";

  import Login from "./Login.svelte";
  import Settings from "./Settings.svelte";
  import CollectionPicker from "./CollectionPicker.svelte";

  import { user } from "../stores/user";
  import { selectedCollection } from "../stores/collection";
  import BurgerMenu from "./BurgerMenu.svelte";

  const { open } = getContext("simple-modal");
  let width = 0;
  let isExpanded = false;
  $: $user && !$selectedCollection.name && openCollectionPicker();

  const toggleExpand = () => (isExpanded = !isExpanded);
  const openCollectionPicker = () => open(CollectionPicker);
  const openSettings = () => open(Settings);
</script>

<nav
  bind:clientWidth={width}
  class="flex items-center justify-between flex-wrap bg-red-900 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6 z-10">
    <button on:click={openCollectionPicker} class="border-transparent">
      <span class="font-semibold text-xl tracking-tight">
        {($user && $selectedCollection.name) || 'Brætspilsministeriet'}
      </span>
    </button>
  </div>
  <BurgerMenu open={isExpanded} on:toggle={toggleExpand} />
  {#if isExpanded || width >= 768}
    <div
      transition:fly={{ x: -100, duration: 500 }}
      class="item-list absolute h-screen bg-red-900 top-0 left-0 w-40 pt-20 md:relative md:h-auto md:flex md:justify-items-end md:pt-0 md:w-auto">
      {#if $user}
        <button
          on:click={openSettings}
          class="item-list pl-6 py-3 md:flex md:mx-2 text-white focus:outline-none">
          Indstillinger
        </button>
      {/if}
      <div class=" md:flex md:mx-2 pl-6 py-3">
        <Login />
      </div>
    </div>
  {/if}
</nav>
