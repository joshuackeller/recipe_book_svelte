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

  return await prisma.tag.update({
    where: {
      id_userId: {
        id: tagId,
        userId: userId,
      },
    },
    data: {
      recipes: {
        connect: {
          id_userId: {
            id: recipeId,
            userId,
          },
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

  const tag = await prisma.tag.update({
    where: {
      id_userId: {
        id: tagId,
        userId,
      },
    },
    data: {
      recipes: {
        disconnect: {
          id_userId: {
            id: recipeId,
            userId,
          },
        },
      },
    },
    include: {
      _count: {
        select: {
          recipes: true,
        },
      },
    },
  });

  if (tag._count.recipes < 1) {
    await prisma.tag.delete({
      where: {
        id_userId: {
          id: tagId,
          userId,
        },
      },
    });
  }

  return tag;
});
