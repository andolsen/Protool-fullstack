import { useSession } from "@/server/lib/auth-client";

export default defineNuxtRouteMiddleware(async () => {
	const session = useSession().value.data?.user;

	console.error("Not authenticated");

	if (!session) {
		return navigateTo("/");
	}
});
