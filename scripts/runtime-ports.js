import { servicePort, serviceUrl } from './service-environment.js';

/** @param {Record<string, string | undefined>} [environment] */
export function runtimePorts(environment = process.env) {
	return {
		appUrl: serviceUrl('APP_URL', 8500, environment),
		app: servicePort('APP_URL', 8500, environment),
		preview: servicePort('PREVIEW_URL', 8501, environment),
		storybook: servicePort('STORYBOOK_URL', 8502, environment),
		vitestClient: servicePort('VITEST_CLIENT_URL', 8503, environment),
		vitestStorybook: servicePort('VITEST_STORYBOOK_URL', 8504, environment),
	};
}
