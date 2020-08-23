<script lang="ts">
	import { onMount } from 'svelte';
	import LandingPage from './routes/landing.svelte'
	import Header from './components/Header.svelte';
	import { user } from './stores/user';
	import { checkIsLoggedIn } from './config/firebase';
	import ShoppingList from './routes/ShoppingList.svelte';
	import Icon from "svelte-awesome";
	import { spinner } from "svelte-awesome/icons";
	import { getCollections } from './utils/db/collection';
import { selectedCollection } from './stores/collection';

	let isLoading = true;

	onMount(() => {
		checkIsLoggedIn().then(user.login).catch(user.logout).finally(() => {
			isLoading = false;
			getCollections().forEach(selectedCollection.validate);
		});
	});
</script>

<main class="bg-gray-300 h-screen">
	<Header />
	<div class="p-4 text-center">
		{#if isLoading}
			<Icon data={spinner} pulse scale="2" />
		{:else if $user}
			<ShoppingList />
		{:else}
			<LandingPage />
		{/if}
	</div>
</main>
