import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const manifest = JSON.parse(readFileSync('mpxconfig.json', 'utf8')) as {
	projectId: string;
	repository: { provider: string; remote: string };
	issues: { provider: string };
	packageManager: string;
};

describe('Phase H MPX project contract', () => {
	it('declares the canonical GitHub and pnpm integration', () => {
		expect(manifest).toMatchObject({
			projectId: 'MartinoPolo/template-sveltekit',
			repository: { provider: 'github', remote: 'origin' },
			issues: { provider: 'github' },
			packageManager: 'pnpm',
		});
	});

	it('includes the environment file in new worktrees', () => {
		expect(readFileSync('.worktreeinclude', 'utf8')).toBe('.env\n');
	});

	it('keeps assigned machine-local ports out of version control', () => {
		expect(readFileSync('.gitignore', 'utf8')).toContain('.worktree-ports.json');
	});
});
