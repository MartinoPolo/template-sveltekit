import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	entry: ['src/**/*.{ts,svelte}'],
	project: ['src/**/*.{ts,svelte}'],
	ignore: ['.svelte-kit/**'],
	ignoreDependencies: ['@sveltejs/adapter-auto'],
};

export default config;
