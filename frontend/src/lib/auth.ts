export function getUser() {
    if (typeof window === "undefined") return null;

    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
}

export function getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
}

export function isLoggedIn() {
    return !!getToken();
}

export function isAdmin() {
    const user = getUser();
    return user?.role === "admin";
}