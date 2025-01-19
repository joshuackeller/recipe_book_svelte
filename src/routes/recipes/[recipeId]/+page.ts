export const load = ({ params }: { params: { recipeId: string } }) => {
  return {
    recipeId: params.recipeId,
  };
};
