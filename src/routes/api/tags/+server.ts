import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import nanoid from "$lib/utilities/backend/nanoid";
import prisma from "$lib/utilities/backend/prismaClient";
import slugify from "slugify";
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
        {
          recipes: {
            some: {
              userId,
            },
          },
        },
        {
          recipes: {
            some: {
              groups: {
                some: {
                  users: {
                    some: {
                      userId,
                    },
                  },
                },
              },
            },
          },
        },
      ],
    },
    take: 10,
    orderBy: {
      name: "asc",
    },
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
      id: nanoid(),
      name,
      slug: slugify(name, { lower: true }),
      recipes: recipeId
        ? {
            connect: {
              id_userId: {
                id: recipeId,
                userId,
              },
            },
          }
        : undefined,
    },
  });
});
