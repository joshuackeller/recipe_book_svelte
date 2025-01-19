<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import Dialog from '$lib/components/base/Dialog.svelte';
	import ClockIcon from '$lib/components/icons/ClockIcon.svelte';
	import type { GroupInvite } from '$lib/context/interfaces';
	import useDeleteGroupInvitation from '$lib/context/mutations/groups/useDeleteGroupInvitation';

	export let invitation: GroupInvite;
	export let groupId: string;

	let isOpen: boolean = false;
	let isDeleted: boolean = false;

	const deleteInvitation = useDeleteGroupInvitation(groupId);
	const handleDeleteInvitation = async () => {
		await $deleteInvitation.mutateAsync(
			{ invitationId: invitation.id.toString(), groupId },
			{
				onSuccess: () => {
					isDeleted = true;
				}
			}
		);
	};
</script>

{#if !isDeleted}
	<div class="grid grid-cols-2 border-b py-2">
		<div>
			{invitation.name}
		</div>
		<div class="flex justify-end">
			<button on:click={() => (isOpen = true)}>
				<ClockIcon classes="text-yellow-500 h-5 w-5" />
			</button>
		</div>
	</div>

	<Dialog bind:isOpen classes="max-w-md space-y-3">
		<div>
			<div class="text-2xl font-bold mb-2">Are you sure you want to delete this invitation?</div>
		</div>
		<div class="flex gap-2">
			<Button classes="w-full flex-1" onClick={() => (isOpen = false)}>Cancel</Button>
			<Button
				classes="bg-yellow-500 hover:bg-yellow-500/80 w-full flex-1"
				onClick={handleDeleteInvitation}
				isLoading={$deleteInvitation.isPending}
				disabled={$deleteInvitation.isPending}>Delete</Button
			>
		</div>
	</Dialog>
{/if}
