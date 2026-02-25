<script setup lang="ts">
import type { dbCall } from "~~/server/api/dbFetch.get";

definePageMeta({
	middleware: "auth",
});

const {
	data: dbData,
	error,
	pending,
} = useFetch<dbCall>("/api/dbFetch", { lazy: true });
</script>

<template>
	<div class="bg-zinc-800 w-screen h-screen">
		<div class="absolute top-5 left-3">
			<LinkComponent to="/">Home</LinkComponent>
		</div>
		<div class="flex flex-col items-center justify-center h-full">
			<h1 class="text-green-400 text-center text-4xl font-bold">
				Protected page
			</h1>
			<p class="text-white">With protected fetch</p>
			<div v-if="pending" class="m-5 text-white">Loading...</div>
			<div v-else-if="!dbData" class="m-5 text-white">No data found</div>
			<div v-else class="m-5 text-white">
				<h2>Name: {{ dbData?.name }}</h2>
				<p>Email: {{ dbData?.email }}</p>
				<p>Age: {{ dbData?.age }}</p>
			</div>
		</div>
	</div>
</template>
