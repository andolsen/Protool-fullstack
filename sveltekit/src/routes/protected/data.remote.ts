import { getRequestEvent, query } from '$app/server';
import { auth } from '$server/auth/auth';

import { faker } from '@faker-js/faker';
import { error } from '@sveltejs/kit';

export const getDbData = query(async () => {
	const event = getRequestEvent();
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (!session) {
		error(401, 'Unauthorized');
	}

	await new Promise((resolve) => setTimeout(resolve, 2000));

	return {
		name: faker.person.fullName(),
		age: faker.number.int({ min: 18, max: 65 }),
		email: faker.internet.email()
	};
});
