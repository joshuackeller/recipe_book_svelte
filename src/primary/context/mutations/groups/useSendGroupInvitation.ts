import useRecipeApi from '../../useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface SendGroupInviteProps {
	groupId: string;
	name: string;
	email: string;
}

const SendGroupInvite = async ({ groupId, name, email }: SendGroupInviteProps) => {
	const api = useRecipeApi();
	const { data } = await api.post(`/groups/${groupId}/invitations`, {
		name,
		email
	});
	return data;
};

const useSendGroupInvite = () => {
	return createMutation(SendGroupInvite);
};

export default useSendGroupInvite;
