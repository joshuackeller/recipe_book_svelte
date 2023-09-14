<script lang="ts">
	export let error: any;
</script>

{#if error?.response?.data?.error ?? error?.response?.data?.message}
	<div class="text-red-500 text-sm my-2">
		{error?.response?.data?.error ?? error?.response?.data?.message ?? 'Unkown Error'}
	</div>
{/if}
