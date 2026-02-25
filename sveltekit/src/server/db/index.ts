import { env } from '$env/dynamic/private';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema/schema';

if (!env.PRIVATE_DB_CONNECTION_STRING) throw new Error('PRIVATE_DB_CONNECTION_STRING is not set');

const client = new Database(env.PRIVATE_DB_CONNECTION_STRING.replace('file:', '') as string);

export const db = drizzle(client, { schema });
