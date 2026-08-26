import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(readFileSync('mpxconfig.json', 'utf8')) as {
	project: { id: string };
	repository: { provider: string; remote: string };
	tooling: { packageManager: string };
	development: { services: Record<string, unknown> };
};

describe('Phase H MPX project contract', () => {
	it('declares the canonical GitHub and pnpm integration', () => {
		expect(manifest).toMatchObject({
			$schema: 'https://mpx.dev/schemas/mpxconfig.schema.json',
			schemaVersion: 1,
			project: { id: 'MartinoPolo/template-sveltekit' },
			repository: { provider: 'github', remote: 'origin' },
			issues: { provider: 'github' },
			tooling: { packageManager: 'pnpm' },
		});
	});

	it('assigns checkout surfaces as one port family and shares the external database', () => {
		expect(manifest.development.services).toMatchObject({
			app: { scope: 'checkout', port: { mode: 'managed', preferred: 8500 } },
			preview: { scope: 'checkout', port: { mode: 'managed', preferred: 8501 } },
			storybook: { scope: 'checkout', port: { mode: 'managed', preferred: 8502 } },
			'vitest-client': { scope: 'checkout', port: { mode: 'managed', preferred: 8503 } },
			'vitest-storybook': { scope: 'checkout', port: { mode: 'managed', preferred: 8504 } },
			database: {
				scope: 'project',
				port: { mode: 'fixed-shared', preferred: 5432 },
				start: { type: 'external', kind: 'database' },
			},
		});
		expect(readFileSync('.worktreeinclude', 'utf8')).toBe('.env\n');
	});

	it('keeps assigned machine-local ports out of version control', () => {
		expect(readFileSync('.gitignore', 'utf8')).toContain('.worktree-ports.json');
	});
});
