import { get } from "svelte/store";
import type { Recipe } from "../../interfaces";
import useRecipeApi from "../../useRecipeApi";
import { createQuery } from "@tanstack/svelte-query";
import { token } from "../../../stores/token";

interface GetRecipesProps {
  search?: string;
  tagIds?: number[];
}

export const GetRecipes = async ({
  search,
  tagIds,
}: GetRecipesProps): Promise<Recipe[]> => {
  const api = useRecipeApi();
  const { data } = await api.get("/recipes", {
    params: {
      search: search ? search : undefined,
      tagIds: tagIds?.toString(),
    },
  });
  return data;
};

export const KEY = "RECIPES";

const useGetRecipes = (search?: string, tagIds?: number[]) => {
  const tokenValue = get(token);

  return createQuery<Recipe[]>({
    queryKey: [KEY, search, tagIds],
    queryFn: () => GetRecipes({ search, tagIds }),
    enabled: !!tokenValue,
  });
};

export default useGetRecipes;
