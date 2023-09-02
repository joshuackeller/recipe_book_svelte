<script>
	import SingleRecipe from '../../../primary/pages/recipes/SingleRecipePage.svelte';

	export let data;
	const { recipeId } = data;
</script>

<SingleRecipe {recipeId} />
