import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const POST = routeHandlerWithAuth(async ({ userId, params }) => {
  const { recipeId, tagId } = z
    .object({
      recipeId: z.string(),
      tagId: z.string(),
    })
    .parse(params);

  return await prisma.recipe.update({
    where: {
      id: recipeId,
      OR: [
        { userId },
        {
          groups: {
            some: { users: { some: { userId } } },
          },
        },
      ],
    },
    data: {
      tags: {
        connect: {
          id: tagId,
        },
      },
    },
  });
});

export const DELETE = routeHandlerWithAuth(async ({ userId, params }) => {
  const { recipeId, tagId } = z
    .object({
      recipeId: z.string(),
      tagId: z.string(),
    })
    .parse(params);

  return await prisma.recipe.update({
    where: {
      id: recipeId,
      OR: [
        { userId },
        {
          groups: {
            some: { users: { some: { userId } } },
          },
        },
      ],
    },
    data: {
      tags: {
        disconnect: {
          id: tagId,
        },
      },
    },
  });
});
