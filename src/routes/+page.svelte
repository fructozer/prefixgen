<script lang="ts">
	import { drawText, type KeyChar } from "$lib/font.js";
	import { writable } from 'svelte/store';
    export let data;

    let text = writable("default")
    let text_color = writable("#ffffff")
    let canvas: HTMLCanvasElement

    function draw() {
        if (canvas==undefined) return
        const context = canvas.getContext('2d');
        context?.clearRect(0,0, canvas.width, canvas.height)
        context!.fillStyle = $text_color
        drawText(context!, data.font!, $text, 1, 1)
    }
    text.subscribe(draw)
    text_color.subscribe(draw)
</script>



<canvas width="160" height="16" bind:this={canvas}>
</canvas>
<input type="text"  name="" id="" bind:value={$text}>
<input type="color" name="" id="" bind:value={$text_color}>

<style>
    :global(body){
        background: #181818;
        margin: 0;
    }

    canvas {
        background: #aaa;
        image-rendering: pixelated;
        width: 800px;
        height: 80px;
    }

</style>