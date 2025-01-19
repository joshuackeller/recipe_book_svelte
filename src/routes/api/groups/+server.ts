import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId }) => {
  return await prisma.group.findMany({
    where: {
      users: {
        some: {
          userId: parseInt(userId),
        },
      },
    },
  });
});

export const POST = routeHandlerWithAuth(async ({ userId, request }) => {
  const { name, autoAddRecipes } = z
    .object({
      name: z.string(),
      autoAddRecipes: z.boolean(),
    })
    .parse(await request.json());

  return await prisma.group.create({
    data: {
      name,
      users: {
        create: {
          userId: parseInt(userId),
          autoAddRecipes,
        },
      },
    },
  });
});
