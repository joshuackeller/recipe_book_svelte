import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import nanoid from "$lib/utilities/backend/nanoid";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, params }) => {
  const { groupId } = z
    .object({
      groupId: z.string(),
    })
    .parse(params);

  return await prisma.groupInvite.findMany({
    where: {
      groupId,
      group: {
        users: {
          some: {
            userId,
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
});

export const POST = routeHandlerWithAuth(
  async ({ userId, params, request }) => {
    const { groupId } = z
      .object({
        groupId: z.string(),
      })
      .parse(params);
    const { name, email } = z
      .object({
        name: z.string(),
        email: z.string().email(),
      })
      .parse(await request.json());

    // validate user is in group
    await prisma.group.findUniqueOrThrow({
      where: {
        id: groupId,
        users: {
          some: {
            userId,
          },
        },
      },
    });

    return await prisma.groupInvite.create({
      data: {
        id: nanoid(),
        name,
        email,
        groupId,
      },
    });
  }
);
