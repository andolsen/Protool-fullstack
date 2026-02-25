import { env } from '$env/dynamic/public';
import { createAuthClient } from 'better-auth/svelte';

export const { signIn, signOut, useSession } = createAuthClient({
	baseURL: env.PUBLIC_BETTER_AUTH_URL as string || 'http://localhost:5173'
});
