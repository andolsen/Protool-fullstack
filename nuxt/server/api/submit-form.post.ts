import { faker } from "@faker-js/faker";
import { z } from "zod";

export const inputSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	age: z
		.number()
		.min(18, "Must be at least 18 years old")
		.max(100, "Age must be less than 100"),
	phone: z.string().min(5, "Phone number is too short"),
	address: z.string().min(5, "Address is too short"),
});

export const outputSchema = z.object({
	name: z.string(),
	address: z.string(),
});

export interface FormResponse {
	success: boolean;
	message: string;
	data: z.infer<typeof outputSchema>;
	errors?: z.core.$ZodIssue[];
}

export default defineEventHandler(async (event): Promise<FormResponse> => {
	const validatedBody = await readValidatedBody(event, (body) =>
		inputSchema.safeParse(body),
	);

	if (!validatedBody.success) {
		throw createError({
			statusCode: 400,
			statusMessage: "Validation Failed",
			data: validatedBody.error.issues,
		});
	}

	const validatedData = validatedBody.data;

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
