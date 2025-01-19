import useRecipeApi from "../../useRecipeApi";
import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import { KEY as GROUP_USERS } from "../../queries/groups/useGetGroupUsers";

interface RemoveGroupUserProps {
  groupId: string;
  userId: string;
}

const RemoveGroupUser = async ({ groupId, userId }: RemoveGroupUserProps) => {
  const api = useRecipeApi();

  const { data } = await api.delete(`/groups/${groupId}/users/${userId}`);
  return data;
};

const useRemoveGroupUser = (groupId: string, userId: string) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: () => RemoveGroupUser({ groupId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_USERS, groupId],
      });
    },
  });
};

export default useRemoveGroupUser;
