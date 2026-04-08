import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: [
		'src/hooks.ts',
		'src/lib/auth_client.ts',
		'src/lib/reactivity/*.svelte.ts',
		'src/lib/context/*.context.svelte.ts',
	],
	project: ['src/**/*.{ts,svelte}'],
	ignoreDependencies: [
		'@typescript-eslint/parser',
		'@node-rs/argon2',
		'tailwindcss',
		'vitest-browser-svelte',
	],
};

export default config;
