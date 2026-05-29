<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { isLoggedIn, isAdmin } from "$lib/auth";

  let email = "";
  let password = "";
  let loading = false;

  onMount(() => {
    if (isLoggedIn() && isAdmin()) {
      goto("/admin");
    }
  });

  async function login() {
    loading = true;

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        goto("/admin");
      } else {
        goto("/");
      }

    } catch (err) {
      console.log(err);
      alert("Error server");
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-black text-white">
  <div class="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-white/5">

    <h1 class="text-2xl font-bold mb-6">Login</h1>

    <input
      class="w-full mb-3 p-3 rounded-xl bg-black/40 border border-white/10"
      placeholder="Email"
      bind:value={email}
    />

    <input
      type="password"
      class="w-full mb-3 p-3 rounded-xl bg-black/40 border border-white/10"
      placeholder="Password"
      bind:value={password}
    />

    <button
      class="w-full p-3 rounded-xl bg-white text-black font-bold"
      on:click={login}
      disabled={loading}
    >
      {loading ? "Loading..." : "Login"}
    </button>

  </div>
</div>