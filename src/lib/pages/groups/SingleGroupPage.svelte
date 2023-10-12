<script lang="ts">
	import BackButton from '$lib/components/base/BackButton.svelte';
	import Button from '$lib/components/base/Button.svelte';
	import ErrorMessage from '$lib/components/base/ErrorMessage.svelte';
	import Loader from '$lib/components/base/Loader.svelte';
	import TextInput from '$lib/components/fields/TextInput.svelte';
	import ClockIcon from '$lib/components/icons/ClockIcon.svelte';
	import PaperAirplineIcon from '$lib/components/icons/PaperAirplineIcon.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import useSendGroupInvite from '$lib/context/mutations/groups/useSendGroupInvitation';
	import useGetGroup from '$lib/context/queries/groups/useGetGroup';
	import useGetGroupInvitations from '$lib/context/queries/groups/useGetGroupInvitations';
	import useGetGroupUsers from '$lib/context/queries/groups/useGetGroupUsers';
	import GroupUserRow from './GroupUserRow.svelte';
	import PendingUserRow from './PendingInvitationRow.svelte';

	export let groupId: string;

	const groupQuery = useGetGroup(groupId);
	const groupUsersQuery = useGetGroupUsers(groupId);
	const groupPendingInvitations = useGetGroupInvitations(groupId);

	let name: string = '';
	let email: string = '';
	let creatingInvitation: boolean = false;

	const sendInvitation = useSendGroupInvite();
	const handleSendInvitation = async () => {
		await $sendInvitation.mutateAsync(
			{ groupId, name, email },
			{
				onSuccess: () => {
					name = '';
					email = '';
					creatingInvitation = false;
				}
			}
		);
	};
</script>

<BackButton />
{#if $groupQuery.isLoading}
	<Loader />
{:else}
	<div>
		<h2>{$groupQuery.data?.name}</h2>
	</div>
	<div class="grid grid-cols-2 border-b">
		<div class="text-sm">name</div>
		<div class="text-sm text-right">status</div>
	</div>
	{#if !!$groupUsersQuery.data && $groupUsersQuery.data.length > 0}
		{#each $groupUsersQuery.data as groupUser (groupUser.id)}
			<GroupUserRow {groupUser} {groupId} />
		{/each}
	{/if}
	{#if !!$groupPendingInvitations.data && $groupPendingInvitations.data.length > 0}
		{#each $groupPendingInvitations.data as invitation (invitation.id)}
			<PendingUserRow {invitation} {groupId} />
		{/each}
	{/if}

	{#if creatingInvitation}
		<form
			class="py-2 flex flex-col md:flex-row gap-2"
			on:submit|preventDefault={handleSendInvitation}
		>
			<div class="flex flex-col md:flex-row flex-1 gap-1">
				<TextInput name="name" label="name" placeholder="bob" bind:value={name} />
				<TextInput
					name="email"
					label="email"
					type="email"
					placeholder="bobsacamano@email.com"
					bind:value={email}
				/>
			</div>
			<div class="flex justify-end items-end gap-2">
				<div>
					<Button
						onClick={() => (creatingInvitation = !creatingInvitation)}
						disabled={$sendInvitation.isLoading}
						classes="bg-yellow-500 hover:bg-yellow-500/80"
					>
						<div class="flex items-center gap-1">Cancel</div>
					</Button>
				</div>
				<div>
					<Button
						type="submit"
						disabled={$sendInvitation.isLoading}
						isLoading={$sendInvitation.isLoading}
					>
						<div class="flex items-center gap-1">
							Send Invitation
							<PaperAirplineIcon classes="h-4 w-4" />
						</div>
					</Button>
				</div>
			</div>
		</form>
		<ErrorMessage error={$sendInvitation.error} />
	{:else}
		<div class="flex justify-end py-5">
			<Button onClick={() => (creatingInvitation = !creatingInvitation)}>
				<div class="flex items-center gap-1">
					Add Member
					<PlusIcon classes="h-4 w-4" />
				</div>
			</Button>
		</div>
	{/if}
{/if}
