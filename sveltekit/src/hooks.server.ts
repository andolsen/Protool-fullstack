import { building } from '$app/environment';
import { auth } from '$server/auth/auth';
import { redirect, type Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (event.url.pathname.startsWith('/protected')) {
		if (!session) {
			return redirect(302, '/');
		}
	}

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
export const handle: Handle = handleBetterAuth;
