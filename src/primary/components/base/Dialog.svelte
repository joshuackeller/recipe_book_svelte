<script lang="ts">
	import { Dialog, DialogOverlay } from '@rgossiaux/svelte-headlessui';
	import clsx from '../../utilities/clsx';
	export let isOpen: boolean = false;
	export let classes: string = '';
</script>

<Dialog
	open={isOpen}
	on:close={() => (isOpen = false)}
	class="absolute top-0 right-0 left-0 bottom-0"
>
	<DialogOverlay class="absolute top-0 right-0 left-0 bottom-0 bg-black/50 z-10" />

	<div
		class={clsx(
			'p-5 bg-white border-2 border-black rounded-xl z-20 max-w-lg m-5 absolute right-1/2 translate-x-1/2',
			classes
		)}
	>
		<slot />
	</div>
</Dialog>
