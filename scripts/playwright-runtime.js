import { runtimePorts } from './runtime-ports.js';

/** @param {Record<string, string | undefined>} [environment] */
export function playwrightRuntime(environment = process.env) {
	const ports = runtimePorts(environment);
	return { baseURL: ports.appUrl, port: ports.app, origin: ports.appUrl };
}
