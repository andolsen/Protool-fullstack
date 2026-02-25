import { form } from '$app/server';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

const inputSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Age must be less than 100'),
	phone: z.string().min(5, 'Phone number is too short'),
	address: z.string().min(5, 'Address is too short')
});

// const outputSchema = z.object({
// 	name: z.string(),
// 	address: z.string()
// });

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
