import { browser } from '$app/environment';
import { on } from 'svelte/events';
import { createSubscriber } from 'svelte/reactivity';
import { ReadonlyState, type MutableState, type ReadableState } from './state.svelte';

interface Serde<T> {
	serialize: (value: T) => string;
	deserialize: (value: string) => { success: true; data: T } | { success: false };
}

export function json_serde<T>(validate: (value: unknown) => value is T): Serde<T> {
	return {
		serialize: (value: T) => JSON.stringify(value),
		deserialize: (raw: string) => {
			try {
				const parsed: unknown = JSON.parse(raw);
				if (validate(parsed)) {
					return { success: true, data: parsed };
				}
				return { success: false };
			} catch {
				return { success: false };
			}
		},
	};
}

interface PersistedOptions<T> {
	key: string;
	serde: Serde<T>;
	default_value: NoInfer<T>;
}

/**
 * A raw state persisted in localStorage. Listens to `storage` events for cross-tab sync.
 */
export class Persisted<T> implements MutableState<T> {
	#key;
	#default_value;
	#subscribe;
	#update: (() => void) | undefined = undefined;
	#serde: Serde<T>;

	constructor({ key, serde, default_value }: PersistedOptions<T>) {
		this.#key = key;
		this.#default_value = default_value;
		this.#serde = serde;

		if (!browser) {
			return;
		}

		this.#subscribe = createSubscriber((update) => {
			this.#update = update;
			const cleanup = on(window, 'storage', (e) => {
				if (e.key === key) {
					update();
				}
			});
			return () => {
				cleanup();
				this.#update = undefined;
			};
		});
	}

	#set_to_storage(value: T) {
		localStorage.setItem(this.#key, this.#serde.serialize(value));
	}

	get current(): T {
		if (!browser) {
			return this.#default_value;
		}
		this.#subscribe?.();
		const val = localStorage.getItem(this.#key);
		if (val == null) {
			return this.#default_value;
		}
		const parsed = this.#serde.deserialize(val);
		if (!parsed.success) {
			this.#set_to_storage(this.#default_value);
			return this.#default_value;
		}
		return parsed.data;
	}

	set current(new_value: T) {
		this.#set_to_storage(new_value);
		this.#update?.();
	}

	set_default_value(): void {
		this.#set_to_storage(this.#default_value);
		this.#update?.();
	}

	readonly(): ReadableState<T> {
		return new ReadonlyState(this);
	}
}
