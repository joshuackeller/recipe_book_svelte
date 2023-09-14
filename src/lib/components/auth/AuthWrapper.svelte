<script lang="ts">
	import { onMount } from 'svelte';
	import { token } from '../../stores/token';
	import Loader from '../base/Loader.svelte';
	import AuthFlow from './AuthFlow.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const routesWithoutAuth = ['/'];

	let isLoading: boolean = true;

	onMount(() => {
		isLoading = false;

		const checkAuthFlowParam = $page.url.searchParams.get('authFlow');
		if (!!$token && !!checkAuthFlowParam) {
			goto(`${$page.url.pathname}`);
		}
	});
</script>

<div>
	{#if isLoading}
		<Loader />
	{:else if routesWithoutAuth.includes($page.url.pathname) || (!!$token && $token !== 'undefined' && $token !== 'null' && $token !== null && $token !== undefined)}
		<slot />
	{:else if !$token}
		<AuthFlow />
	{/if}
</div>
