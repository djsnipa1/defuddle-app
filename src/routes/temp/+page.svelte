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

<h1>Article Defuddler</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label for="url-input">URL to convert:</label>
	<input id="url-input" type="url" bind:value={url} placeholder="https://example.com/article" required disabled={loading} />
	<button type="submit" disabled={loading}>
		{loading ? 'Converting...' : 'Convert'}
	</button>
</form>

{#if loading}
	<p>Loading...</p>
{/if}

{#if error}
	<p class="error">Error: {error}</p>
{/if}

{#if article}
	<article>
		<h2>{article.title}</h2>
		<hr />
		<div>{@html article.content}</div>
	</article>
{/if}

<style>
	form { display: flex; gap: 0.5rem; align-items: center; margin-block: 1rem; }
	input { width: 30rem; padding: 0.5rem; }
	.error { color: red; }
	article { border: 1px solid #ccc; padding: 1rem; margin-top: 1rem; }
</style>

