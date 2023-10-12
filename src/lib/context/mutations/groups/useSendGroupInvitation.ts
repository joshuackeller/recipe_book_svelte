import useRecipeApi from '../../useRecipeApi';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { KEY as INVITATIONS } from '$lib/context/queries/groups/useGetGroupInvitations';
import type { GroupInvite } from '$lib/context/interfaces';

interface SendGroupInviteProps {
	groupId: string;
	name: string;
	email: string;
}

const SendGroupInvite = async ({
	groupId,
	name,
	email
}: SendGroupInviteProps): Promise<GroupInvite> => {
	const api = useRecipeApi();
	const { data } = await api.post(`/groups/${groupId}/invitations`, {
		name,
		email
	});
	return data;
};

const useSendGroupInvite = () => {
	const queryclient = useQueryClient();
	return createMutation(SendGroupInvite, {
		onSuccess: (response: GroupInvite) => {
			queryclient.setQueryData(
				[INVITATIONS, response?.groupId?.toString()],
				(data: GroupInvite[] | undefined) => {
					if (data && response) {
						return [...data, response];
					}
					return data;
				}
			);
		}
	});
};

export default useSendGroupInvite;
