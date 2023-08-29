<script lang="ts">
	import ErrorMessage from '../components/base/ErrorMessage.svelte';
	import Loader from '../components/base/Loader.svelte';
	import SquaresPlusIcon from '../components/icons/SquaresPlusIcon.svelte';
	import useGetRecipes from '../context/queries/recipes/useGetRecipes';
	import TextInput from '../components/fields/TextInput.svelte';

	let search: string = '';
	let tagIds: number[] = [];

	$: recipes = useGetRecipes(search, tagIds);
</script>

<div>
	{#if $recipes.isLoading}
		<Loader />
	{:else if $recipes.isError}
		<ErrorMessage error={$recipes.error} />
	{:else if $recipes.isSuccess}
		<TextInput bind:value={search} name="search" placeholder="Find a recipe..." />
		<div class="py-5 flex flex-wrap gap-5">
			<a
				href="/new"
				class="border-2 border-black bg-black rounded-lg h-[150px] max-w-[150px] w-full flex justify-center items-center hover:border-black/80 text-black/80"
			>
				<SquaresPlusIcon classes="h-10 w-10 text-white" />
			</a>
			{#each $recipes.data as recipe}
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
