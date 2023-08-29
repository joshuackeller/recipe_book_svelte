<script lang="ts">
	import HomePage from '../primary/pages/HomePage.svelte';
	import { token } from '../primary/stores/token';
</script>

<HomePage />
<button
	on:click={() => {
		token.set(undefined);
	}}>sign out</button
>
