<script setup lang="ts">
import { inputSchema } from "@/server/api/schemas/formSchema";
import { useForm } from "@tanstack/vue-form";

function getServerErrorMessage(error: unknown) {
	if (
		typeof error === "object" &&
		error !== null &&
		"data" in error &&
		typeof error.data === "object" &&
		error.data !== null &&
		"message" in error.data &&
		typeof error.data.message === "string"
	) {
		return error.data.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Something went wrong while submitting the form.";
}

function getFormErrorMessage(error: unknown) {
	if (typeof error === "string") {
		return error;
	}

	if (error && typeof error === "object") {
		const issuesByField = Object.values(
			error as Record<string, Array<{ message?: string }>>,
		);

		for (const issues of issuesByField) {
			const firstIssue = issues?.[0];

			if (firstIssue?.message) {
				return firstIssue.message;
			}
		}
	}

	return null;
}

const form = useForm({
	defaultValues: {
		name: "",
		email: "",
		age: 0,
		phone: "",
		address: "",
	},
	validators: {
		onSubmit: inputSchema,
	},
	onSubmit: async ({ value }) => {
		formResponse.value = null;
		form.setErrorMap({
			onSubmit: undefined,
		});

		try {
			const response = await $fetch("/api/submit-form", {
				method: "POST",
				body: value,
			});
			formResponse.value = response.data;
		} catch (error) {
			form.setErrorMap({
				onSubmit: {
					form: getServerErrorMessage(error),
					fields: {},
				},
			});
		}
	},
});

let formResponse = ref<{
	name: string;
	address: string;
} | null>(null);
</script>

<template>
	<div class="absolute top-5 left-3">
		<LinkComponent to="/">Home</LinkComponent>
	</div>
	<div class="bg-zinc-800 w-screen h-screen overflow-auto">
		<div class="flex flex-col items-center justify-center min-h-full py-10">
			<h1 class="text-green-400 text-center text-4xl font-bold">Form</h1>
			<form
				@submit="
					(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}
				"
				class="m-5 text-white flex flex-col gap-4 w-full max-w-md"
			>
				<form.Field name="name" class="flex flex-col gap-1">
					<template v-slot="{ field, state }">
						<input
							:id="field.name"
							:name="field.name"
							:value="field.state.value"
							@input="
								(e) => field.handleChange((e.target as HTMLInputElement).value)
							"
							type="text"
							placeholder="Name"
							class="p-2 bg-zinc-700 rounded border"
							:class="
								state.meta.errors.length > 0
									? 'border-red-500'
									: 'border-transparent'
							"
						/>
						<FieldInfo :state="state" />
					</template>
				</form.Field>

				<form.Field name="email" class="flex flex-col gap-1">
					<template v-slot="{ field, state }">
						<input
							:id="field.name"
							:name="field.name"
							:value="field.state.value"
							@input="
								(e) => field.handleChange((e.target as HTMLInputElement).value)
							"
							type="email"
							placeholder="Email"
							class="p-2 bg-zinc-700 rounded border"
							:class="
								state.meta.errors.length > 0
									? 'border-red-500'
									: 'border-transparent'
							"
						/>
						<FieldInfo :state="state" />
					</template>
				</form.Field>

				<form.Field name="age" class="flex flex-col gap-1">
					<template v-slot="{ field, state }">
						<input
							:id="field.name"
							:name="field.name"
							:value="field.state.value"
							@input="
								(e) =>
									field.handleChange(
										Number((e.target as HTMLInputElement).value),
									)
							"
							type="number"
							placeholder="Age"
							class="p-2 bg-zinc-700 rounded border"
							:class="
								state.meta.errors.length > 0
									? 'border-red-500'
									: 'border-transparent'
							"
						/>
						<FieldInfo :state="state" />
					</template>
				</form.Field>

				<form.Field name="phone" class="flex flex-col gap-1">
					<template v-slot="{ field, state }">
						<input
							:id="field.name"
							:name="field.name"
							:value="field.state.value"
							@input="
								(e) => field.handleChange((e.target as HTMLInputElement).value)
							"
							type="text"
							placeholder="Phone"
							class="p-2 bg-zinc-700 rounded border"
							:class="
								state.meta.errors.length > 0
									? 'border-red-500'
									: 'border-transparent'
							"
						/>
						<FieldInfo :state="state" />
					</template>
				</form.Field>

				<form.Field name="address" class="flex flex-col gap-1">
					<template v-slot="{ field, state }">
						<input
							:id="field.name"
							:name="field.name"
							:value="field.state.value"
							@input="
								(e) => field.handleChange((e.target as HTMLInputElement).value)
							"
							type="text"
							placeholder="Address"
							class="p-2 bg-zinc-700 rounded border"
							:class="
								state.meta.errors.length > 0
									? 'border-red-500'
									: 'border-transparent'
							"
						/>
						<FieldInfo :state="state" />
					</template>
				</form.Field>

				<form.Subscribe>
					<template v-slot="{ canSubmit, isSubmitting, errorMap }">
						<p
							v-if="getFormErrorMessage(errorMap.onSubmit)"
							class="rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200"
						>
							{{ getFormErrorMessage(errorMap.onSubmit) }}
						</p>
						<button
							type="submit"
							:disabled="!canSubmit"
							class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mt-2"
						>
							{{ isSubmitting ? "Submitting..." : "Submit" }}
						</button>
					</template>
				</form.Subscribe>

				<div
					v-if="formResponse"
					class="mt-6 p-4 bg-zinc-900 rounded border border-zinc-700 w-full"
				>
					<h2 class="text-green-400 font-bold mb-2">Form State:</h2>
					<pre class="text-xs text-zinc-300 overflow-auto">{{
						JSON.stringify(formResponse, null, 2)
					}}</pre>
				</div>
			</form>
		</div>
	</div>
</template>
