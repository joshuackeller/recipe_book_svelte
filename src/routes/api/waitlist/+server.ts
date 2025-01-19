import { routeHandler } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";

export const POST = routeHandler(async ({ request }) => {
  const { name, email } = z
    .object({
      name: z.string(),
      email: z.string().email(),
    })
    .parse(await request.json());

  return await prisma.waitlistMember.create({
    data: {
      name,
      email,
    },
  });
});
