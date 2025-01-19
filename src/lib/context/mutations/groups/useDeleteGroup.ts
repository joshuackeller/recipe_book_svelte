import type { Group } from "$lib/context/interfaces";
import useRecipeApi from "$lib/context/useRecipeApi";
import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import { KEY as GROUPS } from "$lib/context/queries/groups/useGetGroups";
import { KEY as GROUP } from "$lib/context/queries/groups/useGetGroup";

interface DeleteGroupProps {
  groupId: string;
}

const DeleteGroup = async ({ groupId }: DeleteGroupProps): Promise<Group> => {
  const api = useRecipeApi();

  const { data } = await api.delete(`/groups/${groupId}`);

  return data;
};

const useDeleteGroup = (groupId: string) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: () => DeleteGroup({ groupId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUPS],
      });
      queryClient.removeQueries({
        queryKey: [GROUP, groupId],
      });
    },
  });
};

export default useDeleteGroup;
