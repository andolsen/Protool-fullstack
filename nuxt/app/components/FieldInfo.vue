<script setup lang="ts">
import type { AnyFieldApi } from "@tanstack/vue-form";

const props = defineProps<{
	state: AnyFieldApi["state"];
}>();
</script>

<template>
	<template v-if="props.state.meta.isTouched">
		<em class="text-red-500 text-sm" v-for="error of props.state.meta.errors">{{
			error.message
		}}</em>
		<em v-if="props.state.meta.isValidating" class="text-sm">{{
			props.state.meta.isValidating ? "Validating..." : null
		}}</em>
	</template>
</template>
