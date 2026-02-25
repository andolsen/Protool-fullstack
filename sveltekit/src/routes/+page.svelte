<script>
	import LinkComponent from '$components/LinkComponent.svelte';
	import { signIn, signOut, useSession } from '$server/auth/auth-client';

	const session = useSession();
</script>

<div class="h-screen w-screen bg-zinc-800">
	<div class="flex h-full flex-col items-center justify-center">
		<h1 class="text-center text-4xl font-bold text-orange-400">Sveltekit stack</h1>
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
<div class="absolute right-0 bottom-5 left-0 text-center text-white">
	{#if $session.data?.user}
		<p>Logged in as {$session.data?.user?.name}</p>
		<button onclick={() => signOut()} class="rounded-md bg-zinc-700 px-3 py-2 text-white">
			Log out
		</button>
	{:else}
		<button
			onclick={() => signIn.social({ provider: 'microsoft' })}
			class="rounded-md bg-zinc-700 px-3 py-2 text-white"
		>
			Log in
		</button>
	{/if}
</div>
