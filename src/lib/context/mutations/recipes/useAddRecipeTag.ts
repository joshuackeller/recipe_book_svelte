import { createMutation } from "@tanstack/svelte-query";
import useRecipeApi from "../../useRecipeApi.js";
import type { Tag } from "../../interfaces.js";

interface AddRecipeTagProps {
  recipeId: string | number;
  tagId: string | number;
}

const AddRecipeTag = async ({
  recipeId,
  tagId,
}: AddRecipeTagProps): Promise<Tag> => {
  const api = useRecipeApi();
  const { data } = await api.post(`/recipes/${recipeId}/tags/${tagId}`);
  return data;
};

const useAddRecipeTag = () => {
  return createMutation({
    mutationFn: AddRecipeTag,
  });
};

export default useAddRecipeTag;
