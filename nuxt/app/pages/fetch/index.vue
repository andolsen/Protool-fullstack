<script setup lang="ts">
import type { UserData } from "~~/server/api/datafetch.get";

const {
	data: user,
	error,
	pending,
} = useFetch<UserData>("/api/datafetch", { lazy: true });
</script>

<template>
	<div class="absolute top-5 left-3">
		<LinkComponent to="/">Home</LinkComponent>
	</div>
	<div class="bg-zinc-800 w-screen h-screen">
		<div class="flex flex-col items-center justify-center h-full">
			<h1 class="text-green-400 text-center text-4xl font-bold">Fetch data</h1>
			<div v-if="pending" class="m-5 text-white">Loading...</div>
			<div v-else-if="!user" class="m-5 text-white">No data found</div>
			<div v-else class="m-5 text-white">
				<h2>Name: {{ user?.name }}</h2>
				<p>Email: {{ user?.email }}</p>
				<p>Age: {{ user?.age }}</p>
				<p>Phone: {{ user?.phone }}</p>
				<p>Address: {{ user?.address }}</p>
			</div>
		</div>
	</div>
</template>
