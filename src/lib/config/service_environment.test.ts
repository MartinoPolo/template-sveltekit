import { describe, expect, it } from 'vitest';
import { servicePort, serviceUrl } from '../../../scripts/service-environment.js';

describe('managed service environment', () => {
	it('derives a strict port from the MPX-injected service URL', () => {
		const environment = { APP_URL: 'http://localhost:8510' };

		expect(serviceUrl('APP_URL', 8500, environment)).toBe('http://localhost:8510');
		expect(servicePort('APP_URL', 8500, environment)).toBe(8510);
	});

	it('rejects malformed coupled URLs instead of selecting another port', () => {
		expect(() => servicePort('APP_URL', 8500, { APP_URL: '8510' })).toThrow(
			'APP_URL must be an http://localhost URL with an explicit port',
		);
	});
});
