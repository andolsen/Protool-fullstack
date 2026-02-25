import { form } from '$app/server';
import { faker } from '@faker-js/faker';
import { inputSchema } from './schema';

export const submitFormData = form(inputSchema, async ({ name, email, age, phone, address }) => {
	console.log('Form data:', { name, email, age, phone, address });

	return {
		success: true,
		message: 'Form submitted successfully!',
		data: {
			name: faker.person.fullName(),
			address: faker.location.streetAddress()
		}
	};
});
