import { get } from 'svelte/store';
import type { Recipe } from '../../interfaces';
import useRecipeApi from '../../useRecipeApi';

import { createQuery } from '@tanstack/svelte-query';
import { token } from '../../../stores/token';

interface GetRecipesProps {
	search?: string;
	tagIds?: number[];
}

export const GetRecipes = async ({ search, tagIds }: GetRecipesProps) => {
	const api = useRecipeApi();
	const { data } = await api.get('/recipes', {
		params: {
			search,
			tagIds
		}
	});
	return data;
};

export const KEY = 'RECIPES';

const useGetRecipes = (search?: string, tagIds?: number[]) => {
	const tokenValue = get(token);
	return createQuery<Recipe[]>([KEY, search, tagIds], () => GetRecipes({ search, tagIds }), {
		enabled: !!tokenValue
	});
};

export default useGetRecipes;
