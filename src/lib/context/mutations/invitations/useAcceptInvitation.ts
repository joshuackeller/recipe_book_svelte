import useRecipeApi from '../../useRecipeApi';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { KEY as INVITATIONS } from '../../queries/invitations/useGetInvitations';
import { KEY as GROUPS } from '../../queries/groups/useGetGroups';
import type { Group, GroupInvite } from '$lib/context/interfaces';

interface AcceptInvitationProps {
	invitationId: number;
}

const AcceptInvitation = async ({ invitationId }: AcceptInvitationProps) => {
	const api = useRecipeApi();
	const { data } = await api.post(`/invitations/${invitationId}`);
	return data;
};

const useAcceptInvitation = () => {
	const queryClient = useQueryClient();

	return createMutation(AcceptInvitation, {
		onSuccess: (response: GroupInvite) => {
			queryClient.setQueryData([INVITATIONS], (data: GroupInvite[] | undefined) => {
				const newData: GroupInvite[] = JSON.parse(JSON.stringify(data));
				if (!!newData && newData.length > 0) {
					const index = newData?.findIndex((i) => response.id === i.id);
					if (index !== -1) {
						newData.splice(index, 1);
					}
				}
				return newData;
			});
			queryClient.setQueryData([GROUPS], (data: Group[] | undefined) => {
				console.log(response, data);
				const newData: Group[] = JSON.parse(JSON.stringify(data));
				console.log(!!newData, !!response.group);
				if (!!newData && !!response.group) {
					console.log('made it to the right place', [response.group, ...newData]);
					return [response.group, ...newData];
				}
				return newData;
			});
		}
	});
};

export default useAcceptInvitation;
