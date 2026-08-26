import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { runtimePorts } from './runtime-ports.js';

/** @param {'preview' | 'storybook'} service @param {Record<string, string | undefined>} [environment] */
export function serviceCommand(service, environment = process.env) {
	const ports = runtimePorts(environment);
	if (service === 'preview') {
		return {
			args: [
				'wrangler',
				'dev',
				'.svelte-kit/cloudflare/_worker.js',
				'--port',
				String(ports.preview),
			],
		};
	}
	if (service === 'storybook') {
		return {
			args: [
				'svelte-kit',
				'sync',
				'&&',
				'storybook',
				'dev',
				'-p',
				String(ports.storybook),
				'--exact-port',
			],
		};
	}
	throw new Error(`Unknown service: ${service}`);
}

/** @param {string[]} args @returns {Promise<void>} */
function run(args) {
	return new Promise((resolve, reject) => {
		const executable = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
		const child = spawn(executable, ['exec', ...args], { stdio: 'inherit', env: process.env });
		child.once('error', reject);
		child.once('exit', (code, signal) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Service exited with ${signal ?? `code ${String(code)}`}`));
			}
		});
	});
}

async function main() {
	const service = process.argv[2];
	if (service !== 'preview' && service !== 'storybook') {
		throw new Error('Usage: node scripts/start-service.js <preview|storybook>');
	}
	const { args } = serviceCommand(service);
	const separator = args.indexOf('&&');
	if (separator === -1) {
		await run(args);
	} else {
		await run(args.slice(0, separator));
		await run(args.slice(separator + 1));
	}
}

if (
	process.argv[1] &&
	fileURLToPath(import.meta.url) ===
		fileURLToPath(new URL(`file:///${process.argv[1].replaceAll('\\', '/')}`))
) {
	main().catch((error) => {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	});
}
