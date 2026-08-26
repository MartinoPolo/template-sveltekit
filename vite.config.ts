import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import devtoolsJson from 'vite-plugin-devtools-json';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { runtimePorts } from './scripts/runtime-ports.js';

const managedPorts = runtimePorts();

// Read current git branch at dev-server start so each worktree gets its own
// branch name baked in — consumed by +layout.svelte to prefix browser tab titles.
const gitBranch = (() => {
	try {
		return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
	} catch {
		return 'local';
	}
})();

const dirname =
	typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	server: {
		open: true,
		port: managedPorts.app,
		strictPort: true,
	},
	define: {
		// Exposed as __GIT_BRANCH__ global; consumed in +layout.svelte to prefix tab titles.
		__GIT_BRANCH__: JSON.stringify(gitBranch),
	},
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale'],
			urlPatterns: [
				{
					pattern: '/:path(.*)?',
					localized: [
						['en', '/:path(.*)?'],
						['cs', '/cs/:path(.*)?'],
					],
				},
			],
		}),
		devtoolsJson(),
	],
	test: {
		passWithNoTests: true,
		expect: {
			requireAssertions: true,
		},
		coverage: {
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
		},
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					sequence: { groupOrder: 0 },
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
						api: {
							host: '127.0.0.1',
							port: managedPorts.vitestClient,
							strictPort: true,
						},
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					sequence: { groupOrder: 1 },
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
			{
				extends: true,
				plugins: [
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					sequence: { groupOrder: 2 },
					browser: {
						enabled: true,
						headless: true,
						provider: playwright(),
						instances: [{ browser: 'chromium' }],
						api: {
							host: '127.0.0.1',
							port: managedPorts.vitestStorybook,
							strictPort: true,
						},
					},
				},
			},
		],
	},
});
