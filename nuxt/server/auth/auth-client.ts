import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type auth from "./auth";

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL as string,
	plugins: [inferAdditionalFields<typeof auth>()],
});
