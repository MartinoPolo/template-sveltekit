const LOCAL_SERVICE_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

/**
 * Resolve an MPX-injected local service URL, with the preferred main-checkout URL as fallback.
 * @param {string} name
 * @param {number} preferredPort
 * @param {Record<string, string | undefined>} [environment]
 */
export function serviceUrl(name, preferredPort, environment = process.env) {
	const fallback = `http://localhost:${preferredPort}`;
	const value = environment[name] ?? fallback;
	let parsed;
	try {
		parsed = new URL(value);
	} catch {
		throw new Error(`${name} must be an http://localhost URL with an explicit port`);
	}
	if (
		parsed.protocol !== 'http:' ||
		!LOCAL_SERVICE_HOSTS.has(parsed.hostname) ||
		parsed.port === '' ||
		parsed.pathname !== '/' ||
		parsed.search !== '' ||
		parsed.hash !== ''
	) {
		throw new Error(`${name} must be an http://localhost URL with an explicit port`);
	}
	return parsed.origin;
}

/** @param {string} name @param {number} preferredPort @param {Record<string, string | undefined>} [environment] */
export function servicePort(name, preferredPort, environment = process.env) {
	return Number(new URL(serviceUrl(name, preferredPort, environment)).port);
}
