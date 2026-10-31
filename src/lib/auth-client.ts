import { createAuthClient } from "better-auth/react";

// No baseURL needed: the client calls the same site it is running on
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;