<script lang="ts">
	import clsx from '../../utilities/clsx';
	import SunIcon from '../icons/SunIcon.svelte';

	export let text: string | undefined = undefined;
	export let onClick: ((e: MouseEvent) => any) | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' | undefined = undefined;
	export let href: string | undefined = undefined;
	export let isLoading: boolean = false;
	export let disabled: boolean = false;
	export let classes: string = '';
</script>

<div>
	<a {href}>
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
			{:else if !!text}
				{text}
			{:else}
				<slot />
			{/if}
		</button>
	</a>
</div>
