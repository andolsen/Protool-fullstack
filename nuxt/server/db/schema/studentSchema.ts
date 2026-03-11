import { sql } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const studentSchema = sqliteTable("student_table", {
	id: int().primaryKey({ autoIncrement: true }),
	title: text({ length: 255 }).notNull(),
	shortName: text({ length: 255 }).notNull(),
	lastName: text({ length: 255 }).notNull(),
	username: text({ length: 255 }).notNull(),
	department: text({ length: 255 }).notNull(), // Department needs to be a foreign key to the department table
	userType: text({ length: 255 }).notNull(), // User type needs to be a foreign key to the user type table
	contactPerson: text({ length: 255 }).notNull(), // Contact person needs to be a foreign key to the contact person table
	privateEmail: text({ length: 255 }),
	phoneNumber: text({ length: 255 }),
	startDate: integer({ mode: "timestamp" }).notNull(),
	endDate: integer({ mode: "timestamp" }).notNull(),
	socialWorker: text({ length: 255 }).notNull(), // Social worker needs to be a foreign key to the social worker table
	contacts: text({ mode: "json" }),
	address: text({ length: 255 }),
	taxi: text({ length: 255 }),
	concentSMS: integer({ mode: "boolean" }).notNull().default(false),
	concentDriving: integer({ mode: "boolean" }).notNull().default(false),
	concentInfo: integer({ mode: "boolean" }).notNull().default(false),
	pictureLink: text({ length: 255 }),
	user: text({ length: 255 }).notNull(), // User needs to be a foreign key to the user table
	CPR: text({ length: 255 }).notNull(),
	active: integer({ mode: "boolean" }).notNull().default(true),
	dateOfBirth: integer({ mode: "timestamp" }).notNull(),
	archiveNote: text({ length: 255 }),
	prescriptions: text({ mode: "json" }),
	diagnosis: text({ length: 255 }),
	profileType: text({ length: 255 }).notNull(), // Profile type needs to be a foreign key to the profile type table
	createdAt: text().default(sql`(CURRENT_DATE)`),
	updatedAt: text()
		.default(sql`(CURRENT_DATE)`)
		.$onUpdate(() => sql`(CURRENT_DATE)`),
});
