<script lang="ts">
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
  let isSidebarOpen = $state(false);

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div
  class="flex min-h-screen bg-[#070709] text-neutral-200 antialiased overflow-x-hidden selection:bg-white/10 selection:text-white"
  style="font-family: 'Inter', sans-serif;"
>
  <Sidebar isOpen={isSidebarOpen} />

  <!-- MAIN WRAPPER -->
  <div class="flex-1 flex flex-col min-w-0 relative lg:pl-64">
    
    <!-- background -->
    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.015)_0%,transparent_60%)] pointer-events-none"
    ></div>

    <Navbar {toggleSidebar} />

    <!-- CONTENT -->
    <main
      class="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 pt-24 pb-24 overflow-y-auto overflow-x-hidden relative"
    >
      <div class="max-w-7xl mx-auto w-full">
        {@render children?.()}
      </div>
    </main>

    <!-- FOOTER FIXED -->
    <Footer />

  </div>
</div>