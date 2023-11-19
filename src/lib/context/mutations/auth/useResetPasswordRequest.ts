import useRecipeApi from '../../useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface ResetPasswordRequestProps {
	email: string;
}

const ResetPasswordRequest = async ({ email }: ResetPasswordRequestProps) => {
	const api = useRecipeApi();
	const { data } = await api.post('/auth/reset_password/request', {
		email
	});

	return data;
};

const useResetPasswordRequest = () => {
	return createMutation(ResetPasswordRequest);
};

export default useResetPasswordRequest;
