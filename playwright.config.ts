import { defineConfig, devices } from '@playwright/test';
import { playwrightRuntime } from './scripts/playwright-runtime.js';

const runtime = playwrightRuntime();

export default defineConfig({
	testDir: 'tests/e2e',
	use: {
		baseURL: runtime.baseURL,
	},
	webServer: {
		command: 'pnpm run dev',
		url: runtime.baseURL,
		timeout: 120_000,
		reuseExistingServer: false,
		env: {
			...process.env,
			APP_URL: runtime.baseURL,
			ORIGIN: runtime.origin,
			AUTH_SECRET:
				process.env.AUTH_SECRET ??
				'local-e2e-only-auth-secret-never-use-in-production-2026',
		},
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});
