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
        let cursor = 0;
        for (let i=0; i<t.length; i++){
            if (t.charAt(i)==' ') {
                cursor+=5
                continue
            }
            cursor = data.font!.get(t.charAt(i) as KeyChar)!.draw(context!,0,cursor)
        }
    }
    text.subscribe(draw)
</script>



<canvas width="160" height="16" bind:this={canvas}>
</canvas>
<input type="text"  name="" id="" bind:value={$text}>
<input type="color" name="" id="" bind:value={$text_color}>

<style>
    :global(body){
        background: #181818;
        mar: 0;
    }

    canvas {
        background: #aaa;
        image-rendering: pixelated;
        width: 1600px;
        height: 160px;
    }

</style>