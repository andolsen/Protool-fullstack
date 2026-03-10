import * as v from "valibot";

export const inputSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(2, "Name must be at least 2 characters"),
	),
	email: v.pipe(v.string(), v.email("Invalid email address")),
	age: v.pipe(
		v.number(),
		v.minValue(18, "Must be at least 18 years old"),
		v.maxValue(100, "Age must be less than 100"),
	),
	phone: v.pipe(v.string(), v.minLength(5, "Phone number is too short")),
	address: v.pipe(v.string(), v.minLength(5, "Address is too short")),
});
