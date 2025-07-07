import { JSDOM } from 'jsdom';
import { Defuddle } from 'defuddle/node';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { url } = await request.json();

		if (!url || typeof url !== 'string') {
			return json({ error: 'A "url" property with a string value is required.' }, { status: 400 });
		}

		// Per the defuddle documentation for Node.js:
		// 1. Use JSDOM to fetch the URL and create a DOM object.
		const dom = await JSDOM.fromURL(url);

		// 2. Pass the JSDOM object to the Defuddle function.
		// The first argument should be the entire JSDOM instance, not just the document.
		// The library will access `dom.window.document` internally.
		const article = await Defuddle(dom, url);
		return json(article);
	} catch (error) {
		console.error(error);
		const message = error instanceof Error ? error.message : 'An unknown error occurred';
		return json({ error: message }, { status: 500 });
	}
};
