import { get } from 'svelte/store';
import type { Group } from '../../interfaces';
import useRecipeApi from '../../useRecipeApi';
import { createQuery } from '@tanstack/svelte-query';
import { token } from '../../../stores/token';

export const GetGroup = async (groupId?: string) => {
	const api = useRecipeApi();
	const { data } = await api.get(`/groups/${groupId}`);
	return data;
};

export const KEY = 'GROUP';

const useGetGroup = (groupId?: string) => {
	const tokenValue = get(token);
	return createQuery<Group>([KEY, groupId], () => GetGroup(groupId), {
		enabled: !!tokenValue && !!groupId
	});
};

export default useGetGroup;
