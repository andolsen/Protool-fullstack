import { faker } from "@faker-js/faker";
import * as v from "valibot";
import { inputSchema } from "./schemas/formSchema";

export default defineEventHandler(async (event) => {
	const validatedBody = await readValidatedBody(event, (body) =>
		v.safeParse(inputSchema, body),
	);

	if (validatedBody.issues) {
		throw createError({
			statusCode: 400,
			message: v.summarize(validatedBody.issues),
		});
	}

	const validatedData = validatedBody.output;

	// Now validatedData is fully typed as FormBody
	console.log("Validated form data:", validatedData);

	return {
		message: "Form submitted successfully!",
		data: {
			name: faker.person.fullName(),
			address: faker.location.streetAddress(),
		},
	};
});
