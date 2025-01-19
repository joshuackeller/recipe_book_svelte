import { HttpError } from "$lib/utilities/backend/errors";
import { routeHandler } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SpecialToken, {
  SpecialTokenType,
} from "$lib/utilities/backend/SpecialToken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

const SALT_ROUNDS = 12;

export const POST = routeHandler(async ({ request }) => {
  const { email, name, password } = z
    .object({
      email: z.string().email(),
      name: z.string(),
      password: z.string().min(8, "Password must be 8 characters or more "),
    })
    .parse(await request.json());

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!!user) {
    throw new HttpError("Email already in use", 400);
  } else {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    user = await prisma.user.create({
      data: {
        email,
        name,
        confirmed: false,
        password: {
          create: {
            hash,
          },
        },
      },
    });

    const token = jwt.sign(
      { userId: user.id },
      SpecialToken(SpecialTokenType.confirm_account)
    );
    try {
      await resend.emails.send({
        from: "Recipio <no-reply@mail.joshkeller.info>",
        to: [email],
        subject: "Confirm Email",
        html: `
            <div>
                <p>Click the following link to confirm your email:  <a href="${process.env.WEBSITE_URL}/api/auth/confirm?token=${token}"> ${process.env.WEBSITE_URL}/auth/confirm?token=${token}</a></p>
            </div>
            `,
        text: `<p>Click the following link to confirm your email: ${process.env.WEBSITE_URL}/api/auth/confirm?token=${token}`,
      });
    } catch (error) {
      console.error(error);
    }

    return {
      message: "Account created successfully. Confirm email before signing in.",
    };
  }
});
