import { writable } from "svelte/store";

export type User = {
	id: number;
	name: string;
	email: string;
	role: string;
};

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);

export function initAuth() {
	if (typeof window === "undefined") return;

	const savedUser = localStorage.getItem("user");
	const savedToken = localStorage.getItem("token");

	if (savedUser) {
		try {
			user.set(JSON.parse(savedUser));
		} catch {
			user.set(null);
		}
	}

	token.set(savedToken);
}

export function logout() {
	localStorage.removeItem("user");
	localStorage.removeItem("token");
	user.set(null);
	token.set(null);
}