<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	export let value: string | number;
	export let name: string;
	export let label: string | undefined = undefined;
	export let type: HTMLInputTypeAttribute = 'text';
	export let placeholder: string | undefined = undefined;

	const inputAttributes = { type };
</script>

<div>
	{#if !!label}
		<label for={name} class="text-xs text-gray-600">{label}</label>
	{/if}
	<input
		{name}
		bind:value
		{...inputAttributes}
		{placeholder}
		class="w-full rounded-lg border-2 border-black p-1"
	/>
</div>
