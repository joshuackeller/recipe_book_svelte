import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, params }) => {
  const { groupId, invitationId } = z
    .object({
      groupId: z.string(),
      invitationId: z.string(),
    })
    .parse(params);

  return await prisma.groupInvite.findUniqueOrThrow({
    where: {
      id: parseInt(invitationId),
      group: {
        id: parseInt(groupId),
        users: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
    },
  });
});

export const DELETE = routeHandlerWithAuth(async ({ userId, params }) => {
  const { groupId, invitationId } = z
    .object({
      groupId: z.string(),
      invitationId: z.string(),
    })
    .parse(params);

  return await prisma.groupInvite.delete({
    where: {
      id: parseInt(invitationId),
      group: {
        id: parseInt(groupId),
        users: {
          some: {
            userId: parseInt(userId),
          },
        },
      },
    },
  });
});
