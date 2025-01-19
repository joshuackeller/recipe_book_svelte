import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ url, userId }) => {
  const search = z
    .string()
    .nullable()
    .optional()
    .parse(url.searchParams.get("search"));

  return await prisma.tag.findMany({
    where: {
      name: !!search ? { contains: search, mode: "insensitive" } : undefined,
      OR: [
        { userId: parseInt(userId) },
        {
          recipes: {
            some: {
              groups: {
                some: {
                  users: {
                    some: {
                      userId: parseInt(userId),
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
    take: 5,
  });
});

export const POST = routeHandlerWithAuth(async ({ userId, request }) => {
  const { name, recipeId } = z
    .object({
      name: z.string(),
      recipeId: z.string().optional(),
    })
    .parse(await request.json());

  return await prisma.tag.create({
    data: {
      name,
      userId: parseInt(userId),
      recipes: recipeId
        ? {
            connect: {
              id_userId: {
                id: parseInt(recipeId),
                userId: parseInt(userId),
              },
            },
          }
        : undefined,
    },
  });
});
