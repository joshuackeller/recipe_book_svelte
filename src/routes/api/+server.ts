import { routeHandlerWithAuth } from "$lib/utilities/backend/handler";

export const GET = routeHandlerWithAuth(async () => {
  return { test: "cool - get" };
});

export const POST = routeHandlerWithAuth(async () => {
  return { test: "cool - post" };
});

export const PUT = routeHandlerWithAuth(async () => {
  return { test: "cool - put" };
});

export const DELETE = routeHandlerWithAuth(async () => {
  return { test: "cool - delete" };
});
