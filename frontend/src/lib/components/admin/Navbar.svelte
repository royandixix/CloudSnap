<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { user } from "$lib/stores/user.svelte";

	let { toggleSidebar } = $props();

	onMount(async () => {
		if (typeof window === "undefined") return;

		const token = localStorage.getItem("token");
		if (!token) return goto("/admin/login");

		const res = await fetch("http://localhost:8000/api/me", {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!res.ok) {
			localStorage.clear();
			return goto("/admin/login");
		}

		const data = await res.json();
		const u = data.user ?? data;

		user.name = u.name;
		user.email = u.email;
		user.role = u.role;
		user.avatar = u.name?.charAt(0).toUpperCase() ?? "G";
	});
</script>

<header class="fixed top-0 left-0 right-0 lg:left-64 h-16 bg-[#0a0a0f] border-b border-white/10 flex items-center justify-between px-4 z-40">
	<button on:click={toggleSidebar} class="lg:hidden text-white">
		☰
	</button>

	<div />

	<div class="flex items-center gap-3">
		<div class="text-right hidden sm:block">
			<p class="text-white text-sm">{user.name}</p>
			<p class="text-xs text-neutral-500">{user.email}</p>
		</div>

		<div class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
			{user.avatar}
		</div>
	</div>
</header>