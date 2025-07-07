<script lang="ts">
	let loading = false;
	let article: { title: string; content: string; [key: string]: any } | null = null;
	let error: string | null = null;
	let url = '';

	async function handleSubmit() {
		loading = true;
		error = null;
		article = null;

		try {
			const response = await fetch('/api/convert', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ url })
			});

			const data = await response.json();

			if (!response.ok) {
				// Use the error message from the API if it exists
				throw new Error(data.error || `HTTP error! status: ${response.status}`);
			}

			article = data;
		} catch (e: any) {
			error = e.message;
			console.error(e);
		} finally {
			loading = false;
		}
	}
</script>

<div class="bg-gb_bg container mx-auto max-w-4xl px-4 py-8">
	<h1 class="mb-8 text-3xl font-bold">HTML to Markdown Converter</h1>

	{#if article}
		<article class="rounded border bg-gray-50 p-6">
			<h2 class="mb-4 text-xl font-semibold">{article.title}</h2>
			<hr class="mb-4" />
			<div class="article-content font-mono text-sm whitespace-pre-wrap">
				{@html article.content}
			</div>
		</article>
	{/if}

	<form
		on:submit|preventDefault={handleSubmit}
		class="bg-gb_bg1 mb-8 flex w-full max-w-2xl items-center rounded-lg p-4 shadow"
	>
		<label for="url-input" class="sr-only">URL to convert:</label>
		<div class="flex gap-4">
			<input
				id="url-input"
				type="url"
				bind:value={url}
				placeholder="Enter URL here..."
				class="bg-gb_bg2 text-gb_fg border-gb_bg2 focus:ring-gb_yellow placeholder-gb_comment flex-1 rounded-l-lg border px-4 py-2 focus:ring-2 focus:outline-none"
				required
				disabled={loading}
			/>
			<button
				type="submit"
				disabled={loading}
				class="bg-gb_yellow hover:bg-gb_orange text-gb_bg rounded-r-lg px-6 py-2 font-semibold transition"
			>
				{loading ? 'Converting...' : 'Convert'}
			</button>
		</div>
	</form>

	{#if loading}
		<p
			class="bg-gb_bg1 text-gb_comment flex min-h-[200px] w-full max-w-2xl items-center justify-center rounded-lg px-6 py-8 text-lg shadow"
		>
			Loading...
		</p>
	{/if}

	{#if error}
		<p class="mt-2 text-red-500">Error: {error}</p>
	{/if}
</div>

<style>
	form {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		margin-block: 1rem;
	}
	input {
		width: 30rem;
		padding: 0.5rem;
	}
	.error {
		color: red;
	}
	article {
		border: 1px solid #ccc;
		padding: 1rem;
		margin-top: 1rem;
	}
</style>
