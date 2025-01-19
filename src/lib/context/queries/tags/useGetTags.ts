import { get } from "svelte/store";
import type { Tag } from "../../interfaces";
import useRecipeApi from "../../useRecipeApi";
import { createQuery } from "@tanstack/svelte-query";
import { token } from "../../../stores/token";

interface GetTagsProps {
  search?: string;
}

export const GetTags = async ({ search }: GetTagsProps) => {
  const api = useRecipeApi();
  const { data } = await api.get("/tags", {
    params: {
      search,
    },
  });
  return data;
};

export const KEY = "TAGS";

const useGetTags = (search?: string) => {
  const tokenValue = get(token);
  return createQuery<Tag[]>({
    queryKey: [KEY, search],
    queryFn: () => GetTags({ search }),
    enabled: !!tokenValue,
  });
};

export default useGetTags;
