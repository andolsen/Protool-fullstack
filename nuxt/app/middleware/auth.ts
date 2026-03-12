import { useSession } from "@/server/auth/auth-client";

export default defineNuxtRouteMiddleware(async () => {
	const session = useSession();

	if (!session.value.data) {
		return navigateTo("/");
	}
});
