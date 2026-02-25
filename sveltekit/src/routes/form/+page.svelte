<script lang="ts">
	import LinkComponent from '$components/LinkComponent.svelte';
	import { submitFormData } from './data.remote';
</script>

<div class="absolute top-5 left-3">
	<LinkComponent to="/">Home</LinkComponent>
</div>
<div class="h-screen w-screen overflow-auto bg-zinc-800">
	<div class="flex min-h-full flex-col items-center justify-center py-10">
		<h1 class="text-center text-4xl font-bold text-orange-400">Form</h1>

		<form {...submitFormData} class="m-5 flex w-full max-w-md flex-col gap-4 text-white">
			<div class="flex flex-col gap-1">
				<input
					{...submitFormData.fields.name.as('text')}
					placeholder="Name"
					class="rounded bg-zinc-700 p-2"
				/>
				{#each submitFormData.fields.name.issues() as issue}
					<span class="text-sm text-red-500">{issue.message}</span>
				{/each}
			</div>

			<div class="flex flex-col gap-1">
				<input
					{...submitFormData.fields.email.as('email')}
					placeholder="Email"
					class="rounded bg-zinc-700 p-2"
				/>
				{#each submitFormData.fields.email.issues() as issue}
					<span class="text-sm text-red-500">{issue.message}</span>
				{/each}
			</div>

			<div class="flex flex-col gap-1">
				<input
					{...submitFormData.fields.age.as('number')}
					placeholder="Age"
					class="rounded bg-zinc-700 p-2"
				/>
				{#each submitFormData.fields.age.issues() as issue}
					<span class="text-sm text-red-500">{issue.message}</span>
				{/each}
			</div>

			<div class="flex flex-col gap-1">
				<input
					{...submitFormData.fields.phone.as('tel')}
					placeholder="Phone"
					class="rounded bg-zinc-700 p-2"
				/>
				{#each submitFormData.fields.phone.issues() as issue}
					<span class="text-sm text-red-500">{issue.message}</span>
				{/each}
			</div>

			<div class="flex flex-col gap-1">
				<input
					{...submitFormData.fields.address.as('text')}
					placeholder="Address"
					class="rounded bg-zinc-700 p-2"
				/>
				{#each submitFormData.fields.address.issues() as issue}
					<span class="text-sm text-red-500">{issue.message}</span>
				{/each}
			</div>

			<button
				type="submit"
				class="mt-2 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600 disabled:opacity-50"
			>
				Submit
			</button>
			{#if submitFormData.result}
				<p class="mt-4 text-center font-semibold">{submitFormData.result?.message}</p>

				<div class="mt-6 w-full rounded border border-zinc-700 bg-zinc-900 p-4">
					<h2 class="mb-2 font-bold text-orange-400">Data returned from server:</h2>
					<pre class="overflow-auto text-xs text-zinc-300">
						{JSON.stringify(submitFormData.result, null, 2)}
				</pre>
				</div>
			{/if}
		</form>
	</div>
</div>
