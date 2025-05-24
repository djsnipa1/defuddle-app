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

<div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">HTML to Markdown Converter</h1>
    
    <div class="mb-6">
        <div class="flex gap-4">
            <input
                type="url"
                bind:value={url}
                placeholder="Enter URL to convert"
                class="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                on:click={convertUrl}
                disabled={loading || !url}
                class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Converting...' : 'Convert'}
            </button>
        </div>
        
        {#if error}
            <p class="mt-2 text-red-500">{error}</p>
        {/if}
    </div>
    
    {#if markdown}
        <div class="border rounded p-6 bg-gray-50">
            <h2 class="text-xl font-semibold mb-4">Converted Markdown:</h2>
            <pre class="whitespace-pre-wrap font-mono text-sm">{markdown}</pre>
        </div>
    {/if}
</div>
