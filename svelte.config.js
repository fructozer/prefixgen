import adapter     from '@sveltejs/adapter-static';
import preprocess  from 'svelte-preprocess';
import { resolve } from 'path';

const dev = process.argv.includes('dev');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			pages:       'gh-pages',
			assets:      'gh-pages',
			fallback:    '404.html',
			precompress: false,
			strict:      true
		})
	}
};

export default config;
