import { get } from 'svelte/store';
import type { Group } from '../../interfaces';
import useRecipeApi from '../../useRecipeApi';
import { createQuery } from '@tanstack/svelte-query';
import { token } from '../../../stores/token';

export const GetGroups = async (): Promise<Group[]> => {
	const api = useRecipeApi();

	const { data } = await api.get('/groups');
	return data;
};

export const KEY = 'GROUPS';

const useGetGroups = () => {
	const tokenValue = get(token);
	return createQuery<Group[]>([KEY], GetGroups, {
		enabled: !!tokenValue
	});
};

export default useGetGroups;
