import useRecipeApi from '../../useRecipeApi';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { KEY as INVITATIONS } from '../../queries/invitations/useGetInvitations';
import type { GroupInvite } from '$lib/context/interfaces';

interface DeleteInvitationProps {
	invitationId: number;
}

const DeleteInvitation = async ({ invitationId }: DeleteInvitationProps) => {
	const api = useRecipeApi();
	const { data } = await api.delete(`/invitations/${invitationId}`);
	return data;
};

const useDeleteInvitation = () => {
	const queryClient = useQueryClient();

	return createMutation(DeleteInvitation, {
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
		}
	});
};

export default useDeleteInvitation;
