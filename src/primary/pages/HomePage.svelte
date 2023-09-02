<script lang="ts">
	import Loader from '../components/base/Loader.svelte';
	import SquaresPlusIcon from '../components/icons/SquaresPlusIcon.svelte';
	import { GetRecipes } from '../context/queries/recipes/useGetRecipes';
	import TextInput from '../components/fields/TextInput.svelte';
	import type { Recipe, Tag } from '../context/interfaces';
	import { GetTags } from '../context/queries/tags/useGetTags';

	let search: string = '';
	let searchInput: string = '';
	let tags: Tag[] = [];

	let timer: number;
	const debounce = (e: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			search = e.target.value;
		}, 200);
	};

	let recipes: Recipe[];
	let searchTags: Tag[] = [];

	$: {
		GetRecipes({ search, tagIds: tags.length > 0 ? tags.map((tag) => tag.id) : undefined }).then(
			(response) => {
				recipes = response;
			}
		);
		GetTags({ search }).then((response) => {
			searchTags = response.filter((searchTag: any) => {
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
		});
	}

	const addTag = (tag: Tag) => {
		tags = [tag, ...tags];
		searchInput = '';
		search = '';
	};
	const removeTag = (index: number) => {
		tags.splice(index, 1);
		tags = tags;
	};
</script>

<div>
	<TextInput
		onInput={debounce}
		bind:value={searchInput}
		name="search"
		placeholder="Find a recipe..."
	/>
	<div class="flex items-center my-2">
		{#each tags as tag, index}
			<button
				on:click={() => removeTag(index)}
				class="bg-black text-white px-2 rounded mx-0.5 text-sm whitespace-nowrap">{tag.name}</button
			>
		{/each}
		{#if searchTags.length > 0}
			<p class="text-sm mx-1">Add Filter</p>
			{#each searchTags as searchTag}
				<button
					on:click={() => addTag(searchTag)}
					class="bg-black text-white px-2 rounded mx-0.5 text-sm whitespace-nowrap"
					>{searchTag.name}</button
				>
			{/each}
		{/if}
	</div>
	{#if !recipes}
		<Loader classes="my-10" />
		<!-- {:else if $recipesQuery.isError}
		<ErrorMessage error={$recipesQuery.error} /> -->
	{:else if !!recipes}
		<div class="py-5 flex flex-wrap gap-5">
			<a
				href="/recipes/new"
				class="border-2 border-black bg-black rounded-lg h-[150px] max-w-[150px] w-full flex justify-center items-center hover:border-black/80 text-black/80"
			>
				<SquaresPlusIcon classes="h-10 w-10 text-white" />
			</a>
			{#each recipes as recipe}
				<a
					class="border-2 border-black rounded-lg h-[150px] max-w-[150px] w-full flex justify-center items-center hover:border-black/80 text-black/80 p-1"
					href={`/recipes/${recipe.id}`}
				>
					<div class="text-center line-clamp-3">{recipe.name}</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
