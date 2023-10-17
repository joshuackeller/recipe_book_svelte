import useRecipeApi from '$lib/context/useRecipeApi';
import { createMutation } from '@tanstack/svelte-query';

interface CreateGroupProps {
	name: string;
	autoAddRecipes: boolean;
}

const CreateGroup = async ({ name, autoAddRecipes }: CreateGroupProps) => {
	const api = useRecipeApi();

	const { data } = await api.post('/groups', {
		name,
		autoAddRecipes
	});

	return data;
};

const useCreateGroup = () => {
	return createMutation(CreateGroup);
};

export default useCreateGroup;
