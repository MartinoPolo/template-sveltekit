import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: ['src/**/*.{ts,svelte}'],
	project: ['src/**/*.{ts,svelte}'],
	ignoreDependencies: [
		'@testing-library/jest-dom',
		'@testing-library/svelte',
		'@typescript-eslint/parser',
		'@node-rs/argon2',
		'tailwindcss',
	],
};

export default config;
