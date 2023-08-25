<script lang="ts">
	import { token } from '../../stores/token';
	import Loader from '../base/Loader.svelte';
	import AuthFlow from './AuthFlow.svelte';

	let tokenValue: string;

	token.subscribe((value) => {
		if (!!value) tokenValue = value;
	});
</script>

<div>
	{#if !tokenValue}
		<Loader />
	{:else if !!tokenValue && tokenValue != 'undefined' && tokenValue != 'null'}
		<slot />
	{:else}
		<AuthFlow />
	{/if}
</div>
