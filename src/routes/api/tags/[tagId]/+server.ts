import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ params }) => {
  const { tagId } = z
    .object({
      tagId: z.string(),
    })
    .parse(params);

  return await prisma.tag.findUniqueOrThrow({
    where: {
      id: tagId,
    },
  });
});

export const PUT = routeHandlerWithAuth(async ({ params, request }) => {
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
      id: tagId,
    },
    data: {
      name,
    },
  });
});

export const DELETE = routeHandlerWithAuth(async ({ params }) => {
  const { tagId } = z
    .object({
      tagId: z.string(),
    })
    .parse(params);

  return await prisma.tag.delete({
    where: {
      id: tagId,
    },
  });
});
