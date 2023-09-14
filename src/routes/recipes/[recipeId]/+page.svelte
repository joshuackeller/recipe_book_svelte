<script>
	import SingleRecipe from '../../../lib/pages/recipes/SingleRecipePage.svelte';

	export let data;
	const { recipeId } = data;
</script>

<SingleRecipe {recipeId} />
