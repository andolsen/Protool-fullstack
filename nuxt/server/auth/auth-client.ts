import { createAuthClient } from "better-auth/vue";

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL as string,
});
