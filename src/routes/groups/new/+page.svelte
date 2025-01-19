<script lang="ts">
	import BackButton from '$lib/components/base/BackButton.svelte';
	import Button from '$lib/components/base/Button.svelte';
	import TextInput from '$lib/components/fields/TextInput.svelte';
	import useCreateGroup from '$lib/context/mutations/groups/useCreateGroup';
	import Toggle from '$lib/components/base/Toggle.svelte';
	import { goto } from '$app/navigation';

	let name: string = '';
	let autoAddRecipes: boolean = true;

	const createGroup = useCreateGroup();

	const handleCreateGroup = async () => {
		$createGroup.mutateAsync(
			{ name, autoAddRecipes },
			{
				onSuccess: (group) => {
					goto(`/groups/${group.id}`);
				}
			}
		);
	};
</script>

<div class="space-y-3">
	<BackButton href="/settings" />
	<h2>New Group</h2>
	<form class="space-y-3" on:submit|preventDefault={handleCreateGroup}>
		<TextInput
			name="groupName"
			label="Group Name"
			placeholder="college friends, family, etc."
			bind:value={name}
		/>

		<Toggle bind:value={autoAddRecipes} label="Auto Add Recipes" />

		<div class="flex justify-end">
			<Button
				text="Create Group"
				type="submit"
				isLoading={$createGroup.isPending}
				disabled={$createGroup.isPending}
			/>
		</div>
	</form>
</div>
