import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import useRecipeApi from '../../useRecipeApi.js';
import type { Recipe } from '../../interfaces.js';
import { KEY as RECIPES } from '../../queries/recipes/useGetRecipes.js';

interface CreateRecipeProps {
	name: string;
	html: string;
	tags: {
		id?: number;
		name: string;
	}[];
}

const CreateRecipe = async ({ name, html, tags }: CreateRecipeProps): Promise<Recipe> => {
	const api = useRecipeApi();
	const { data } = await api.post('/recipes', {
		name,
		html,
		tags
	});
	return data;
};

const useCreateRecipe = () => {
	const queryClient = useQueryClient();
	return createMutation(CreateRecipe, {
		onSuccess: () => {
			queryClient.invalidateQueries([RECIPES]);
		}
	});
};

export default useCreateRecipe;
