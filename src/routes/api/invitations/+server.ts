import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";

export const GET = routeHandlerWithAuth(async ({ userId }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: parseInt(userId),
    },
  });

  return await prisma.groupInvite.findMany({
    where: {
      email: user.email,
    },
    include: {
      group: true,
    },
  });
});
