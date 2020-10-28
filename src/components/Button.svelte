<script lang="ts">
  import Icon from "svelte-awesome";
  export let type = "button";
  export let classes = "";
  export let loading = false;
  export let variant: TVariant = "positive";
  import { spinner } from "svelte-awesome/icons";

  type TVariant = "positive" | "negative" | "neutral";

  const colors = {
    positive: "green",
    negative: "red",
    neutral: "white",
  };
  $: color = colors[variant];
</script>

<button
  disabled={loading}
  on:click
  {type}
  class={`bg-transparent hover:bg-${color}-500 text-${color}-700 font-semibold hover:text-white px-4 border border-${color}-500 hover:border-transparent rounded ${classes}`}>
  <slot />
  {#if loading}
    <Icon data={spinner} pulse scale="1" />
  {/if}
</button>
