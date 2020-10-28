<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-awesome";
  import { close as closeIcon } from "svelte-awesome/icons";
  const dispatch = createEventDispatcher();
  let isOpen: boolean;
  export const open = () => (isOpen = true);
  export const close = () => {
    isOpen = false;
    dispatch("close");
  };

  const onKeyDown = e => {
    if (e.key === "Escape") {
      close();
    }
  };
</script>

{#if isOpen}
  <div
    on:keydown={onKeyDown}
    class="absolute top-0 left-0 flex justify-center items-center z-10">
    <div class="bg-gray-400 opacity-50 w-screen h-screen" />
    <div class="absolute w-screen md:w-2/3">
      <div class="bg-white rounded p-2 mx-4 md:mx-0">
        <div class="float-right cursor-pointer text-black" on:click={close}>
          <Icon data={closeIcon} />
        </div>
        <div class="p-4 text-black">
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}
