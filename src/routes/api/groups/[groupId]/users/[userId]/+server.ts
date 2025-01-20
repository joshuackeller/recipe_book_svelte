import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(
  async ({ userId: authUserId, params }) => {
    const { groupId, userId } = z
      .object({
        groupId: z.string(),
        userId: z.string(),
      })
      .parse(params);

    return await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
        groups: {
          some: {
            groupId,
            userId: authUserId,
          },
        },
      },
    });
  }
);

export const DELETE = routeHandlerWithAuth(
  async ({ userId: authUserId, params }) => {
    const { groupId, userId } = z
      .object({
        groupId: z.string(),
        userId: z.string(),
      })
      .parse(params);

    return await prisma.userGroup.delete({
      where: {
        userId_groupId: {
          userId,
          groupId,
        },
        group: {
          users: {
            some: {
              userId: authUserId,
            },
          },
        },
      },
    });
  }
);
