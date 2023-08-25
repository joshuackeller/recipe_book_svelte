import useRecipeApi from '../../useRecipeApi';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { KEY as INVITATIONS } from '../../queries/invitations/useGetInvitations';

interface DeleteInvitationProps {
	invitationId: number;
}

const DeleteInvitation = async ({ invitationId }: DeleteInvitationProps) => {
	const api = useRecipeApi();
	const { data } = await api.delete(`/invitations/${invitationId}`);
	return data;
};

const useDeleteInvitation = (invitationId: number) => {
	const queryClient = useQueryClient();

	return createMutation(() => DeleteInvitation({ invitationId }), {
		onSuccess: () => {
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
		}
	});
};

export default useDeleteInvitation;
