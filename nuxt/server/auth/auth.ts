import db from "@db";
import * as schema from "@db/schema/auth-schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema,
	}),
	socialProviders: {
		microsoft: {
			clientId: process.env.MICROSOFT_CLIENT_ID as string,
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
			tenantId: "common",
			authority: "https://login.microsoftonline.com", // Authentication authority URL
			prompt: "select_account", // Forces account selection
		},
	},
});

export default auth;
