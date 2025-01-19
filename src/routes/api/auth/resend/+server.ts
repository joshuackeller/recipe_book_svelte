import { HttpError } from "$lib/utilities/backend/errors";
import { routeHandler } from "$lib/utilities/backend/handler";
import prisma from "$lib/utilities/backend/prismaClient";
import { z } from "zod";
import jwt from "jsonwebtoken";
import SpecialToken, {
  SpecialTokenType,
} from "$lib/utilities/backend/SpecialToken";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const POST = routeHandler(async ({ request }) => {
  const { email } = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .parse(await request.json());

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!!user) {
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
                <p>Click the following link to confirm your email:  <a href="${process.env.WEBSITE_URL}/auth/confirm?token=${token}"> ${process.env.WEBSITE_URL}/auth/confirm?token=${token}</a></p>
            </div>
            `,
        text: `Click the following link to confirm your email: ${process.env.WEBSITE_URL}/auth/confirm?token=${token}`,
      });
    } catch (error) {
      console.error(error);
    }
    return {
      message: "Email sent successfully",
    };
  } else {
    throw new HttpError(
      "No account with this email was found. Please create a new account",
      400
    );
  }
});
