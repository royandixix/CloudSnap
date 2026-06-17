const BASE_URL = "http://localhost:8000/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
	const token = localStorage.getItem("token");

	return fetch(`${BASE_URL}${path}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Authorization: token ? `Bearer ${token}` : "",
			...(options.headers || {})
		}
	}).then(async (res) => {
		const text = await res.text();
		return text ? JSON.parse(text) : null;
	});
}