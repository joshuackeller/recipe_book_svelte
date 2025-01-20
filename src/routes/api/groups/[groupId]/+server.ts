import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, params }) => {
  const { groupId } = z
    .object({
      groupId: z.string(),
    })
    .parse(params);

  return await prisma.group.findUniqueOrThrow({
    where: {
      id: groupId,
      users: {
        some: {
          userId,
        },
      },
    },
    include: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
});

export const PUT = routeHandlerWithAuth(async ({ userId, params, request }) => {
  const { groupId } = z
    .object({
      groupId: z.string(),
    })
    .parse(params);

  const { name } = z
    .object({
      name: z.string(),
    })
    .parse(await request.json());

  return await prisma.group.update({
    where: {
      id: groupId,
      users: {
        some: {
          userId,
        },
      },
    },
    data: {
      name,
    },
  });
});

export const DELETE = routeHandlerWithAuth(async ({ userId, params }) => {
  const { groupId } = z
    .object({
      groupId: z.string(),
    })
    .parse(params);

  return await prisma.group.delete({
    where: {
      id: groupId,
      users: {
        some: {
          userId,
        },
      },
    },
  });
});
