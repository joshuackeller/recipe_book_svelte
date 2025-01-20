import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, params }) => {
  const { tagId } = z
    .object({
      tagId: z.string(),
    })
    .parse(params);

  return await prisma.tag.findUniqueOrThrow({
    where: {
      id_userId: {
        id: tagId,
        userId,
      },
    },
  });
});

export const PUT = routeHandlerWithAuth(async ({ userId, params, request }) => {
  const { tagId } = z
    .object({
      tagId: z.string(),
    })
    .parse(params);
  const { name } = z
    .object({
      name: z.string(),
    })
    .parse(await request.json());

  return await prisma.tag.update({
    where: {
      id_userId: {
        id: tagId,
        userId,
      },
    },
    data: {
      name,
    },
  });
});

export const DELETE = routeHandlerWithAuth(async ({ userId, params }) => {
  const { tagId } = z
    .object({
      tagId: z.string(),
    })
    .parse(params);

  return await prisma.tag.delete({
    where: {
      id_userId: {
        id: tagId,
        userId,
      },
    },
  });
});
