import type { GroupInvite } from "../../interfaces";
import useRecipeApi from "../../useRecipeApi";
import { createQuery } from "@tanstack/svelte-query";
import { get } from "svelte/store";
import { token } from "../../../stores/token";

export const GetGroupInvitations = async (groupId?: string) => {
  const api = useRecipeApi();

  const { data } = await api.get(`/groups/${groupId}/invitations`);
  return data;
};

export const KEY = "INVITATIONS";

const useGetGroupInvitations = (groupId?: string) => {
  const tokenValue = get(token);
  return createQuery<GroupInvite[]>({
    queryKey: [KEY, groupId],
    queryFn: () => GetGroupInvitations(groupId),
    enabled: !!tokenValue && !!groupId,
  });
};

export default useGetGroupInvitations;
