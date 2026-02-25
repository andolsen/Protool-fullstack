import { query } from '$app/server';

import { faker } from '@faker-js/faker';

export const getFetchData = query(async () => {
	await new Promise((resolve) => setTimeout(resolve, 2000));

	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		age: faker.number.int({ min: 18, max: 65 }),
		phone: faker.phone.number(),
		address: faker.location.streetAddress()
	};
});
