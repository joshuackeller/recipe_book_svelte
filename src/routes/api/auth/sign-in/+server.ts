import { HttpError } from "$lib/utilities/backend/errors";
import { routeHandler } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = routeHandler(async ({ request }) => {
  const { email, password } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .parse(await request.json());

  let user;
  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
      include: {
        password: true,
      },
    });
  } catch {
    throw new HttpError("Could not find an account with this email", 400);
  }
  if (!user.confirmed) {
    throw new HttpError("Please confirm email before signing in", 400);
  }

  // Missing code
  if (!user.password) {
    throw new HttpError("Please reset password");
  }

  const valid = await bcrypt.compare(password, user.password.hash);

  if (valid === true) {
    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      return { token };
    } else {
      throw new HttpError("Mising jwt secret", 400);
    }
  } else {
    throw new HttpError("Incorrect email or password", 403);
  }
});
