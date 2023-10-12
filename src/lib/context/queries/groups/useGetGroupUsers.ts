import type { GroupUser } from '../../interfaces';
import useRecipeApi from '../../useRecipeApi';
import { createQuery } from '@tanstack/svelte-query';
import { get } from 'svelte/store';
import { token } from '../../../stores/token';

export const GetGroupUsers = async (groupId?: string) => {
	const api = useRecipeApi();
	const { data } = await api.get(`/groups/${groupId}/users`);
	return data;
};

export const KEY = 'GROUP_USERS';

const useGetGroupUsers = (groupId?: string) => {
	const tokenValue = get(token);

	return createQuery<GroupUser[]>([KEY, groupId], () => GetGroupUsers(groupId), {
		enabled: !!tokenValue && !!groupId
	});
};

export default useGetGroupUsers;
