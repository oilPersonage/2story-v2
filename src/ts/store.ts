type Listener<T> = (value: T, prev: T) => void;

export function createStore<T>(initial: T) {
	let value = initial;
	const listeners = new Set<Listener<T>>();

	return {
		get: () => value,

		set(next: T | ((prev: T) => T)) {
			const prev = value;
			value = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
			if (Object.is(value, prev)) return; // ничего не изменилось — не дёргаем подписчиков
			listeners.forEach((fn) => fn(value, prev));
		},

		sub(fn: Listener<T>, { immediate = false } = {}) {
			listeners.add(fn);
			if (immediate) fn(value, value); // сразу вызвать с текущим значением
			return () => listeners.delete(fn); // функция отписки
		},
	};
}
