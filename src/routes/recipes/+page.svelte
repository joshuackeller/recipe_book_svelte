<script lang="ts">
	import RecipesPage from '$lib/pages/recipes/RecipesPage.svelte';
	import { token } from '$lib/stores/token';
</script>

<RecipesPage />
<button
	on:click={() => {
		token.set(undefined);
	}}>sign out</button
>
