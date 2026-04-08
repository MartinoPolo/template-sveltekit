<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
>
	<h1 class="mb-4 text-3xl font-bold">Welcome to SvelteKit</h1>
	<p class="mb-8">
		Visit <a
			class="text-blue-600 underline dark:text-blue-400"
			href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a
		> to read the documentation
	</p>
	<DarkModeToggle />
</main>
