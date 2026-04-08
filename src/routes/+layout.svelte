<script lang="ts">
	import '../app.css';
	import { setDarkModeContext } from '$lib/context/dark_mode.context.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	setDarkModeContext();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
