import useRecipeApi from '../../useRecipeApi';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { KEY as INVITATIONS } from '../../queries/invitations/useGetInvitations';
import { KEY as GROUPS } from '../../queries/groups/useGetGroups';

interface AcceptInvitationProps {
	invitationId: number;
}

const AcceptInvitation = async ({ invitationId }: AcceptInvitationProps) => {
	const api = useRecipeApi();
	const { data } = await api.post(`/invitations/${invitationId}`);
	return data;
};

const useAcceptInvitation = (invitationId: number) => {
	const queryClient = useQueryClient();

	return createMutation(() => AcceptInvitation({ invitationId }), {
		onSuccess: (response) => {
			queryClient.setQueryData([INVITATIONS], (data: any[] | undefined) => {
				const newData: any[] = JSON.parse(JSON.stringify(data));
				if (!!newData && newData.length > 0) {
					const index = newData?.findIndex((i) => invitationId === i.id);
					if (index !== -1) {
						newData.splice(index, 1);
					}
				}
				return newData;
			});
			queryClient.setQueryData([GROUPS], (data: any[] | undefined) => {
				const newData: any[] = JSON.parse(JSON.stringify(data));
				if (!!newData && newData.length > 0) {
					return [response, ...newData];
				}
				return newData;
			});
		}
	});
};

export default useAcceptInvitation;
