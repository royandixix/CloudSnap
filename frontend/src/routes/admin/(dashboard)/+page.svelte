<script lang="ts">
	import { onMount } from "svelte";

	let token = $state("");

	let stats = $state([
		{
			label: "Products",
			value: 0,
			icon: "M20 13V7a2 2 0 00-2-2h-4V3H10v2H6a2 2 0 00-2 2v6",
			change: "+12%",
			up: true
		},
		{
			label: "Users",
			value: 0,
			icon: "M17 20h5V18a4 4 0 00-5-3.87",
			change: "+5%",
			up: true
		},
		{
			label: "Orders",
			value: 0,
			icon: "M9 17v-2a4 4 0 014-4h4",
			change: "-3%",
			up: false
		}
	]);

	async function safeFetch(url: string) {
		try {
			const res = await fetch(url, {
				headers: {
					Accept: "application/json",
					Authorization: token ? `Bearer ${token}` : ""
				}
			});

			if (!res.ok) {
				console.error("API ERROR:", url, res.status);
				return [];
			}

			const json = await res.json();

			return json?.data ?? json ?? [];
		} catch (err) {
			console.error("FETCH ERROR:", url, err);
			return [];
		}
	}

	onMount(async () => {
		token = localStorage.getItem("token") || "";

		if (!token) {
			console.warn("NO TOKEN");
			return;
		}

		const [products, users, orders] = await Promise.all([
			safeFetch("http://localhost:8000/api/products"),
			safeFetch("http://localhost:8000/api/users"),
			safeFetch("http://localhost:8000/api/orders")
		]);

		console.log("PRODUCTS:", products);
		console.log("USERS:", users);
		console.log("ORDERS:", orders);

		// FIX: update reactive state (Svelte 5 safe)
		stats[0].value = Array.isArray(products) ? products.length : 0;
		stats[1].value = Array.isArray(users) ? users.length : 0;
		stats[2].value = Array.isArray(orders) ? orders.length : 0;
	});
</script>

<div class="w-full overflow-hidden">
	<div class="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-6"></div>

	<!-- HEADER -->
	<div class="mb-8">
		<div class="flex items-center gap-3 mb-1.5">
			<div class="w-1 h-6 rounded-full bg-white flex-shrink-0"></div>

			<h1 class="text-2xl font-bold tracking-tight text-white truncate">
				Dashboard
			</h1>
		</div>

		<p class="text-sm text-neutral-600 ml-4 tracking-wide break-words">
			Welcome back. Here's what's happening.
		</p>
	</div>

	<!-- STATS -->
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each stats as stat}
			<div class="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/[0.12] rounded-2xl p-5 sm:p-6 transition-all duration-300 overflow-hidden min-w-0">
				
				<div class="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-2xl"></div>

				<div class="flex items-start justify-between gap-3 mb-5">
					<div class="w-10 h-10 rounded-xl bg-white/5 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
						<svg class="w-[18px] h-[18px] text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={stat.icon} />
						</svg>
					</div>

					<span
						class="flex items-center gap-1 text-[11px] font-semibold tracking-wide px-2 py-1 rounded-lg whitespace-nowrap flex-shrink-0 {stat.up
							? 'text-emerald-400 bg-emerald-500/10'
							: 'text-rose-400 bg-rose-500/10'}"
					>
						<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d={stat.up ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
							/>
						</svg>

						{stat.change}
					</span>
				</div>

				<p class="text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-600 mb-2 truncate">
					{stat.label}
				</p>

				<p class="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none break-all">
					{stat.value}
				</p>

				<div class="mt-5 h-px bg-gradient-to-r from-white/10 via-white/[0.04] to-transparent"></div>

				<p class="mt-3 text-[10px] text-neutral-700 tracking-wide">
					vs last month
				</p>
			</div>
		{/each}
	</div>
</div>