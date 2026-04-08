<script lang="ts">
	import { use_dark_mode, type DarkModeSetting } from '$lib/context/dark_mode.context.svelte';

	const { dark_mode_setting } = use_dark_mode();

	const SETTINGS: DarkModeSetting[] = ['light', 'system', 'dark'];

	function toggle_mode() {
		const current_index = SETTINGS.indexOf(dark_mode_setting.current);
		const next_index = (current_index + 1) % SETTINGS.length;
		dark_mode_setting.current = SETTINGS[next_index];
	}
</script>

<button
	onclick={toggle_mode}
	class="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-transparent transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
	aria-label="Toggle theme ({dark_mode_setting.current})"
>
	<!-- Sun icon (visible in light mode) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="h-4 w-4 scale-100 rotate-0 text-gray-700 transition-all dark:scale-0 dark:-rotate-90"
	>
		<circle cx="12" cy="12" r="4"></circle>
		<path d="M12 2v2"></path>
		<path d="M12 20v2"></path>
		<path d="m4.93 4.93 1.41 1.41"></path>
		<path d="m17.66 17.66 1.41 1.41"></path>
		<path d="M2 12h2"></path>
		<path d="M20 12h2"></path>
		<path d="m6.34 17.66-1.41 1.41"></path>
		<path d="m19.07 4.93-1.41 1.41"></path>
	</svg>
	<!-- Moon icon (visible in dark mode) -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="absolute h-4 w-4 scale-0 rotate-90 text-gray-300 transition-all dark:scale-100 dark:rotate-0"
	>
		<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
	</svg>
	<span class="sr-only">Toggle theme</span>
</button>
