import db from "../db";
import { usersTable } from "../db/schema/schema";
import auth from "../lib/auth";

export type dbCall = {
	name: string;
	age: number;
	email: string;
};

export default defineEventHandler(async (event): Promise<dbCall | null> => {
	try {
		const session = await auth.api.getSession(event);
		if (!session) {
			throw createError({
				statusCode: 401,
				statusMessage: "Unauthorized",
			});
		}

		await new Promise((resolve) => setTimeout(resolve, 2000));

		const data = await db.select().from(usersTable);

		return data[0] ?? null;
	} catch (error) {
		console.error(error);
		return null;
	}
});
