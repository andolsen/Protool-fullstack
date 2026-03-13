import * as schema from "@/server/db/schema/authSchema";
import db from "@db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema,
	}),
	user: {
		additionalFields: {
			organizationId: {
				type: "string",
				required: true,
				input: false,
			},
			modules: {
				type: "string[]",
				required: true,
				input: false,
			},
		},
	},
	socialProviders: {
		microsoft: {
			clientId: process.env.MICROSOFT_CLIENT_ID as string,
			clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
			tenantId: "common",
			authority: "https://login.microsoftonline.com", // Authentication authority URL
			prompt: "select_account", // Forces account selection
			mapProfileToUser: async (profile) => {
				return {
					organizationId: profile.tid, // Tennant ID from microsoft
					modules: JSON.stringify(["module1", "module2", "module3"]), // This will be a db call instead in the final version
				};
			},
		},
	},
});

export default auth;
