import useRecipeApi from '$lib/context/useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface CreateWaitlistMemberProps {
	name: string;
	email: string;
}

const CreateWaitlistMember = async ({ name, email }: CreateWaitlistMemberProps) => {
	const api = useRecipeApi();
	const { data } = await api.post('/waitlist', {
		name,
		email
	});
	return data;
};

const useCreateWaitlistMember = () => {
	return createMutation(CreateWaitlistMember);
};

export default useCreateWaitlistMember;
