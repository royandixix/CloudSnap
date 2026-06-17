<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	const BASE_URL = 'http://localhost:8000/api';

	let loading = false;

	let name = '';
	let price = '';
	let description = '';
	let image: File | null = null;

	let preview: string | null = null;
	let error: string | null = null;

	// 🔥 ADMIN GUARD
	onMount(() => {
		if (!browser) return;

		const user = JSON.parse(localStorage.getItem('user') || 'null');

		if (!user || user.role !== 'admin') {
			goto('/admin/login');
		}
	});

	function handleImage(event: Event) {
		const target = event.target as HTMLInputElement;

		if (target.files && target.files[0]) {
			image = target.files[0];

			if (preview) URL.revokeObjectURL(preview);

			preview = URL.createObjectURL(image);
		}
	}

	function validate() {
		if (!name.trim()) return 'Name is required';
		if (!price || Number(price) <= 0) return 'Price must be valid';
		if (!image) return 'Image is required';

		return null;
	}

	async function createProduct() {
		error = validate();
		if (error) return;

		loading = true;

		try {
			const token = localStorage.getItem('token');

			if (!token) {
				throw new Error('Unauthorized: no token found');
			}

			const formData = new FormData();
			formData.append('name', name);
			formData.append('price', price);
			formData.append('description', description);

			if (image) {
				formData.append('image', image);
			}

			const res = await fetch(`${BASE_URL}/products`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				},
				body: formData
			});

			if (!res.ok) {
				const msg = await res.text();
				throw new Error(msg || 'Failed to create product');
			}

			goto('/admin/products');
		} catch (err: any) {
			console.error(err);
			error = err.message || 'Something went wrong';
		} finally {
			loading = false;
		}
	}
</script>

<!-- UI -->
<div class="mx-auto max-w-6xl pt-4">
	<!-- HEADER -->
	<div class="mb-8">
		<a
			href="/admin/products"
			class="mb-4 inline-flex items-center gap-2 text-sm text-neutral-500 transition-all hover:text-white"
		>
			← Back to Products
		</a>

		<h1 class="text-3xl font-bold tracking-tight text-white">Create Product</h1>

		<p class="mt-2 text-sm text-neutral-500">Add a new product to your catalog.</p>

		{#if error}
			<p class="mt-3 text-sm text-red-400">
				{error}
			</p>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
		<!-- FORM -->
		<div class="rounded-3xl border border-white/[0.06] bg-white/[0.02]">
			<div class="space-y-6 p-7">
				<!-- NAME -->
				<div>
					<label class="mb-2 block text-sm text-neutral-300"> Product Name </label>

					<input
						bind:value={name}
						type="text"
						placeholder="Macbook Pro M4"
						class="h-14 w-full rounded-2xl border border-white/[0.06] bg-black/20 px-5 text-white"
					/>
				</div>

				<!-- PRICE + IMAGE -->
				<div class="grid grid-cols-1 gap-5 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-sm text-neutral-300"> Price </label>

						<input
							bind:value={price}
							type="number"
							placeholder="15000000"
							class="h-14 w-full rounded-2xl border border-white/[0.06] bg-black/20 px-5 text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm text-neutral-300"> Product Image </label>

						<label
							class="flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/[0.08] text-sm text-neutral-400"
						>
							Upload Image

							<input type="file" accept="image/*" on:change={handleImage} class="hidden" />
						</label>
					</div>
				</div>

				<!-- DESCRIPTION -->
				<div>
					<label class="mb-2 block text-sm text-neutral-300"> Description </label>

					<textarea
						bind:value={description}
						rows="6"
						class="w-full rounded-2xl border border-white/[0.06] bg-black/20 px-5 py-4 text-white"
					/>
				</div>

				<!-- ACTION -->
				<div class="flex justify-end gap-3">
					<a
						href="/admin/products"
						class="rounded-xl border border-white/[0.06] px-5 py-2 text-neutral-400"
					>
						Cancel
					</a>

					<button
						on:click={createProduct}
						disabled={loading}
						class="rounded-xl bg-white px-6 py-2 font-medium text-black disabled:opacity-50"
					>
						{loading ? 'Creating...' : 'Create Product'}
					</button>
				</div>
			</div>
		</div>

		<!-- PREVIEW -->
		<div class="sticky top-24">
			<div class="overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]">
				<div class="h-[260px] bg-black/30">
					{#if preview}
						<img src={preview} class="h-full w-full object-cover" />
					{:else}
						<div class="flex h-full items-center justify-center text-neutral-600">No preview</div>
					{/if}
				</div>

				<div class="p-5">
					<h2 class="font-semibold text-white">
						{name || 'Product Name'}
					</h2>

					<p class="mt-2 text-sm text-neutral-500">
						{description || 'Preview description'}
					</p>

					<div class="mt-4 text-white">
						Rp {price || 0}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
