<script lang="ts">
	import { page } from '$app/state';

	let { isOpen = false } = $props();

	const currentPath = page.url.pathname;

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
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
		onclick={() => (isOpen = false)}
	></div>
{/if}

<aside
	class="fixed top-0 left-0 z-50 flex h-dvh w-64 flex-col justify-between border-r border-white/[0.06] bg-[#0a0a0f] transition-transform duration-300 ease-out lg:translate-x-0 {isOpen
		? 'translate-x-0'
		: '-translate-x-full'}"
	style="transform:translate3d(0,0,0);backface-visibility:hidden;will-change:transform;"
>
	<div class="flex h-full flex-col">
		<div
			class="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/[0.06] px-6"
		>
			<a href="/admin" class="group flex items-center gap-3">
				<div
					class="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all duration-200 group-hover:border-white/20"
				>
					<span class="h-2 w-2 rounded-sm bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"></span>
				</div>

				<span class="text-sm font-bold tracking-[0.15em] text-white uppercase">CloudSnap</span>
			</a>

			<button
				class="rounded-lg p-1.5 text-neutral-500 transition-all duration-200 hover:bg-white/5 hover:text-white lg:hidden"
				onclick={() => (isOpen = false)}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L12 12M12 12L18 6M12 12L6 6M12 12L18 18"
					></path>
				</svg>
			</button>
		</div>

		<div class="flex-1 overflow-y-auto px-4 py-6">
			<div class="mb-3 px-2">
				<span class="text-[10px] font-semibold tracking-[0.2em] text-neutral-700 uppercase"
					>Menu</span
				>
			</div>

			<nav class="space-y-0.5">
				{#each menus as menu}
					{@const isActive = currentPath === menu.href}

					<a
						href={menu.href}
						class="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium tracking-wide transition-colors duration-150 {isActive
							? 'border border-white/[0.08] bg-white/8 text-white'
							: 'border border-transparent text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-200'}"
					>
						{#if isActive}
							<span class="absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-full bg-white"
							></span>
						{/if}

						<div
							class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-150 {isActive
								? 'bg-white/10'
								: 'bg-transparent group-hover:bg-white/5'}"
						>
							<svg
								class="h-4 w-4 {isActive
									? 'text-white'
									: 'text-neutral-600 group-hover:text-neutral-400'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="1.75"
									d={menu.icon}
								></path>
							</svg>
						</div>

						<span class="truncate tracking-wide">{menu.name}</span>

						{#if isActive}
							<span class="ml-auto h-1.5 w-1.5 rounded-full bg-white/40"></span>
						{/if}
					</a>
				{/each}
			</nav>
		</div>

		<div class="flex-shrink-0 border-t border-white/[0.06] p-5 pb-8">
			<div
				class="group flex cursor-pointer items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-200 hover:bg-white/[0.03]"
			>
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-neutral-700 to-neutral-900 text-xs font-bold text-neutral-300"
				>
					R
				</div>

				<div class="min-w-0 flex-1 overflow-hidden">
					<p class="truncate text-xs leading-none font-semibold tracking-tight text-neutral-200">
						Royandi
					</p>

					<p
						class="mt-1 truncate text-[10px] font-medium tracking-widest text-neutral-600 uppercase"
					>
						Developer
					</p>
				</div>

				<svg
					class="h-3.5 w-3.5 flex-shrink-0 text-neutral-700"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
					></path>
				</svg>
			</div>
		</div>
	</div>
</aside>
