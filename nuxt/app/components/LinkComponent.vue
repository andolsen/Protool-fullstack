<template>
	<NuxtLink :to="to" class="text-white px-3 py-2 rounded-md bg-zinc-700">
		<slot />
	</NuxtLink>
</template>
<script setup lang="ts">
const props = defineProps<{
	to: string;
}>();
</script>
