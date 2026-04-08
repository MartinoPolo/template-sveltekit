import { untrack } from 'svelte';

export interface MutableState<T> {
	get current(): T;
	set current(value: T);
}

export interface ReadableState<T> {
	get current(): T;
}

export interface StateUpdateOptions<T> {
	is_equal?: (previous_value: NoInfer<T>, new_value: NoInfer<T>) => boolean;
	transform?: (value: NoInfer<T>) => NoInfer<T>;
}

export class StateRaw<T> implements MutableState<T> {
	#current: T;
	#is_equal?: (previous_value: T, new_value: T) => boolean;
	#transform: (value: T) => T;

	constructor(initial_value: T, mutate_options?: StateUpdateOptions<T>) {
		this.#current = $state.raw(initial_value);
		this.#is_equal = mutate_options?.is_equal;
		this.#transform = mutate_options?.transform ?? ((value) => value);
	}

	get current() {
		return this.#current;
	}

	set current(new_value: T) {
		const old_value = untrack(() => this.#current);
		const new_value_transformed = this.#transform(new_value);
		if (this.#is_equal?.(old_value, new_value_transformed) === true) {
			return;
		}
		this.#current = new_value_transformed;
	}

	readonly() {
		return new ReadonlyState(this);
	}

	protected() {
		return new ProtectedState(this);
	}
}

export class ReadonlyState<T> implements ReadableState<T> {
	#state;

	constructor(state: MutableState<T>) {
		this.#state = state;
	}

	get current(): T {
		return this.#state.current;
	}
}

export class ProtectedState<T> implements ReadableState<T> {
	#state;

	constructor(state: MutableState<T>) {
		this.#state = state;
	}

	get current() {
		return this.#state.current;
	}

	set_unprotected(value: T) {
		this.#state.current = value;
	}
}
