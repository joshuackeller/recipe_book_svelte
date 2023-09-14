<script lang="ts">
	import clsx from '../../../utilities/clsx';

	export let onClick: () => any;
	export let active: boolean | undefined = undefined;
	export let classes: string = '';
	export let disabled: boolean | undefined = undefined;
</script>

<button
	on:click={onClick}
	class={clsx(
		'p-1 border-2 rounded-lg m-0.5',
		classes,
		active ? 'border-black text-black' : 'border-black/60 text-black/60'
	)}
	{disabled}
>
	<slot />
</button>
