import { createAuthClient } from "@neondatabase/auth/next";

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL || "https://your-neon-auth-url-here.neon.tech/neondb/auth";

export const authClient = createAuthClient();

export const { signIn, signUp, useSession, signOut } = authClient;
