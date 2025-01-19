import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, params }) => {
  const { groupId } = z
    .object({
      groupId: z.string(),
    })
    .parse(params);

  return await prisma.user.findMany({
    where: {
      groups: {
        some: {
          groupId: parseInt(groupId),
          group: {
            users: {
              some: {
                userId: parseInt(userId),
              },
            },
          },
        },
      },
    },
  });
});
