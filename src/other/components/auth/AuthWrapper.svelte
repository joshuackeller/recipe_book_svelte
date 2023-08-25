<script lang="ts">
	import { token } from '../../stores/token';
	import Loader from '../base/Loader.svelte';
	import AuthFlow from './AuthFlow.svelte';
</script>

<div>
	{#if !$token}
		<Loader />
	{:else if !!$token && $token != 'undefined'}
		<slot />
	{:else}
		<AuthFlow />
	{/if}
</div>
