<script setup lang="ts">
import { signIn, signOut, useSession } from "@/server/auth/auth-client";

const session = useSession();
const user = computed(() => session.value.data?.user);
</script>

<template>
	<div class="bg-zinc-800 w-screen h-screen">
		<div class="flex flex-col items-center justify-center h-full">
			<h1 class="text-green-400 text-center text-4xl font-bold">Nuxt stack</h1>
			<div class="m-5">
				<ul class="flex gap-2">
					<li class="text-white">
						<LinkComponent to="/fetch">Fetch</LinkComponent>
					</li>
					<li>
						<LinkComponent to="/form">Form</LinkComponent>
					</li>
					<li>
						<LinkComponent to="/protected">Protected</LinkComponent>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div
		v-if="user"
		class="absolute bottom-5 left-0 right-0 text-center text-white"
	>
		<p>Logged in as {{ user?.name }}</p>
		<p>Organization ID: {{ user?.organizationId }}</p>
		<p>Modules: {{ user?.modules }}</p>
		<button
			class="text-white px-3 py-2 rounded-md bg-zinc-700"
			@click="() => signOut()"
		>
			Log out
		</button>
	</div>
	<div v-else class="absolute bottom-5 left-0 right-0 text-center text-white">
		<button
			class="text-white px-3 py-2 rounded-md bg-zinc-700"
			v-if="!user"
			@click="
				() =>
					signIn.social({
						provider: 'microsoft',
					})
			"
		>
			Log in
		</button>
	</div>
</template>
