import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const POST = routeHandlerWithAuth(async ({ userId, params }) => {
  const { invitationId } = z
    .object({
      invitationId: z.string(),
    })
    .parse(params);

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: parseInt(userId),
    },
  });

  const invitation = await prisma.groupInvite.findUniqueOrThrow({
    where: {
      id: parseInt(invitationId),
      email: user.email,
    },
    include: {
      group: true,
    },
  });

  await prisma.group.update({
    where: {
      id: invitation.groupId,
    },
    data: {
      users: {
        create: {
          userId: parseInt(userId),
        },
      },
      invitations: {
        delete: {
          email_groupId: {
            email: user.email,
            groupId: invitation.groupId,
          },
        },
      },
    },
  });

  return invitation;
});

export const DELETE = routeHandlerWithAuth(async ({ params, userId }) => {
  const { invitationId } = z
    .object({
      invitationId: z.string(),
    })
    .parse(params);

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: parseInt(userId),
    },
  });

  const invitation = await prisma.groupInvite.findUniqueOrThrow({
    where: {
      id: parseInt(invitationId),
      email: user.email,
    },
    include: {
      group: true,
    },
  });

  await prisma.group.update({
    where: {
      id: invitation.groupId,
    },
    data: {
      invitations: {
        delete: {
          email_groupId: {
            email: user.email,
            groupId: invitation.groupId,
          },
        },
      },
    },
  });

  return invitation;
});
