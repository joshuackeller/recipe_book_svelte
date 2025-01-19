import { createMutation } from "@tanstack/svelte-query";
import useRecipeApi from "../../useRecipeApi.js";
import type { Tag } from "../../interfaces.js";

interface RemoveRecipeTagProps {
  recipeId: string | number;
  tagId: string | number;
}

const RemoveRecipeTag = async ({
  recipeId,
  tagId,
}: RemoveRecipeTagProps): Promise<Tag> => {
  const api = useRecipeApi();
  const { data } = await api.delete(`/recipes/${recipeId}/tags/${tagId}`);
  return data;
};

const useRemoveRecipeTag = () => {
  return createMutation({
    mutationFn: RemoveRecipeTag,
  });
};

export default useRemoveRecipeTag;
