<script lang="ts">
	import { Switch } from '@rgossiaux/svelte-headlessui';

	let enabled: boolean = false;
</script>

<Switch bind:checked={enabled} class={enabled ? 'switch switch-enabled' : 'switch switch-disabled'}>
	<span class="sr-only">Enable notifications</span>
	<span class="toggle" class:toggle-on={enabled} class:toggle-off={!enabled} />
</Switch>

<style>
	:global(.switch) {
		position: relative;
		display: inline-flex;
		align-items: center;
		border-radius: 9999px;
		height: 1.5rem;
		width: 2.75rem;
	}

	:global(.switch-enabled) {
		/* Blue */
		background-color: rgb(37 99 235);
	}

	:global(.switch-disabled) {
		/* Gray */
		background-color: rgb(229 231 235);
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
		width: 1rem;
		height: 1rem;
		background-color: rgb(255 255 255);
		border-radius: 9999px;
	}

	.toggle-on {
		transform: translateX(1.1rem);
	}

	.toggle-off {
		transform: translateX(-0.25rem);
	}
</style>
