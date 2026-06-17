<script lang="ts">
	import AdminLayout from "$lib/layouts/AdminLayout.svelte";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	let user = $state(null);
	let isSidebarOpen = $state(false);

	onMount(async () => {
		const token = localStorage.getItem("token");

		if (!token) {
			goto("/admin/login");
			return;
		}

		try {
			const res = await fetch("http://localhost:8000/api/me", {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`
				}
			});

			if (!res.ok) {
				localStorage.removeItem("token");
				goto("/admin/login");
				return;
			}

			const data = await res.json();
			user = data.user ?? data;
		} catch (e) {
			goto("/admin/login");
		}
	});
</script>

<AdminLayout {isSidebarOpen} {user} on:toggleSidebar={() => isSidebarOpen = !isSidebarOpen}>
	<slot />
</AdminLayout>