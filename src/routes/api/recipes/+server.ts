import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const GET = routeHandlerWithAuth(async ({ userId, url }) => {
  const search = z
    .string()
    .nullable()
    .optional()
    .parse(url.searchParams.get("search"));
  const tagIds = z
    .array(z.string().transform((val) => parseInt(val)))
    .nullable()
    .optional()
    .parse((url.searchParams.get("tagIds") ?? "").split(","))
    ?.filter(Boolean);

  return await prisma.recipe.findMany({
    where: {
      OR: [
        { userId: parseInt(userId) },
        { groups: { some: { users: { some: { userId: parseInt(userId) } } } } },
      ],
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
      tags: z.array(z.object({ id: z.number().optional(), name: z.string() })),
    })
    .parse(await request.json());

  const { groups } = await prisma.user.findUniqueOrThrow({
    where: { id: parseInt(userId) },
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
      user: { connect: { id: parseInt(userId) } },
      name,
      html,
      tags:
        !!tags && tags.length > 0
          ? {
              connectOrCreate: tags.map((tag: any) => ({
                where: {
                  id_userId: {
                    id: tag.id ?? -1,
                    userId: parseInt(userId),
                  },
                },
                create: {
                  name: tag.name,
                  user: { connect: { id: parseInt(userId) } },
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
