import { routeHandler } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";
import jwt from "jsonwebtoken";
import SpecialToken, {
  SpecialTokenType,
} from "$lib/utilities/backend/SpecialToken";
import { redirect } from "@sveltejs/kit";

export const GET = routeHandler(async ({ request }) => {
  const { token } = z
    .object({
      token: z.string(),
    })
    .parse(await request.json());

  try {
    jwt.verify(token, SpecialToken(SpecialTokenType.confirm_account));
    const { userId } = jwt.decode(token) as any;

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        confirmed: true,
      },
    });

    throw redirect(
      302,
      `${process.env.WEBSITE_URL}/recipes?authFlow=confirm_success`
    );
  } catch {
    return redirect(
      302,
      `${process.env.WEBSITE_URL}/recipes?authFlow=confirm_error`
    );
  }
});
