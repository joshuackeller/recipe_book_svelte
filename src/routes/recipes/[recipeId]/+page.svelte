<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '$lib/components/base/BackButton.svelte';
	import Button from '$lib/components/base/Button.svelte';
	import Dialog from '$lib/components/base/Dialog.svelte';
	import Loader from '$lib/components/base/Loader.svelte';
	import useDeleteRecipe from '$lib/context/mutations/recipes/useDeleteRecipe';
	import useUpdateRecipe from '$lib/context/mutations/recipes/useUpdateRecipe';
	import useGetRecipe from '$lib/context/queries/recipes/useGetRecipe';
	import TextInput from '$lib/components/fields/TextInput.svelte';
	import TipTapEditor from '$lib/components/fields/TipTap/TipTapEditor.svelte';
	import type { Tag } from '$lib/context/interfaces';
	import { GetTags } from '$lib/context/queries/tags/useGetTags';
	import useAddRecipeTag from '$lib/context/mutations/recipes/useAddRecipeTag';
	import useCreateTag from '$lib/context/mutations/tags/useCreateTag';
	import useRemoveRecipeTag from '$lib/context/mutations/recipes/useRemoveRecipeTag';
	import { token } from '$lib/stores/token.js';

	const base64 = $token?.split('.')?.[1];
	const json = JSON.parse(base64 ? atob(base64) : '{}');
  const currentUserId = json?.userId ?? ""

	export let data;
	const { recipeId } = data;

	const recipeQuery = useGetRecipe(recipeId);
	let name: string = '';
	recipeQuery.subscribe((recipe) => (name = recipe?.data?.name ?? ''));
	let html: string = '';
	recipeQuery.subscribe((recipe) => (html = recipe?.data?.html ?? ''));
	let tags: Tag[] = [];
	recipeQuery.subscribe((recipe) => (tags = recipe?.data?.tags ?? []));

	// DELETE LOGIC
	let isOpen: boolean = false;
	const deleteRecipe = useDeleteRecipe();
	const handleDelete = async () => {
		$deleteRecipe.mutateAsync(
			{ id: recipeId },
			{
				onSuccess: () => {
					goto('/recipes');
				}
			}
		);
	};
	// END - DELETE

	// EDIT LOGIC
	let isEditing: boolean = false;

	const updateRecipe = useUpdateRecipe();
	const handleSaveRecipe = async () => {
		$updateRecipe.mutateAsync(
			{ id: recipeId, name, html },
			{
				onSuccess: () => {
					isEditing = false;
				}
			}
		);
	};
	// END - EDIT

	// TAG LOGIC
	let search = '';
	let searchTagsValue: string = '';
	let searchTagResults: Tag[] = [];
	let timer: any;
	const debounceTagSearch = (e: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchTagsValue = e.target.value;
		}, 200);
	};
	$: {
		GetTags({ search: searchTagsValue }).then((response) => {
			let preFilterSearchTags = response;
			const newSearchTags = preFilterSearchTags.filter((searchTag: any) => {
				if (!!tags && tags.length > 0) {
					const index = tags.findIndex(
						(tag) => tag.name === searchTag.name || tag.id === searchTag.id
					);
					if (index === -1) return true;
					else return false;
				} else {
					return true;
				}
			});
			searchTagResults = newSearchTags;
		});
	}
	const addRecipeTag = useAddRecipeTag();
	const addTag = async (tag: Tag) => {
		await $addRecipeTag.mutateAsync(
			{ recipeId, tagId: tag.id },
			{
				onSuccess: () => {
					tags = [tag, ...tags];
				}
			}
		);
		searchTagsValue = '';
		search = '';
	};
	const createNewTag = useCreateTag();
	const createTag = async () => {
		await $createNewTag.mutateAsync(
			{ name: search },
			{
				onSuccess: (response) => {
					tags = [response, ...tags];
				}
			}
		);
		searchTagsValue = '';
		search = '';
	};
	const removeRecipeTag = useRemoveRecipeTag();
	const removeTag = async (tagId: number, index: number) => {
		await $removeRecipeTag.mutateAsync(
			{ recipeId, tagId },
			{
				onSuccess: () => {
					tags.splice(index, 1);
					tags = tags;
				}
			}
		);
	};
	// END - TAG
