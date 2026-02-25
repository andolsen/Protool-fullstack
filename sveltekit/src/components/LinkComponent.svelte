<script lang="ts">
	let { children, to }: { children: any; to: string } = $props();
</script>

<a href={to} class="rounded-md bg-zinc-700 px-3 py-2 text-white">
	{@render children()}
</a>
