import useRecipeApi from '../../useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface ResetPasswordProps {
	token: string;
	password: string;
}

const ResetPassword = async ({ token, password }: ResetPasswordProps) => {
	const api = useRecipeApi();
	const { data } = await api.post('/auth/reset_password', {
		token,
		password
	});

	return data;
};

const useResetPassword = () => {
	return createMutation(ResetPassword);
};

export default useResetPassword;
