<script lang="ts">
	import { onMount } from 'svelte';
	import { token } from '../../stores/token';
	import Loader from '../base/Loader.svelte';
	import AuthFlow from './AuthFlow.svelte';

	let isLoading: boolean = true;
	let tokenValue: string | null | undefined;

	onMount(() => {
		tokenValue = $token;
		isLoading = false;
	});
</script>

<div>
	{#if isLoading}
		<Loader />
	{:else if !$token}
		<AuthFlow />
	{:else if !!$token && $token !== 'undefined' && $token !== 'null' && $token !== null && $token !== undefined}
		<slot />
	{/if}
</div>
