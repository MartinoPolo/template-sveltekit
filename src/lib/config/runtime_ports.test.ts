import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { runtimePorts } from '../../../scripts/runtime-ports.js';

const assignment = (name: string) =>
	JSON.parse(readFileSync(`tests/fixtures/phase-h/${name}.json`, 'utf8')) as Record<
		string,
		string | undefined
	>;

describe('strict managed runtime ports', () => {
	it('binds Vite and both Vitest browser APIs to their injected ports', () => {
		const ports = runtimePorts({
			APP_URL: 'http://localhost:8510',
			VITEST_CLIENT_URL: 'http://localhost:8513',
			VITEST_STORYBOOK_URL: 'http://localhost:8514',
		});

		expect(ports).toMatchObject({
			appUrl: 'http://localhost:8510',
			app: 8510,
			vitestClient: 8513,
			vitestStorybook: 8514,
		});
	});

	it('keeps two linked assignment blocks distinct while coupling each origin', () => {
		const first = runtimePorts(assignment('linked-a'));
		const second = runtimePorts(assignment('linked-b'));

		expect([
			first.app,
			first.preview,
			first.storybook,
			first.vitestClient,
			first.vitestStorybook,
		]).toEqual([8505, 8506, 8507, 8508, 8509]);
		expect([
			second.app,
			second.preview,
			second.storybook,
			second.vitestClient,
			second.vitestStorybook,
		]).toEqual([8510, 8511, 8512, 8513, 8514]);
		expect(first.appUrl).toBe('http://localhost:8505');
		expect(second.appUrl).toBe('http://localhost:8510');
		expect(assignment('linked-a').DATABASE_PORT).toBe(assignment('linked-b').DATABASE_PORT);
	});
});
