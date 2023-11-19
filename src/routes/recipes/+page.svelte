<script lang="ts">
	import Loader from '$lib/components/base/Loader.svelte';
	import SquaresPlusIcon from '$lib/components/icons/SquaresPlusIcon.svelte';
	import { GetRecipes } from '$lib/context/queries/recipes/useGetRecipes';
	import TextInput from '$lib/components/fields/TextInput.svelte';
	import type { Recipe, Tag } from '$lib/context/interfaces';
	import { GetTags } from '$lib/context/queries/tags/useGetTags';
	import SettingsIcon from '$lib/components/icons/SettingsIcon.svelte';

	let search: string = '';
	let searchInput: string = '';
	let tags: Tag[] = [];

	let timer: any;
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
	<div class="flex flex-wrap items-center my-2">
		{#each tags as tag, index}
			<button
				on:click={() => removeTag(index)}
				class="bg-black text-white px-2 rounded mx-0.5 text-sm whitespace-nowrap">{tag.name}</button
			>
		{/each}
		{#if searchTags.length > 0}
			<p class="text-sm mx-1">Filters</p>
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
				<div>
					<SquaresPlusIcon classes="h-10 w-10 text-white mx-auto" />
					<p class="text-white text-xs">New Recipe</p>
				</div>
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
<div class="fixed bottom-5 w-full max-w-4xl">
	<div class="flex justify-end mr-10">
		<a
			href="/settings"
			class="bg-white h-10 w-10 rounded-lg border-2 border-black flex justify-center items-center"
		>
			<SettingsIcon classes="h-6 w-6" />
		</a>
	</div>
</div>
