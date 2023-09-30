<script lang="ts">
	import BackButton from '$lib/components/base/BackButton.svelte';
	import Loader from '$lib/components/base/Loader.svelte';
	import useGetGroup from '$lib/context/queries/groups/useGetGroup';

	export let groupId: string;

	const groupQuery = useGetGroup(groupId);
</script>

<BackButton />
{#if $groupQuery.isLoading}
	<Loader />
{:else}
	<div>
		<h2>{$groupQuery.data?.name}</h2>
	</div>
{/if}
