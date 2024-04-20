import { loadFont } from '$lib/font';
import type { PageLoad } from './$types';

export const ssr = false;
export const prerender = true;

export const load = (async () => {

    return {
        font: await loadFont('font/5px.png')!
    };
}) satisfies PageLoad;