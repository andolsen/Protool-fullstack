<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<!-- <svelte:head><link rel="icon" href={favicon} /></svelte:head> -->
<svelte:head><link rel="icon" href="/favicon.svg" /></svelte:head>
{@render children()}
