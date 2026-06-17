const BASE_URL = "http://localhost:8000/api";

export async function getProducts(token: string) {
  const res = await fetch(`${BASE_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}