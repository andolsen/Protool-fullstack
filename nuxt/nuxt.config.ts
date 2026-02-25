import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	future: {
		compatibilityVersion: 4,
	},
	app: {
		head: {
			title: "Protool",
		},
	},
	router: {
		options: {
			scrollBehaviorType: "smooth",
		},
	},
	alias: {
		"@": path.resolve(__dirname, "./"),
		"@db": path.resolve(__dirname, "./server/db"),
	},
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
});
