<script lang="ts">
  import Login from './Login.svelte';
  import CollectionPicker from './CollectionPicker.svelte';
  let isExpanded = false;
	const toggleExpand = () => isExpanded = !isExpanded
</script>

<nav class="flex items-center justify-between flex-wrap bg-red-900 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <a href="/">
      <span class="font-semibold text-xl tracking-tight">Brætspilsministeriet</span>
    </a>
  </div>
  <div class="block md:hidden">
    <button on:click={toggleExpand} class="flex items-center px-3 py-2 border rounded text-red-500 border-red-700 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="pt-4 md:pt-0 w-full block flex-grow md:flex md:items-center md:w-auto md:justify-end {isExpanded ? '': 'hidden'}">
    <div class="text-sm md:flex md:mx-2">
      <CollectionPicker />
    </div>
    <div class="text-sm md:flex md:mx-2">
      <Login />
    </div>
  </div>
</nav>