</script>

<div class="space-y-3">
	<BackButton href="/recipes" />
	{#if $recipeQuery.isLoading}
		<Loader />
	{:else if isEditing}
		<TextInput
			bind:value={name}
			name="recipeName"
			classes="p-2 text-2xl font-bold placeholder:text-2xl placeholder:font-bold"
		/>
		<TipTapEditor bind:value={html} />
    <div class="flex flex-wrap items-center">
      {#each tags as tag, index}
      <button
        on:click={() => removeTag(tag.id, index)}
        class="bg-black text-white px-2 rounded mx-1 text-sm whitespace-nowrap"
      >
        {tag.name}
      </button>
      {/each}
    </div>
		<div class="md:flex gap-2 items-center">
      <div class="w-36 md:w-fit">
			<TextInput
				onInput={debounceTagSearch}
				bind:value={search}
				name="search"
				placeholder="Search tags..."
				classes="mb-2 md:mb-0"
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						if (searchTagResults?.length > 0) {
							addTag(searchTagResults[0]);
						} else {
							createTag();
						}
					}
				}}
			/>
      </div>
			<div class="flex flex-wrap items-center">

				{#if searchTagResults.length > 0}
					<div class="mr-1 whitespace-nowrap">
						<p>Add tags</p>
					</div>
					{#each searchTagResults as tag}
						<div>
							<button
								on:click={() => addTag(tag)}
								class="bg-black text-white px-2 rounded mx-0.5 text-sm whitespace-nowrap"
								>{tag.name}</button
							>
						</div>
					{/each}
				{:else if search.length > 0}
					<div class="mr-1">
						<p>Create tag</p>
					</div>
					<div>
						<button
							on:click={createTag}
							class="bg-black text-white px-2 rounded text-sm whitespace-nowrap">{search}</button
						>
					</div>
				{/if}
			</div>
		</div>
		<div class="flex justify-end">
			<Button
				onClick={handleSaveRecipe}
				text="Save"
				isLoading={$updateRecipe.isPending}
				disabled={$updateRecipe.isPending}
			/>
		</div>
	{:else}
		<div class="font-bold text-3xl">{name}</div>
		<div class="ProseMirror">
			{@html html}
		</div>
		{#if $recipeQuery?.data?.tags}
			<div class="flex">
				{#each $recipeQuery?.data?.tags as tag}
					<p class="bg-black text-white px-2 rounded mx-1 text-sm whitespace-nowrap">
						{tag.name}
					</p>
				{/each}
			</div>
		{/if}
		<div class="flex justify-between py-5 text-sm">
			<button class="text-blue-500" on:click={() => (isEditing = true)}>Edit</button>
      {#if currentUserId === $recipeQuery.data?.userId}
			<button class="text-red-500" on:click={() => (isOpen = true)}>Delete</button>
      {/if}
		</div>
		<div />
	{/if}
</div>

<!-- DELETE DIALOG -->
<Dialog bind:isOpen classes="max-w-md space-y-3">
	<div>
		<div class="text-2xl font-bold mb-2">Are you sure you want to delete this recipe?</div>
		<p>This action cannot be undone</p>
	</div>
	<div class="flex gap-2">
		<Button classes="w-full flex-1" onClick={() => (isOpen = false)}>Cancel</Button>
		<Button
			classes="bg-yellow-500 hover:bg-yellow-500/80 w-full flex-1"
			onClick={handleDelete}
			isLoading={$deleteRecipe.isPending}
			disabled={$deleteRecipe.isPending}>Delete</Button
		>
	</div>
</Dialog>
