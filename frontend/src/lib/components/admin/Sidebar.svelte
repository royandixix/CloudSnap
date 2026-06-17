<script lang="ts">
	import { page } from '$app/state';

	let { isOpen = false, user = {} } = $props();

	const menus = [
		{
			name: 'Dashboard',
			href: '/admin',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			name: 'Products',
			href: '/admin/products',
			icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
		}
	];

	let currentPath = $derived(page.url.pathname);

	let safeUser = $derived({
		name: user?.name ?? null,
		role: user?.role ?? null,
		avatar: user?.avatar ?? null
	});

	function closeSidebar() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
		onclick={closeSidebar}
		role="button"
		tabindex="0"
		aria-label="Close sidebar"
	></div>
{/if}

<aside
	class="fixed top-0 left-0 z-50 flex h-dvh w-64 flex-col justify-between border-r border-white/[0.06] bg-[#0a0a0f] transition-transform duration-300 ease-out lg:translate-x-0 {isOpen ? 'translate-x-0' : '-translate-x-full'}"
>
	<div class="flex h-full flex-col">
		<div class="flex h-16 items-center justify-between border-b border-white/[0.06] px-6">
			<a href="/admin" class="flex items-center gap-3">
				<div class="w-7 h-7 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
					<span class="w-2 h-2 bg-white rounded-sm"></span>
				</div>
				<span class="text-sm font-bold tracking-[0.15em] text-white uppercase">
					CloudSnap
				</span>
			</a>

			<button
				class="lg:hidden p-2 text-neutral-500 hover:text-white"
				onclick={closeSidebar}
				aria-label="Close sidebar"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M6 18L12 12M12 12L18 6M12 12L6 6M12 12L18 18" />
				</svg>
			</button>
		</div>

		<div class="flex-1 overflow-y-auto px-4 py-6">
			<p class="text-[10px] text-neutral-700 tracking-[0.2em] uppercase mb-3 px-2">
				Menu
			</p>

			<nav class="space-y-1">
				{#each menus as menu}
					{@const isActive = currentPath === menu.href}

					<a
						href={menu.href}
						class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs transition-all
						{isActive
							? 'bg-white/10 text-white border border-white/10'
							: 'text-neutral-500 hover:bg-white/5 hover:text-white'}"
					>
						<div class="w-7 h-7 flex items-center justify-center rounded-lg {isActive ? 'bg-white/10' : 'bg-transparent'}">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d={menu.icon} />
							</svg>
						</div>

						<span class="truncate">{menu.name}</span>

						{#if isActive}
							<span class="ml-auto w-1.5 h-1.5 rounded-full bg-white/50"></span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>

		<div class="border-t border-white/[0.06] p-4">
			{#if safeUser.name}
				<div class="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-bold text-white">
						{safeUser.avatar}
					</div>

					<div class="min-w-0">
						<p class="text-xs font-semibold text-neutral-200 truncate">
							{safeUser.name}
						</p>
						<p class="text-[10px] text-neutral-500 truncate">
							{safeUser.role}
						</p>
					</div>
				</div>
			{/if}
		</div>
	</div>
</aside>