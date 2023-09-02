<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '../../components/base/BackButton.svelte';
	import Button from '../../components/base/Button.svelte';
	import TextInput from '../../components/fields/TextInput.svelte';
	import TipTapEditor from '../../components/fields/TipTap/TipTapEditor.svelte';
	import type { Recipe, Tag } from '../../context/interfaces';
	import useCreateRecipe from '../../context/mutations/recipes/useCreateRecipe';
	import { GetTags } from '../../context/queries/tags/useGetTags';

	let name: string = '';
	let tags: { id?: number; name: string }[] = [];
	let html: string = `
    <h3>Ingredients</h3>
    <ul>
    <li>2 cup of something</li>
    <li>1 cup of this</li>
    <li>2 T of another</li>
    <li>dash of that thing</li>
    </ul>
    <h3>Instructions</h3>
    <ol>
    <li>Mix something, another, and that thing</li>
    <li>Fold in this</li>
    <li>Bake for 30 minutes at 350&deg;</li>
    </ol>
    `;

	const createRecipe = useCreateRecipe();
	const handleCreateRecipe = async () => {
		await $createRecipe.mutateAsync(
			{ name, html, tags },
			{
				onSuccess: (response: Recipe) => {
					goto(`/recipes/${response.id}`);
				}
			}
		);
	};

	let search = '';
	let searchTagsValue: string = '';
	let searchTagResults: Tag[] = [];
	let timer: number;
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

	const addTag = (tag: Tag) => {
		tags = [tag, ...tags];
		searchTagsValue = '';
		search = '';
	};
	const createTag = () => {
		tags = [{ name: search }, ...tags];
		searchTagsValue = '';
		search = '';
	};
	const removeTag = (index: number) => {
		tags.splice(index, 1);
		tags = tags;
	};
</script>

<div class="space-y-3">
	<BackButton />
	<h2>New Recipe</h2>
	<TextInput
		bind:value={name}
		name="name"
		placeholder="Name"
		classes="p-2 text-2xl font-bold placeholder:text-2xl placeholder:font-bold"
	/>
	<TipTapEditor bind:value={html} />
	<div class="md:flex gap-2 items-center">
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
		<div class="flex items-center">
			{#each tags as tag, index}
				<div>
					<button
						on:click={() => removeTag(index)}
						class="bg-black text-white px-2 rounded mx-1 text-sm whitespace-nowrap"
						>{tag.name}</button
					>
				</div>
			{/each}
		</div>
		<div class="flex items-center">
			{#if searchTagResults.length > 0}
				<div class="mr-1">
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
			onClick={handleCreateRecipe}
			isLoading={$createRecipe.isLoading}
			disabled={$createRecipe.isLoading}
			text="Create Recipe"
		/>
	</div>
</div>
