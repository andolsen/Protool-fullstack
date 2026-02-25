import { defineConfig } from 'drizzle-kit';

if (!process.env.PRIVATE_DB_CONNECTION_STRING) throw new Error('DATABASE_URL is not set');

export default defineConfig({
	schema: './src/server/db/schema',
	dialect: 'sqlite',
	dbCredentials: { url: process.env.PRIVATE_DB_CONNECTION_STRING }
});
