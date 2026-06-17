import { apiFetch } from "$lib/api/client";

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
};

export type AuthUser = {
	id: number;
	name: string;
	email: string;
	role: "user" | "admin";
};

export type AuthResponse = {
	message: string;
	token: string;
	user: AuthUser;
};

export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
	return await apiFetch("/register", {
		method: "POST",
		body: JSON.stringify(payload)
	});
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
	return await apiFetch("/login", {
		method: "POST",
		body: JSON.stringify(payload)
	});
};

export const logout = async (token: string) => {
	return await apiFetch("/logout", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const me = async (token: string): Promise<{ user: AuthUser }> => {
	return await apiFetch("/me", {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};