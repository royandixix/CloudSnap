const BASE_URL = "http://localhost:8000/api";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {})
        }
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "API Error");
    }

    return res.json();
}