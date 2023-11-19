<script lang="ts">
	import useGetInvitations from '$lib/context/queries/invitations/useGetInvitations';
	import PendingInvitationRow from '$lib/components/custom/PendingInvitationRow.svelte';

	const invitations = useGetInvitations();
</script>

{#if !!$invitations.data && $invitations?.data?.length > 0}
	<div>
		<h2>pending invitations</h2>
		<div class="my-2">
			<div class="grid grid-cols-2 border-b">
				<div class="text-sm">name</div>
			</div>
			{#each $invitations.data as invitation}
				<PendingInvitationRow {invitation} />
			{/each}
		</div>
	</div>
{/if}
