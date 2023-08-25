import useRecipeApi from '../../useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface SignInProps {
	email: string;
	password: string;
}

const SignIn = async ({ email, password }: SignInProps) => {
	const api = useRecipeApi();

	const { data } = await api.post('/auth/password/sign_in', {
		email,
		password
	});
	return data;
};

const useSignIn = () => {
	return createMutation(SignIn);
};

export default useSignIn;
