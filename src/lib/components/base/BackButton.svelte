<script lang="ts">
	import { goto } from '$app/navigation';

	export let href: string | undefined = undefined;

	function goBack() {
		if (href) {
			goto(href);
		} else if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/recipes');
		}
	}
</script>

<button on:click={goBack} class="flex items-center gap-2 text-sm">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-4 h-4"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
	</svg>
	Back
</button>
