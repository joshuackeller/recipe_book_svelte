import type { Group } from "$lib/context/interfaces";
import useRecipeApi from "$lib/context/useRecipeApi";
import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import { KEY as GROUPS } from "$lib/context/queries/groups/useGetGroups";

interface CreateGroupProps {
  name: string;
  autoAddRecipes: boolean;
}

const CreateGroup = async ({
  name,
  autoAddRecipes,
}: CreateGroupProps): Promise<Group> => {
  const api = useRecipeApi();

  const { data } = await api.post("/groups", {
    name,
    autoAddRecipes,
  });

  return data;
};

const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: CreateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS] });
    },
  });
};

export default useCreateGroup;
