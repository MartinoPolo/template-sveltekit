<script lang="ts">
	import '../app.css';
	import { set_dark_mode_context } from '$lib/context/dark_mode.context.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	set_dark_mode_context();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
