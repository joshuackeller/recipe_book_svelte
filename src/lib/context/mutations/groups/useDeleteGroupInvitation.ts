import useRecipeApi from '../../useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';
interface DeleteGroupInvitationProps {
	groupId: number;
	invitationId: number;
}

const DeleteGroupInvitation = async ({ groupId, invitationId }: DeleteGroupInvitationProps) => {
	const api = useRecipeApi();
	const { data } = await api.delete(`/groups/${groupId}/invitations/${invitationId}`);
	return data;
};

const useDeleteGroupInvitation = () => {
	return createMutation(DeleteGroupInvitation);
};

export default useDeleteGroupInvitation;
