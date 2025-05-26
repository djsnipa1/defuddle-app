<script>
	let url = '';
	let markdown = '';
	let loading = false;
	let error = '';

	async function convertUrl() {
		if (!url) return;

		loading = true;
		error = '';
		try {
			const response = await fetch('/api/convert', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ url })
			});

			const data = await response.json();
			if (data.error) {
				error = data.error;
			} else {
				markdown = data.markdown;
			}
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-gb_bg container mx-auto max-w-4xl px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">HTML to Markdown Converter</h1>

	<!-- <div class="mb-6">
		<div class="flex gap-4">
			<input
				type="url"
				bind:value={url}
				placeholder="Enter URL to convert"
				class="flex-1 rounded border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
			<button
				on:click={convertUrl}
				disabled={loading || !url}
				class="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? 'Converting...' : 'Convert'}
			</button>
		</div> -->

	<!-- {#if error}
			<p class="mt-2 text-red-500">{error}</p>
		{/if} -->
	<!-- </div> -->

	{#if markdown}
		<div class="rounded border bg-gray-50 p-6">
			<h2 class="mb-4 text-xl font-semibold">Converted Markdown:</h2>
			<pre class="font-mono text-sm whitespace-pre-wrap">{markdown}</pre>
		</div>
	{/if}
</div>

<div class="bg-gb_bg flex min-h-screen flex-col items-center border border-pink-500 py-10">
	<!-- URL Input Bar -->
	<form class="bg-gb_bg1 mb-8 flex w-full max-w-2xl items-center rounded-lg p-4 shadow">
		<input
			type="url"
			bind:value={url}
			placeholder="Enter URL here..."
			class="bg-gb_bg2 text-gb_fg border-gb_bg2 focus:ring-gb_yellow placeholder-gb_comment flex-1 rounded-l-lg border px-4 py-2 focus:ring-2 focus:outline-none"
		/>
		<button
			on:click={convertUrl}
			disabled={loading || !url}
			type="submit"
			class="bg-gb_yellow hover:bg-gb_orange text-gb_bg rounded-r-lg px-6 py-2 font-semibold transition"
		>
			Submit
		</button>
	</form>

	<!-- Placeholder for fetched text -->
	<div
		class="bg-gb_bg1 text-gb_comment flex min-h-[200px] w-full max-w-2xl items-center justify-center rounded-lg px-6 py-8 text-lg shadow"
	>
		<span class="italic">Fetched text will appear here...</span>
	</div>
</div>
