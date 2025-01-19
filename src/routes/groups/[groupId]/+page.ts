export const load = ({ params }: { params: { groupId: string } }) => {
  return {
    groupId: params.groupId,
  };
};
