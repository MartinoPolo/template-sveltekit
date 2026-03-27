import { defineConfig } from 'vite-plus';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
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
	],
	staged: {
		'*': ['vp lint --threads=1 --fix', 'vp check --no-lint --fix'],
	},
	lint: {
		options: {
			typeAware: true,
			typeCheck: true,
		},
	},
	test: {
		environment: 'jsdom',
		include: ['src/**/*.test.{js,ts}'],
		coverage: {
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
		},
	},
});
