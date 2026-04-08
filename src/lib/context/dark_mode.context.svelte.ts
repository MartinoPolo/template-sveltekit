import { browser } from '$app/environment';
import { Derived } from '$lib/reactivity/derived.svelte';
import { json_serde, Persisted } from '$lib/reactivity/persisted.svelte';
import { getContext, setContext } from 'svelte';
import { MediaQuery } from 'svelte/reactivity';
import { CONTEXT_KEYS } from './context_key';

export type DarkModeSetting = 'dark' | 'light' | 'system';

const DARK_MODE_VALUES: ReadonlyArray<string> = ['dark', 'light', 'system'];

function is_dark_mode_setting(value: unknown): value is DarkModeSetting {
	return typeof value === 'string' && DARK_MODE_VALUES.includes(value);
}

function update_dom_class(is_dark: boolean) {
	if (!browser) {
		return;
	}
	const root = document.documentElement;
	if (is_dark) {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}
}

function create_dark_mode_context() {
	const dark_mode_setting = new Persisted<DarkModeSetting>({
		key: 'dark_mode',
		serde: json_serde(is_dark_mode_setting),
		default_value: 'system',
	});

	const prefers_dark_mode = new MediaQuery('(prefers-color-scheme: dark)');

	const is_dark_mode = new Derived(() => {
		if (dark_mode_setting.current === 'system') {
			return prefers_dark_mode.current;
		}
		return dark_mode_setting.current === 'dark';
	});

	$effect.pre(() => {
		update_dom_class(is_dark_mode.current);
	});

	return {
		dark_mode_setting,
		is_dark_mode,
	};
}

export type DarkModeContext = ReturnType<typeof create_dark_mode_context>;

export function set_dark_mode_context() {
	const context = create_dark_mode_context();
	setContext(CONTEXT_KEYS.dark_mode, context);
	return context;
}

export function use_dark_mode() {
	return getContext<DarkModeContext>(CONTEXT_KEYS.dark_mode);
}
