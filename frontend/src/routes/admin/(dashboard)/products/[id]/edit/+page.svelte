<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import { apiFetch } from "$lib/api/client";
	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";

	let id = "";

	let name = "";
	let price = 0;
	let description = "";
	let image = "";

	let loading = false;
	let saving = false;

	onMount(() => {
		if (!browser) return;

		const user = JSON.parse(localStorage.getItem("user") || "null");

		if (!user || user.role !== "admin") {
			goto("/admin/login");
			return;
		}

		id = $page.params.id;

		if (id) loadProduct();
	});

	async function loadProduct() {
		loading = true;

		try {
			const data = await apiFetch(`/products/${id}`);

			console.log("PRODUCT DATA:", data);

			name = data?.name ?? "";
			price = data?.price ?? 0;
			description = data?.description ?? "";
			image = data?.image_url ?? data?.image ?? "";
		} catch (err) {
			console.log("Failed to load product:", err);
		} finally {
			loading = false;
		}
	}

	async function save() {
		saving = true;

		try {
			await apiFetch(`/products/${id}`, {
				method: "PUT",
				body: JSON.stringify({
					name,
					price,
					description
				})
			});

			alert("Product updated successfully");
			goto("/admin/products");
		} catch (err) {
			console.log("Failed to update product:", err);
			alert("Update failed");
		} finally {
			saving = false;
		}
	}
</script>

<div class="w-full max-w-3xl mx-auto">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-white">Edit Product</h1>
		<p class="text-sm text-neutral-600 mt-1">
			Update product information
		</p>
	</div>

	{#if loading}
		<div class="text-neutral-500 text-sm">Loading product...</div>
	{:else}
		<div class="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-5">

			{#if image}
				<div class="flex justify-center">
					<img
						src={image}
						alt="Product Image"
						class="w-32 h-32 object-cover rounded-xl border border-white/10"
					/>
				</div>
			{/if}

			<div>
				<label class="text-xs text-neutral-500 uppercase">Product Name</label>
				<input
					type="text"
					bind:value={name}
					class="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
				/>
			</div>

			<div>
				<label class="text-xs text-neutral-500 uppercase">Price</label>
				<input
					type="number"
					bind:value={price}
					class="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
				/>
			</div>

			<div>
				<label class="text-xs text-neutral-500 uppercase">Description</label>
				<textarea
					rows="4"
					bind:value={description}
					class="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white"
				/>
			</div>

			<button
				on:click={save}
				disabled={saving}
				class="w-full bg-white text-black font-semibold py-3 rounded-xl"
			>
				{saving ? "Saving..." : "Save Changes"}
			</button>
		</div>
	{/if}
</div>