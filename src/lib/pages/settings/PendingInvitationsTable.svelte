<script lang="ts">
	import useGetInvitations from '$lib/context/queries/invitations/useGetInvitations';
	import Button from '$lib/components/base/Button.svelte';
	import useDeleteInvitation from '$lib/context/mutations/invitations/useDeleteInvitation';
	import useAcceptInvitation from '$lib/context/mutations/invitations/useAcceptInvitation';
	import PendingInvitationRow from './PendingInvitationRow.svelte';

	const invitations = useGetInvitations();

	const deleteInvitation = useDeleteInvitation();
	const acceptInvitation = useAcceptInvitation();
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
