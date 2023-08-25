import useRecipeApi from '../../useRecipeApi';
import { createMutation, useQueryClient } from '@tanstack/svelte-query';
import { KEY as GROUP_USERS } from '../../queries/groups/useGetGroupUsers';

interface RemoveGroupUserProps {
	groupId: number;
	userId: number;
}

const RemoveGroupUser = async ({ groupId, userId }: RemoveGroupUserProps) => {
	const api = useRecipeApi();

	const { data } = await api.delete(`/groups/${groupId}/users/${userId}`);
	return data;
};

const useRemoveGroupUser = (groupId: number, userId: number) => {
	const queryClient = useQueryClient();
	return createMutation(() => RemoveGroupUser({ groupId, userId }), {
		onSuccess: () => {
			queryClient.setQueryData([GROUP_USERS, groupId.toString()], (data: any[] | undefined) => {
				const newData: any[] = JSON.parse(JSON.stringify(data));
				if (!!newData && newData.length > 0) {
					const index = newData?.findIndex((i) => userId === i.id);
					if (index !== -1) {
						newData.splice(index, 1);
					}
				}
				return newData;
			});
		}
	});
};

export default useRemoveGroupUser;
