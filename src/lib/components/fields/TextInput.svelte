<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import clsx from '../../utilities/clsx';
	export let value: string | number | undefined = undefined;
	export let name: string;
	export let label: string | undefined = undefined;
	export let type: HTMLInputTypeAttribute = 'text';
	export let placeholder: string | undefined = undefined;
	export let onInput: ((e: any) => void) | undefined = undefined;
	export let classes: string = '';
	export let onKeyDown: ((e: any) => void) | undefined = undefined;
	export let required: boolean = false;

	const inputAttributes = { type };
</script>

<div>
	{#if !!label}
		<label for={name} class="text-xs text-gray-600">{label}</label>
	{/if}
	<input
		{name}
		bind:value
		on:input={onInput}
		{...inputAttributes}
		{placeholder}
		class={clsx('w-full rounded-lg border-2 border-black p-1', classes)}
		on:keydown={onKeyDown}
		{required}
	/>
</div>
