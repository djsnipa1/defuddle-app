import { Defuddle } from 'defuddle/node';
import { JSDOM } from 'jsdom';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { url } = await request.json();

        // Parse HTML from a URL
        const dom = await JSDOM.fromURL(url);
        
        // Convert HTML to markdown using defuddle
        const result = await Defuddle(dom, {
            debug: false,
            markdown: true,
            url: url
        });
        
        return json({ markdown: result.content });
    } catch (error) {
        return json({ error: error.message }, { status: 500 });
    }
};
