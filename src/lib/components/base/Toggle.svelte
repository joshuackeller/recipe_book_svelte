<script lang="ts">
	import clsx from '$lib/utilities/clsx';
	import { Switch } from '@rgossiaux/svelte-headlessui';

	export let value: boolean;
	export let label: string | undefined = undefined;
</script>

<div>
	{#if !!label}
		<p class="text-xs text-gray-600">{label}</p>
	{/if}
	<Switch
		bind:checked={value}
		class={clsx('transition', value ? 'switch bg-black ' : 'switch switch-disabled bg-gray-200')}
	>
		<span class="sr-only">Enable notifications</span>
		<span class={clsx('toggle transition', value ? 'translate-x-[23px]' : 'translate-x-[3px]')} />
	</Switch>
</div>

<style>
	:global(.switch) {
		position: relative;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		height: 1.5rem;
		width: 2.75rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-width: 0;
	}

	.toggle {
		display: inline-block;
		width: 1.2rem;
		height: 1.2rem;
		background-color: rgb(255 255 255);
		border-radius: 9999px;
	}
</style>
