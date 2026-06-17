<script lang="ts">
	let { data } = $props();

	async function deleteProduct(id: number) {
		try {
			const res = await fetch(`http://127.0.0.1:8000/api/products/${id}`, {
				method: "DELETE",
				headers: {
					"Accept": "application/json"
				}
			});

			if (!res.ok) {
				console.error("Failed to delete product");
				return;
			}

			data.products = data.products.filter((p: any) => p.id !== id);
		} catch (err) {
			console.error("Delete error:", err);
		}
	}
</script>

<div class="w-full overflow-hidden">

	<div class="mb-8">
		<h1 class="text-2xl font-bold text-white">Products</h1>
		<p class="text-sm text-neutral-600">
			Manage your product catalog.
		</p>
	</div>

	<div class="flex justify-end mb-5">
		<a
			href="/admin/products/create"
			class="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm"
		>
			+ Create
		</a>
	</div>

	<div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

		<table class="w-full">
			<thead>
				<tr class="text-left text-xs text-neutral-500 border-b border-white/10">
					<th class="p-4">Image</th>
					<th>Name</th>
					<th>Price</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				{#each data?.products ?? [] as p}
					<tr class="border-b border-white/5">

						<td class="p-4">
							{#if p.image_url}
								<img
									src={p.image_url}
									alt={p.name}
									class="w-10 h-10 object-cover rounded-lg"
								/>
							{:else}
								<div class="w-10 h-10 bg-white/10 rounded-lg"></div>
							{/if}
						</td>

						<td class="text-white text-sm">
							{p.name}
						</td>

						<td class="text-neutral-400 text-sm">
							{Number(p.price).toLocaleString()}
						</td>

						<td>
							<div class="flex gap-2">
								<a
									href={`/admin/products/${p.id}/edit`}
									class="px-3 py-1 rounded-lg bg-white/10 text-white text-xs"
								>
									Edit
								</a>

								<button
									class="px-3 py-1 rounded-lg bg-red-500/10 text-red-400 text-xs"
									on:click={() => deleteProduct(p.id)}
								>
									Delete
								</button>
							</div>
						</td>

					</tr>
				{/each}
			</tbody>
		</table>

		{#if (data?.products ?? []).length === 0}
			<div class="p-10 text-center text-neutral-600 text-sm">
				No products found
			</div>
		{/if}
	</div>
</div>