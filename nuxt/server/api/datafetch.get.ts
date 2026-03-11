import { faker } from "@faker-js/faker";

export type UserData = {
	name: string;
	email: string;
	age: number;
	phone: string;
	address: string;
};

export default defineEventHandler(async (): Promise<UserData> => {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// Call db

	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		age: faker.number.int({ min: 18, max: 65 }),
		phone: faker.phone.number(),
		address: faker.location.streetAddress(),
	};
});
