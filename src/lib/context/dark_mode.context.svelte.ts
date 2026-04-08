import { browser } from '$app/environment';
import { Derived } from '$lib/reactivity/derived.svelte';
import { jsonSerde, Persisted } from '$lib/reactivity/persisted.svelte';
import { getContext, setContext } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';
import { CONTEXT_KEYS } from './context_key';

export type DarkModeSetting = 'dark' | 'light' | 'system';

const DARK_MODE_VALUES: ReadonlyArray<string> = ['dark', 'light', 'system'];

function isDarkModeSetting(value: unknown): value is DarkModeSetting {
	return typeof value === 'string' && DARK_MODE_VALUES.includes(value);
}

function updateDomClass(isDark: boolean) {
	if (!browser) {
		return;
	}
	const root = document.documentElement;
	if (isDark) {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
}

function createDarkModeContext() {
	const darkModeSetting = new Persisted<DarkModeSetting>({
		key: 'dark_mode',
		serde: jsonSerde(isDarkModeSetting),
		defaultValue: 'system',
	});

	const prefersDarkMode = new MediaQuery('(prefers-color-scheme: dark)');

	const isDarkMode = new Derived(() => {
		if (darkModeSetting.current === 'system') {
			return prefersDarkMode.current;
		}
		return darkModeSetting.current === 'dark';
	});

	$effect.pre(() => {
		updateDomClass(isDarkMode.current);
	});

	return {
		darkModeSetting,
		isDarkMode,
	};
}

export type DarkModeContext = ReturnType<typeof createDarkModeContext>;

export function setDarkModeContext() {
	const context = createDarkModeContext();
	setContext(CONTEXT_KEYS.dark_mode, context);
	return context;
}

export function useDarkMode() {
	return getContext<DarkModeContext>(CONTEXT_KEYS.dark_mode);
}
