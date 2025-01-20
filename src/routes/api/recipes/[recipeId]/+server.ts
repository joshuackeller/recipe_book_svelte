import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, params }) => {
  const { recipeId } = z
    .object({
      recipeId: z.string(),
    })
    .parse(params);

  return await prisma.recipe.findUniqueOrThrow({
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
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
});

export const PUT = routeHandlerWithAuth(async ({ userId, params, request }) => {
  const { recipeId } = z
    .object({
      recipeId: z.string(),
    })
    .parse(params);

  const { name, html } = z
    .object({
      name: z.string().optional(),
      html: z.string().optional(),
    })
    .parse(await request.json());

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
      name,
      html,
    },
  });
});

export const DELETE = routeHandlerWithAuth(async ({ userId, params }) => {
  const { recipeId } = z
    .object({
      recipeId: z.string(),
    })
    .parse(params);

  return await prisma.recipe.delete({
    where: {
      id_userId: {
        userId,
        id: recipeId,
      },
    },
  });
});
