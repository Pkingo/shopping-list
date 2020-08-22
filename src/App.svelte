<script lang="ts">
	import { onMount } from 'svelte';
	import LandingPage from './routes/landing.svelte'
	import Header from './components/Header.svelte';
	import { user } from './stores/user';
	import { checkIsLoggedIn } from './config/firebase';
	import ShoppingList from './routes/ShoppingList.svelte';
	import Icon from "svelte-awesome";
	import { spinner } from "svelte-awesome/icons";
	let isLoading = false;

	onMount(() => {
		isLoading = true;
		checkIsLoggedIn().then(user.login).catch(user.logout).finally(() => {
			console.log("finally")
			isLoading = false;
		});
	})
</script>

<main class="bg-gray-300 h-screen">
	<Header />
	<div class="p-4">
		{#if isLoading}
			<Icon data={spinner} pulse scale="2" />
		{:else if $user}
			<ShoppingList />
		{:else}
			<LandingPage />
		{/if}
	</div>
</main>
