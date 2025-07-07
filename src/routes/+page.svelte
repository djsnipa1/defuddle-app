<script lang="ts">
	let loading = false;
	let article: { title: string; content: string; [key: string]: any } | null = null;
	let error: string | null = null;
	let url = '';

	async function handleSubmit(event: Event) {
		event.preventDefault();
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

<div class="min-h-screen bg-gruvbox-bg text-gruvbox-fg p-6">
  <div class="max-w-6xl mx-auto">

    <h1 class="text-3xl font-bold text-gruvbox-yellow mb-8">HTML to Markdown Converter</h1>
    
    <!-- URL Input Form -->
    <form on:submit|preventDefault={handleSubmit} class="mb-8">
      <div class="flex gap-4 mb-4">
        <input
          type="url"
          bind:value={url}
          placeholder="Enter URL (e.g., https://example.com)"
          class="flex-1 px-4 py-3 bg-gruvbox-dark1 border border-gruvbox-dark2 rounded-lg text-gruvbox-fg placeholder-gruvbox-gray focus:outline-none focus:border-gruvbox-blue focus:ring-2 focus:ring-gruvbox-blue/20 transition-colors"
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          class="px-6 py-3 w-32 bg-gruvbox-green hover:bg-gruvbox-green/80 disabled:bg-gruvbox-gray disabled:cursor-not-allowed text-gruvbox-bg font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gruvbox-green/20"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>
      
    </form>

    <!-- Results Display -->
    {#if article}
      <div class="bg-gruvbox-dark1 border border-gruvbox-dark2 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gruvbox-yellow mb-4">{article.title}</h2>
        <div class="bg-gruvbox-bg border border-gruvbox-dark2 rounded-md p-4 max-h-96 overflow-y-auto">
          <pre class="text-sm text-gruvbox-fg whitespace-pre-wrap font-mono leading-relaxed">{@html article.content}</pre>
        </div>
      </div>
    {:else}
      <div class="bg-gruvbox-dark1 border border-gruvbox-dark2 rounded-lg p-6">
        <h2 class="text-xl font-semibold text-gruvbox-yellow mb-4">{loading ? 'Converting...' : 'Results'}</h2>
        <div class="bg-gruvbox-bg border border-gruvbox-dark2 rounded-md p-4 h-96 flex items-center justify-center">
          <p class="text-gruvbox-gray text-center">
            Enter a URL above and click Submit to see the analysis results here.
          </p>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #282828;
  }
  
  :global(.bg-gruvbox-bg) { background-color: #282828; }
  :global(.bg-gruvbox-dark1) { background-color: #3c3836; }
  :global(.bg-gruvbox-dark2) { background-color: #504945; }
  
  :global(.text-gruvbox-fg) { color: #ebdbb2; }
  :global(.text-gruvbox-yellow) { color: #fabd2f; }
  :global(.text-gruvbox-gray) { color: #928374; }
  :global(.text-gruvbox-bg) { color: #282828; }
  
  :global(.border-gruvbox-dark2) { border-color: #504945; }
  :global(.border-gruvbox-blue) { border-color: #83a598; }
  
  :global(.bg-gruvbox-green) { background-color: #8ec07c; }
  :global(.bg-gruvbox-green\/80) { background-color: rgba(142, 192, 124, 0.8); }
  :global(.bg-gruvbox-blue) { background-color: #83a598; }
  :global(.bg-gruvbox-red) { background-color: #fb4934; }
  :global(.bg-gruvbox-red\/80) { background-color: rgba(251, 73, 52, 0.8); }
  :global(.bg-gruvbox-gray) { background-color: #928374; }
  
  :global(.placeholder-gruvbox-gray\:\:placeholder) { color: #928374; }
  
  :global(.focus\:border-gruvbox-blue\:focus) { border-color: #83a598; }
  :global(.focus\:ring-gruvbox-blue\/20\:focus) { 
    box-shadow: 0 0 0 2px rgba(131, 165, 152, 0.2); 
  }
  :global(.focus\:ring-gruvbox-green\/20\:focus) { 
    box-shadow: 0 0 0 2px rgba(142, 192, 124, 0.2); 
  }
  :global(.focus\:ring-gruvbox-red\/20\:focus) { 
    box-shadow: 0 0 0 2px rgba(251, 73, 52, 0.2); 
  }
  
  :global(.hover\:bg-gruvbox-green\/80\:hover) { background-color: rgba(142, 192, 124, 0.8); }
  :global(.hover\:bg-gruvbox-red\/80\:hover) { background-color: rgba(251, 73, 52, 0.8); }
</style>
