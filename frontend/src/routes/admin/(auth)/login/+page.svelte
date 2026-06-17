<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { apiFetch } from "$lib/api/client";
  import { fade, fly } from "svelte/transition";

  let email = "";
  let password = "";
  let loading = false;
  let showPassword = false;

  onMount(() => {
    if (!browser) return;

    const userStr = localStorage.getItem("user");

    if (!userStr) return;

    try {
      const user = JSON.parse(userStr);

      if (user.role === "admin") {
        goto("/admin");
      }
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  });

  async function login() {
  loading = true;

  try {
    const data = await apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    });

    console.log("================================");
    console.log("FULL RESPONSE =", data);
    console.log("TOKEN =", data?.token);
    console.log("USER =", data?.user);
    console.log("MESSAGE =", data?.message);
    console.log("================================");

    if (!data) {
      throw new Error("Backend tidak mengembalikan data");
    }

    if (!data.token) {
      console.error("TOKEN NOT FOUND");
      console.error("RESPONSE =", JSON.stringify(data, null, 2));

      alert(
        "Token tidak ditemukan.\n\nLihat Console Browser (F12)"
      );

      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    console.log(
      "TOKEN STORED =",
      localStorage.getItem("token")
    );

    console.log(
      "USER STORED =",
      localStorage.getItem("user")
    );

    if (data.user?.role === "admin") {
      await goto("/admin");
    } else {
      await goto("/user");
    }
  } catch (err: any) {
    console.error("LOGIN ERROR =", err);

    alert(
      err?.message ||
      "Login gagal. Cek Console Browser (F12)"
    );
  } finally {
    loading = false;
  }
}
</script>
<div class="min-h-screen w-full flex bg-slate-50 font-sans text-slate-800 antialiased overflow-hidden">
  
  <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative items-center justify-center p-12 overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
    
    <div class="absolute top-10 left-10 flex items-center gap-2.5 z-10">
      <div class="w-8 h-8 bg-emerald-400 rounded-lg transform rotate-12 flex items-center justify-center text-slate-900 font-bold text-sm shadow-md shadow-emerald-400/20">a</div>
      <span class="text-xl font-bold tracking-tight text-white">aurora</span>
    </div>
    
    <div in:fly={{ y: 20, duration: 800 }} class="max-w-md w-full flex flex-col items-center justify-center text-center z-10">
      <div class="relative w-72 h-72 flex items-center justify-center">
        <div class="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <svg class="w-64 h-64 text-blue-400 drop-shadow-2xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="80" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
          <path d="M60 110C60 90 75 75 95 75H135C140 75 145 79 145 84V116C145 121 140 125 135 125H95C75 125 60 110 60 110Z" fill="currentColor" fill-opacity="0.1"/>
          <rect x="80" y="90" width="40" height="30" rx="6" fill="currentColor" fill-opacity="0.8"/>
          <circle cx="93" cy="101" r="3" fill="#0f172a"/>
          <circle cx="107" cy="101" r="3" fill="#0f172a"/>
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-white mt-6">Selamat Datang Kembali</h2>
      <p class="text-slate-400 mt-2 text-sm max-w-sm leading-relaxed">Masuk ke dashboard menggunakan akun kamu untuk mengelola seluruh sistem</p>
    </div>

    <div class="absolute bottom-10 left-10 flex gap-2">
      <span class="px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-md border border-slate-700 backdrop-blur-sm">JWT Auth</span>
    </div>
  </div>

  <div class="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-24 lg:px-16 xl:px-28 bg-white shadow-2xl z-10">
    <div in:fade={{ duration: 600, delay: 200 }} class="mx-auto w-full max-w-md">
      
      <div class="lg:hidden flex items-center gap-2 mb-10">
        <div class="w-7 h-7 bg-emerald-400 rounded-lg transform rotate-12 flex items-center justify-center text-slate-900 font-bold text-xs shadow-md shadow-emerald-400/20">a</div>
        <span class="text-xl font-bold tracking-tight text-slate-900">aurora</span>
      </div>

      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Masuk</h1>
        <p class="text-sm text-slate-500 mt-2">Silakan login untuk melanjutkan ke akun Anda</p>
      </div>

      <form on:submit|preventDefault={login} class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</label>
          <div class="relative mt-1.5">
            <input
              type="email"
              class="w-full p-3.5 pl-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
              placeholder="nama@email.com"
              bind:value={email}
              required
            />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
          <div class="relative mt-1.5">
            <input
              type={showPassword ? "text" : "password"}
              class="w-full p-3.5 pl-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
              placeholder="••••••••"
              bind:value={password}
              required
            />
            <button 
              type="button" 
              class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              on:click={() => showPassword = !showPassword}
            >
              {#if showPassword}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"/></svg>
              {:else}
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              {/if}
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full py-3.5 px-4 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2"
          disabled={loading}
        >
          {#if loading}
            <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Memproses...</span>
          {:else}
            <span>Masuk</span>
          {/if}
        </button>
      </form>

      <p class="text-center text-sm mt-8 text-slate-500">
        Belum punya akun?
        <a href="/admin/register" class="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all">Daftar di sini</a>
      </p>

    </div>
  </div>

</div>