import { get } from 'svelte/store';
import type { Recipe } from '../../interfaces';
import useRecipeApi from '../../useRecipeApi';
import { createQuery } from '@tanstack/svelte-query';
import { token } from '../../../stores/token';

interface GetRecipeProps {
	id: string;
}

export const GetRecipe = async ({ id }: GetRecipeProps): Promise<Recipe> => {
	const api = useRecipeApi();
	const { data } = await api.get(`/recipes/${id}`);
	return data;
};

export const KEY = 'RECIPE';

const useGetRecipe = (id: string) => {
	const tokenValue = get(token);

	return createQuery<Recipe>({
		queryKey: [KEY, id],
		queryFn: () => GetRecipe({ id }),
		enabled: !!tokenValue
	});
};

export default useGetRecipe;
