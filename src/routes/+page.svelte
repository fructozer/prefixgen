<script lang="ts">
	import Offset from './Offset.svelte';
	import { tick } from 'svelte';
    import Color from 'colorjs.io'
	import { textBox, drawText, type KeyChar } from "$lib/font.js";
	import { writable } from 'svelte/store';
    import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
    export let data;

    let text = writable("default")
    let text_color = writable("#ffffff")
    let shadow = writable("#343434")
    let background = writable('#1074ff')
    let auto_shade = writable(false)
    let offset = writable({x: 0, y: 1})
    let canvas: HTMLCanvasElement
    let padding = writable(2);
    function draw() {
        autoShading()
        if (canvas==undefined) return
        const context = canvas.getContext('2d')!;
        context?.clearRect(0,0, canvas.width, canvas.height)
        const box = textBox(data.font!, $text)
        const x = Math.floor((canvas.width-box.width)/2)
        const y = Math.floor((canvas.height-box.height)/2)
        //draw background
        
        context.fillStyle = $background
        let p = $padding
        context.fillRect(
            Math.min(x,x+$offset.x)-p,
            Math.min(y,y+$offset.y)-p,
            box.width+($offset.x==0?p*2:p*2+1),
            box.height+($offset.y==0?p*2:p*2+1)
        )

        //draw shadow
        context.fillStyle = $shadow
        drawText(context, data.font!, $text, x+$offset.x, y+$offset.y)
        
        //draw text
        context.fillStyle = $text_color
        drawText(context, data.font!, $text, x, y)
    }
    text.subscribe(draw)
    shadow.subscribe(draw)
    text_color.subscribe(draw)
    offset.subscribe(draw)
    background.subscribe(draw)
    padding.subscribe(draw)
    auto_shade.subscribe(draw)

    function autoShading(){
        if (!$auto_shade) return
        const t = new Color($text_color)
        t.set('hsv.v', v=>v/2.5)
        $shadow = t.toString()
    }
    function canvas_init(){
        canvas.width = window.innerWidth/10
        draw()
    }
    (async ()=> {
        await tick()    
        canvas_init()
    })()
</script>

<svelte:window on:resize={canvas_init}/>

<canvas width="160" height="16" bind:this={canvas}>
</canvas>
<input type="text" class="text"  name="" id="" bind:value={$text}>
<div class="option">
    <div class="group">
        <span>Text option</span>
        <div class="dark label" id='text_option'>
            <span>Color: </span>
            <ColorPicker
                sliderDirection={'horizontal'}
                components={ChromeVariant}
                label=''
                bind:hex={$text_color}
            />
        </div>
    </div>
    <div class="group">
        <span>Shadow option</span>
        <div style="display: flex;">
            <div class="dark label" id='text_option'>
                <span>Color: </span>
                <ColorPicker
                    sliderDirection={'horizontal'}
                    components={ChromeVariant}
                    label=''
                    bind:hex={$shadow}
                />
            </div>
            <div class="dark label">
                <div style="display: flex;">
                    <span>auto:</span>
                    
                    <input type="checkbox" style="
                        height:13px;
                        transform:translateY(11px);
                        margin-right: 3px;
                    "name="auto" bind:checked={$auto_shade}>
                </div>
            </div>
        </div>
        <div class="dark label">
            <span style="line-height: 56px;">Position:&nbsp;&nbsp;</span>
            <Offset bind:offset={$offset}/>&nbsp;
        </div>
    </div>
    <div class="group">
        <span>Background option</span>
        <div class="dark label" id='text_option'>
            <span>Color: </span>
            <ColorPicker
                sliderDirection={'horizontal'}
                components={ChromeVariant}
                label=''
                bind:hex={$background}
            />
        </div>
        <div class="dark label" id='text_option'>
            <span>Padding: </span>
            <input class="nin" min="0" type="number"
                bind:value={$padding}
                on:wheel={e=>{
                    $padding = Math.max(0, $padding + (e.deltaY>0?-1:1))
                }}
            >
        </div>
    </div>
</div>

<style>
    :global(body){
        background: #181818;
        margin: 0;
        row-gap: 0;
        overflow: hidden;
    }
    :global(*){
        font-family: consolas;
    }

    canvas {
        background: gray;
        background-size: 30%;
        image-rendering: pixelated;
        width: 100%;
        height: 160px;
    }

    .dark {
		--cp-bg-color: #333;
		--cp-border-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
	}
    .center {
        margin-left: 50%;
        transform: translateX(-50%);
    }
    input {
        height: 2rem;
        font-size: 1.5rem;
        margin: 0;
    }
    :focus-visible {
        outline: none;
    }
    .text {
        margin-left: 50%;
        transform: translateX(-50%) translateY(-5px);
        width: 100%;
        text-align: center;
    }
    span {
        color: white;
        line-height: 33px;
    }
    .option {
        display: flex;
    }
    .group {
        border: 1px white solid;
        width: fit-content;
        padding: 5px;
        margin: 3px;
        border-radius: 5px;
    }
    .label {
        display: flex;
        background: rgb(80, 80, 80);
        padding: 5px;
        width: fit-content;
        border-radius: 3px;
        margin: 3px;
    }
    .nin{
        font-size: 1rem;
        height: 19px;
        width: 19px;
        margin: 4px;
        text-align: center;
        cursor: default;
    }
    .nin::-webkit-outer-spin-button,
    .nin::-webkit-inner-spin-button {
        display: none;
    }

</style>