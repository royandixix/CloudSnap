<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { apiFetch } from "$lib/api/client";

  let id = "";

  let form = {
    name: "",
    price: 0,
    description: ""
  };

  let loading = false;
  let saving = false;

  onMount(async () => {
    id = $page.params.id;

    loading = true;

    try {
      const data = await apiFetch(`/products/${id}`);

      form = {
        name: data.name,
        price: data.price,
        description: data.description
      };
    } catch (err) {
      console.log("Failed to load product:", err);
    } finally {
      loading = false;
    }
  });

  async function save() {
    saving = true;

    try {
      await apiFetch(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(form)
      });

      alert("Product updated successfully");
    } catch (err) {
      console.log("Failed to update product:", err);
      alert("Update failed");
    } finally {
      saving = false;
    }
  }
</script>

<div class="w-full max-w-3xl mx-auto">

  <!-- HEADER -->
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-white tracking-tight">
      Edit Product
    </h1>

    <p class="text-sm text-neutral-600 mt-1">
      Update product information
    </p>
  </div>

  {#if loading}
    <div class="text-neutral-500 text-sm">
      Loading product...
    </div>
  {:else}

    <!-- FORM -->
    <div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">

      <!-- NAME -->
      <div>
        <label class="text-xs text-neutral-500 uppercase tracking-widest">
          Product Name
        </label>

        <input
          type="text"
          bind:value={form.name}
          class="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/30"
        />
      </div>

      <!-- PRICE -->
      <div>
        <label class="text-xs text-neutral-500 uppercase tracking-widest">
          Price
        </label>

        <input
          type="number"
          bind:value={form.price}
          class="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/30"
        />
      </div>

      <!-- DESCRIPTION -->
      <div>
        <label class="text-xs text-neutral-500 uppercase tracking-widest">
          Description
        </label>

        <textarea
          rows="4"
          bind:value={form.description}
          class="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white/30"
        ></textarea>
      </div>

      <!-- BUTTON -->
      <button
        on:click={save}
        disabled={saving}
        class="w-full mt-2 bg-white text-black font-semibold text-sm py-3 rounded-xl hover:bg-neutral-200 transition-all duration-200 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

    </div>
  {/if}

</div>