<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "svelte-awesome";
  import { refresh } from "svelte-awesome/icons";
  let joke = "";
  let isLoading = false;
  function updateJoke() {
    isLoading = true;
    fetch("https://icanhazdadjoke.com", {
      headers: { Accept: "application/json" },
    })
      .then(data => data.json())
      .then(data => (joke = data.joke))
      .finally(() => (isLoading = false));
  }
  onMount(updateJoke);
</script>

<p class="mt-10 mb-4">{joke}</p>
<span on:click={updateJoke}>
  <Icon spin={isLoading} scale={2} data={refresh} />
</span>
