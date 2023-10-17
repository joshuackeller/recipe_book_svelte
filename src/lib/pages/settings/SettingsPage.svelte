<script lang="ts">
	import BackButton from '$lib/components/base/BackButton.svelte';
	import useGetGroups from '$lib/context/queries/groups/useGetGroups';
	import Loader from '$lib/components/base/Loader.svelte';
	import { DateTime } from 'luxon';
	import useGetInvitations from '$lib/context/queries/invitations/useGetInvitations';
	import Button from '$lib/components/base/Button.svelte';
	import useDeleteInvitation from '$lib/context/mutations/invitations/useDeleteInvitation';
	import useAcceptInvitation from '$lib/context/mutations/invitations/useAcceptInvitation';
	import PendingInvitationsTable from './PendingInvitationsTable.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	const groupsQuery = useGetGroups();
	const invitations = useGetInvitations();

	const deleteInvitation = useDeleteInvitation();
	const acceptInvitation = useAcceptInvitation();
	// const acceptInvitation = useAcceptInvitation()
	// const handleDeleteInvitation = (invitationId: number) => {
	// 	$deleteInvitation.mutateAsync({ invitationId });
	// };
</script>

<div>
	<BackButton href="/recipes" />
	<PendingInvitationsTable />
	<div>
		<h2>my groups</h2>
		{#if $groupsQuery.isLoading}
			<Loader />
		{:else if !!$groupsQuery.data}
			<div class="my-2">
				<div class="grid grid-cols-2 border-b">
					<div class="text-sm">name</div>
					<div class="text-sm text-right">created</div>
				</div>
				{#each $groupsQuery.data as group}
					<a href={`/groups/${group.id}`} class="grid grid-cols-2 py-3 border-b">
						<div class="font-bold">
							{group.name}
						</div>
						<div class="text-right">
							{DateTime.fromISO(group.createdAt).year}
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
	<div class="py-5 flex justify-end">
		<a href="/groups/new">
			<Button>
				<div class="flex items-center gap-1">
					Create Group
					<PlusIcon classes="h-5 w-5" />
				</div>
			</Button>
		</a>
	</div>
</div>
