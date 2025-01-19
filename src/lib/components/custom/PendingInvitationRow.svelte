<script lang="ts">
	import Button from '$lib/components/base/Button.svelte';
	import useDeleteInvitation from '$lib/context/mutations/invitations/useDeleteInvitation';
	import useAcceptInvitation from '$lib/context/mutations/invitations/useAcceptInvitation';
	import type { GroupInvite } from '$lib/context/interfaces';

	export let invitation: GroupInvite;

	const deleteInvitation = useDeleteInvitation();
	const acceptInvitation = useAcceptInvitation();
</script>

<div class="grid grid-cols-2 py-3 border-b">
	<div class="font-bold self-center">
		{invitation.group?.name}
	</div>
	<div class="justify-self-end flex gap-2">
		<div>
			<Button
				onClick={() => {
					$deleteInvitation.mutateAsync({ invitationId: invitation.id });
				}}
				isLoading={$deleteInvitation.isPending}
				disabled={$deleteInvitation.isPending}
				classes="bg-yellow-500 hover:bg-yellow-500/80">decline</Button
			>
		</div>
		<div>
			<Button
				onClick={() => {
					$acceptInvitation.mutateAsync({ invitationId: invitation.id });
				}}
				isLoading={$acceptInvitation.isPending}
				disabled={$acceptInvitation.isPending}>accept</Button
			>
		</div>
	</div>
</div>
