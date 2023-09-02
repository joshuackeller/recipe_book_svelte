<script lang="ts">
	import BackButton from '../../components/base/BackButton.svelte';
	import Loader from '../../components/base/Loader.svelte';
	import useGetRecipe from '../../context/queries/recipes/useGetRecipe';

	export let recipeId: string;

	const recipeQuery = useGetRecipe(recipeId);
</script>

<div class="space-y-3">
	<BackButton />
	{#if $recipeQuery.isLoading}
		<Loader />
	{:else}
		<div class="font-bold text-3xl">{$recipeQuery?.data?.name}</div>
		<div>
			{@html $recipeQuery?.data?.html}
		</div>
	{/if}
</div>
