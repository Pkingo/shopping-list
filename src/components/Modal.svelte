<script lang="ts">
  import Icon from "svelte-awesome";
  import { close as closeIcon } from "svelte-awesome/icons";
  let isOpen: boolean;
  export const open = () => isOpen = true;
  export const close = () => isOpen = false;

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      close();
    }
  }

</script>


<svelte:window on:keydown={onKeyDown}/>
{#if isOpen}
<div class="absolute top-0 left-0 flex justify-center items-center z-10">
  <div class="bg-gray-400 opacity-50 w-screen h-screen" />
  <div class="absolute bg-white rounded p-2">
    <div class="float-right cursor-pointer" on:click={close}>
      <Icon data={closeIcon} />
    </div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</div>
{/if}