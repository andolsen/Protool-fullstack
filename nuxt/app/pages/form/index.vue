<script setup lang="ts">
import type z from "zod";
import type { FormResponse, inputSchema } from "~~/server/api/submit-form.post";

const form = ref<z.infer<typeof inputSchema>>({
	name: "",
	email: "",
	age: 0,
	phone: "",
	address: "",
});

const isSubmitting = ref(false);
const responseMessage = ref("");
const errors = ref<Record<string, string>>({});

// Use Nuxt's useState with the inferred type from the server
const responseData = useState<FormResponse["data"] | null>(
	"submitted-form-data",
	() => null,
);

const handleSubmit = async () => {
	isSubmitting.value = true;
	responseMessage.value = "";
	errors.value = {};
	responseData.value = null;

	try {
		// Nuxt 4 $fetch is typesafe based on the server/api/submit-form.post.ts definition
		const response = await $fetch<FormResponse>("/api/submit-form", {
			method: "POST",
			body: form.value,
		});
		responseMessage.value = response.message;
		responseData.value = response.data ?? null;
		console.log("Response:", response);
	} catch (error: any) {
		console.error("Error submitting form:", error);

		// In Nuxt $fetch, the response body is under error.response._data
		const errorData = error.response?._data;

		if (error.statusCode === 400 && errorData?.data) {
			// Handle Zod validation errors from the backend
			const issues = errorData.data;
			if (Array.isArray(issues)) {
				issues.forEach((issue: any) => {
					const path = issue.path[0];
					if (path) {
						errors.value[path] = issue.message;
					}
				});
			}
			responseMessage.value = "Please fix the errors.";
		} else {
			responseMessage.value =
				error.statusMessage || "An error occurred during submission.";
		}
	} finally {
		isSubmitting.value = false;
	}
};
</script>

<template>
	<div class="absolute top-5 left-3">
		<LinkComponent to="/">Home</LinkComponent>
	</div>
	<div class="bg-zinc-800 w-screen h-screen overflow-auto">
		<div class="flex flex-col items-center justify-center min-h-full py-10">
			<h1 class="text-green-400 text-center text-4xl font-bold">Form</h1>
			<form
				@submit.prevent="handleSubmit"
				class="m-5 text-white flex flex-col gap-4 w-full max-w-md"
			>
				<div class="flex flex-col gap-1">
					<input
						v-model="form.name"
						name="name"
						type="text"
						placeholder="Name"
						class="p-2 bg-zinc-700 rounded border"
						:class="errors.name ? 'border-red-500' : 'border-transparent'"
					/>
					<span v-if="errors.name" class="text-red-500 text-sm">{{
						errors.name
					}}</span>
				</div>

				<div class="flex flex-col gap-1">
					<input
						v-model="form.email"
						name="email"
						type="email"
						placeholder="Email"
						class="p-2 bg-zinc-700 rounded border"
						:class="errors.email ? 'border-red-500' : 'border-transparent'"
					/>
					<span v-if="errors.email" class="text-red-500 text-sm">{{
						errors.email
					}}</span>
				</div>

				<div class="flex flex-col gap-1">
					<input
						v-model.number="form.age"
						name="age"
						type="number"
						placeholder="Age"
						class="p-2 bg-zinc-700 rounded border"
						:class="errors.age ? 'border-red-500' : 'border-transparent'"
					/>
					<span v-if="errors.age" class="text-red-500 text-sm">{{
						errors.age
					}}</span>
				</div>

				<div class="flex flex-col gap-1">
					<input
						v-model="form.phone"
						name="phone"
						type="text"
						placeholder="Phone"
						class="p-2 bg-zinc-700 rounded border"
						:class="errors.phone ? 'border-red-500' : 'border-transparent'"
					/>
					<span v-if="errors.phone" class="text-red-500 text-sm">{{
						errors.phone
					}}</span>
				</div>

				<div class="flex flex-col gap-1">
					<input
						v-model="form.address"
						name="address"
						type="text"
						placeholder="Address"
						class="p-2 bg-zinc-700 rounded border"
						:class="errors.address ? 'border-red-500' : 'border-transparent'"
					/>
					<span v-if="errors.address" class="text-red-500 text-sm">{{
						errors.address
					}}</span>
				</div>

				<button
					:disabled="isSubmitting"
					type="submit"
					class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-2"
				>
					{{ isSubmitting ? "Submitting..." : "Submit" }}
				</button>
				<p
					v-if="responseMessage"
					class="mt-4 text-center font-semibold"
					:class="
						Object.keys(errors).length > 0 ? 'text-red-400' : 'text-green-400'
					"
				>
					{{ responseMessage }}
				</p>

				<div
					v-if="responseData"
					class="mt-6 p-4 bg-zinc-900 rounded border border-zinc-700 w-full"
				>
					<h2 class="text-green-400 font-bold mb-2">
						Data returned from server:
					</h2>
					<pre class="text-xs text-zinc-300 overflow-auto">{{
						JSON.stringify(responseData, null, 2)
					}}</pre>
				</div>
			</form>
		</div>
	</div>
</template>
