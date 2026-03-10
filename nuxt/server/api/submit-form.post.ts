import { faker } from "@faker-js/faker";
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

export const outputSchema = v.object({
	name: v.string(),
	address: v.string(),
});

export interface FormResponse {
	success: boolean;
	message: string;
	data: v.InferOutput<typeof outputSchema>;
	errors?: v.BaseIssue<any>[];
}

export default defineEventHandler(async (event): Promise<FormResponse> => {
	const validatedBody = await readValidatedBody(event, (body) =>
		v.safeParse(inputSchema, body),
	);

	if (!validatedBody.success) {
		throw createError({
			statusCode: 400,
			statusMessage: "Validation Failed",
			data: validatedBody.issues,
		});
	}

	const validatedData = validatedBody.output;

	// Now validatedData is fully typed as FormBody
	console.log("Validated form data:", validatedData);

	return {
		success: true,
		message: "Form submitted successfully!",
		data: {
			name: faker.person.fullName(),
			address: faker.location.streetAddress(),
		},
	};
});
