import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

const client = createClient({
	url: "file:local.db",
});

const db = drizzle(client);

export default db;
