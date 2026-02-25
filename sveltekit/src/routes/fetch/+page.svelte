<script lang="ts">
	import LinkComponent from '$components/LinkComponent.svelte';
	import { getFetchData } from './data.remote';

	const query = getFetchData();
</script>

<div class="absolute top-5 left-3">
	<LinkComponent to="/">Home</LinkComponent>
</div>
<div class="h-screen w-screen bg-zinc-800">
	<div class="flex h-full flex-col items-center justify-center">
		<h1 class="text-center text-4xl font-bold text-orange-400">Fetch data</h1>
		{#if query.loading}
			<div class="m-5 text-white">Loading...</div>
		{:else if query.error}
			<div class="m-5 text-white">Error: {query.error.message}</div>
		{:else}
			<div class="m-5 text-white">
				<h2>Name: {query.current?.name}</h2>
				<p>Email: {query.current?.email}</p>
				<p>Age: {query.current?.age}</p>
				<p>Phone: {query.current?.phone}</p>
				<p>Address: {query.current?.address}</p>
			</div>
		{/if}
	</div>
</div>
