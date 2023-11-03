<script lang="ts">
	import clsx from '../../utilities/clsx';
	import CheckCircleIcon from '../icons/CheckCircleIcon.svelte';
	import SunIcon from '../icons/SunIcon.svelte';

	export let text: string | undefined = undefined;
	export let onClick: ((e: MouseEvent) => any) | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' | undefined = undefined;
	export let isLoading: boolean = false;
	export let isSuccess: boolean = false;
	export let successText: string | undefined = undefined;
	export let disabled: boolean = false;
	export let classes: string = '';
</script>

<button
	{type}
	on:click={onClick}
	disabled={disabled || isLoading}
	class={clsx(
		'px-8 py-2 bg-black rounded-lg text-white hover:bg-black/80 whitespace-nowrap disabled:cursor-default disabled:bg-opacity-80 ',
		classes
	)}
>
	{#if isLoading}
		<SunIcon classes="h-6 w-6 animate-spin mx-auto" />
	{:else if isSuccess}
		<div class="flex justify-center items-center gap-2">
			{#if successText}
				<div>{successText}</div>
			{/if}
			<CheckCircleIcon classes="text-white h-5 w-5" />
		</div>
	{:else if !!text}
		{text}
	{:else}
		<slot />
	{/if}
</button>
