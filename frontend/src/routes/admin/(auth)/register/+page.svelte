<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { apiFetch } from '$lib/api/client';
	import { fade, fly } from 'svelte/transition';

	let name = '';
	let email = '';
	let password = '';
	let loading = false;
	let showPassword = false;

	async function register() {
		loading = true;

		try {
			const data = await apiFetch('/admin/register', {
				method: 'POST',
				body: JSON.stringify({
					name,
					email,
					password
				})
			});

			console.log('REGISTER RESPONSE:', data);

			if (!data?.token || !data?.user) {
				throw new Error('Data register tidak valid');
			}

			if (browser) {
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
			}

			await goto('/admin');

		} catch (err: any) {
			console.error(err);
			alert(err.message || 'Register gagal');
		} finally {
			loading = false;
		}
	}
</script>
<div
	class="flex min-h-screen w-full overflow-hidden bg-slate-50 font-sans text-slate-800 antialiased"
>
	<div
		class="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-12 lg:flex lg:w-1/2"
	>
		<div
			class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"
		></div>

		<div class="absolute top-10 left-10 z-10 flex items-center gap-2.5">
			<div
				class="flex h-8 w-8 rotate-12 transform items-center justify-center rounded-lg bg-emerald-400 text-sm font-bold text-slate-900 shadow-md shadow-emerald-400/20"
			>
				a
			</div>
			<span class="text-xl font-bold tracking-tight text-white">aurora</span>
		</div>

		<div
			in:fly={{ y: 20, duration: 800 }}
			class="z-10 flex w-full max-w-md flex-col items-center justify-center text-center"
		>
			<div class="relative flex h-72 w-72 items-center justify-center">
				<div class="absolute inset-0 animate-pulse rounded-full bg-blue-500/10 blur-3xl"></div>
				<svg
					class="h-64 w-64 text-blue-400 drop-shadow-2xl"
					viewBox="0 0 200 200"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="100"
						cy="100"
						r="80"
						fill="currentColor"
						fill-opacity="0.05"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-dasharray="4 4"
					/>
					<path
						d="M60 110C60 90 75 75 95 75H135C140 75 145 79 145 84V116C145 121 140 125 135 125H95C75 125 60 110 60 110Z"
						fill="currentColor"
						fill-opacity="0.1"
					/>
					<rect
						x="80"
						y="90"
						width="40"
						height="30"
						rx="6"
						fill="currentColor"
						fill-opacity="0.8"
					/>
					<circle cx="93" cy="101" r="3" fill="#0f172a" />
					<circle cx="107" cy="101" r="3" fill="#0f172a" />
				</svg>
			</div>
			<h2 class="mt-6 text-2xl font-bold text-white">Buat Akun Baru</h2>
			<p class="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
				Daftar untuk mulai menggunakan Aurora dan nikmati seluruh kemudahan platform kami
			</p>
		</div>

		<div class="absolute bottom-10 left-10 flex gap-2">
			<span
				class="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
				>JWT Auth</span
			>
		</div>
	</div>

	<div
		class="z-10 flex w-full flex-col justify-center bg-white px-6 py-12 shadow-2xl md:px-24 lg:w-1/2 lg:px-16 xl:px-28"
	>
		<div in:fade={{ duration: 600, delay: 200 }} class="mx-auto w-full max-w-md">
			<div class="mb-10 flex items-center gap-2 lg:hidden">
				<div
					class="flex h-7 w-7 rotate-12 transform items-center justify-center rounded-lg bg-emerald-400 text-xs font-bold text-slate-900 shadow-md shadow-emerald-400/20"
				>
					a
				</div>
				<span class="text-xl font-bold tracking-tight text-slate-900">aurora</span>
			</div>

			<div class="mb-8">
				<h1 class="text-3xl font-bold tracking-tight text-slate-900">Daftar</h1>
				<p class="mt-2 text-sm text-slate-500">Silakan buat akun baru Anda</p>
			</div>

			<form on:submit|preventDefault={register} class="space-y-5">
				<div>
					<label class="block text-xs font-semibold tracking-wider text-slate-600 uppercase"
						>Nama</label
					>
					<div class="relative mt-1.5">
						<input
							type="text"
							class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-4 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
							placeholder="Nama lengkap Anda"
							bind:value={name}
							required
						/>
					</div>
				</div>

				<div>
					<label class="block text-xs font-semibold tracking-wider text-slate-600 uppercase"
						>Email</label
					>
					<div class="relative mt-1.5">
						<input
							type="email"
							class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pl-4 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
							placeholder="nama@email.com"
							bind:value={email}
							required
						/>
					</div>
				</div>

				<div>
					<label class="block text-xs font-semibold tracking-wider text-slate-600 uppercase"
						>Password</label
					>
					<div class="relative mt-1.5">
						<input
							type={showPassword ? 'text' : 'password'}
							class="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 pr-12 pl-4 text-slate-900 placeholder-slate-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none"
							placeholder="••••••••"
							bind:value={password}
							required
						/>
						<button
							type="button"
							class="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
							on:click={() => (showPassword = !showPassword)}
						>
							{#if showPassword}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
									/></svg
								>
							{:else}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/><path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268-2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/></svg
								>
							{/if}
						</button>
					</div>
				</div>

				<button
					type="submit"
					class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 font-medium text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
					disabled={loading}
				>
					{#if loading}
						<svg class="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						<span>Memproses...</span>
					{:else}
						<span>Daftar</span>
					{/if}
				</button>
			</form>

			<p class="mt-8 text-center text-sm text-slate-500">
				Sudah punya akun?
				<a
					href="/admin/login"
					class="font-semibold text-blue-600 transition-all hover:text-blue-700 hover:underline"
					>Masuk di sini</a
				>
			</p>
		</div>
	</div>
</div>
