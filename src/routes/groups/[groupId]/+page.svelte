<script>
	import SingleGroupPage from '$lib/pages/groups/SingleGroupPage.svelte';

	export let data;
	const { groupId } = data;
</script>

<SingleGroupPage {groupId} />
