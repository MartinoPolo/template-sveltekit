<script lang="ts">
	import { useDarkMode, type DarkModeSetting } from '$lib/context/dark_mode.context.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Moon from '@lucide/svelte/icons/moon';
	import Monitor from '@lucide/svelte/icons/monitor';
	import Sun from '@lucide/svelte/icons/sun';

	const { darkModeSetting } = useDarkMode();

	const SETTINGS: DarkModeSetting[] = ['light', 'system', 'dark'];

	function toggleMode() {
		const currentIndex = SETTINGS.indexOf(darkModeSetting.current);
		const nextIndex = (currentIndex + 1) % SETTINGS.length;
		darkModeSetting.current = SETTINGS[nextIndex];
	}
</script>

<Button
	onclick={toggleMode}
	variant="outline"
	size="icon"
	aria-label={`Toggle theme (${darkModeSetting.current})`}
>
	{#if darkModeSetting.current === 'light'}
		<Sun size={16} />
	{:else if darkModeSetting.current === 'dark'}
		<Moon size={16} />
	{:else}
		<Monitor size={16} />
	{/if}
</Button>
