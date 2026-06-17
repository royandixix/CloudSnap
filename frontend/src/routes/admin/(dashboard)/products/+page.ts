export const load = async ({ fetch }) => {
	try {
		const res = await fetch("http://127.0.0.1:8000/api/products");

		if (!res.ok) {
			return { products: [] };
		}

		const products = await res.json();

		return {
			products: Array.isArray(products) ? products : []
		};
	} catch (err) {
		return {
			products: []
		};
	}
};