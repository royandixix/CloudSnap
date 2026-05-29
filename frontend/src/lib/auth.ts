export function getUser() {
  if (typeof localStorage === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getToken() {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem("token");
}

export function isLoggedIn() {
  return !!getToken();
}

export function isAdmin() {
  const user = getUser();
  return user?.role === "admin";
}