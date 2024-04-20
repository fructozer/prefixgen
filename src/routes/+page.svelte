<script lang="ts">
	import type { KeyChar } from "$lib/font.js";
	import { writable } from 'svelte/store';
    export let data;

    let text = writable("default")
    let text_color = writable("#ffffff")
    let canvas: HTMLCanvasElement

    function draw() {
        if (canvas==undefined) return
        const context = canvas.getContext('2d');
        context?.clearRect(0,0, canvas.width, canvas.height)
        const t = $text.toUpperCase()
        data.font?.get(t.charAt(0) as KeyChar)?.draw(context!,0,0)
    }
    text.subscribe(draw)
</script>



<canvas width="16" height="16" bind:this={canvas}>
</canvas>
<input type="text"  name="" id="" bind:value={$text}>
<input type="color" name="" id="" bind:value={$text_color}>

<style>
    :global(body){
        background: #181818;
    }

    canvas {
        background: #aaa;
        image-rendering: pixelated;
        width: 160px;
        height: 160px;
    }

</style>