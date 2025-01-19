import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import useRecipeApi from "../../useRecipeApi.js";
import type { Recipe } from "../../interfaces.js";
import { KEY as RECIPES } from "../../queries/recipes/useGetRecipes.js";
import { KEY as RECIPE } from "../../queries/recipes/useGetRecipe.js";

interface DeleteRecipeProps {
  id: string;
}

const DeleteRecipe = async ({ id }: DeleteRecipeProps): Promise<Recipe> => {
  const api = useRecipeApi();
  const { data } = await api.delete(`/recipes/${id}`);
  return data;
};

const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: DeleteRecipe,
    onSuccess: (response: Recipe) => {
      queryClient.invalidateQueries({
        queryKey: [RECIPES],
      });
      if (response.id) {
        queryClient.removeQueries({
          queryKey: [RECIPE, response.id],
        });
      }
    },
  });
};

export default useDeleteRecipe;
