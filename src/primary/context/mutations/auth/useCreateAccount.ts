import useRecipeApi from '../../useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface CreateAccountProps {
	email: string;
	password: string;
	name: string;
}

const CreateAccount = async ({ name, email, password }: CreateAccountProps) => {
	const api = useRecipeApi();
	const { data } = await api.post('/auth/password/create_account', {
		name,
		email,
		password
	});
	return data;
};

const useCreateAccount = () => {
	return createMutation(CreateAccount);
};

export default useCreateAccount;
