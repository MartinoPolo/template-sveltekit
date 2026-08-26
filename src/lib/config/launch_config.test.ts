import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { serviceCommand } from '../../../scripts/start-service.js';
import { playwrightRuntime } from '../../../scripts/playwright-runtime.js';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
	scripts: Record<string, string>;
};

describe('managed service launch configuration', () => {
	it('passes injected preview and Storybook ports to strict launchers', () => {
		expect(serviceCommand('preview', { PREVIEW_URL: 'http://localhost:8511' }).args).toEqual([
			'wrangler',
			'dev',
			'.svelte-kit/cloudflare/_worker.js',
			'--port',
			'8511',
		]);
		expect(
			serviceCommand('storybook', { STORYBOOK_URL: 'http://localhost:8512' }).args,
		).toEqual(['svelte-kit', 'sync', '&&', 'storybook', 'dev', '-p', '8512', '--exact-port']);
	});

	it('couples Playwright and auth origin to the assigned app URL', () => {
		expect(playwrightRuntime({ APP_URL: 'http://localhost:8520' })).toEqual({
			baseURL: 'http://localhost:8520',
			port: 8520,
			origin: 'http://localhost:8520',
		});
	});

	it('uses managed launchers and removes process-killing port scripts', () => {
		expect(packageJson.scripts).not.toHaveProperty('ports');
		expect(packageJson.scripts).not.toHaveProperty('ports:kill');
		expect(packageJson.scripts.preview).toBe('node scripts/start-service.js preview');
		expect(packageJson.scripts.storybook).toBe('node scripts/start-service.js storybook');
	});

	it('documents the canonical app origin for local auth callbacks', () => {
		expect(readFileSync('.env.example', 'utf8')).toContain('ORIGIN="http://localhost:8500"');
	});
});
