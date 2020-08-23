<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let title: string;
  export let isOpen: boolean;

  const dispatch = createEventDispatcher();
  const toggle = () => {
    dispatch('toggle')
  };
</script>

<article class="border-l-2 bg-grey-lightest w-auto {isOpen ? 'border-red-900' : 'border-indigo'}">
    <header on:click={toggle} class="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">
        <span class="text-indigo font-thin text-xl">
            {title}
        </span>
        <div class="rounded-full border border border-indigo w-7 h-7 flex items-center justify-center bg-indigo transform {isOpen ? 'rotate-180' : ''}">
            <!-- icon by feathericons.com -->
            <svg aria-hidden="true" class="" data-reactid="266" fill="none" height="24" stroke="#606F7B" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <polyline points="6 9 12 15 18 9">
              </polyline>
          </svg>
        </div>
    </header>
      {#if isOpen}
      <div class="p-4">
        <slot></slot>
      </div>
      {/if}
  </article>