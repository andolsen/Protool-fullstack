import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { db } from '../db/index';
import * as authSchema from '../db/schema/auth.schema';

export const auth = betterAuth({
	baseURL: env.PUBLIC_BETTER_AUTH_URL || 'http://localhost:5173',
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: authSchema
	}),
	emailAndPassword: { enabled: true },
	socialProviders: {
		microsoft: {
			clientId: env.PRIVATE_MICROSOFT_CLIENT_ID as string,
			clientSecret: env.PRIVATE_MICROSOFT_CLIENT_SECRET as string,
			tenantId: 'common',
			authority: 'https://login.microsoftonline.com', // Authentication authority URL
			prompt: 'select_account' // Forces account selection
		}
	},
	plugins: [sveltekitCookies(getRequestEvent)] // make sure this is the last plugin in the array
});
