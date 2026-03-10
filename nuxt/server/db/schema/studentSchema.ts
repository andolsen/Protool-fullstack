import * as v from "valibot";

export const studentSchema = v.object({
	name: v.pipe(v.string(), v.trim(), v.minLength(1, "Name is required")),
	age: v.pipe(v.number(), v.minValue(1, "Age is required")),
	email: v.pipe(v.string(), v.trim(), v.email("Invalid email address")),
});
