<script lang="ts">
	import ErrorMessage from '../components/base/ErrorMessage.svelte';
	import Loader from '../components/base/Loader.svelte';
	import SquaresPlusIcon from '../components/icons/SquaresPlusIcon.svelte';
	import useGetRecipes, { GetRecipes } from '../context/queries/recipes/useGetRecipes';
	import TextInput from '../components/fields/TextInput.svelte';
	import type { Recipe } from '../context/interfaces';

	let search: string = '';
	let tagIds: number[] = [];

	let timer: number;
	const debounce = (e: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			search = e.target.value;
		}, 200);
	};

	const recipesQuery = useGetRecipes();

	let recipes: Recipe[];
	$: {
		if (!!$recipesQuery.data) {
			recipes = $recipesQuery?.data;
		}
	}
	$: {
		GetRecipes({ search, tagIds }).then((response) => {
			recipes = response;
		});
	}
</script>

<div>
	<TextInput onInput={debounce} name="search" placeholder="Find a recipe..." />
	{#if $recipesQuery.isLoading}
		<Loader classes="my-10" />
	{:else if $recipesQuery.isError}
		<ErrorMessage error={$recipesQuery.error} />
	{:else if $recipesQuery.isSuccess && !!recipes}
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
