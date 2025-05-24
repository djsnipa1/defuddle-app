import { Defuddle } from 'defuddle/node';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    try {
        const { url } = await request.json();
        
        // Fetch the HTML content
        const response = await fetch(url);
        const html = await response.text();
        
        // Convert HTML to markdown using defuddle
        const result = await Defuddle(html, url, {
            markdown: true
        });
        
        return json({ markdown: result.content });
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
}