<script lang="ts">
  import { goto } from "$app/navigation";

  let name = "";
  let email = "";
  let password = "";
  let role = "user";
  let loading = false;

  async function register() {
    loading = true;

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Register gagal");
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
      alert("Server error");
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-black text-white">
  <div class="w-full max-w-md p-6 rounded-2xl border border-white/10 bg-white/5">

    <h1 class="text-2xl font-bold mb-6">Register</h1>

    <input class="w-full mb-3 p-3 rounded-xl bg-black/40 border border-white/10"
      placeholder="Name" bind:value={name} />

    <input class="w-full mb-3 p-3 rounded-xl bg-black/40 border border-white/10"
      placeholder="Email" bind:value={email} />

    <input type="password" class="w-full mb-3 p-3 rounded-xl bg-black/40 border border-white/10"
      placeholder="Password" bind:value={password} />

    <select class="w-full mb-3 p-3 rounded-xl bg-black/40 border border-white/10"
      bind:value={role}>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    <button class="w-full p-3 rounded-xl bg-white text-black font-bold"
      on:click={register}
      disabled={loading}>
      {loading ? "Loading..." : "Register"}
    </button>

  </div>
</div>