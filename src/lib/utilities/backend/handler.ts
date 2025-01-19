// src/lib/utils.js

import type { RequestEvent } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { HttpError } from "./errors";
import { ZodError } from "zod";

type Handler = (event: RequestEvent) => Promise<any>;

export function routeHandler(handler: Handler) {
  return async function (event: RequestEvent) {
    try {
      const result = await handler(event);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      let errorMessage = (error as any).message || "Internal Server Error";
      let status = (error as any).status || 500;

      if (error instanceof ZodError) {
        errorMessage = `Validation Error: ${JSON.stringify(
          error.flatten().fieldErrors,
          null,
          2
        )}`;
        status = 400;
      }
      return new Response(
        JSON.stringify({
          error: errorMessage,
        }),
        {
          status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
}

type AuthorizedRequestEvent = RequestEvent & { userId: string };
type AuthorizedHandler = (event: AuthorizedRequestEvent) => Promise<any>;

export function routeHandlerWithAuth(handler: AuthorizedHandler) {
  return async function (event: AuthorizedRequestEvent) {
    try {
      const token = event.request.headers.get("Authorization");

      let verified = false;
      if (!!token) {
        if (jwt.verify(token, process.env.JWT_SECRET!)) {
          verified = true;
        } else {
          throw new HttpError("Invalid token", 403);
        }
      } else {
        throw new HttpError("Missing Authorization Header", 403);
      }

      if (verified) {
        const { userId } = jwt.decode(token) as any;
        event.userId = userId;
      } else {
        throw new HttpError("Invalid token", 403);
      }

      // Call the original handler
      const result = await handler(event);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      let errorMessage = (error as any).message || "Internal Server Error";
      let status = (error as any).status || 500;

      if (error instanceof ZodError) {
        errorMessage = `Validation Error: ${JSON.stringify(
          error.flatten().fieldErrors,
          null,
          2
        )}`;
        status = 400;
      }
      return new Response(
        JSON.stringify({
          error: errorMessage,
        }),
        {
          status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
}
