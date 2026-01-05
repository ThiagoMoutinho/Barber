import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Se estiver no mesmo domínio, não precisa de baseURL.
  // Isso evita problemas se você mudar a porta (3000, 3001, etc)
});
