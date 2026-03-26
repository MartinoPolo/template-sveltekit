import { defineConfig } from 'vite-plus';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	staged: {
		'*': 'vp check --fix',
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
