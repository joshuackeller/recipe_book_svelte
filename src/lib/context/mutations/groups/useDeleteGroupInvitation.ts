import useRecipeApi from "../../useRecipeApi";
import { createMutation, useQueryClient } from "@tanstack/svelte-query";
import { KEY as GROUP_INVITATIONS } from "$lib/context/queries/groups/useGetGroupInvitations";

interface DeleteGroupInvitationProps {
  groupId: string;
  invitationId: string;
}

const DeleteGroupInvitation = async ({
  groupId,
  invitationId,
}: DeleteGroupInvitationProps) => {
  const api = useRecipeApi();
  const { data } = await api.delete(
    `/groups/${groupId}/invitations/${invitationId}`
  );
  return data;
};

const useDeleteGroupInvitation = (groupId: string) => {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: DeleteGroupInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_INVITATIONS, groupId],
      });
    },
  });
};

export default useDeleteGroupInvitation;
