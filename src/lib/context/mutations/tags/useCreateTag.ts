import { createMutation } from "@tanstack/svelte-query";
import type { Tag } from "../../interfaces.js";
import useRecipeApi from "../../useRecipeApi.js";

interface CreateTagProps {
  name: string;
  recipeId?: string;
}

const CreateTag = async ({ name, recipeId }: CreateTagProps): Promise<Tag> => {
  const api = useRecipeApi();
  const { data } = await api.post("/tags", {
    name,
    recipeId,
  });
  return data;
};

const useCreateTag = () => {
  return createMutation({
    mutationFn: CreateTag,
  });
};

export default useCreateTag;
