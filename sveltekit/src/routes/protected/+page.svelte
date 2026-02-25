<script lang="ts">
	import LinkComponent from '$components/LinkComponent.svelte';
	import { getDbData } from './data.remote';

	const query = getDbData();
</script>

<div class="h-screen w-screen bg-zinc-800">
	<div class="absolute top-5 left-3">
		<LinkComponent to="/">Home</LinkComponent>
	</div>
	<div class="flex h-full flex-col items-center justify-center">
		<h1 class="text-center text-4xl font-bold text-orange-400">Protected page</h1>
		<p class="text-white">With protected fetch</p>
		{#if query.loading}
			<div class="m-5 text-white">Loading...</div>
		{:else if query.error}
			<div class="m-5 text-white">Error: {query.error.message}</div>
		{:else}
			<div class="m-5 text-white">
				<h2>Name: {query.current?.name}</h2>
				<p>Email: {query.current?.email}</p>
				<p>Age: {query.current?.age}</p>
			</div>
		{/if}
	</div>
</div>
