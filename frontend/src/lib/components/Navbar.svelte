<script lang="ts">
  let { toggleSidebar } = $props();

  let user = {
    name: "Royandi"
  };
</script>

<header class="h-16 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-4 sm:px-6 lg:px-8 fixed top-0 right-0 left-0 lg:left-64 z-30">
  <div class="flex items-center gap-4 min-w-0">
    <button
      class="lg:hidden p-2 -ml-2 text-neutral-500 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-95 flex-shrink-0"
      onclick={toggleSidebar}
      aria-label="Toggle Sidebar"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div class="flex items-center gap-3 min-w-0">
      <div class="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-1.5 min-w-0">
        <svg class="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        <span class="text-[11px] text-neutral-600 tracking-wide truncate">
          Search...
        </span>

        <kbd class="text-[10px] text-neutral-700 bg-white/5 border border-white/10 rounded px-1 py-0.5 font-mono ml-4 flex-shrink-0">
          ⌘K
        </kbd>
      </div>
    </div>
  </div>

  <div class="flex items-center gap-3 flex-shrink-0">
    <button class="relative p-2 text-neutral-500 hover:text-white rounded-xl hover:bg-white/5 transition-all duration-200">
      <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>

      <span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.9)]"></span>
    </button>

    <div class="w-px h-6 bg-white/[0.06] hidden sm:block"></div>

    <div class="flex items-center gap-2.5 pl-1">
      <div class="text-right hidden sm:block">
        <p class="text-xs font-semibold text-neutral-200 tracking-tight leading-none">
          {user.name}
        </p>

        <p class="text-[10px] text-neutral-600 font-medium mt-1 tracking-widest uppercase">
          Administrator
        </p>
      </div>

      <div class="w-8 h-8 rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white tracking-wider cursor-pointer hover:border-white/20 transition-all duration-200 flex-shrink-0">
        R
      </div>
    </div>
  </div>
</header>