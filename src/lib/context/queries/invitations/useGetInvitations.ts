import { get } from 'svelte/store';
import type { GroupInvite } from '../../interfaces';
import useRecipeApi from '../../useRecipeApi';
import { createQuery } from '@tanstack/svelte-query';
import { token } from '../../../stores/token';

export const GetInvitations = async (): Promise<GroupInvite[]> => {
	const api = useRecipeApi();
	const { data } = await api.get('/invitations');
	return data;
};

export const KEY = 'INVITATIONS';

const useGetInvitations = () => {
	const tokenValue = get(token);
	return createQuery<GroupInvite[]>([KEY], GetInvitations, {
		enabled: !!tokenValue
	});
};

export default useGetInvitations;
