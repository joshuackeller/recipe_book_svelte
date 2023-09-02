import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import useRecipeApi from '../../useRecipeApi.js';
import type { Recipe } from '../../interfaces.js';
import { KEY as RECIPES } from '../../queries/recipes/useGetRecipes.js';

interface UpdateRecipeProps {
	id: string;
	name: string;
	html: string;
}

const UpdateRecipe = async ({ id, name, html }: UpdateRecipeProps): Promise<Recipe> => {
	const api = useRecipeApi();
	const { data } = await api.put(`/recipes/${id}`, {
		name,
		html
	});
	return data;
};

const useUpdateRecipe = () => {
	const queryClient = useQueryClient();
	return createMutation(UpdateRecipe, {
		onSuccess: () => {
			queryClient.invalidateQueries([RECIPES]);
		}
	});
};

export default useUpdateRecipe;
