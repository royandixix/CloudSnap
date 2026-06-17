import { writable } from 'svelte/store';
import { login as loginApi, logout as logoutApi, me as meApi, type AuthUser } from '../api/auth';

type AuthState = {
	user: AuthUser | null;
	token: string | null;
	loading: boolean;
};

const createAuthStore = () => {
	const { subscribe, set, update } = writable<AuthState>({
		user: null,
		token: null,
		loading: false
	});

	return {
		subscribe,

		// cek session saat app start
		init: async () => {
			if (typeof window === 'undefined') return;

			const token = localStorage.getItem('token');

			if (!token) return;

			update((state) => ({
				...state,
				loading: true
			}));

			try {
				const response = await meApi(token);

				set({
					user: response.user,
					token,
					loading: false
				});
			} catch (error) {
				console.error('Auth init error:', error);

				localStorage.removeItem('token');
				localStorage.removeItem('user');

				set({
					user: null,
					token: null,
					loading: false
				});
			}
		},

		// login
		// login
		login: async (email: string, password: string) => {
			update((state) => ({
				...state,
				loading: true
			}));

			try {
				const res = await loginApi({
					email,
					password
				});

				console.log('====================');
				console.log('LOGIN RESPONSE:', res);
				console.log('TOKEN:', res.token);
				console.log('USER:', res.user);
				console.log('====================');

				localStorage.setItem('token', res.token);
				localStorage.setItem('user', JSON.stringify(res.user));

				console.log('SAVED TOKEN:', localStorage.getItem('token'));

				set({
					user: res.user,
					token: res.token,
					loading: false
				});

				return res;
			} catch (error) {
				console.error('LOGIN ERROR:', error);

				update((state) => ({
					...state,
					loading: false
				}));

				throw error;
			}
		},

		// logout
		logout: async () => {
			const token = localStorage.getItem('token');

			try {
				if (token) {
					await logoutApi(token);
				}
			} catch (error) {
				console.error('Logout error:', error);
			}

			localStorage.removeItem('token');
			localStorage.removeItem('user');

			set({
				user: null,
				token: null,
				loading: false
			});
		}
	};
};

export const authStore = createAuthStore();
