<script lang="ts">
	import Dialog from '$lib/components/base/Dialog.svelte';
	import CheckCircleIcon from '$lib/components/icons/CheckCircleIcon.svelte';
	import type { GroupUser } from '$lib/context/interfaces';
	import { token } from '$lib/stores/token';
	import Button from '$lib/components/base/Button.svelte';
	import useRemoveGroupUser from '$lib/context/mutations/groups/useRemoveGroupUser';

	export let groupUser: GroupUser;
	export let groupId: string;

	let isOpen: boolean = false;
	let isDeleted: boolean = false;

	// GET CURRENT USER ID - decode token
	const base64 = $token?.split('.')?.[1];
	const json = JSON.parse(base64 ? atob(base64) : '{}');

	const removeUser = useRemoveGroupUser(groupId, groupUser.id.toString());
	const handleRemoveUser = async () => {
		await $removeUser.mutateAsync(undefined, {
			onSuccess: () => {
				isDeleted = true;
			}
		});
	};
</script>

<div class="grid grid-cols-2 border-b py-2">
	<div>
		{groupUser.name}
	</div>
	{#if json.userId !== groupUser.id}
		<div class="flex justify-end">
			<CheckCircleIcon classes="h-5 w-5" />
		</div>
	{/if}
</div>

<Dialog bind:isOpen classes="max-w-md space-y-3">
	<div>
		<div class="text-2xl font-bold mb-2">Are you sure you want to delete this user?</div>
	</div>
	<div class="flex gap-2">
		<Button classes="w-full flex-1" onClick={() => (isOpen = false)}>Cancel</Button>
		<Button
			classes="bg-yellow-500 hover:bg-yellow-500/80 w-full flex-1"
			onClick={handleRemoveUser}
			isLoading={$removeUser.isPending}
			disabled={$removeUser.isPending}>Delete</Button
		>
	</div>
</Dialog>
