import * as z from 'zod';

export const inputSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address'),
	age: z.number().min(18, 'Must be at least 18 years old').max(100, 'Age must be less than 100'),
	phone: z.string().min(5, 'Phone number is too short'),
	address: z.string().min(5, 'Address is too short')
});
