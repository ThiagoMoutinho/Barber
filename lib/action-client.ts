import { createSafeActionClient } from "next-safe-action";
import { auth } from "./auth";
import { headers } from "next/headers";

export const actionClient = createSafeActionClient();

export const protectionActionClient = actionClient.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // usuário autenticado?
  if (!session?.user) {
    throw new Error("Usuário não autenticado. Por favor, faça login.");
  }

  return next({ ctx: { user: session.user } });
});