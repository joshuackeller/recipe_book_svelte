import { createMutation } from '@tanstack/svelte-query';
import useRecipeApi from '../../useRecipeApi.js';
import type { Recipe } from '../../interfaces.js';
import { goto } from '$app/navigation';

interface UpdateRecipeProps {
	id: string;
	name: string;
	html: string;
	tags: {
		id?: number;
		name: string;
	}[];
}

const UpdateRecipe = async ({ id, name, html, tags }: UpdateRecipeProps): Promise<Recipe> => {
	const api = useRecipeApi();
	const { data } = await api.put(`/recipes/${id}`, {
		name,
		html,
		tags
	});
	return data;
};

const useUpdateRecipe = () => {
	return createMutation(UpdateRecipe, {
		onSuccess: (response: Recipe) => {
			goto(`/recipes/${response.id}`);
		}
	});
};

export default useUpdateRecipe;
