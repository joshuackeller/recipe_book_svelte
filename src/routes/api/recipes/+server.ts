import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import nanoid from "$lib/utilities/backend/nanoid";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";
import slugify from "slugify";

export const GET = routeHandlerWithAuth(async ({ userId, url }) => {
  const search = z
    .string()
    .nullable()
    .optional()
    .parse(url.searchParams.get("search"));
  const tagIds = z
    .array(z.string())
    .nullable()
    .optional()
    .parse((url.searchParams.get("tagIds") ?? "").split(","))
    ?.filter(Boolean);

  return await prisma.recipe.findMany({
    where: {
      OR: [{ userId }, { groups: { some: { users: { some: { userId } } } } }],
      tags:
        !!tagIds && tagIds.length > 0
          ? { some: { id: { in: tagIds } } }
          : undefined,
      name: search ? { contains: search, mode: "insensitive" } : undefined,
    },
  });
});

export const POST = routeHandlerWithAuth(async ({ userId, request }) => {
  const { name, html, tags } = z
    .object({
      name: z.string(),
      html: z.string(),
      tags: z.array(z.object({ name: z.string() })),
    })
    .parse(await request.json());

  const { groups } = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      groups: {
        where: {
          autoAddRecipes: true,
        },
        select: {
          groupId: true,
        },
      },
    },
  });

  return await prisma.recipe.create({
    data: {
      id: nanoid(),
      user: { connect: { id: userId } },
      name,
      html,
      tags:
        !!tags && tags.length > 0
          ? {
              connectOrCreate: tags.map((tag: any) => ({
                where: {
                  userId_slug: {
                    userId,
                    slug: slugify(tag.name, { lower: true }),
                  },
                },
                create: {
                  id: nanoid(),
                  slug: slugify(tag.name, { lower: true }),
                  name: tag.name,
                  user: { connect: { id: userId } },
                },
              })),
            }
          : undefined,
      groups:
        !!groups && groups?.length > 0
          ? {
              connect: groups.map((group) => ({
                id: group.groupId,
              })),
            }
          : undefined,
    },
  });
});

export const PUT = routeHandlerWithAuth(async () => {
  return { test: "cool - put" };
});

export const DELETE = routeHandlerWithAuth(async () => {
  return { test: "cool - delete" };
});
