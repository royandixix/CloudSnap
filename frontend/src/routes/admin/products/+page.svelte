<script lang="ts">
  import { goto } from "$app/navigation";

  let token = "";
  let loading = false;

  let name = "";
  let price = "";
  let description = "";
  let image: File | null = null;

  let preview: string | null = null;

  function handleImage(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files[0]) {
      image = target.files[0];
      preview = URL.createObjectURL(image);
    }
  }

  async function createProduct() {
    token = localStorage.getItem("token") || "";
    loading = true;

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("description", description);

      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.ok) {
        alert("Product created 🚀");
        goto("/admin/products");
      } else {
        alert("Failed create product ❌");
      }
    } catch (err) {
      console.log(err);
    } finally {
      loading = false;
    }
  }
</script>

<!-- WRAPPER FIX: penting untuk anti overflow & sync navbar -->
<div class="w-full min-h-screen overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-24 pb-10">

  <div class="max-w-5xl mx-auto w-full">

    <!-- HEADER -->
    <div class="mb-8">

      <a
        href="/admin/products"
        class="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-all mb-4"
      >
        ← Back to Products
      </a>

      <h1 class="text-3xl font-bold text-white tracking-tight">
        Create Product
      </h1>

      <p class="text-neutral-500 mt-2 text-sm">
        Add a new product to your catalog.
      </p>

    </div>

    <!-- FORM CARD -->
    <div class="w-full rounded-3xl border border-white/[0.06] bg-white/[0.03] overflow-hidden">

      <!-- IMAGE PREVIEW -->
      <div class="relative w-full h-72 border-b border-white/[0.06] bg-black/30 overflow-hidden">

        {#if preview}
          <img
            src={preview}
            alt="Preview"
            class="w-full h-full object-cover"
          />

          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {:else}
          <div class="w-full h-full flex flex-col items-center justify-center text-neutral-600">
            <svg
              class="w-16 h-16 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 16l5-5c.928-.893 2.072-.893 3 0l5 5m-1-1l1-1c.928-.893 2.072-.893 3 0l2 2M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            <p class="text-sm tracking-wide">
              Product Preview
            </p>
          </div>
        {/if}

      </div>

      <!-- FORM -->
      <div class="p-6 sm:p-8">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <!-- NAME -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-neutral-300 mb-2">
              Product Name
            </label>

            <input
              bind:value={name}
              type="text"
              placeholder="Macbook Pro M4"
              class="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/[0.08] text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-all"
            />
          </div>

          <!-- PRICE -->
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">
              Price
            </label>

            <input
              bind:value={price}
              type="number"
              placeholder="15000000"
              class="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/[0.08] text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-all"
            />
          </div>

          <!-- IMAGE -->
          <div>
            <label class="block text-sm font-medium text-neutral-300 mb-2">
              Product Image
            </label>

            <label class="flex items-center justify-center w-full h-[58px] rounded-2xl border border-dashed border-white/[0.1] bg-black/20 cursor-pointer hover:border-white/20 transition-all text-sm text-neutral-400">
              Upload Image

              <input
                type="file"
                accept="image/*"
                on:change={handleImage}
                class="hidden"
              />
            </label>
          </div>

          <!-- DESCRIPTION -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-neutral-300 mb-2">
              Description
            </label>

            <textarea
              bind:value={description}
              rows="6"
              placeholder="Write product description..."
              class="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/[0.08] text-white placeholder:text-neutral-600 focus:outline-none focus:border-white/20 transition-all resize-none"
            ></textarea>
          </div>

        </div>

        <!-- ACTION -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 mt-8">

          <a
            href="/admin/products"
            class="px-6 py-3 rounded-2xl border border-white/[0.08] text-center text-neutral-400 hover:text-white hover:border-white/20 transition-all"
          >
            Cancel
          </a>

          <button
            on:click={createProduct}
            disabled={loading}
            class="px-7 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {#if loading}
              Creating...
            {:else}
              Create Product
            {/if}
          </button>

        </div>

      </div>

    </div>

  </div>
</div>